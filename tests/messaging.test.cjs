/* Messaging and formerly placeholder UX regression tests. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function boot(existing) {
  const store = existing || new Map();
  const ctx = {
    console: { warn: () => {} }, Date, Math, JSON, setTimeout: () => 0,
    location: { hash: '#/' },
    localStorage: {
      getItem: (k) => store.get(k) || null,
      setItem: (k, v) => store.set(k, v),
      removeItem: (k) => store.delete(k)
    },
    document: {
      addEventListener: () => {},
      getElementById: () => null,
      querySelector: () => null
    },
    window: { addEventListener: () => {}, scrollTo: () => {} }
  };
  vm.createContext(ctx);
  for (const file of ['data.js','i18n.js','core.js','student.js','teacher.js','parent.js','messaging.js'])
    vm.runInContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), ctx, { filename:file });
  ctx.window.App.rerender = () => {};
  ctx.window.App.toast = () => {};
  return {App:ctx.window.App, DATA:ctx.window.DATA, ctx, store};
}

test('teacher message reaches Youssef inbox and marks read when opened', () => {
  const { App, DATA } = boot();
  App.state.settings.quietFrom = '00:00'; App.state.settings.quietTo = '00:00';
  assert.equal(App.addMessage('teacher', DATA.student.name, 'Please practise fractions.'), true);
  assert.equal(App.unread('student'), 1);
  assert.match(App.views['s/notifs'](), /Please practise fractions\./);
  assert.equal(App.unread('student'), 0);
  assert.match(App.views['t/messages'](), /Please practise fractions\./);
});

test('student replies appear in teacher inbox and are acknowledged as read', () => {
  const { App, DATA } = boot();
  assert.equal(App.addMessage('student', DATA.teacher.name, 'I will work on fractions!'), true);
  assert.equal(App.unread('teacher'), 1);
  assert.match(App.views['t/messages'](), /I will work on fractions!/);
  assert.equal(App.unread('teacher'), 0);
  assert.match(App.views['s/notifs'](), /I will work on fractions!/);
});

test('messages are saved across page reload in the same local browser', () => {
  const { App, store } = boot();
  App.addMessage('teacher', 'Youssef A.', 'Persistent test.');
  const next = boot(store);
  assert.equal(next.App.messageInbox('student').length, 1);
  assert.match(next.App.views['s/notifs'](), /Persistent test/);
});

test('blank, oversized and unknown-recipient messages are rejected', () => {
  const { App } = boot();
  assert.equal(App.addMessage('teacher', 'Youssef A.', '   '), false);
  assert.equal(App.addMessage('teacher', 'Youssef A.', 'x'.repeat(501)), false);
  assert.equal(App.addMessage('teacher', 'Nonexistent Student', 'hello'), false);
  assert.equal(App.addMessage('student', 'Unknown', 'hello'), false);
  assert.equal(App.state.messages.length, 0);
});

test('HTML message content is escaped before rendering in student and teacher views', () => {
  const { App, DATA } = boot();
  App.addMessage('teacher', DATA.student.name, '<img src=x onerror=alert(1)>');
  const rendered = App.views['s/notifs']();
  assert.doesNotMatch(rendered, /<img src=x/);
  assert.match(rendered, /&lt;img src=x/);
});

test('other sample students get an outbox entry, never Youssef inbox content', () => {
  const { App } = boot();
  App.state.messageRecipient = 'Lina M.';
  App.state.messageDraft = 'Sample note only';
  App.act.sendTeacherMessage();
  assert.equal(App.state.messages.length, 1);
  assert.equal(App.messageInbox('student').length, 0);
  assert.match(App.views['t/messages'](), /Sample note only/);
  assert.match(App.views['t/messages'](), /sample only/);
});

test('teacher/student send buttons create an interactive local conversation', () => {
  const { App, DATA } = boot();
  App.state.messageRecipient = DATA.student.name;
  App.state.messageDraft = 'Hi Youssef';
  App.act.sendTeacherMessage();
  assert.equal(App.state.messageDraft, '');
  App.state.studentReplyDraft = 'Hi Ms. Nadine';
  App.act.sendStudentMessage();
  assert.equal(App.state.studentReplyDraft, '');
  assert.equal(App.messageInbox('teacher').length, 1);
  assert.equal(App.messageInbox('student').length, 1);
});

test('sample queue entries open an honest read-only view, instead of a toast', () => {
  const { App, ctx } = boot();
  App.act.openRow({dataset:{id:'lina'}});
  assert.equal(App.state.samplePreview, 'lina');
  assert.equal(ctx.location.hash, '#/t/sample');
  assert.match(App.views['t/sample'](), /Read-only sample queue entry/);
  assert.match(App.views['t/sample'](), /Lina M\./);
});

test('class settings show their actual consequences and clamp thresholds', () => {
  const { App, ctx } = boot();
  App.inp.gap({dataset:{g:'4'},value:'999'});
  assert.equal(App.state.settings.gap[4], 6);
  assert.match(App.views['t/settings'](), /Below chosen gap threshold/);
  App.inp.gap({dataset:{g:'4'},value:'2'});
  assert.match(App.views['t/settings'](), /Rule met/);
  App.state.settings.defaultMode = 'picture';
  ctx.location.hash = '#/t/settings';
  App.go('s/home');
  assert.equal(App.state.mode, 'picture');
});

test('quiet hours delay unread badge, but not an opened inbox', () => {
  const { App } = boot();
  App.state.settings.quietFrom = '00:00'; App.state.settings.quietTo = '23:59';
  App.addMessage('teacher', 'Youssef A.', 'Quiet-hour note.');
  assert.equal(App.unread('student'), 0);
  assert.match(App.views['s/notifs'](), /Quiet-hour note/);
  App.state.settings.quietFrom = '00:00'; App.state.settings.quietTo = '00:00';
  App.addMessage('teacher', 'Youssef A.', 'New message.');
  assert.equal(App.unread('student'), 1);
});
