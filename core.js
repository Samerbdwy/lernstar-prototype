/* Core: state, i18n, icons, routing, shell. Vanilla JS, no build step. */
(function () {
  'use strict';
  const D = window.DATA;
  const KEY = 'lernstar-m3-v1';

  const App = (window.App = { views: {}, act: {}, inp: {}, after: {} });

  /* ---------- state ---------- */
  function initial() {
    return {
      lang: 'en', mode: 'reader', tags: false,
      a11y: { large: false, contrast: false, dys: false },
      sendStep: 1, examChoice: 'fractions', examLang: 'DE', shots: 0,
      exam: { status: 'notsent', pages: [], rescan: false, rescanPending: false, rescanNote: '' },
      verify: { q: 0, sel: null, resolved: {}, text: {}, answerLang: {}, undo: [], rescanOpen: false },
      grade: { steps: null, confirmed: false },
      review: {
        gap: null, gapName: null, gapMistake: null, gapEdit: false,
        flag: null, severity: 'medium', dismissReason: '',
        fbTab: 'both', fbEn: null, fbDe: null, practice: 'compare', toStudent: true, toParent: true
      },
      released: false,
      practice: { answers: {}, done: false, streak: 4, index: 0 },
      notifs: [],
      messages: [], messageRecipient: D.student.name, messageDraft: '', studentReplyDraft: '',
      extraRows: [],
      qfilter: { status: 'all', lang: 'all', flagged: false },
      dashLang: 'all',
      progressSubject: 'math',
      batchShown: false,
      settings: { defaultMode: 'reader', gap: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 3 }, quietFrom: '18:00', quietTo: '07:00' },
      parentLang: 'en'
    };
  }
  function load() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const old = JSON.parse(saved), base = initial();
        if (!old || typeof old !== 'object') return base;
        const state = Object.assign({}, base, old);
        for (const part of ['exam', 'verify', 'grade', 'review', 'practice', 'a11y', 'settings'])
          state[part] = Object.assign({}, base[part], old[part] || {});
        state.settings.gap = Object.assign({}, base.settings.gap, (old.settings || {}).gap || {});
        state.verify.answerLang = state.verify.answerLang || {};
        state.messages = Array.isArray(state.messages) ? state.messages : [];
        if (!D.students.some((student) => student.name === state.messageRecipient)) state.messageRecipient = D.student.name;
        // There is only one complete mock exam; older demos could choose an incomplete Plants flow.
        state.examChoice = 'fractions';
        return state;
      }
    } catch (e) {}
    return initial();
  }
  App.state = load();
  App.save = function () { try { localStorage.setItem(KEY, JSON.stringify(App.state)); } catch (e) {} };
  App.reset = function () {
    try { localStorage.removeItem(KEY); } catch (e) {}
    const keepLang = App.state.lang;
    App.state = initial(); App.state.lang = keepLang;
    App.go(''); App.render();
  };
  const S = () => App.state;

  /* ---------- i18n ---------- */
  App.t = function (k, v) {
    const e = window.L[k];
    if (!e) { console.warn('missing i18n key', k); return k; }
    let s = e[S().lang === 'de' ? 1 : 0];
    if (v) for (const x in v) s = s.split('{' + x + '}').join(v[x]);
    return s;
  };
  App.pick = (o) => (o && typeof o === 'object' ? o[S().lang === 'de' ? 'de' : 'en'] : o);
  const t = App.t;
  App.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* ---------- icons ---------- */
  const P = {
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
    bars: '<path d="M5 20v-8M12 20V5M19 20v-11"/>',
    bell: '<path d="M6 16v-5a6 6 0 0 1 12 0v5l2 2H4zM10 21h4"/>',
    speaker: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
    heart: '<path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>',
    flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
    check: '<path d="M4 12l5 5L20 6"/>',
    upload: '<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
    download: '<path d="M12 4v12M7 11l5 5 5-5M4 20h16"/>',
    print: '<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>',
    undo: '<path d="M9 7L4 12l5 5M4 12h10a6 6 0 0 1 0 8"/>',
    right: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
    home: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01"/>',
    users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
    grid: '<path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z"/>',
    message: '<path d="M4 5h16v11H9l-5 4z"/>',
    settings: '<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>',
    scan: '<path d="M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M4 12h16"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20a8 8 0 0 1 16 0"/>',
    file: '<path d="M6 3h8l4 4v14H6zM14 3v4h4"/>',
    pencil: '<path d="M4 20l1-4L16 5l3 3L8 19z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    access: '<circle cx="12" cy="5" r="2"/><path d="M5 9h14M12 9v6M9 21l3-6 3 6"/>'
  };
  App.icon = function (n, size, cls) {
    size = size || 24;
    const fill = n === 'star' && cls && cls.indexOf('on') > -1 ? 'currentColor' : 'none';
    return '<svg class="ic ' + (cls || '') + '" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + fill +
      '" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (P[n] || '') + '</svg>';
  };
  const ic = App.icon;
  App.stars = function (n, of) {
    let h = '<span class="stars" role="img" aria-label="' + n + ' / ' + of + '">';
    for (let i = 0; i < of; i++) h += ic('star', 30, i < n ? 'on' : 'off');
    return h + '</span>';
  };

  /* ---------- helpers ---------- */
  App.go = function (r) {
    // Apply the class default upon entering Student; the child can change it for this session.
    if (r.startsWith('s/') && !App.route().startsWith('s/')) S().mode = S().settings.defaultMode;
    location.hash = '#/' + r;
  };
  App.route = function () { return (location.hash || '#/').replace(/^#\//, '').replace(/^#/, ''); };
  App.toast = function (msg, icon) {
    const box = document.getElementById('toasts'); if (!box) return;
    const el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status');
    el.innerHTML = (icon ? ic(icon, 20) : '') + '<span>' + msg + '</span>';
    while (box.children.length >= 2) box.firstChild.remove();
    box.appendChild(el); setTimeout(() => el.classList.add('out'), 2600); setTimeout(() => el.remove(), 3100);
  };
  App.speak = function (text) {
    App.toast(t('listen.toast') + ' ' + App.esc(text), 'speaker');
    try {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = S().lang === 'de' ? 'de-DE' : 'en-US'; u.rate = 0.85;
      window.speechSynthesis.cancel(); window.speechSynthesis.speak(u);
    } catch (e) {}
  };
  App.listen = (text) => '<button class="listen" data-act="listen" data-say="' + App.esc(text) + '" aria-label="' + t('listen.label') + '">' + ic('speaker', 22) + '</button>';
  // Student/parent notifications created during quiet hours wait until the next permitted viewing period.
  // The prototype has no background push-notification service.
  App.isQuietNow = function (date) {
    const st = S().settings, d = date || new Date();
    const minutes = (value) => { const p = String(value).split(':').map(Number); return p[0] * 60 + p[1]; };
    const from = minutes(st.quietFrom), to = minutes(st.quietTo), now = d.getHours() * 60 + d.getMinutes();
    if (![from, to, now].every(Number.isFinite) || from === to) return false;
    return from < to ? now >= from && now < to : now >= from || now < to;
  };
  App.visibleNotifs = (to) => S().notifs.filter((n) => n.to === to && (!n.deferred || !App.isQuietNow()));
  App.notify = function (to, key, vars) {
    S().notifs.unshift({ id: Date.now() + Math.random(), to: to, key: key, vars: vars || null,
      read: false, deferred: to !== 'teacher' && App.isQuietNow(), time: App.timeLabel() });
  };
  App.timeLabel = function () { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); };

  /* total points */
  App.steps = function () {
    const s = S();
    if (!s.grade.steps) s.grade.steps = D.exam.questions.map((q) => q.steps.map((x) => x.ai));
    return s.grade.steps;
  };
  App.qScore = (qi) => App.steps()[qi].reduce((a, on, i) => a + (on ? D.exam.questions[qi].steps[i].m : 0), 0);
  App.qMax = (qi) => D.exam.questions[qi].steps.reduce((a, x) => a + x.m, 0);
  App.aiScore = (qi) => D.exam.questions[qi].steps.reduce((a, x) => a + (x.ai ? x.m : 0), 0);
  App.total = () => D.exam.questions.reduce((a, q, i) => a + App.qScore(i), 0);
  App.aiTotal = () => D.exam.questions.reduce((a, q, i) => a + App.aiScore(i), 0);
  App.starCount = () => Math.round((App.total() / D.exam.max) * 3);
  App.gapName = () => S().review.gapName || t('gap.name');
  App.gapMistake = () => S().review.gapMistake || t('gap.mistake');

  /* queue rows incl. the live exam */
  App.rows = function () {
    const s = S(); const rows = [];
    if (s.exam.status !== 'notsent') {
      const st = s.exam.status === 'sent' ? 'verify' : s.exam.status === 'released' ? 'done' : 'confirm';
      rows.push({ id: 'youssef', name: D.student.name, exam: D.exam.title, lang: s.examLang, status: st,
        flag: st === 'confirm' && s.review.flag !== 'dismissed', live: true });
    }
    return rows.concat(s.extraRows, D.queue.map((r) => Object.assign({}, r, { flag: r.flag })));
  };

  /* ---------- shell ---------- */
  function demoBar(role) {
    const s = S();
    const rb = (r, label) => '<button class="' + (role === r ? 'on' : '') + '" data-act="role" data-role="' + r + '">' + label + '</button>';
    return '<div class="demobar" role="navigation" aria-label="demo">' +
      '<strong>' + t('demo.title') + '</strong>' +
      '<span class="seg">' + rb('s', t('role.student')) + rb('t', t('role.teacher')) + rb('p', t('role.parent')) + '</span>' +
      '<span class="seg lang"><button class="' + (s.lang === 'en' ? 'on' : '') + '" data-act="lang" data-l="en">EN</button><button class="' + (s.lang === 'de' ? 'on' : '') + '" data-act="lang" data-l="de">DE</button></span>' +
      (role === 's' ? '<span class="seg"><button class="' + (s.mode === 'picture' ? 'on' : '') + '" data-act="mode" data-m="picture">' + t('mode.picture') + '</button><button class="' + (s.mode === 'reader' ? 'on' : '') + '" data-act="mode" data-m="reader">' + t('mode.reader') + '</button></span>' : '') +
      '<button class="' + (s.tags ? 'on' : '') + '" data-act="tags" style="border:1px solid #4a5b65;border-radius:10px">' + t('demo.tags') + '</button>' +
      '<button class="ghost" data-act="reset">' + t('demo.reset') + '</button></div>';
  }
  function langSwitch() {
    const s = S();
    return '<span class="langsw" data-tag="U2.1"><button class="' + (s.lang === 'en' ? 'on' : '') + '" data-act="lang" data-l="en" aria-label="English">EN</button><button class="' + (s.lang === 'de' ? 'on' : '') + '" data-act="lang" data-l="de" aria-label="Deutsch">DE</button></span>';
  }
  App.langSwitch = langSwitch;
  // Demo-only, same-browser messaging: no actual accounts, network delivery or secure data storage.
  App.addMessage = function (from, recipient, body) {
    const clean = String(body || '').trim();
    if (!clean || clean.length > 500 || (from !== 'teacher' && from !== 'student')) return false;
    if (from === 'teacher' && !D.students.some((student) => student.name === recipient)) return false;
    if (from === 'student' && recipient !== D.teacher.name) return false;
    S().messages.unshift({ id: Date.now() + Math.random(), from: from, to: from === 'teacher' ? 'student' : 'teacher',
      recipient: recipient, body: clean, time: App.timeLabel(), read: false,
      deferred: from === 'teacher' && App.isQuietNow() });
    App.save();
    return true;
  };
  App.messageInbox = (role) => S().messages.filter((m) => m && m.to === role &&
    (role === 'teacher' || m.recipient === D.student.name));
  App.unread = (to) => App.visibleNotifs(to).filter((n) => !n.read).length +
    App.messageInbox(to).filter((m) => !m.read && (!m.deferred || !App.isQuietNow())).length;
  function bell(to, route) {
    const n = App.unread(to);
    return '<button class="iconbtn bellbtn" data-act="go" data-r="' + route + '" aria-label="' + t('notif.title') + '">' + ic('bell', 24) + (n ? '<b class="badge">' + n + '</b>' : '') + '</button>';
  }
  function studentShell(inner, route) {
    return '<header class="topbar s-top"><a class="brand" href="#/s/home">' + ic('star', 26, 'on') + '<span>LernStar</span></a>' +
      '<span class="who">' + t('s.hi', { n: D.student.first }) + '</span>' +
      '<div class="tools">' + langSwitch() + bell('student', 's/notifs') + '<span class="avatar" aria-hidden="true">Y</span></div></header>' +
      '<main class="wrap s-main" id="main">' + inner + '</main>';
  }
  function teacherShell(inner, route) {
    const nav = [['t/dashboard', 'grid', 'nav.dashboard'], ['t/queue', 'list', 'nav.queue'], ['t/students', 'users', 'nav.students'], ['t/gaps', 'bars', 'nav.gaps'],
      ['t/batch', 'upload', 'nav.batch'], ['t/messages', 'message', 'nav.messages'], ['t/settings', 'settings', 'nav.settings']];
    const cur = route.split('/').slice(0, 2).join('/');
    const active = { 't/verify': 't/queue', 't/confirm': 't/queue', 't/review': 't/queue' }[cur] || cur;
    return '<header class="topbar t-top"><a class="brand" href="#/t/dashboard">' + ic('star', 24, 'on') + '<span>LernStar</span><em>' + t('role.teacher') + '</em></a>' +
      '<div class="tools">' + langSwitch() + bell('teacher', 't/messages') + '<span class="avatar t" aria-hidden="true">N</span><span class="who-name">' + D.teacher.name + '</span></div></header>' +
      '<div class="t-layout"><nav class="side" aria-label="menu">' + nav.map((n) =>
        '<a href="#/' + n[0] + '" class="' + (active === n[0] ? 'on' : '') + '">' + ic(n[1], 20) + '<span>' + t(n[2]) + '</span></a>').join('') + '</nav>' +
      '<main class="wrap t-main" id="main">' + inner + '</main></div>';
  }
  function parentShell(inner) {
    return '<header class="topbar p-top"><a class="brand" href="#/p/home">' + ic('star', 24, 'on') + '<span>LernStar</span><em>' + t('role.parent') + '</em></a>' +
      '<div class="tools">' + langSwitch() + '<span class="avatar p" aria-hidden="true">A</span><span class="who-name">' + D.parent.name + '</span></div></header>' +
      '<main class="wrap p-main" id="main">' + inner + '</main>';
  }
  function a11yPanel() {
    const a = S().a11y;
    const tg = (k, label) => '<label class="tog"><input type="checkbox" data-in="a11y" data-k="' + k + '" ' + (a[k] ? 'checked' : '') + '><span>' + label + '</span></label>';
    return '<details class="a11y" data-tag="X9"' + (App._a11yOpen ? ' open' : '') + '><summary aria-label="' + t('a11y.title') + '">' + ic('access', 24) + '<span>' + t('a11y.title') + '</span></summary>' +
      '<div class="a11y-box">' + tg('large', t('a11y.large')) + tg('contrast', t('a11y.contrast')) + tg('dys', t('a11y.dys')) + '</div></details>';
  }

  /* ---------- render ---------- */
  App.render = function () {
    const s = S(); const r = App.route();
    const view = App.views[r] || App.views[''];
    const role = r.split('/')[0];
    const root = document.getElementById('app');
    const html = view(r);
    let out;
    if (role === 's') out = studentShell(html, r);
    else if (role === 't') out = teacherShell(html, r);
    else if (role === 'p') out = parentShell(html);
    else out = html; /* landing and print pages draw their own frame */
    const showBar = role !== 'w';
    root.innerHTML = (showBar ? demoBar(role) : '') + out + (showBar ? a11yPanel() : '');
    const b = document.body;
    b.className = 'role-' + (role || 'home') + ' ' + (s.tags ? 'tags ' : '') + (s.mode === 'picture' && role === 's' ? 'picture ' : '') + (s.a11y.large ? 'a-large ' : '') +
      (s.a11y.contrast ? 'a-contrast ' : '') + (s.a11y.dys ? 'a-dys ' : '');
    document.documentElement.lang = s.lang;
    const sc = document.querySelector('.scrollkeep'); /* unused hook */
    if (App.after[r]) App.after[r]();
    App.save();
    if (App._noScroll) { App._noScroll = false; } else window.scrollTo(0, 0);
  };
  App.rerender = function () { App._noScroll = true; const y = window.scrollY; App.render(); window.scrollTo(0, y); };

  /* ---------- events ---------- */
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-act]');
    if (!el) return;
    const f = App.act[el.dataset.act];
    if (f) { if (el.tagName === 'A') e.preventDefault(); f(el, e); }
  });
  document.addEventListener('change', function (e) {
    const el = e.target.closest('[data-in]');
    if (!el) return;
    const f = App.inp[el.dataset.in];
    if (f) f(el, e);
  });
  window.addEventListener('hashchange', App.render);

  /* core actions */
  App.act.go = (el) => App.go(el.dataset.r);
  App.act.listen = (el) => App.speak(el.dataset.say);
  App.act.lang = (el) => { S().lang = el.dataset.l; App.rerender(); };
  App.act.mode = (el) => { S().mode = el.dataset.m; App.rerender(); };
  App.act.reset = () => { App.reset(); };
  App.act.tags = () => { S().tags = !S().tags; App.rerender(); };
  document.addEventListener('toggle', (e) => { if (e.target.classList && e.target.classList.contains('a11y')) App._a11yOpen = e.target.open; }, true);
  App.act.role = (el) => {
    const r = el.dataset.role;
    App.go(r === 's' ? 's/home' : r === 't' ? 't/dashboard' : 'p/home');
  };
  App.inp.a11y = (el) => { S().a11y[el.dataset.k] = el.checked; App._a11yOpen = true; App.rerender(); };

  window.addEventListener('DOMContentLoaded', App.render);
})();
