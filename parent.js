/* Parent view (bonus) and the two printable pages (practice sheet X7, parent report X17). */
(function () {
  'use strict';
  const App = window.App, D = window.DATA, t = App.t, ic = App.icon, esc = App.esc, S = () => App.state;
  const V = App.views, A = App.act;

  V['p/home'] = function () {
    const s = S(), r = s.review;
    const shown = s.released && r.toParent;
    const total = App.total(), max = D.exam.max;
    const result = shown
      ? '<div class="pres"><strong class="big">' + t('res.score', { n: total, m: max }) + '</strong><span class="muted">' + t('par.pct', { p: Math.round((total / max) * 100) }) + ' · ' + t('par.confirmed', { n: D.teacher.name }) + '</span></div><p>' + esc(D.exam.title[s.lang]) + '</p>'
      : '<p class="muted">' + t('par.none') + '</p>';
    const things = shown && r.gap === 'confirmed'
      ? '<span class="pill dark">' + esc(App.gapName()) + '</span><p class="muted">' + t('par.help') + '</p><p class="muted">' + t('par.sent', { n: D.student.first }) + '</p>' : '<p class="muted">' + t('par.none2') + '</p>';
    const flag = shown && r.flag === 'confirmed'
      ? '<div class="flagline"><span class="flagdot">!</span><div><strong>' + t('par.flag', { n: D.teacher.name }) + '</strong><span class="muted">' + esc(App.gapName()) + '</span></div></div>' : '<p class="muted">' + t('par.noflag') + '</p>';
    const pl = s.parentLang;
    const weekly = '<div class="seg2"><button class="' + (pl === 'en' ? 'on' : '') + '" data-act="pLang" data-v="en">English</button><button class="' + (pl === 'de' ? 'on' : '') + '" data-act="pLang" data-v="de">Deutsch</button></div>' +
      '<div class="mail"><b>' + (pl === 'de' ? window.L['weekly.sub'][1] : window.L['weekly.sub'][0]) + '</b><p>' + (shown ? (pl === 'de' ? window.L['weekly.de'][1] : window.L['weekly.en'][0]).replace('{n}', total).replace('{m}', max) : t('par.none')) + '</p></div>';
    return '<h1>' + D.student.first + ' · ' + t('par.grade') + ' ' + D.student.grade + '</h1><p class="muted">' + t('par.only') + '</p>' +
      '<div class="par-grid"><section class="card" data-tag="P1"><h2>' + t('par.latest') + '</h2>' + result + '</section>' +
      '<section class="card"><h2>' + t('res.practise') + '</h2>' + things + '</section>' +
      '<section class="card"><h2>' + t('par.flags') + '</h2>' + flag + '</section>' +
      '<section class="card wide2" data-tag="S6"><h2>' + t('par.progress') + '</h2>' + App.progressChart('math', undefined, undefined, shown) + '</section>' +
      '<section class="card" data-tag="X8"><h2>' + t('par.weekly') + '</h2>' + weekly + '<a class="btn ghost wide" href="#/w/report" target="_blank" rel="noopener" data-tag="X17">' + ic('print', 18) + t('par.print') + '</a></section></div>';
  };
  A.pLang = (el) => { S().parentLang = el.dataset.v; App.rerender(); };
  A.print = () => { try { window.print(); } catch (e) {} };

  function printFrame(title, inner) {
    return '<div class="sheet-wrap"><div class="noprint toolbar"><a class="btn ghost" href="#/t/dashboard">' + ic('left', 18) + t('back') + '</a>' +
      '<span class="langsw"><button class="' + (S().lang === 'en' ? 'on' : '') + '" data-act="lang" data-l="en">EN</button><button class="' + (S().lang === 'de' ? 'on' : '') + '" data-act="lang" data-l="de">DE</button></span>' +
      '<button class="btn" data-act="print">' + ic('print', 18) + t('print.btn') + '</button></div><article class="sheet"><header><span class="brand">' + ic('star', 24, 'on') + '<span>LernStar</span></span><h1>' + title + '</h1></header>' + inner + '</article></div>';
  }
  /* X7: printable practice sheet, both languages on every line so it works without a device */
  V['w/worksheet'] = function () {
    const items = [[1, 2, 1, 4], [3, 10, 1, 2], [2, 5, 1, 2], [3, 4, 2, 3], [1, 3, 1, 5], [5, 8, 1, 2]];
    const bar = (n, d) => { let h = '<svg class="frac" viewBox="0 0 220 34" aria-hidden="true">'; const w = 220 / d; for (let i = 0; i < d; i++) h += '<rect x="' + (i * w + 1) + '" y="2" width="' + (w - 2) + '" height="30" rx="3" fill="none" stroke="#000" stroke-width="2"/>'; return h + '</svg>'; };
    return printFrame(window.L['ws.title'][0] + ' · ' + window.L['ws.title'][1],
      '<p class="nameline">' + window.L['ws.name'][0] + ' / ' + window.L['ws.name'][1] + ': ___________________ &nbsp; ' + window.L['ws.date'][0] + ' / ' + window.L['ws.date'][1] + ': __________</p>' +
      '<p>' + window.L['ws.how'][0] + '<br><em>' + window.L['ws.how'][1] + '</em></p><ol class="ws">' + items.map((x) =>
        '<li><div class="fr"><div>' + bar(x[0], x[1]) + '<strong>' + x[0] + '/' + x[1] + '</strong></div><div>' + bar(x[2], x[3]) + '<strong>' + x[2] + '/' + x[3] + '</strong></div></div>' +
        '<p>○ ' + window.L['ws.left'][0] + ' / ' + window.L['ws.left'][1] + ' &nbsp; ○ ' + window.L['ws.same'][0] + ' / ' + window.L['ws.same'][1] + ' &nbsp; ○ ' + window.L['ws.right'][0] + ' / ' + window.L['ws.right'][1] + '</p></li>').join('') + '</ol>' +
      '<footer>' + window.L['ws.foot'][0] + ' · ' + window.L['ws.foot'][1] + '</footer>');
  };
  /* X17: printable report for parent evenings */
  V['w/report'] = function () {
    const s = S(), r = s.review, total = App.total(), max = D.exam.max;
    const L = window.L;
    // Direct navigation to the printable URL must respect release and the parent's opt-in.
    if (!s.released || !r.toParent) return printFrame(L['rep.title'][0] + ' · ' + L['rep.title'][1],
      '<p class="muted">' + t('par.none') + '</p>');
    const pts = D.history.math.concat([{ d: D.exam.date, s: total }]);
    return printFrame(L['rep.title'][0] + ' · ' + L['rep.title'][1],
      '<p class="nameline"><strong>' + D.student.name + '</strong> · ' + L['par.grade'][0] + ' ' + D.student.grade + '</p>' +
      '<h2>' + L['par.latest'][0] + ' / ' + L['par.latest'][1] + '</h2><p><strong>' + (s.released ? total + ' / ' + max : '–') + '</strong> · ' + esc(D.exam.title.en) + ' / ' + esc(D.exam.title.de) + '</p>' +
      '<p class="muted">' + L['rep.conf'][0] + ' ' + D.teacher.name + ' · ' + L['rep.conf'][1] + ' ' + D.teacher.name + '</p>' +
      '<h2>' + L['res.practise'][0] + ' / ' + L['res.practise'][1] + '</h2><p>' + (s.released && r.gap === 'confirmed' ? L['gap.name'][0] + ' / ' + L['gap.name'][1] : '–') + '</p>' +
      '<h2>' + L['par.progress'][0] + ' / ' + L['par.progress'][1] + '</h2><table class="rep"><tr><th>' + L['rep.date'][0] + '</th>' + pts.map((p) => '<td>' + p.d + '</td>').join('') + '</tr><tr><th>' + L['rep.pts'][0] + ' (/11)</th>' + pts.map((p) => '<td>' + p.s + '</td>').join('') + '</tr></table>' +
      '<h2>' + L['res.msg'][0].replace('{n}', D.teacher.name) + '</h2><p>' + esc(r.fbEn === null ? L['fb.en.default'][0] : r.fbEn) + '</p><p><em>' + esc(r.fbDe === null ? L['fb.de.default'][1] : r.fbDe) + '</em></p>');
  };
})();