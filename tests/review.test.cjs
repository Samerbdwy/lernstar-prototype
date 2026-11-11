/* Self-contained review regression checks. Run: node --test tests/review.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function app() {
  const values = new Map();
  const ctx = {
    console: { warn: () => {} },
    Date, Math, JSON, setTimeout: () => 0,
    location: { hash: '#/' },
    localStorage: {
      getItem: (k) => values.get(k) || null,
      setItem: (k, v) => values.set(k, v),
      removeItem: (k) => values.delete(k)
    },
    document: {
      addEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null
    },
    window: { addEventListener: () => {}, scrollTo: () => {} }
  };
  vm.createContext(ctx);
  for (const file of ['data.js', 'i18n.js', 'core.js', 'student.js', 'teacher.js', 'parent.js']) {
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), ctx, { filename: file });
  }
  ctx.window.App.rerender = () => {};
  ctx.window.App.toast = () => {};
  return { App: ctx.window.App, DATA: ctx.window.DATA, ctx };
}

test('all four critical views exist', () => {
  const { App } = app();
  for (const page of ['s/send', 's/results', 't/verify', 't/confirm', 't/review', 'p/home', 'w/report'])
    assert.equal(typeof App.views[page], 'function', page);
});

test('student results stay hidden until release, then show teacher-approved 8/11', () => {
  const { App } = app();
  App.state.exam.status = 'sent';
  assert.match(App.views['s/results'](), /checking your exam/);
  assert.doesNotMatch(App.views['s/results'](), /8 of 11/);
  App.steps()[3][1] = true;
  assert.equal(App.aiTotal(), 7);
  assert.equal(App.total(), 8);
  App.state.grade.confirmed = true;
  App.state.review.gap = 'confirmed';
  App.state.review.flag = 'confirmed';
  App.state.exam.status = 'verified';
  App.act.release();
  assert.equal(App.state.released, true);
  assert.match(App.views['s/results'](), /8 of 11/);
});

test('release is refused without OCR completion, grade, gap and flag decisions', () => {
  const { App } = app();
  App.state.exam.status = 'sent';
  App.act.release();
  assert.equal(App.state.released, false);
  App.state.exam.status = 'verified';
  App.act.release();
  assert.equal(App.state.released, false);
  App.state.grade.confirmed = true;
  App.act.release();
  assert.equal(App.state.released, false);
  App.state.review.gap = 'dismissed';
  App.act.release();
  assert.equal(App.state.released, false);
  App.state.review.flag = 'dismissed';
  App.act.release();
  assert.equal(App.state.released, true);
});

test('a pending rescan blocks OCR verification until the student responds', () => {
  const { App } = app();
  App.state.exam.status = 'sent';
  App.state.exam.rescanPending = true;
  for (const [q, i] of [[2,2], [5,0], [7,4]]) App.state.verify.resolved[q + ':' + i] = true;
  App.state.verify.resolved['3:dec'] = true;
  App.act.verified();
  assert.equal(App.state.exam.status, 'sent');
  App.state.exam.rescan = true;
  App.act.rescanDone();
  assert.equal(App.state.exam.rescanPending, false);
  App.act.verified();
  assert.equal(App.state.exam.status, 'verified');
});

test('per-answer language tag is saved and persists on the selected question', () => {
  const { App } = app();
  App.state.exam.status = 'sent';
  App.state.verify.q = 2;
  App.inp.ansLang({ value: 'MIX' });
  assert.equal(App.state.verify.answerLang[2], 'MIX');
  assert.match(App.views['t/verify'](), /value="MIX" selected/);
  App.state.verify.q = 0;
  assert.doesNotMatch(App.views['t/verify'](), /value="MIX" selected/);
});

test('parent report is protected even by direct URL and respects toParent off', () => {
  const { App } = app();
  App.state.exam.status = 'sent';
  let report = App.views['w/report']();
  assert.match(report, /No confirmed result yet/);
  assert.doesNotMatch(report, /Great job on multiplication/);
  App.state.released = true;
  App.state.review.toParent = false;
  report = App.views['w/report']();
  assert.match(report, /No confirmed result yet/);
  assert.doesNotMatch(report, /Great job on multiplication/);
  assert.doesNotMatch(App.views['p/home'](), /Oct 12/);
  App.state.review.toParent = true;
  report = App.views['w/report']();
  assert.match(report, /Great job on multiplication/);
});

test('quiet hours cross midnight and hide only new deferred notifications', () => {
  const { App } = app();
  assert.equal(App.isQuietNow(new Date(2026, 10, 11, 22, 0)), true);
  assert.equal(App.isQuietNow(new Date(2026, 10, 11, 6, 0)), true);
  assert.equal(App.isQuietNow(new Date(2026, 10, 11, 11, 0)), false);
  App.state.notifs = [{ to: 'student', read: false, deferred: true }];
  App.state.settings.quietFrom = '00:00';
  App.state.settings.quietTo = '23:59';
  assert.equal(App.visibleNotifs('student').length, 0);
  App.state.settings.quietFrom = '00:00';
  App.state.settings.quietTo = '00:00';
  assert.equal(App.visibleNotifs('student').length, 1);
});

test('changing the gap threshold changes the suggestion status', () => {
  const { App } = app();
  App.state.exam.status = 'verified';
  App.state.grade.confirmed = true;
  assert.match(App.views['t/review'](), /Rule met/);
  App.state.settings.gap[4] = 4;
  assert.match(App.views['t/review'](), /Below chosen gap threshold/);
});

test('Q4 second mark is for decimal commas, not a nonexistent unit', () => {
  const { App, DATA } = app();
  assert.match(DATA.exam.questions[3].steps[1].en, /Decimal-comma/);
  assert.doesNotMatch(DATA.exam.questions[3].steps[1].en, /Unit/);
  assert.equal(App.aiTotal(), 7);
  App.steps()[3][1] = true;
  assert.equal(App.total(), 8);
});

test('practice presents one question per screen and pages forward', () => {
  const { App } = app();
  App.state.released = true;
  App.state.review.gap = 'confirmed';
  assert.match(App.views['s/practice'](), /Task 1 of 3/);
  App.state.practice.answers[0] = 'a';
  App.act.practicePage({ dataset: { n: '1' } });
  assert.match(App.views['s/practice'](), /Task 2 of 3/);
  assert.doesNotMatch(App.views['s/practice'](), /Task 1 of 3/);
});

test('practice cannot be counted complete if answers are incorrect', () => {
  const { App } = app();
  App.state.practice.answers = { 0: 'b', 1: 'a', 2: 'a' };
  App.act.pDone();
  assert.equal(App.state.practice.done, false);
  assert.equal(App.state.practice.streak, 4);
  App.state.practice.answers = { 0: 'a', 1: 'b', 2: 'b' };
  App.act.pDone();
  assert.equal(App.state.practice.done, true);
  assert.equal(App.state.practice.streak, 5);
  App.act.pDone();
  assert.equal(App.state.practice.streak, 5);
});
