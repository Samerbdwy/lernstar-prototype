/* Teacher view: dashboard, queue, verify text, confirm grades, gap/red flag/feedback, class gaps, settings. */
(function () {
  'use strict';
  const App = window.App, D = window.DATA, t = App.t, ic = App.icon, esc = App.esc, S = () => App.state;
  const V = App.views, A = App.act, I = App.inp;

  const pickAdd = (o) => App.pick(o);
  function statusPill(st) { return '<span class="st ' + st + '">' + t('st.' + st) + '</span>'; }

  /* ---------- sample loader (demo shortcut so the teacher can start without the student view) ---------- */
  function emptyNotice() {
    return '<div class="empty card" data-demo="1"><div>' + ic('upload', 32) + '<strong>' + t('t.empty.t') + '</strong><span class="muted">' + t('t.empty.d') + '</span></div>' +
      '<button class="btn" data-act="loadSample">' + t('t.empty.b') + '</button></div>';
  }
  A.loadSample = () => {
    const s = S(); if (s.exam.status !== 'notsent') return;
    s.exam.status = 'sent'; s.exam.pages = [{ id: 1, blurry: false }, { id: 2, blurry: false }, { id: 3, blurry: false }];
    s.examLang = 'DE'; s.examChoice = 'fractions';
    App.notify('student', 'n.sent'); App.notify('teacher', 'n.newexam');
    App.toast(t('t.empty.ok'), 'check'); App.rerender();
  };

  /* ---------- queue table ---------- */
  function queueTable(rows) {
    if (!rows.length) return '<p class="muted pad">' + t('q.none') + '</p>';
    return '<div class="tablewrap"><table class="q"><thead><tr><th>' + t('q.student') + '</th><th>' + t('q.exam') + '</th><th data-tag="U2.2">' + t('q.lang') + '</th><th data-tag="T1">' + t('q.status') + '</th><th>' + t('q.flag') + '</th></tr></thead><tbody>' +
      rows.map((r) => '<tr class="' + (r.live ? 'live' : '') + '" data-act="openRow" data-id="' + r.id + '" tabindex="0"><td><strong>' + esc(r.name) + '</strong></td><td>' + esc(pickAdd(r.exam)) + '</td><td><span class="lg">' + r.lang + '</span></td><td>' + statusPill(r.status) + '</td><td>' + (r.flag ? '<span class="flagdot" title="' + t('q.flag') + '">!</span>' : '') + '</td></tr>').join('') + '</tbody></table></div>';
  }
  A.openRow = (el) => {
    const id = el.dataset.id; const s = S();
    if (id !== 'youssef') { App.toast(t('demo.sample'), 'file'); return; }
    if (s.exam.status === 'sent') App.go('t/verify');
    else if (s.exam.status === 'verified') App.go(s.grade.confirmed ? 't/review' : 't/confirm');
    else App.go('t/review');
  };
  const cnt = (rows, st) => rows.filter((r) => r.status === st).length;

  /* ---------- dashboard (WF5) ---------- */
  V['t/dashboard'] = function () {
    const s = S(); const all = App.rows(); const lf = s.dashLang;
    const rows = all.filter((r) => lf === 'all' || r.lang === lf);
    const card = (n, k, f) => '<a class="stat" href="#/t/queue" data-act="qfilter" data-f="' + f + '"><b>' + n + '</b><span>' + t(k) + '</span></a>';
    const flags = rows.filter((r) => r.flag).length;
    const maxShare = 28;
    const extra = s.review.gap === 'confirmed' ? 1 : 0;
    const tp = D.topics.map((x, i) => { const n = x.share + (i === 0 ? extra : 0); return '<div class="bar"><span>' + esc(pickAdd(x.name)) + '</span><i style="--w:' + Math.round((n / maxShare) * 100 * 3.2) + '%"></i><em>' + n + '</em></div>'; }).join('');
    return '<div class="titlebar"><div><h1>' + t('t.dash', { c: D.teacher.class }) + '</h1><div class="chips" data-tag="U2.2"><span class="muted">' + t('q.lang') + '</span>' +
      ['all', 'EN', 'DE'].map((l) => '<button class="chip ' + (lf === l ? 'on' : '') + '" data-act="dashLang" data-v="' + l + '">' + (l === 'all' ? t('f.all') : l) + '</button>').join('') + '</div></div>' +
      '<a class="btn ghost" href="#/t/batch">' + ic('upload', 20) + t('nav.batch') + '</a></div>' +
      (s.exam.status === 'notsent' ? emptyNotice() : '') +
      '<div class="stats">' + card(cnt(rows, 'verify'), 'st.verify', 'verify') + card(cnt(rows, 'confirm'), 'st.confirm', 'confirm') + card(flags, 'q.flags', 'flag') + card(cnt(rows, 'done'), 'st.done', 'done') + '</div>' +
      '<div class="dash-grid"><section class="card">' + queueTable(rows) + '</section>' +
      '<aside class="card" data-tag="X4"><h2>' + t('t.weak') + '</h2>' + tp + '<p class="muted small">' + t('t.weak.d') + '</p><a class="btn ghost wide" href="#/t/gaps">' + t('t.weak.b') + '</a></aside></div>';
  };
  A.dashLang = (el) => { S().dashLang = el.dataset.v; App.rerender(); };
  A.qfilter = (el) => { const q = S().qfilter; q.status = el.dataset.f === 'flag' ? 'all' : el.dataset.f; q.flagged = el.dataset.f === 'flag'; q.lang = 'all'; };

  /* ---------- queue page ---------- */
  V['t/queue'] = function () {
    const q = S().qfilter;
    let rows = App.rows();
    if (q.status !== 'all') rows = rows.filter((r) => r.status === q.status);
    if (q.lang !== 'all') rows = rows.filter((r) => r.lang === q.lang);
    if (q.flagged) rows = rows.filter((r) => r.flag);
    const chip = (grp, v, label) => '<button class="chip ' + (q[grp] === v ? 'on' : '') + '" data-act="qset" data-g="' + grp + '" data-v="' + v + '">' + label + '</button>';
    return '<h1>' + t('nav.queue') + '</h1>' + (S().exam.status === 'notsent' ? emptyNotice() : '') +
      '<div class="filters card"><div class="chips"><span class="muted">' + t('q.status') + '</span>' + chip('status', 'all', t('f.all')) + chip('status', 'verify', t('st.verify')) + chip('status', 'confirm', t('st.confirm')) + chip('status', 'done', t('st.done')) + '</div>' +
      '<div class="chips" data-tag="U2.2"><span class="muted">' + t('q.lang') + '</span>' + chip('lang', 'all', t('f.all')) + chip('lang', 'EN', 'EN') + chip('lang', 'DE', 'DE') + '</div>' +
      '<label class="tog"><input type="checkbox" data-in="qflag" ' + (q.flagged ? 'checked' : '') + '><span>' + t('f.flagged') + '</span></label></div><section class="card">' + queueTable(rows) + '</section>';
  };
  A.qset = (el) => { S().qfilter[el.dataset.g] = el.dataset.v; App.rerender(); };
  I.qflag = (el) => { S().qfilter.flagged = el.checked; App.rerender(); };

  /* ---------- verify extracted text (WF6) ---------- */
  function flagKeys() {
    const keys = [];
    D.exam.questions.forEach((Q, qi) => {
      Object.keys(Q.conf).forEach((i) => keys.push({ k: qi + ':' + i, q: qi, i: +i }));
      if (Q.decimal) keys.push({ k: qi + ':dec', q: qi, i: null });
    });
    return keys;
  }
  const left = () => flagKeys().filter((f) => !S().verify.resolved[f.k]);
  const tokens = (qi) => S().verify.text[qi] || D.exam.questions[qi].ocr.split(' ');
  function stamp() { S().verify.saved = App.timeLabel(); }

  V['t/verify'] = function () {
    const s = S(), v = s.verify;
    if (s.exam.status === 'notsent') return '<h1>' + t('vf.title') + '</h1>' + emptyNotice();
    if (s.exam.status !== 'sent') return '<div class="card center"><h1>' + t('vf.done.t') + '</h1><p>' + t('vf.done.d') + '</p><a class="btn" href="#/t/' + (s.grade.confirmed ? 'review' : 'confirm') + '">' + t('vf.done.b') + '</a></div>';
    const qi = v.q, Q = D.exam.questions[qi], toks = tokens(qi), truth = Q.truth.split(' ');
    const sel = v.sel;
    /* original scan (handwriting font) */
    const scan = '<div class="scan"><p class="printed">' + t('vf.q', { n: qi + 1 }) + ' ' + esc(pickAdd(Q.q)) + '</p><p class="hand">' +
      truth.map((w, i) => '<span class="sw' + (sel === i ? ' hl' : '') + (Q.conf[i] && !v.resolved[qi + ':' + i] ? ' unsure' : '') + '">' + esc(w) + '</span>').join(' ') + '</p>' +
      '<svg class="lines" viewBox="0 0 300 60" aria-hidden="true"><path d="M0 20h300M0 40h300M0 58h300" stroke="currentColor" stroke-width="1"/></svg></div>';
    /* extracted text: tap a word to correct it */
    const text = '<p class="ocr">' + toks.map((w, i) => {
      const low = Q.conf[i] && !v.resolved[qi + ':' + i];
      return '<button class="w' + (low ? ' low' : '') + (sel === i ? ' sel' : '') + (w !== Q.ocr.split(' ')[i] ? ' fixed' : '') + '" data-act="selWord" data-i="' + i + '">' + esc(w) + '</button>';
    }).join(' ') + '</p>';
    const lowList = Object.keys(Q.conf).filter((i) => !v.resolved[qi + ':' + i]).map((i) => '<p class="lowline">' + t('vf.low') + ' “' + esc(toks[i]) + '” ' + Q.conf[i] + '%</p>').join('');
    const editor = sel !== null && sel !== undefined ? '<div class="wordedit" data-tag="T2"><label>' + t('vf.fix') + '<input id="wordIn" value="' + esc(toks[sel]) + '" autocomplete="off" spellcheck="false"></label>' +
      '<div class="keys" data-tag="U2.3">' + ['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü', ','].map((c) => '<button class="key" data-act="key" data-c="' + c + '" aria-label="' + c + '">' + c + '</button>').join('') + '</div>' +
      '<div class="row"><button class="btn" data-act="saveWord">' + ic('check', 18) + t('vf.save') + '</button><button class="btn ghost" data-act="keepWord">' + t('vf.right') + '</button><button class="btn ghost" data-act="cancelWord">' + t('cancel') + '</button></div></div>' : '';
    const dec = Q.decimal ? (v.resolved[qi + ':dec'] ? '<p class="decok">' + ic('check', 16) + t('vf.dec.ok') + '</p>' :
      '<div class="decimal" data-tag="U2.3"><strong>' + t('vf.dec.t') + '</strong><span>' + t('vf.dec.d') + '</span><button class="btn sm" data-act="decOk">' + t('vf.dec.b') + '</button></div>') : '';
    const lang = '<label class="langtag" data-tag="U2.2">' + t('vf.langtag') + '<select data-in="ansLang" aria-label="' + t('vf.langtag') + '"><option ' + (s.examLang === 'DE' ? 'selected' : '') + ' value="DE">Deutsch</option><option value="EN" ' + (s.examLang === 'EN' ? 'selected' : '') + '>English</option><option value="MIX">' + t('vf.mix') + '</option></select></label>';
    const left_ = left();
    const chips = D.exam.questions.map((x, i) => {
      const pend = flagKeys().some((f) => f.q === i && !v.resolved[f.k]);
      return '<button class="qchip ' + (i === qi ? 'on' : '') + (pend ? ' pend' : '') + '" data-act="setQ" data-i="' + i + '" aria-label="' + t('vf.q', { n: i + 1 }) + '">' + (i + 1) + '</button>';
    }).join('');
    const modal = v.rescanOpen ? '<div class="modal"><div class="dlg" role="dialog" aria-modal="true"><h2>' + t('rescan.t') + '</h2><p class="muted">' + t('rescan.d') + '</p>' +
      '<label class="field"><span>' + t('rescan.note') + '</span><textarea id="rescanNote" rows="3">' + esc(S().exam.rescanNote || t('rescan.default')) + '</textarea></label>' +
      '<div class="row end"><button class="btn ghost" data-act="rescanClose">' + t('cancel') + '</button><button class="btn" data-act="rescanSend">' + ic('right', 18) + t('rescan.send') + '</button></div></div></div>' : '';
    return '<nav class="crumbs">' + t('nav.queue') + ' › ' + D.student.name + ' › ' + esc(pickAdd(D.exam.title)) + ' (' + (s.examLang === 'DE' ? 'Deutsch' : 'English') + ') › ' + t('vf.q', { n: qi + 1 }) + ' ' + t('vf.of', { n: D.exam.questions.length }) + '</nav>' +
      '<div class="titlebar"><h1>' + t('vf.title') + '</h1><div class="qchips">' + chips + '</div></div>' +
      '<div class="verify"><section class="card"><div class="cardhead"><h2>' + t('vf.scan') + '</h2><span class="row"><button class="btn sm ghost" data-act="rescanOpen" data-tag="X13">' + ic('camera', 16) + t('vf.rescan') + '</button></span></div>' + scan +
      (s.exam.rescan ? '<p class="decok">' + ic('check', 16) + t('vf.rescan.sent') + '</p>' : '') + '</section>' +
      '<section class="card"><div class="cardhead"><h2>' + t('vf.text') + '</h2>' + lang + '</div><p class="muted small">' + t('vf.tapword') + '</p>' + text + lowList + editor + dec + '</section></div>' +
      '<div class="footbar card"><div class="row"><span class="muted">' + t('vf.left', { n: left_.length }) + '</span><button class="btn sm ghost" data-act="nextUncertain" data-tag="X2" ' + (left_.length ? '' : 'disabled') + '>' + t('vf.next') + ic('right', 16) + '</button>' +
      '<button class="btn sm ghost" data-act="undo" data-tag="X10" ' + (v.undo.length ? '' : 'disabled') + '>' + ic('undo', 16) + t('undo') + '</button><span class="muted saved" data-tag="X10">' + (v.saved ? t('vf.saved', { n: v.saved }) : t('vf.autosave')) + '</span></div>' +
      '<div class="row"><button class="btn ghost" data-act="prevQ" ' + (qi === 0 ? 'disabled' : '') + '>' + ic('left', 18) + '</button><button class="btn ghost" data-act="nextQ" ' + (qi === D.exam.questions.length - 1 ? 'disabled' : '') + '>' + ic('right', 18) + '</button>' +
      '<button class="btn big" data-act="verified">' + ic('check', 20) + t('vf.send') + '</button></div></div>' + modal;
  };
  App.after['t/verify'] = function () { const i = document.getElementById('wordIn'); if (i) { i.focus(); i.select(); } };
  A.setQ = (el) => { S().verify.q = +el.dataset.i; S().verify.sel = null; App.rerender(); };
  A.prevQ = () => { const v = S().verify; if (v.q > 0) { v.q--; v.sel = null; App.rerender(); } };
  A.nextQ = () => { const v = S().verify; if (v.q < D.exam.questions.length - 1) { v.q++; v.sel = null; App.rerender(); } };
  A.selWord = (el) => { S().verify.sel = +el.dataset.i; App.rerender(); };
  A.cancelWord = () => { S().verify.sel = null; App.rerender(); };
  A.key = (el) => { const i = document.getElementById('wordIn'); if (!i) return; const a = i.selectionStart || 0, b = i.selectionEnd || 0; i.value = i.value.slice(0, a) + el.dataset.c + i.value.slice(b); i.focus(); i.setSelectionRange(a + 1, a + 1); };
  A.saveWord = () => {
    const v = S().verify, i = document.getElementById('wordIn'); if (!i) return;
    const qi = v.q, toks = tokens(qi).slice(), old = toks[v.sel], val = i.value.trim() || old;
    if (val !== old) { v.undo.push({ q: qi, i: v.sel, old: old, key: qi + ':' + v.sel, wasRes: !!v.resolved[qi + ':' + v.sel] }); toks[v.sel] = val; v.text[qi] = toks; }
    if (D.exam.questions[qi].conf[v.sel] !== undefined) v.resolved[qi + ':' + v.sel] = true;
    v.sel = null; stamp(); App.rerender();
  };
  A.keepWord = () => { const v = S().verify; if (D.exam.questions[v.q].conf[v.sel] !== undefined) v.resolved[v.q + ':' + v.sel] = true; v.sel = null; stamp(); App.rerender(); };
  A.undo = () => {
    const v = S().verify, u = v.undo.pop(); if (!u) return;
    const toks = tokens(u.q).slice(); toks[u.i] = u.old; v.text[u.q] = toks;
    if (!u.wasRes) delete v.resolved[u.key];
    v.q = u.q; v.sel = null; stamp(); App.rerender();
  };
  A.decOk = () => { const v = S().verify; v.resolved[v.q + ':dec'] = true; stamp(); App.rerender(); };
  A.nextUncertain = () => {
    const v = S().verify, l = left(); if (!l.length) return;
    const after = l.find((f) => f.q > v.q || (f.q === v.q && f.i !== null && f.i > (v.sel === null ? -1 : v.sel)));
    const f = after || l[0]; v.q = f.q; v.sel = f.i; App.rerender();
  };
  A.verified = () => {
    const s = S(), l = left();
    if (l.length) { App.toast(t('vf.stillleft', { n: l.length }), 'flag'); A.nextUncertain(); return; }
    s.exam.status = 'verified'; App.steps(); App.notify('teacher', 'n.graded'); App.toast(t('vf.sent'), 'check'); App.go('t/confirm');
  };
  I.ansLang = () => {};
  A.rescanOpen = () => { S().verify.rescanOpen = true; App.rerender(); };
  A.rescanClose = () => { S().verify.rescanOpen = false; App.rerender(); };
  A.rescanSend = () => {
    const s = S(), n = document.getElementById('rescanNote');
    s.exam.rescanNote = n ? n.value : ''; s.exam.rescan = true; s.verify.rescanOpen = false;
    App.notify('student', 'n.rescan'); App.toast(t('rescan.ok'), 'check'); App.rerender();
  };

  /* ---------- confirm AI grades (WF7) ---------- */
  V['t/confirm'] = function () {
    const s = S();
    if (s.exam.status === 'notsent') return '<h1>' + t('cf.title') + '</h1>' + emptyNotice();
    if (s.exam.status === 'sent') return '<div class="card center"><h1>' + t('cf.first.t') + '</h1><p>' + t('cf.first.d') + '</p><a class="btn" href="#/t/verify">' + t('nav.verify') + '</a></div>';
    const steps = App.steps(); const total = App.total(), ai = App.aiTotal(), max = D.exam.max;
    const changed = D.exam.questions.filter((q, i) => App.qScore(i) !== App.aiScore(i)).length;
    const rows = D.exam.questions.map((Q, i) => {
      const sc = App.qScore(i), mx = App.qMax(i), diff = sc !== App.aiScore(i);
      return '<tr class="' + (diff ? 'chg' : '') + '"><td>' + (i + 1) + '</td><td class="ans">' + esc(tokens(i).join(' ')) + '</td><td>' + App.aiScore(i) + ' / ' + mx + '</td><td class="why">' + esc(pickAdd(Q.reason)) + '</td>' +
        '<td><div class="stepset" data-tag="X18">' + Q.steps.map((st, k) => '<label class="step"><input type="checkbox" data-in="step" data-q="' + i + '" data-k="' + k + '" ' + (steps[i][k] ? 'checked' : '') + '><span>' + esc(pickAdd(st)) + ' (' + st.m + ')</span></label>').join('') +
        '</div></td><td class="sc"><strong>' + sc + ' / ' + mx + '</strong>' + (diff ? '<em>' + t('cf.changed') + '</em>' : '') + '</td></tr>';
    }).join('');
    return '<nav class="crumbs">' + t('nav.queue') + ' › ' + D.student.name + ' › ' + esc(pickAdd(D.exam.title)) + '</nav><h1>' + t('cf.title') + '</h1><p class="muted">' + t('cf.sub') + '</p>' +
      '<section class="card" data-tag="T3"><div class="tablewrap"><table class="grade"><thead><tr><th>' + t('cf.q') + '</th><th>' + t('cf.ans') + '</th><th>' + t('cf.ai') + '</th><th>' + t('cf.why') + '</th><th data-tag="T4">' + t('cf.steps') + '</th><th>' + t('cf.yours') + '</th></tr></thead><tbody>' + rows + '</tbody></table></div></section>' +
      '<div class="footbar card"><div class="totals"><span>' + t('cf.aitotal', { n: ai, m: max, p: Math.round((ai / max) * 100) }) + (changed ? ' <em class="chg">' + t('cf.nchanged', { n: changed }) + '</em>' : '') + '</span><strong>' + t('cf.yourtotal', { n: total, m: max, p: Math.round((total / max) * 100) }) + '</strong></div>' +
      '<div class="row"><button class="btn ghost" data-act="exportCsv" data-tag="X11">' + ic('download', 18) + t('cf.export') + '</button><button class="btn ghost" data-act="acceptAll">' + t('cf.accept') + '</button><button class="btn big" data-act="confirmGrades" data-tag="T4">' + ic('check', 20) + t('cf.confirm') + '</button></div></div>';
  };
  I.step = (el) => { App.steps()[+el.dataset.q][+el.dataset.k] = el.checked; App.rerender(); };
  A.acceptAll = () => { S().grade.steps = D.exam.questions.map((q) => q.steps.map((x) => x.ai)); App.toast(t('cf.accepted'), 'check'); App.rerender(); };
  A.confirmGrades = () => { S().grade.confirmed = true; App.toast(t('cf.confirmed'), 'check'); App.go('t/review'); };
  A.exportCsv = () => {
    const lines = ['student,exam,question,points,max'];
    D.exam.questions.forEach((Q, i) => lines.push([D.student.name, pickAdd(D.exam.title), i + 1, App.qScore(i), App.qMax(i)].map((x) => '"' + String(x).replace(/"/g, '""') + '"').join(',')));
    lines.push(['"' + D.student.name + '"', '"total"', '""', App.total(), D.exam.max].join(','));
    try {
      const b = new Blob([lines.join('\n')], { type: 'text/csv' }), a = document.createElement('a');
      a.href = URL.createObjectURL(b); a.download = 'confirmed-grades-4B.csv'; document.body.appendChild(a); a.click(); a.remove();
    } catch (e) {}
    App.toast(t('cf.exported'), 'download');
  };

  /* ---------- gap, red flag and feedback (WF8) ---------- */
  V['t/review'] = function () {
    const s = S(), r = s.review;
    if (s.exam.status === 'notsent') return '<h1>' + t('rv.title') + '</h1>' + emptyNotice();
    if (!s.grade.confirmed) return '<div class="card center"><h1>' + t('rv.first.t') + '</h1><p>' + t('rv.first.d') + '</p><a class="btn" href="#/t/' + (s.exam.status === 'sent' ? 'verify' : 'confirm') + '">' + t('rv.first.b') + '</a></div>';
    const msgEn = r.fbEn === null ? t('fb.en.default') : r.fbEn, msgDe = r.fbDe === null ? t('fb.de.default') : r.fbDe;
    const gapDone = r.gap !== null, flagDone = r.flag !== null;
    const ev = D.evidence.map((e) => '<div class="ev"><b>' + esc(pickAdd(e.where)) + '</b><span>' + esc(pickAdd(e.text)) + '</span></div>').join('');
    const tag = (st, k) => st ? '<span class="decision ' + st + '">' + ic(st === 'confirmed' ? 'check' : 'x', 14) + t(k + '.' + st) + '</span>' : '';
    const gap = '<section class="card gapcard" data-tag="X1"><p class="eyebrow">' + t('rv.gap') + '</p><h2 class="gapname" data-tag="U2.5">' + esc(App.gapName()) + ' <small>' + t('gap.name.other') + '</small></h2>' +
      '<div class="meta"><span class="chip">' + t('rv.conf') + '</span><span class="muted small" data-tag="X14">' + t('rv.rule', { n: s.settings.gap[4] }) + '</span></div>' +
      '<p class="eyebrow">' + t('rv.mistake') + '</p>' + (r.gapEdit ? '<textarea id="gapEdit" rows="3">' + esc(App.gapMistake()) + '</textarea><div class="row"><button class="btn sm" data-act="gapSave">' + t('vf.save') + '</button></div>' : '<p>' + esc(App.gapMistake()) + '</p>') +
      '<p class="eyebrow">' + t('rv.evidence') + '</p>' + ev + tag(r.gap, 'dec') +
      '<div class="row"><button class="btn" data-act="gapDo" data-v="confirmed">' + t('act.confirm') + '</button><button class="btn ghost" data-act="gapEdit">' + t('act.edit') + '</button><button class="btn ghost" data-act="gapDo" data-v="dismissed">' + t('act.dismiss') + '</button></div></section>';
    const flag = '<section class="card flagcard" data-tag="T6"><p class="eyebrow">' + t('rv.flag') + '</p><h2>' + t('rv.flag.t', { g: esc(App.gapName()) }) + '</h2>' +
      '<p class="eyebrow">' + t('rv.sev') + '</p><div class="seg2" data-tag="X5">' + ['low', 'medium', 'high'].map((x) => '<button class="' + (r.severity === x ? 'on' : '') + '" data-act="sev" data-v="' + x + '">' + t('sev.' + x) + '</button>').join('') + '</div>' +
      '<p class="eyebrow">' + t('rv.why') + '</p><p>' + t('rv.why.d') + '</p>' +
      '<label class="field"><span>' + t('rv.dismiss') + '</span><select data-in="dismissReason" id="dr"><option value="">' + t('rv.reason') + '</option>' + ['slip', 'agreed', 'other'].map((x) => '<option value="' + x + '" ' + (r.dismissReason === x ? 'selected' : '') + '>' + t('dr.' + x) + '</option>').join('') + '</select></label>' +
      tag(r.flag, 'dec') + '<div class="row"><button class="btn" data-act="flagDo" data-v="confirmed">' + t('rv.flag.confirm') + '</button><button class="btn ghost" data-act="flagDo" data-v="dismissed">' + t('rv.flag.dismiss') + '</button></div>' +
      '<p class="muted small teachonly" data-tag="X15">' + ic('user', 14) + t('rv.teacheronly') + '</p></section>';
    const fbBoth = r.fbTab === 'both';
    const fb = '<section class="card fbcard" data-tag="T7"><h2>' + t('rv.fb', { n: D.student.first }) + '</h2><div class="seg2" data-tag="U2.4">' + ['en', 'de', 'both'].map((x) => '<button class="' + (r.fbTab === x ? 'on' : '') + '" data-act="fbTab" data-v="' + x + '">' + (x === 'en' ? 'EN' : x === 'de' ? 'DE' : t('fb.both')) + '</button>').join('') + '</div>' +
      (r.fbTab !== 'de' ? '<label class="field"><span>EN</span><textarea data-in="fb" data-l="en" rows="4">' + esc(msgEn) + '</textarea></label>' : '') +
      (r.fbTab !== 'en' ? '<label class="field"><span>DE</span><textarea data-in="fb" data-l="de" rows="4">' + esc(msgDe) + '</textarea></label>' : '') +
      '<label class="field"><span>' + t('rv.prac') + '</span><select data-in="practice"><option value="compare">' + t('pt.compare') + '</option><option value="line" ' + (r.practice === 'line' ? 'selected' : '') + '>' + t('pt.line') + '</option><option value="word" ' + (r.practice === 'word' ? 'selected' : '') + '>' + t('pt.word') + '</option></select></label>' +
      '<div class="row"><span class="muted">' + t('rv.sendto') + '</span><label class="tog"><input type="checkbox" data-in="toStudent" checked disabled><span>' + t('role.student') + '</span></label><label class="tog"><input type="checkbox" data-in="toParent" ' + (r.toParent ? 'checked' : '') + '><span>' + t('role.parent') + '</span></label></div>' +
      '<a class="btn ghost wide" href="#/w/worksheet" target="_blank" rel="noopener" data-tag="X7">' + ic('print', 18) + t('rv.sheet') + '</a>' +
      (s.released ? '' : '<button class="btn big wide release" data-act="release" ' + (gapDone && flagDone ? '' : 'disabled') + '>' + ic('right', 20) + t('rv.release') + '</button>' + (gapDone && flagDone ? '' : '<p class="muted small">' + t('rv.needs') + '</p>')) + '</section>';
    const done = s.released ? '<div class="banner good" data-demo="1">' + ic('check', 26) + '<div><strong>' + t('rv.released.t') + '</strong><span>' + t('rv.released.d') + '</span></div><a class="btn dark" href="#/s/results">' + t('rv.see.s') + '</a><a class="btn ghost" href="#/p/home">' + t('rv.see.p') + '</a></div>' : '';
    return '<nav class="crumbs">' + t('nav.queue') + ' › ' + D.student.name + ' › ' + t('rv.title') + '</nav><h1>' + t('rv.title') + '</h1>' + done + '<div class="review">' + gap + flag + fb + '</div>';
  };
  A.gapDo = (el) => { S().review.gap = el.dataset.v; S().review.gapEdit = false; App.rerender(); };
  A.gapEdit = () => { S().review.gapEdit = true; App.rerender(); };
  A.gapSave = () => { const e = document.getElementById('gapEdit'); if (e) S().review.gapMistake = e.value; S().review.gapEdit = false; S().review.gap = S().review.gap || 'confirmed'; App.rerender(); };
  A.sev = (el) => { S().review.severity = el.dataset.v; App.rerender(); };
  I.dismissReason = (el) => { S().review.dismissReason = el.value; App.save(); };
  A.flagDo = (el) => {
    const r = S().review;
    if (el.dataset.v === 'dismissed' && !r.dismissReason) { const d = document.getElementById('dr'); App.toast(t('rv.needreason'), 'flag'); if (d) d.focus(); return; }
    r.flag = el.dataset.v; App.rerender();
  };
  A.fbTab = (el) => { S().review.fbTab = el.dataset.v; App.rerender(); };
  I.fb = (el) => { S().review[el.dataset.l === 'en' ? 'fbEn' : 'fbDe'] = el.value; App.save(); };
  I.practice = (el) => { S().review.practice = el.value; App.save(); };
  I.toParent = (el) => { S().review.toParent = el.checked; App.save(); };
  A.release = () => {
    const s = S(); if (s.released) return;
    s.released = true; s.exam.status = 'released'; App.notify('student', 'n.result'); App.notify('teacher', 'n.released');
    App.toast(t('rv.released.t'), 'check'); App.rerender();
  };

  /* ---------- class gaps (X4) ---------- */
  V['t/gaps'] = function () {
    const s = S(); const extra = s.review.gap === 'confirmed' ? 1 : 0;
    const rows = D.topics.map((x, i) => { const n = x.share + (i === 0 ? extra : 0);
      return '<div class="heat"><span>' + esc(pickAdd(x.name)) + '</span><div class="track"><i style="width:' + Math.round((n / 28) * 100 * 3.2) + '%"></i></div><em>' + t('gaps.n', { n: n }) + '</em></div>'; }).join('');
    const names = ['Lina M.', 'Karim S.', 'Mariam H.', 'Salma R.'].concat(s.review.gap === 'confirmed' ? ['Youssef A.'] : []);
    return '<h1>' + t('nav.gaps') + '</h1><div class="two"><section class="card" data-tag="X4"><h2>' + t('t.weak') + '</h2>' + rows + '<p class="muted small">' + t('t.weak.d') + '</p></section>' +
      '<section class="card"><h2>' + t('gaps.open') + ' ' + esc(pickAdd(D.topics[0].name)) + '</h2><ul class="plain">' + names.map((n) => '<li>' + esc(n) + (n === 'Youssef A.' ? ' <span class="decision confirmed">' + ic('check', 14) + t('dec.confirmed') + '</span>' : '') + '</li>').join('') + '</ul></section></div>';
  };

  /* ---------- students ---------- */
  V['t/students'] = function () {
    const s = S();
    const rows = D.students.map((x) => {
      let flag = '';
      if (x.flag === 'live') flag = s.released && s.review.flag === 'confirmed' ? '<span class="decision confirmed">' + ic('flag', 14) + t('st.support') + '</span>' : '';
      else if (x.flag) flag = '<span class="decision confirmed">' + ic('flag', 14) + t('st.support') + '</span>';
      return '<tr><td><strong>' + esc(x.name) + '</strong></td><td>' + D.teacher.class + '</td><td>' + esc(x.last) + '</td><td>' + flag + '</td><td><button class="btn sm ghost" data-act="msg" data-n="' + esc(x.name) + '">' + ic('message', 16) + t('students.msg') + '</button></td></tr>';
    }).join('');
    return '<h1>' + t('nav.students') + '</h1><section class="card"><div class="tablewrap"><table class="q"><thead><tr><th>' + t('q.student') + '</th><th>' + t('students.class') + '</th><th>' + t('students.last') + '</th><th>' + t('q.flag') + '</th><th></th></tr></thead><tbody>' + rows + '</tbody></table></div></section>';
  };
  A.msg = (el) => App.toast(t('students.msgok', { n: el.dataset.n }), 'message');

  /* ---------- messages with grouped alerts and quiet hours (X16) ---------- */
  V['t/messages'] = function () {
    const s = S(); const mine = s.notifs.filter((n) => n.to === 'teacher');
    const out = '<h1>' + t('nav.messages') + '</h1><section class="card" data-tag="X16"><h2>' + t('msgs.group') + '</h2>' +
      '<ul class="notifs"><li class="new">' + ic('bell', 26) + '<div><strong>' + t('msgs.group.d', { n: App.rows().filter((r) => r.status === 'verify').length }) + '</strong><span class="muted">' + t('msgs.group.s') + '</span></div><a class="btn sm" href="#/t/queue">' + t('nav.queue') + '</a></li></ul>' +
      '<p class="muted small">' + ic('clock', 14) + t('notif.quiet', { a: s.settings.quietFrom, b: s.settings.quietTo }) + '</p></section>' +
      '<section class="card"><h2>' + t('msgs.log') + '</h2>' + (mine.length ? '<ul class="notifs">' + mine.map((n) => '<li>' + ic('message', 24) + '<div><strong>' + t(n.key) + '</strong><span class="muted">' + t('res.today') + ' ' + n.time + '</span></div></li>').join('') + '</ul>' : '<p class="muted">' + t('notif.none') + '</p>') + '</section>';
    mine.forEach((n) => (n.read = true));
    return out;
  };

  /* ---------- settings ---------- */
  V['t/settings'] = function () {
    const s = S(); const st = s.settings;
    const gaprow = [1, 2, 3, 4, 5].map((g) => '<label class="gaprow"><span>' + t('set.grade', { n: g }) + '</span><input type="number" min="1" max="6" value="' + st.gap[g] + '" data-in="gap" data-g="' + g + '"><em>' + t('set.questions') + '</em></label>').join('');
    return '<h1>' + t('nav.settings') + '</h1><div class="two"><section class="card" data-tag="U1.1"><h2>' + t('set.mode') + '</h2><p class="muted">' + t('set.mode.d') + '</p>' +
      '<div class="seg2"><button class="' + (st.defaultMode === 'picture' ? 'on' : '') + '" data-act="defMode" data-v="picture">' + t('mode.picture') + '</button><button class="' + (st.defaultMode === 'reader' ? 'on' : '') + '" data-act="defMode" data-v="reader">' + t('mode.reader') + '</button></div></section>' +
      '<section class="card" data-tag="X14"><h2>' + t('set.gap') + '</h2><p class="muted">' + t('set.gap.d') + '</p>' + gaprow + '</section></div>' +
      '<section class="card" data-tag="X16"><h2>' + t('set.quiet') + '</h2><div class="row"><label class="field inl"><span>' + t('set.from') + '</span><input type="time" value="' + st.quietFrom + '" data-in="qfrom"></label><label class="field inl"><span>' + t('set.to') + '</span><input type="time" value="' + st.quietTo + '" data-in="qto"></label></div>' +
      '<p class="muted">' + t('set.quiet.d') + '</p></section>';
  };
  A.defMode = (el) => { S().settings.defaultMode = el.dataset.v; S().mode = el.dataset.v; App.toast(t('set.saved'), 'check'); App.rerender(); };
  I.gap = (el) => { S().settings.gap[el.dataset.g] = Math.max(1, +el.value || 1); App.save(); App.toast(t('set.saved'), 'check'); };
  I.qfrom = (el) => { S().settings.quietFrom = el.value; App.save(); App.toast(t('set.saved'), 'check'); };
  I.qto = (el) => { S().settings.quietTo = el.value; App.save(); App.toast(t('set.saved'), 'check'); };

  /* ---------- batch upload (X3) ---------- */
  V['t/batch'] = function () {
    const s = S();
    const found = s.batchShown ? '<section class="card"><h2>' + t('batch.found') + '</h2><div class="tablewrap"><table class="q"><thead><tr><th>' + t('q.student') + '</th><th>' + t('q.exam') + '</th><th>' + t('q.lang') + '</th><th>' + t('batch.conf') + '</th></tr></thead><tbody>' +
      D.batch.map((b) => '<tr><td><strong>' + esc(b.name) + '</strong></td><td>' + esc(pickAdd(b.exam)) + '</td><td><span class="lg">' + b.lang + '</span></td><td>' + (b.conf < 70 ? '<span class="st verify">' + t('batch.check') + ' (' + b.conf + '%)</span>' : b.conf + '%') + '</td></tr>').join('') +
      '</tbody></table></div><div class="row end"><button class="btn big" data-act="batchAdd" ' + (s.extraRows.length ? 'disabled' : '') + '>' + t('batch.add', { n: D.batch.length }) + '</button></div></section>' : '';
    return '<h1>' + t('nav.batch') + '</h1><section class="card" data-tag="X3"><div class="drop">' + ic('upload', 40) + '<strong>' + t('batch.drop') + '</strong><span class="muted">' + t('batch.d') + '</span>' +
      '<div class="row"><label class="btn ghost">' + t('batch.choose') + '<input type="file" multiple hidden data-in="batchFile"></label><button class="btn" data-act="batchSample">' + t('batch.sample') + '</button></div></div></section>' + found;
  };
  A.batchSample = () => { S().batchShown = true; App.rerender(); };
  I.batchFile = () => { S().batchShown = true; App.rerender(); };
  A.batchAdd = () => {
    const s = S();
    D.batch.forEach((b, i) => s.extraRows.push({ id: 'b' + i, name: b.name, exam: b.exam, lang: b.lang, status: 'verify', flag: false }));
    App.toast(t('batch.added', { n: D.batch.length }), 'check'); App.rerender();
  };
})();
