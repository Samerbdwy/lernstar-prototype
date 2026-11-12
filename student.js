/* Landing page and the student view (children, Grades 1 to 5). */
(function () {
  'use strict';
  const App = window.App, D = window.DATA, t = App.t, ic = App.icon, esc = App.esc, S = () => App.state;
  const V = App.views, A = App.act, I = App.inp;

  /* ---------- landing ---------- */
  V[''] = function () {
    const card = (r, icon, key) => '<button class="role-card" data-act="go" data-r="' + r + '">' + ic(icon, 44) +
      '<strong>' + t(key + '.t') + '</strong><span>' + t(key + '.d') + '</span><em>' + ic('right', 20) + '</em></button>';
    return '<main class="land wrap"><div class="land-hero"><div class="brand big">' + ic('star', 40, 'on') + '<span>LernStar</span></div>' +
      '<h1>' + t('land.title') + '</h1><p class="lead">' + t('land.sub') + '</p></div>' +
      '<div class="land-cards">' + card('s/login', 'user', 'land.s') + card('t/dashboard', 'pencil', 'land.t') + card('p/home', 'heart', 'land.p') + '</div>' +
      '<p class="note">' + t('land.note') + '</p></main>';
  };

  /* ---------- login (school code, U1.5) ---------- */
  V['s/login'] = function () {
    const s = S();
    return '<main class="wrap s-login"><div class="card login"><h1>' + t('login.title') + '</h1>' +
      '<label class="field big"><span>' + t('login.code') + ' ' + App.listen(t('login.code')) + '</span><input value="4B-YOUSSEF" aria-label="' + t('login.code') + '"></label>' +
      '<label class="field big"><span>' + t('login.pw') + '</span><input type="password" value="stern123" aria-label="' + t('login.pw') + '"></label>' +
      '<div class="field"><span>' + t('login.lang') + '</span><div class="bigseg" data-tag="U2.1">' +
      '<button class="' + (s.lang === 'en' ? 'on' : '') + '" data-act="lang" data-l="en">English</button>' +
      '<button class="' + (s.lang === 'de' ? 'on' : '') + '" data-act="lang" data-l="de">Deutsch</button></div></div>' +
      '<button class="btn xl" data-act="go" data-r="s/home">' + t('login.go') + ic('right', 24) + '</button>' +
      '<p class="hint">' + t('login.hint') + '</p></div></main>';
  };

  /* ---------- home (WF1) ---------- */
  V['s/home'] = function () {
    const s = S();
    const unreadResult = App.visibleNotifs('student').some((n) => !n.read && n.key === 'n.result');
    let banner = '';
    if (s.exam.rescan) {
      banner = '<div class="banner warn">' + ic('camera', 26) + '<div><strong>' + t('s.rescan.t') + '</strong><span>' + t('s.rescan.d') + '</span></div>' +
        '<button class="btn" data-act="rescanDone">' + t('s.rescan.b') + '</button></div>';
    } else if (s.exam.status === 'released' && unreadResult) {
      banner = '<div class="banner good">' + ic('bell', 26) + '<div><strong>' + t('s.new.t') + '</strong><span>' + t('s.new.d') + '</span></div>' +
        App.listen(t('s.new.t') + '. ' + t('s.new.d')) + '<button class="btn dark" data-act="openResult">' + t('s.open') + '</button></div>';
    } else if (s.exam.status !== 'notsent' && s.exam.status !== 'released') {
      banner = '<div class="banner info">' + ic('clock', 26) + '<div><strong>' + t('s.wait.t') + '</strong><span>' + t('s.wait.d') + '</span></div></div>';
    }
    const tile = (r, icon, key, tag) => '<a class="tile" href="#/' + r + '" data-tag="' + tag + '"><span class="tile-ic">' + ic(icon, 56) + '</span>' +
      '<strong>' + t(key) + '</strong><span class="rd">' + t(key + '.d') + '</span></a>';
    const n = 5 + (s.released ? App.starCount() : 0);
    return '<h1 class="hello">' + t('s.hi', { n: D.student.first }) + '</h1>' + banner +
      '<div class="home-grid"><div class="tiles">' +
      '<div class="tilewrap">' + tile('s/send', 'camera', 's.tile.send', 'U1.1') + App.listen(t('s.tile.send')) + '</div>' +
      '<div class="tilewrap">' + tile('s/results', 'star', 's.tile.results', 'S3') + App.listen(t('s.tile.results')) + '</div>' +
      '<div class="tilewrap">' + tile('s/practice', 'target', 's.tile.practice', 'S4') + App.listen(t('s.tile.practice')) + '</div>' +
      '<div class="tilewrap">' + tile('s/progress', 'bars', 's.tile.progress', 'S6') + App.listen(t('s.tile.progress')) + '</div></div>' +
      '<aside class="side-cards"><section class="card" data-tag="U1.4"><h2>' + t('s.stars') + ' ' + App.listen(t('s.stars') + ': ' + n) + '</h2>' +
      '<div class="bignum">' + n + ic('star', 44, 'on') + '</div><p class="rd">' + t('s.keep') + '</p></section>' +
      '<section class="card"><h2>' + t('s.next') + '</h2><p><strong>' + t('s.next.exam') + '</strong><br><span class="muted">' + t('s.next.date') + '</span></p><span class="chip">' + t('s.next.topic') + '</span></section></aside></div>';
  };
  A.openResult = () => { S().notifs.forEach((n) => { if (n.to === 'student') n.read = true; }); App.go('s/results'); };
  A.rescanDone = () => {
    S().exam.rescan = false; S().exam.rescanPending = false;
    App.toast(t('s.rescan.ok'), 'check'); App.rerender();
  };

  /* ---------- send an exam (WF2, 3 steps) ---------- */
  function stepper(step) {
    const p = (n, k) => '<li class="' + (step === n ? 'on' : step > n ? 'done' : '') + '"' + (step === n ? ' data-tag="U1.5"' : '') + '><b>' + (step > n ? ic('check', 16) : n) + '</b><span>' + t(k) + '</span></li>';
    return '<ol class="stepper">' + p(1, 'send.s1') + p(2, 'send.s2') + p(3, 'send.s3') + '</ol>';
  }
  function pageThumb(p, i) {
    return '<div class="page' + (p.blurry ? ' blurry' : '') + '"><div class="paper"><svg viewBox="0 0 80 100" aria-hidden="true"><path d="M10 20c10-6 14 6 24 0s14 6 24 0M10 40c10-6 14 6 24 0s14 6 24 0M10 60c10-6 14 6 24 0s14 6 24 0M10 80c10-6 14 6 24 0" fill="none" stroke="currentColor" stroke-width="2"/></svg></div>' +
      '<span class="pn">' + t('send.page') + ' ' + (i + 1) + '</span>' +
      (p.filename ? '<small class="muted">' + esc(p.filename) + '</small>' : '') +
      (p.blurry ? '<span class="bad">' + t('send.blurry') + '</span><button class="btn sm" data-act="retake" data-i="' + i + '">' + ic('camera', 16) + t('send.retake') + '</button>' : '<span class="ok">' + ic('check', 14) + t('send.clear') + '</span>') + '</div>';
  }
  V['s/send'] = function () {
    const s = S();
    if (s.exam.status !== 'notsent') {
      return '<div class="card center"><div class="bigcheck">' + ic('check', 56) + '</div><h1>' + t('send.already.t') + '</h1><p>' + t('send.already.d') + '</p>' +
        '<div class="row"><a class="btn" href="#/s/results">' + t('s.tile.results') + '</a><a class="btn ghost" href="#/s/home">' + t('back.home') + '</a></div></div>';
    }
    const step = s.sendStep; let body = '';
    if (step === 1) {
      const ex = (id, key, lang) => '<button class="choice' + (s.examChoice === id ? ' on' : '') + '" data-act="pickExam" data-id="' + id + '" data-lang="' + lang + '"' +
        (id === 'fractions' ? '' : ' disabled title="' + esc(t('send.preview')) + '"') + '>' + ic('file', 40) +
        '<strong>' + t(key) + '</strong><span>' + (lang === 'DE' ? 'Deutsch' : 'English') +
        (id !== 'fractions' ? ' · ' + t('send.preview') : '') + '</span></button>';
      body = '<div class="card"><h2>' + t('send.pick') + ' ' + App.listen(t('send.pick')) + '</h2><div class="choices">' + ex('fractions', 'ex.fractions', 'DE') + ex('plants', 'ex.plants', 'EN') + '</div>' +
        '<div class="field"><span>' + t('send.examlang') + '</span><div class="bigseg" data-tag="U2.2"><button class="' + (s.examLang === 'EN' ? 'on' : '') + '" data-act="examLang" data-v="EN">English</button>' +
        '<button class="' + (s.examLang === 'DE' ? 'on' : '') + '" data-act="examLang" data-v="DE">Deutsch</button></div></div>' +
        '<div class="row end"><button class="btn xl" data-act="step" data-n="2">' + t('send.next') + ic('right', 24) + '</button></div></div>';
    } else if (step === 2) {
      const pages = s.exam.pages; const last = pages[pages.length - 1];
      const hint = last && last.blurry ? t('cam.hold') : pages.length % 2 === 0 ? t('cam.ok') : t('cam.closer');
      const anyBlur = pages.some((p) => p.blurry);
      body = '<div class="two"><div class="card"><div class="cam" data-tag="U1.6"><i class="c tl"></i><i class="c tr"></i><i class="c bl"></i><i class="c br"></i>' +
        '<p>' + t('cam.place') + '</p><span class="camhint">' + hint + '</span></div>' +
        '<div class="row"><button class="btn xl" data-act="shot">' + ic('camera', 24) + t('send.take') + '</button><label class="btn ghost xl">' + ic('upload', 24) + t('send.upload') + '<input type="file" accept="image/*,application/pdf" multiple hidden data-in="studentFile"></label></div><p class="muted small">' + t('send.mock') + '</p></div>' +
        '<div class="card"><h2>' + t('send.mypages') + ' <small>' + t('send.count', { n: pages.length }) + '</small> ' + App.listen(t('send.count', { n: pages.length })) + '</h2>' +
        '<div class="pages">' + pages.map(pageThumb).join('') + '<div class="page add"><span>' + ic('plus', 28) + '</span><em>' + t('send.add') + '</em></div></div>' +
        (anyBlur ? '<p class="warnline">' + ic('flag', 16) + t('send.fixblur') + '</p>' : '<p class="muted">' + t('send.tip') + '</p>') +
        '<div class="row between"><button class="btn ghost" data-act="step" data-n="1">' + ic('left', 20) + t('back') + '</button>' +
        '<button class="btn xl" data-act="step" data-n="3" ' + (pages.length < 1 || anyBlur ? 'disabled' : '') + '>' + t('send.next') + ic('right', 24) + '</button></div></div></div>';
    } else {
      body = '<div class="card center"><h2>' + t('send.ready') + '</h2><div class="sum"><div>' + ic('file', 32) + '<strong>' + t(s.examChoice === 'fractions' ? 'ex.fractions' : 'ex.plants') + '</strong></div>' +
        '<div>' + ic('globe', 32) + '<strong>' + (s.examLang === 'DE' ? 'Deutsch' : 'English') + '</strong></div><div>' + ic('camera', 32) + '<strong>' + t('send.count', { n: s.exam.pages.length }) + '</strong></div></div>' +
        '<p class="muted">' + t('send.after') + '</p><div class="row between"><button class="btn ghost" data-act="step" data-n="2">' + ic('left', 20) + t('back') + '</button>' +
        '<button class="btn xl go" data-act="send">' + t('send.go') + ic('right', 24) + '</button></div></div>';
    }
    return '<h1>' + t('s.tile.send') + '</h1>' + stepper(step) + body;
  };
  A.pickExam = (el) => {
    if (el.dataset.id !== 'fractions') { App.toast(t('send.preview'), 'file'); return; }
    S().examChoice = el.dataset.id; S().examLang = el.dataset.lang; App.rerender();
  };
  A.examLang = (el) => { S().examLang = el.dataset.v; App.rerender(); };
  A.step = (el) => { S().sendStep = +el.dataset.n; App.rerender(); };
  A.shot = (el) => {
    const s = S(); const n = s.exam.pages.length;
    if (n >= 6) return;
    s.exam.pages.push({ id: ++s.shots, blurry: n === 1 && !s.exam.retook });
    App.rerender();
  };
  I.studentFile = (el) => {
    const s = S(), files = Array.from(el.files || []).slice(0, Math.max(0, 6 - s.exam.pages.length));
    files.forEach((f) => s.exam.pages.push({ id: ++s.shots, blurry: false, filename: f.name }));
    if (files.length) App.toast(t('send.uploaded', { n: files.length }), 'check');
    App.rerender();
  };
  A.retake = (el) => { const p = S().exam.pages[+el.dataset.i]; p.blurry = false; S().exam.retook = true; App.toast(t('send.retaken'), 'check'); App.rerender(); };
  A.send = () => {
    const s = S();
    s.exam.status = 'sent';
    App.notify('student', 'n.sent'); App.notify('teacher', 'n.newexam');
    App.go('s/sent');
  };
  V['s/sent'] = function () {
    return '<div class="card center"><div class="bigcheck">' + ic('check', 64) + '</div><h1>' + t('sent.t') + '</h1><p class="lead">' + t('sent.d') + '</p>' + App.listen(t('sent.t') + '. ' + t('sent.d')) +
      '<div class="row"><a class="btn xl" href="#/s/home">' + t('back.home') + '</a><a class="btn ghost xl" href="#/t/dashboard" data-demo="1">' + t('sent.teacher') + '</a></div></div>';
  };

  /* ---------- results (WF3): only after the teacher has released ---------- */
  V['s/results'] = function () {
    const s = S();
    if (s.exam.status === 'notsent') {
      return '<div class="card center"><h1>' + t('res.none.t') + '</h1><p class="lead">' + t('res.none.d') + '</p><a class="btn xl" href="#/s/send">' + t('s.tile.send') + '</a></div>';
    }
    if (!s.released) {
      const stage = s.exam.status === 'sent' ? 1 : 2;
      const st = (n, k) => '<li class="' + (n < stage ? 'done' : n === stage ? 'on' : '') + '"><b>' + (n < stage ? ic('check', 16) : n) + '</b><span>' + t(k) + '</span></li>';
      return '<div class="card center" data-tag="S3"><div class="bigclock">' + ic('clock', 56) + '</div><h1>' + t('s.wait.t') + '</h1><p class="lead">' + t('res.wait.d') + '</p>' +
        App.listen(t('s.wait.t') + '. ' + t('res.wait.d')) + '<ol class="stepper small">' + st(1, 'res.st1') + st(2, 'res.st2') + st(3, 'res.st3') + '</ol></div>';
    }
    const r = s.review; const total = App.total(); const stars = App.starCount();
    const msgEn = r.fbEn || t('fb.en.default'); const msgDe = r.fbDe || t('fb.de.default');
    const msg = r.fbTab === 'both' ? '<p>' + esc(msgEn) + '</p><p class="de">' + esc(msgDe) + '</p>' : '<p>' + esc(r.fbTab === 'de' ? msgDe : msgEn) + '</p>';
    const gap = r.gap === 'confirmed'
      ? '<section class="card pr" data-tag="U1.3"><h2>' + t('res.practise') + ' ' + App.listen(t('res.practise') + ': ' + App.gapName()) + '</h2><div class="pills"><span class="pill dark">' + esc(App.gapName()) + '</span><span class="pill">' + t('topic.word') + '</span></div><p class="muted">' + t('res.good') + '</p></section>'
      : '<section class="card pr"><h2>' + t('res.practise') + '</h2><p class="muted">' + t('res.nogap') + '</p></section>';
    const help = r.flag === 'confirmed'
      ? '<section class="card helpcard" data-tag="S4"><span class="heartbig">' + ic('heart', 40) + '</span><div><h2>' + t('res.help.t') + '</h2><p>' + t('res.help.d') + '</p></div></section>' : '';
    const prac = r.gap === 'confirmed'
      ? '<section class="card"><h2>' + t('res.prac.t') + '</h2><p class="muted">' + t('res.prac.d') + '</p><a class="btn dark wide" href="#/s/practice">' + t('res.prac.b') + '</a></section>' : '';
    return '<h1>' + t('ex.fractions') + ' ' + App.listen(t('ex.fractions') + '. ' + t('res.score', { n: total, m: D.exam.max })) + '</h1><p class="muted confirmed">' + ic('check', 16) + t('res.confirmed') + '</p>' +
      '<div class="res-grid"><section class="card score" data-tag="S3"><div class="big">' + t('res.score', { n: total, m: D.exam.max }) + '</div>' + App.stars(stars, 3) + '<p>' + (stars >= 2 ? t('res.nice') : t('res.keepgoing')) + '</p></section>' +
      gap + '<section class="card msg" data-tag="U2.4"><h2>' + t('res.msg', { n: D.teacher.name }) + ' ' + App.listen(msgEn) + '</h2><div class="bubble">' + msg + '</div><small class="muted">' + t('res.today') + '</small></section>' +
      help + prac + '</div>';
  };

  /* ---------- practice (Q4.1/4.2) ---------- */
  function fracBar(n, d) {
    let h = '<svg class="frac" viewBox="0 0 220 40" role="img" aria-label="' + n + '/' + d + '">';
    const w = 220 / d;
    for (let i = 0; i < d; i++) h += '<rect x="' + (i * w + 1) + '" y="3" width="' + (w - 2) + '" height="34" rx="4" fill="' + (i < n ? 'var(--teal)' : 'var(--paper)') + '" stroke="var(--teal)" stroke-width="2"/>';
    return h + '</svg>';
  }
  const PQ = [{ a: [1, 2], b: [1, 4], ok: 'a' }, { a: [3, 10], b: [1, 2], ok: 'b' }, { a: [2, 5], b: [1, 2], ok: 'b' }];
  V['s/practice'] = function () {
    const s = S();
    if (!s.released || s.review.gap !== 'confirmed') {
      return '<div class="card center"><h1>' + t('s.tile.practice') + '</h1><p class="lead">' + t('prac.none') + '</p><a class="btn xl" href="#/s/home">' + t('back.home') + '</a></div>';
    }
    const ans = s.practice.answers; const answered = Object.keys(ans).length;
    const q = PQ.map((p, i) => {
      const a = ans[i]; const good = a === p.ok;
      const btn = (v, label) => '<button class="btn opt' + (a === v ? (good ? ' good' : ' try') : '') + '" data-act="pAns" data-i="' + i + '" data-v="' + v + '">' + label + '</button>';
      return '<section class="card pq"><h2>' + t('prac.q', { n: i + 1 }) + ' ' + App.listen(t('prac.which')) + '</h2><p>' + t('prac.which') + '</p>' +
        '<div class="fracs"><div>' + fracBar(p.a[0], p.a[1]) + '<strong>' + p.a[0] + '/' + p.a[1] + '</strong></div><div>' + fracBar(p.b[0], p.b[1]) + '<strong>' + p.b[0] + '/' + p.b[1] + '</strong></div></div>' +
        '<div class="row">' + btn('a', t('prac.left')) + btn('same', t('prac.same')) + btn('b', t('prac.right')) + '</div>' +
        (a ? '<p class="fb ' + (good ? 'ok' : 'try') + '">' + (good ? ic('check', 18) + t('prac.yes') : t('prac.try')) + '</p>' : '') + '</section>';
    }).filter((_, i) => i === (s.practice.index || 0)).join('');
    const at = s.practice.index;
    const nav = '<div class="row between"><button class="btn ghost" data-act="practicePage" data-n="' + (at - 1) + '" ' + (at === 0 ? 'disabled' : '') + '>' + ic('left', 18) + t('back') + '</button>' +
      '<span class="muted">' + t('prac.step', { n: at + 1, m: PQ.length }) + '</span>' +
      '<button class="btn ghost" data-act="practicePage" data-n="' + (at + 1) + '" ' + (at === PQ.length - 1 || !ans[at] ? 'disabled' : '') + '>' + t('send.next') + ic('right', 18) + '</button></div>';
    return '<h1>' + t('prac.title') + '</h1><p class="muted">' + t('prac.sub') + '</p><div class="prac-list">' + q + '</div>' + nav +
      '<div class="row between"><a class="btn ghost" href="#/w/worksheet" target="_blank" rel="noopener" data-tag="X7">' + ic('print', 20) + t('prac.print') + '</a>' +
      (s.practice.done ? '<span class="pill dark">' + ic('check', 16) + t('prac.done') + '</span>' : '<button class="btn xl" data-act="pDone" ' + (answered < 3 ? 'disabled' : '') + '>' + ic('check', 24) + t('prac.mark') + '</button>') + '</div>';
  };
  A.practicePage = (el) => {
    S().practice.index = Math.max(0, Math.min(PQ.length - 1, +el.dataset.n));
    App.rerender();
  };
  A.pAns = (el) => { S().practice.answers[+el.dataset.i] = el.dataset.v; App.rerender(); };
  A.pDone = () => {
    const answers = S().practice.answers;
    if (!PQ.every((p, i) => answers[i] === p.ok)) { App.toast(t('prac.retry'), 'target'); return; }
    if (!S().practice.done) { S().practice.done = true; S().practice.streak += 1; }
    App.toast(t('prac.well'), 'star'); App.rerender();
  };

  /* ---------- progress (WF4): confirmed results only, points not percentages ---------- */
  App.progressChart = function (subject, w, h, includeCurrent = true) {
    const s = S(); const pts = D.history[subject].slice();
    if (subject === 'math' && s.released && includeCurrent) pts.push({ d: D.exam.date, s: App.total() });
    const W = w || 560, H = h || 260, L = 44, R = 20, T = 24, B = 40, max = 11;
    const x = (i) => L + (pts.length === 1 ? (W - L - R) / 2 : (i * (W - L - R)) / (pts.length - 1));
    const y = (v) => T + (H - T - B) * (1 - v / max);
    let g = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + t('prog.chart') + '">';
    [0, 3, 6, 9, 11].forEach((v) => { g += '<line x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="var(--line)" stroke-dasharray="4 4"/><text x="' + (L - 8) + '" y="' + (y(v) + 4) + '" text-anchor="end" class="ax">' + v + '</text>'; });
    g += '<polyline fill="none" stroke="var(--teal)" stroke-width="3" points="' + pts.map((p, i) => x(i) + ',' + y(p.s)).join(' ') + '"/>';
    pts.forEach((p, i) => { g += '<circle cx="' + x(i) + '" cy="' + y(p.s) + '" r="6" fill="var(--bg)" stroke="var(--teal)" stroke-width="3"/><text x="' + x(i) + '" y="' + (y(p.s) - 12) + '" text-anchor="middle" class="pv">' + p.s + '</text><text x="' + x(i) + '" y="' + (H - 14) + '" text-anchor="middle" class="ax">' + p.d + '</text>'; });
    return g + '</svg>';
  };
  V['s/progress'] = function () {
    const s = S(); const sub = s.progressSubject;
    const topic = (k, n, w) => '<div class="topic"><span>' + t(k) + '</span><span>' + App.stars(n, 3) + '</span><em>' + t(w) + '</em></div>';
    return '<h1>' + t('s.tile.progress') + ' ' + App.listen(t('s.tile.progress')) + '</h1>' +
      '<div class="tabs"><button class="' + (sub === 'math' ? 'on' : '') + '" data-act="subject" data-v="math">' + t('subj.math') + '</button><button class="' + (sub === 'science' ? 'on' : '') + '" data-act="subject" data-v="science">' + t('subj.science') + '</button></div>' +
      '<div class="two"><section class="card" data-tag="S6"><h2>' + t('prog.scores') + '</h2><p class="muted">' + t('prog.axis') + '</p>' + App.progressChart(sub) + '</section>' +
      '<section class="card" data-tag="U1.4"><h2>' + t('prog.topics') + '</h2>' + topic('topic.mult', 3, 'w.great') + topic('topic.frac', 1, 'w.keep') + topic('topic.word', 2, 'w.almost') + '</section></div>' +
      '<section class="card" data-tag="U1.4"><h2>' + t('prog.badges') + '</h2><div class="badges"><span class="badge-i">' + ic('star', 28, 'on') + t('bd.first') + '</span>' +
      '<span class="badge-i">' + ic('star', 28, 'on') + t('bd.exams', { n: 3 + (s.released ? 1 : 0) }) + '</span><span class="badge-i">' + ic('star', 28, 'on') + t('bd.streak', { n: s.practice.streak }) + '</span></div>' +
      '<p class="muted">' + t('prog.noRank') + '</p></section>';
  };
  A.subject = (el) => { S().progressSubject = el.dataset.v; App.rerender(); };

  /* ---------- notifications ---------- */
  V['s/notifs'] = function () {
    const s = S(); const list = App.visibleNotifs('student');
    const html = '<h1>' + t('notif.title') + '</h1>' + (list.length ? '<ul class="notifs">' + list.map((n) =>
      '<li class="' + (n.read ? '' : 'new') + '">' + ic(n.key === 'n.result' ? 'star' : n.key === 'n.rescan' ? 'camera' : 'bell', 26) + '<div><strong>' + t(n.key) + '</strong><span class="muted">' + t('res.today') + ' ' + n.time + '</span></div>' +
      (n.key === 'n.result' ? '<a class="btn sm dark" href="#/s/results">' + t('s.open') + '</a>' : '') + '</li>').join('') + '</ul>' : '<div class="card center"><p class="lead">' + t('notif.none') + '</p></div>') +
      '<p class="muted quiet" data-tag="X16">' + ic('clock', 16) + t('notif.quiet', { a: s.settings.quietFrom, b: s.settings.quietTo }) + '</p>';
    list.forEach((n) => (n.read = true));
    return html;
  };
})();
