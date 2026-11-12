/* Interactive local-only messaging, sample queue details and settings feedback. No server delivery. */
(function () {
  'use strict';
  const App = window.App, D = window.DATA, t = App.t, esc = App.esc, ic = App.icon;
  const S = () => App.state, A = App.act, I = App.inp, V = App.views;
  const oldTeacherMessages = V['t/messages'];
  const oldStudentMessages = V['s/notifs'];
  const oldTeacherSettings = V['t/settings'];
  const oldOpenRow = A.openRow;

  function students() { return D.students.map((x) => x.name); }
  function chatList(items, role) {
    if (!items.length) return '<p class="muted">' + t('chat.none') + '</p>';
    return '<ul class="notifs chat-list">' + items.map((m) => {
      const title = role === 'out' ? t('chat.to', { n: esc(m.recipient) }) :
        m.from === 'student' ? esc(D.student.name) : esc(D.teacher.name);
      const sample = m.from === 'teacher' && m.recipient !== D.student.name;
      return '<li class="chat-item"><span class="chat-symbol">' + ic('message', 22) + '</span>' +
        '<div class="chat-content"><strong>' + title + '</strong><p class="chat-body">' + esc(m.body) + '</p>' +
        '<small class="muted">' + esc(m.time || '') + (sample ? ' · ' + t('chat.sample') : '') + '</small></div></li>';
    }).join('') + '</ul>';
  }

  A.msg = (el) => {
    const who = el.dataset.n;
    if (!students().includes(who)) return;
    S().messageRecipient = who;
    if (App.route() === 't/messages') App.rerender();
    else App.go('t/messages');
  };
  I.msgRecipient = (el) => {
    if (students().includes(el.value)) S().messageRecipient = el.value;
    App.rerender();
  };
  I.teacherDraft = (el) => { S().messageDraft = el.value; App.save(); };
  I.studentDraft = (el) => { S().studentReplyDraft = el.value; App.save(); };

  A.sendTeacherMessage = () => {
    const input = document.getElementById('teacher-message-body');
    const body = input ? input.value : S().messageDraft;
    const recipient = S().messageRecipient;
    if (!App.addMessage('teacher', recipient, body)) {
      App.toast(t('chat.enter'), 'message');
      if (input) input.focus();
      return;
    }
    S().messageDraft = '';
    App.toast(t(recipient === D.student.name ? 'chat.sent' : 'chat.sent.sample'), 'check');
    App.rerender();
  };
  A.sendStudentMessage = () => {
    const input = document.getElementById('student-message-body');
    const body = input ? input.value : S().studentReplyDraft;
    if (!App.addMessage('student', D.teacher.name, body)) {
      App.toast(t('chat.enter'), 'message');
      if (input) input.focus();
      return;
    }
    S().studentReplyDraft = '';
    App.toast(t('chat.sent.teacher'), 'check');
    App.rerender();
  };

  V['t/messages'] = function () {
    const s = S(), inbox = App.messageInbox('teacher');
    const outbox = s.messages.filter((m) => m.from === 'teacher');
    const options = students().map((name) =>
      '<option value="' + esc(name) + '"' + (name === s.messageRecipient ? ' selected' : '') + '>' + esc(name) + '</option>').join('');
    const sample = s.messageRecipient !== D.student.name;
    const compose = '<section class="card chat-compose"><h2>' + t('chat.compose') + '</h2>' +
      '<label class="field"><span>' + t('chat.recipient') + '</span><select data-in="msgRecipient">' + options + '</select></label>' +
      '<label class="field"><span>' + t('chat.body') + '</span><textarea id="teacher-message-body" data-in="teacherDraft" rows="3" maxlength="500" placeholder="' + esc(t('chat.placeholder')) + '">' + esc(s.messageDraft) + '</textarea></label>' +
      (sample ? '<p class="muted small">' + t('chat.sample.warning') + '</p>' : '') +
      '<div class="row end"><button class="btn" data-act="sendTeacherMessage">' + ic('message', 18) + t('chat.send') + '</button></div>' +
      '<p class="muted small">' + t('chat.disclaimer') + '</p></section>';
    const page = oldTeacherMessages().replace(t('notif.none'), t('chat.noAlerts'));
    inbox.forEach((m) => { m.read = true; });
    return page.replace('</h1>', '</h1>' + compose) +
      '<section class="card"><h2>' + t('chat.teacher.inbox') + '</h2>' + chatList(inbox, 'in') + '</section>' +
      '<section class="card"><h2>' + t('chat.teacher.sent') + '</h2>' + chatList(outbox, 'out') + '</section>';
  };

  V['s/notifs'] = function () {
    const s = S(), inbox = App.messageInbox('student');
    const sent = s.messages.filter((m) => m.from === 'student');
    const page = oldStudentMessages().replace(t('notif.none'), t('chat.noAlerts'));
    inbox.forEach((m) => { m.read = true; });
    return page +
      '<section class="card"><h2>' + t('chat.student.inbox') + '</h2>' + chatList(inbox, 'in') + '</section>' +
      '<section class="card chat-compose"><h2>' + t('chat.student.write') + '</h2>' +
      '<label class="field"><span>' + t('chat.body') + '</span><textarea id="student-message-body" data-in="studentDraft" rows="3" maxlength="500" placeholder="' + esc(t('chat.placeholder')) + '">' + esc(s.studentReplyDraft) + '</textarea></label>' +
      '<div class="row end"><button class="btn" data-act="sendStudentMessage">' + ic('message', 18) + t('chat.send') + '</button></div>' +
      '<p class="muted small">' + t('chat.disclaimer') + '</p></section>' +
      '<section class="card"><h2>' + t('chat.student.sent') + '</h2>' + chatList(sent, 'out') + '</section>';
  };

  // Queue samples should open an honest sample-detail view, never a dead-end toast.
  A.openRow = (el) => {
    if (el.dataset.id === D.student.id) return oldOpenRow(el);
    S().samplePreview = el.dataset.id;
    App.go('t/sample');
  };
  V['t/sample'] = function () {
    const item = App.rows().find((row) => row.id === S().samplePreview && !row.live);
    if (!item) return '<section class="card"><h1>' + t('sample.missing') + '</h1><a class="btn" href="#/t/queue">' + t('back') + '</a></section>';
    const canMessage = students().includes(item.name);
    return '<h1>' + esc(item.name) + '</h1><section class="card"><p class="muted">' + t('sample.disclaimer') + '</p>' +
      '<p><strong>' + t('q.exam') + ': </strong>' + esc(App.pick(item.exam)) + '</p>' +
      '<p><strong>' + t('q.lang') + ': </strong>' + esc(item.lang) + '</p>' +
      '<p><strong>' + t('q.status') + ': </strong>' + esc(t('st.' + item.status)) + '</p>' +
      '<div class="row"><a class="btn ghost" href="#/t/queue">' + ic('left', 18) + t('back') + '</a>' +
      (canMessage ? '<button class="btn" data-act="msg" data-n="' + esc(item.name) + '">' + t('students.msg') + '</button>' : '') +
      '</div></section>';
  };

  // Settings keep their existing stored values, and now show their actual demo consequences.
  V['t/settings'] = function () {
    const st = S().settings, g4 = st.gap[4], met = g4 <= 3;
    return oldTeacherSettings() + '<section class="card"><h2>' + t('set.preview.title') + '</h2>' +
      '<p>' + t('set.preview.mode', { n: t('mode.' + st.defaultMode) }) + '</p>' +
      '<p>' + t('set.preview.gap', { n: g4, status: t(met ? 'rv.conf' : 'rv.rule.unmet') }) + '</p>' +
      '<p>' + t('set.preview.quiet', { n: t(App.isQuietNow() ? 'set.quiet.active' : 'set.quiet.inactive') }) + '</p>' +
      '<p class="muted small">' + t('set.preview.note') + '</p></section>';
  };
  I.gap = (el) => {
    const next = Math.min(6, Math.max(1, Number(el.value) || 1));
    S().settings.gap[el.dataset.g] = next;
    App.rerender();
  };
  I.qfrom = (el) => { if (el.value) S().settings.quietFrom = el.value; App.rerender(); };
  I.qto = (el) => { if (el.value) S().settings.quietTo = el.value; App.rerender(); };
})();
