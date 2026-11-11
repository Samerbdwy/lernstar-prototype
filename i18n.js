/* All interface text in English and German. Format: key: ['English', 'Deutsch'] */
window.L = {
  /* general */
  'back': ['Back', 'Zurück'], 'back.home': ['Back to home', 'Zurück zur Startseite'], 'cancel': ['Cancel', 'Abbrechen'], 'undo': ['Undo', 'Rückgängig'],
  'demo.title': ['Prototype demo', 'Prototyp-Demo'], 'demo.tags': ['Feature tags', 'Feature-Tags'], 'demo.reset': ['Reset demo', 'Demo zurücksetzen'],
  'demo.sample': ['Sample data. The full walk-through uses Youssef’s exam.', 'Beispieldaten. Der vollständige Ablauf nutzt Youssefs Prüfung.'],
  'role.student': ['Student', 'Schüler'], 'role.teacher': ['Teacher', 'Lehrerin'], 'role.parent': ['Parent', 'Eltern'],
  'mode.picture': ['Picture mode (Grades 1–2)', 'Bildmodus (Klasse 1–2)'], 'mode.reader': ['Reader mode (Grades 3–5)', 'Lesemodus (Klasse 3–5)'],
  'listen.label': ['Listen', 'Vorlesen'], 'listen.toast': ['Reading aloud:', 'Wird vorgelesen:'],
  'a11y.title': ['Accessibility', 'Barrierefreiheit'], 'a11y.large': ['Larger text', 'Größere Schrift'], 'a11y.contrast': ['High contrast', 'Hoher Kontrast'], 'a11y.dys': ['Dyslexia-friendly font', 'Legasthenie-freundliche Schrift'],
  'f.all': ['All', 'Alle'], 'f.flagged': ['Flagged only', 'Nur markierte'],

  /* landing and login */
  'land.title': ['AI-assisted assessment, with the teacher in charge', 'KI-gestützte Beurteilung – die Lehrerin entscheidet'],
  'land.sub': ['Students in Grades 1–5 send their paper exams. The AI suggests, the teacher checks and confirms, and the child sees results only afterwards. English and German.', 'Schülerinnen und Schüler der Klassen 1–5 senden ihre Prüfungen. Die KI schlägt vor, die Lehrerin prüft und bestätigt, und das Kind sieht erst danach das Ergebnis. Deutsch und Englisch.'],
  'land.s.t': ['I am a student', 'Ich bin Schüler'], 'land.s.d': ['Send my exam and see my results', 'Prüfung senden und Ergebnis ansehen'],
  'land.t.t': ['I am a teacher', 'Ich bin Lehrerin'], 'land.t.d': ['Verify text, confirm grades and gaps', 'Text prüfen, Noten und Lücken bestätigen'],
  'land.p.t': ['I am a parent', 'Ich bin ein Elternteil'], 'land.p.d': ['See confirmed results and progress (bonus view)', 'Bestätigte Ergebnisse und Fortschritt ansehen (Bonus)'],
  'land.note': ['CSEN 909 · Milestone 3 · Team Scrum refusers. All names, scans and AI results are sample data.', 'CSEN 909 · Meilenstein 3 · Team Scrum refusers. Alle Namen, Scans und KI-Ergebnisse sind Beispieldaten.'],
  'login.title': ['Hello! Log in', 'Hallo! Anmelden'], 'login.code': ['My school code', 'Mein Schulcode'], 'login.pw': ['My password', 'Mein Passwort'],
  'login.lang': ['Language', 'Sprache'], 'login.go': ['Let’s go', 'Los geht’s'], 'login.hint': ['Prototype only: sign-in is simulated; these demo credentials are not checked.', 'Nur Prototyp: Die Anmeldung ist simuliert; die Beispiel-Zugangsdaten werden nicht geprüft.'],

  /* navigation */
  'nav.dashboard': ['Dashboard', 'Übersicht'], 'nav.queue': ['Exam queue', 'Prüfungsliste'], 'nav.students': ['Students', 'Schüler'], 'nav.gaps': ['Class gaps', 'Klassenlücken'],
  'nav.batch': ['Batch upload', 'Stapel-Upload'], 'nav.messages': ['Messages', 'Nachrichten'], 'nav.settings': ['Settings', 'Einstellungen'], 'nav.verify': ['Verify text', 'Text prüfen'],

  /* student home */
  's.hi': ['Hi {n}!', 'Hallo {n}!'], 's.open': ['Open', 'Öffnen'],
  's.new.t': ['New from Ms. Nadine', 'Neu von Frau Nadine'], 's.new.d': ['Your Math result is ready. Tap to see it.', 'Dein Mathe-Ergebnis ist da. Tippe zum Ansehen.'],
  's.wait.t': ['Ms. Nadine is checking your exam', 'Frau Nadine prüft deine Arbeit'], 's.wait.d': ['You will get a message when your result is ready.', 'Du bekommst eine Nachricht, wenn dein Ergebnis fertig ist.'],
  's.rescan.t': ['Please scan page 2 again', 'Bitte scanne Seite 2 noch einmal'], 's.rescan.d': ['Ms. Nadine could not read it. Try with more light.', 'Frau Nadine konnte sie nicht lesen. Versuche es mit mehr Licht.'],
  's.rescan.b': ['Scan again', 'Neu scannen'], 's.rescan.ok': ['Page 2 sent again', 'Seite 2 erneut gesendet'],
  's.tile.send': ['Send my exam', 'Prüfung senden'], 's.tile.send.d': ['Take photos of your pages', 'Fotografiere deine Seiten'],
  's.tile.results': ['My results', 'Meine Ergebnisse'], 's.tile.results.d': ['See what your teacher checked', 'Sieh, was deine Lehrerin geprüft hat'],
  's.tile.practice': ['Things to practise', 'Das üben wir'], 's.tile.practice.d': ['Short tasks just for you', 'Kurze Aufgaben nur für dich'],
  's.tile.progress': ['My progress', 'Mein Fortschritt'], 's.tile.progress.d': ['See how you are getting better', 'Sieh, wie du besser wirst'],
  's.stars': ['My stars this month', 'Meine Sterne diesen Monat'], 's.keep': ['Keep going, you are doing great!', 'Weiter so, du machst das toll!'],
  's.next': ['Next exam', 'Nächste Prüfung'], 's.next.exam': ['Science (English)', 'Sachkunde (Englisch)'], 's.next.date': ['Tuesday', 'Dienstag'], 's.next.topic': ['Plants', 'Pflanzen'],

  /* sending an exam */
  'send.s1': ['Choose exam', 'Prüfung wählen'], 'send.s2': ['Add pages', 'Seiten hinzufügen'], 'send.s3': ['Send', 'Senden'],
  'send.pick': ['Which exam?', 'Welche Prüfung?'], 'send.examlang': ['Language of the exam', 'Sprache der Prüfung'], 'send.next': ['Next', 'Weiter'],
  'ex.fractions': ['Math: Fractions test', 'Mathe: Brüche-Test'], 'ex.plants': ['Science: Plants', 'Sachkunde: Pflanzen'],
  'send.preview': ['Preview only — this demo uses Fractions', 'Nur Vorschau — diese Demo nutzt Brüche'],
  'cam.place': ['Place the exam page inside the frame', 'Lege die Seite in den Rahmen'], 'cam.ok': ['Light OK. Move a little closer.', 'Licht passt. Geh etwas näher ran.'],
  'cam.closer': ['Move a little closer.', 'Geh etwas näher ran.'], 'cam.hold': ['Hold still and try again.', 'Halte ruhig und versuche es noch einmal.'],
  'send.take': ['Take photo', 'Foto machen'], 'send.upload': ['Upload a scan', 'Scan hochladen'], 'send.mypages': ['My pages', 'Meine Seiten'],
  'send.count': ['{n} pages', '{n} Seiten'], 'send.page': ['Page', 'Seite'], 'send.blurry': ['Blurry', 'Unscharf'], 'send.clear': ['Clear', 'Scharf'], 'send.retake': ['Retake', 'Neu aufnehmen'],
  'send.retaken': ['Page is clear now', 'Seite ist jetzt scharf'], 'send.add': ['Add page', 'Seite hinzufügen'],
  'send.fixblur': ['A page is blurry. Tap Retake before sending.', 'Eine Seite ist unscharf. Tippe auf Neu aufnehmen, bevor du sendest.'],
  'send.tip': ['Tip: write your name on every page.', 'Tipp: Schreibe deinen Namen auf jede Seite.'],
  'send.mock': ['Prototype: camera and OCR are simulated; uploaded files are not read or graded.', 'Prototyp: Kamera und Texterkennung sind simuliert; hochgeladene Dateien werden nicht gelesen oder bewertet.'],
  'send.uploaded': ['{n} file(s) added as mock pages.', '{n} Datei(en) als Beispielseiten hinzugefügt.'],
  'send.ready': ['Ready to send?', 'Bereit zum Senden?'], 'send.after': ['Your teacher checks it first. You see the grade only after that.', 'Deine Lehrerin prüft zuerst. Die Note siehst du erst danach.'],
  'send.go': ['Send to my teacher', 'An meine Lehrerin senden'],
  'send.already.t': ['Your exam is sent', 'Deine Prüfung ist gesendet'], 'send.already.d': ['Ms. Nadine will check it. Look at My results later.', 'Frau Nadine prüft sie. Schau später bei Meine Ergebnisse.'],
  'sent.t': ['Sent! Well done.', 'Gesendet! Gut gemacht.'], 'sent.d': ['Ms. Nadine will check it. You will get a message when your result is ready.', 'Frau Nadine prüft sie. Du bekommst eine Nachricht, wenn dein Ergebnis fertig ist.'],
  'sent.teacher': ['Switch to teacher (demo)', 'Zur Lehrerin wechseln (Demo)'],

  /* results */
  'res.none.t': ['No exam sent yet', 'Noch keine Prüfung gesendet'], 'res.none.d': ['Send an exam first. Then your result appears here after your teacher has checked it.', 'Sende zuerst eine Prüfung. Danach erscheint hier dein Ergebnis, sobald deine Lehrerin es geprüft hat.'],
  'res.wait.d': ['Your grade is hidden until your teacher has confirmed it. This keeps it fair.', 'Deine Note bleibt verborgen, bis deine Lehrerin sie bestätigt hat. So ist es fair.'],
  'res.st1': ['Sent', 'Gesendet'], 'res.st2': ['Teacher checks', 'Lehrerin prüft'], 'res.st3': ['Result', 'Ergebnis'],
  'res.confirmed': ['Checked and confirmed by Ms. Nadine', 'Von Frau Nadine geprüft und bestätigt'],
  'res.score': ['{n} of {m}', '{n} von {m}'], 'res.nice': ['Nice work!', 'Schön gemacht!'], 'res.keepgoing': ['Keep going!', 'Weiter so!'],
  'res.practise': ['Things to practise', 'Das üben wir'], 'res.good': ['You are already good at multiplying!', 'Im Malnehmen bist du schon gut!'], 'res.nogap': ['Nothing new to practise this time.', 'Diesmal gibt es nichts Neues zu üben.'],
  'res.msg': ['Message from {n}', 'Nachricht von {n}'], 'res.today': ['Today', 'Heute'],
  'res.help.t': ['Extra help from your teacher', 'Extra Hilfe von deiner Lehrerin'], 'res.help.d': ['Ms. Nadine will help you with fractions in class this week. Everyone needs a little help sometimes.', 'Frau Nadine hilft dir diese Woche im Unterricht bei Brüchen. Jeder braucht manchmal ein bisschen Hilfe.'],
  'res.prac.t': ['Practice for this week', 'Übung für diese Woche'], 'res.prac.d': ['Compare fractions (5 minutes)', 'Brüche vergleichen (5 Minuten)'], 'res.prac.b': ['Start practice', 'Übung starten'],
  'topic.mult': ['Multiplication', 'Multiplikation'], 'topic.frac': ['Fractions', 'Brüche'], 'topic.word': ['Word problems', 'Sachaufgaben'],

  /* practice */
  'prac.none': ['Your practice tasks appear here after your teacher has checked your exam.', 'Deine Übungen erscheinen hier, sobald deine Lehrerin deine Prüfung geprüft hat.'],
  'prac.title': ['Compare fractions', 'Brüche vergleichen'], 'prac.sub': ['5 minutes. Look at the bars. There are no wrong tries here.', '5 Minuten. Schau dir die Balken an. Hier gibt es keine falschen Versuche.'],
  'prac.q': ['Task {n}', 'Aufgabe {n}'], 'prac.step': ['Task {n} of {m}', 'Aufgabe {n} von {m}'], 'prac.which': ['Which bar is bigger?', 'Welcher Balken ist größer?'],
  'prac.left': ['Left', 'Links'], 'prac.same': ['Same', 'Gleich'], 'prac.right': ['Right', 'Rechts'],
  'prac.yes': ['Yes! You looked at the whole bar.', 'Ja! Du hast den ganzen Balken angesehen.'], 'prac.try': ['Look at the bars again. How much of each bar is filled?', 'Schau dir die Balken noch einmal an. Wie viel ist jeweils gefüllt?'],
  'prac.mark': ['I am done', 'Ich bin fertig'], 'prac.retry': ['Try the highlighted questions again before finishing.', 'Versuche die markierten Aufgaben noch einmal, bevor du fertig bist.'], 'prac.done': ['Done. Well done!', 'Fertig. Gut gemacht!'], 'prac.well': ['Practice done! Your streak grew.', 'Übung fertig! Deine Serie wächst.'], 'prac.print': ['Print worksheet', 'Arbeitsblatt drucken'],

  /* progress */
  'subj.math': ['Math', 'Mathe'], 'subj.science': ['Science', 'Sachkunde'], 'prog.scores': ['My points over time', 'Meine Punkte im Verlauf'], 'prog.axis': ['Points out of 11 in each exam', 'Punkte von 11 in jeder Prüfung'],
  'prog.chart': ['Line chart of points per exam', 'Liniendiagramm der Punkte je Prüfung'], 'prog.topics': ['My topics', 'Meine Themen'],
  'w.great': ['Great', 'Super'], 'w.keep': ['Keep practising', 'Weiter üben'], 'w.almost': ['Almost there', 'Fast geschafft'],
  'prog.badges': ['My badges', 'Meine Abzeichen'], 'bd.first': ['First exam sent', 'Erste Prüfung gesendet'], 'bd.exams': ['{n} exams done', '{n} Prüfungen geschafft'], 'bd.streak': ['Practice streak: {n} days', 'Übungsserie: {n} Tage'],
  'prog.noRank': ['No ranking and no comparison with classmates.', 'Kein Ranking und kein Vergleich mit Mitschülern.'],

  /* notifications */
  'notif.title': ['Messages for you', 'Nachrichten für dich'], 'notif.none': ['No messages yet.', 'Noch keine Nachrichten.'],
  'notif.quiet': ['Quiet hours: no messages between {a} and {b}.', 'Ruhezeiten: keine Nachrichten zwischen {a} und {b}.'],
  'n.sent': ['Your exam was sent to Ms. Nadine.', 'Deine Prüfung wurde an Frau Nadine gesendet.'], 'n.result': ['Your Math result is ready.', 'Dein Mathe-Ergebnis ist da.'],
  'n.rescan': ['Ms. Nadine asks: please scan page 2 again.', 'Frau Nadine bittet: Bitte scanne Seite 2 noch einmal.'],
  'n.newexam': ['New exam from Youssef A. to verify.', 'Neue Prüfung von Youssef A. zu prüfen.'], 'n.graded': ['AI grading for Youssef A. is ready to confirm.', 'KI-Bewertung für Youssef A. wartet auf Bestätigung.'],
  'n.released': ['You released the results to Youssef A.', 'Du hast die Ergebnisse an Youssef A. freigegeben.'],

  /* teacher: dashboard, queue */
  't.dash': ['Grade {c} Math', 'Klasse {c} Mathe'], 'st.verify': ['To verify', 'Zu prüfen'], 'st.confirm': ['To confirm', 'Zu bestätigen'], 'st.done': ['Done', 'Fertig'], 'st.support': ['Extra support', 'Extra Unterstützung'],
  'q.flags': ['Red flags', 'Rote Flaggen'], 'q.student': ['Student', 'Schüler'], 'q.exam': ['Exam', 'Prüfung'], 'q.lang': ['Language', 'Sprache'], 'q.status': ['Status', 'Status'], 'q.flag': ['Flag', 'Flagge'], 'q.none': ['No exams match.', 'Keine passenden Prüfungen.'],
  't.weak': ['Class weak topics', 'Schwache Themen der Klasse'], 't.weak.d': ['Students with a repeated mistake in this topic', 'Schüler mit wiederholtem Fehler in diesem Thema'], 't.weak.b': ['Open class gaps', 'Klassenlücken öffnen'],
  't.empty.t': ['No exam from Youssef yet', 'Noch keine Prüfung von Youssef'], 't.empty.d': ['Send one in the student view, or load the sample exam to start as the teacher.', 'Sende eine in der Schüleransicht oder lade die Beispielprüfung, um als Lehrerin zu starten.'],
  't.empty.b': ['Load sample exam (demo shortcut)', 'Beispielprüfung laden (Demo-Abkürzung)'], 't.empty.ok': ['Sample exam added to the queue', 'Beispielprüfung zur Liste hinzugefügt'],

  /* teacher: verify */
  'vf.title': ['Verify the extracted text', 'Extrahierten Text prüfen'], 'vf.q': ['Question {n}', 'Frage {n}'], 'vf.of': ['of {n}', 'von {n}'],
  'vf.scan': ['Scanned answer', 'Gescannte Antwort'], 'vf.text': ['Extracted text', 'Extrahierter Text'], 'vf.rescan': ['Ask for re-scan', 'Neuen Scan anfordern'], 'vf.rescan.sent': ['Re-scan requested', 'Neuer Scan angefordert'],
  'vf.tapword': ['Tap a word to correct it. The same word is marked on the scan.', 'Tippe auf ein Wort, um es zu korrigieren. Das Wort wird auch im Scan markiert.'],
  'vf.low': ['Low confidence:', 'Unsicher:'], 'vf.fix': ['Correct text', 'Korrekter Text'], 'vf.save': ['Save', 'Speichern'], 'vf.right': ['Looks right', 'Passt so'],
  'vf.dec.t': ['Decimal comma check', 'Dezimalkomma prüfen'], 'vf.dec.d': ['German writes 1,5 for one and a half. Confirm it was not read as 15.', 'Im Deutschen heißt 1,5 eineinhalb. Bestätige, dass es nicht als 15 gelesen wurde.'], 'vf.dec.b': ['Confirm 1,5', '1,5 bestätigen'], 'vf.dec.ok': ['Numbers checked', 'Zahlen geprüft'],
  'vf.langtag': ['Answer language', 'Sprache der Antwort'], 'vf.mix': ['Mixed', 'Gemischt'],
  'vf.left': ['{n} to check', '{n} zu prüfen'], 'vf.next': ['Next uncertain', 'Nächste unsichere'], 'vf.saved': ['Saved {n}', 'Gespeichert {n}'], 'vf.autosave': ['Autosave on', 'Automatisch speichern an'],
  'vf.send': ['Verified: send to AI grading', 'Geprüft: an KI-Bewertung senden'], 'vf.sent': ['Text verified, AI grading ready', 'Text geprüft, KI-Bewertung bereit'], 'vf.stillleft': ['{n} items still to check', 'Noch {n} Punkte zu prüfen'], 'vf.awaitRescan': ['Wait for the child to re-scan the requested page.', 'Warte, bis das Kind die angeforderte Seite erneut scannt.'],
  'vf.done.t': ['Text already verified', 'Text bereits geprüft'], 'vf.done.d': ['The next step is confirming the grades.', 'Der nächste Schritt ist das Bestätigen der Noten.'], 'vf.done.b': ['Continue', 'Weiter'],
  'rescan.t': ['Ask the child to scan again', 'Kind bittet, neu zu scannen'], 'rescan.d': ['The child gets a short, kind message. Nothing is guessed.', 'Das Kind bekommt eine kurze, freundliche Nachricht. Es wird nichts geraten.'],
  'rescan.note': ['Message', 'Nachricht'], 'rescan.default': ['Please scan page 2 again with more light. Thank you!', 'Bitte scanne Seite 2 noch einmal mit mehr Licht. Danke!'], 'rescan.send': ['Send to student', 'An Schüler senden'], 'rescan.ok': ['Re-scan request sent', 'Anfrage für neuen Scan gesendet'],

  /* teacher: confirm */
  'cf.title': ['Review the AI grade', 'KI-Bewertung prüfen'], 'cf.sub': ['Mock AI scores are illustrative, not recalculated from uploaded files. Tick earned steps; changes are highlighted.', 'Simulierte KI-Punkte werden nicht aus hochgeladenen Dateien neu berechnet. Hake erreichte Schritte an; Änderungen werden markiert.'],
  'cf.q': ['Q', 'F'], 'cf.ans': ['Student answer (verified)', 'Antwort (geprüft)'], 'cf.ai': ['AI score', 'KI-Punkte'], 'cf.why': ['Why the AI gave this score', 'Warum die KI diese Punkte gab'], 'cf.steps': ['Marks per step', 'Punkte je Schritt'], 'cf.yours': ['Your score', 'Deine Punkte'], 'cf.changed': ['changed', 'geändert'],
  'cf.aitotal': ['AI total: {n} / {m} ({p}%)', 'KI-Summe: {n} / {m} ({p}%)'], 'cf.yourtotal': ['Your total: {n} / {m} ({p}%)', 'Deine Summe: {n} / {m} ({p}%)'], 'cf.nchanged': ['{n} changed by you', '{n} von dir geändert'],
  'cf.export': ['Export to spreadsheet', 'Als Tabelle exportieren'], 'cf.accept': ['Accept all AI scores', 'Alle KI-Punkte übernehmen'], 'cf.confirm': ['Confirm grades', 'Noten bestätigen'],
  'cf.accepted': ['AI scores restored', 'KI-Punkte übernommen'], 'cf.confirmed': ['Grades confirmed. Nothing is shown to the student yet.', 'Noten bestätigt. Der Schüler sieht noch nichts.'], 'cf.exported': ['Spreadsheet downloaded', 'Tabelle heruntergeladen'],
  'cf.first.t': ['Verify the text first', 'Prüfe zuerst den Text'], 'cf.first.d': ['AI grading starts only after you have verified the extracted text.', 'Die KI-Bewertung startet erst, nachdem du den Text geprüft hast.'],

  /* teacher: review gap, flag, feedback */
  'rv.title': ['Learning gap, red flag and feedback', 'Lernlücke, rote Flagge und Rückmeldung'], 'rv.first.t': ['Confirm the grades first', 'Bestätige zuerst die Noten'], 'rv.first.d': ['The gap and flag are shown after the grade is confirmed.', 'Lücke und Flagge folgen, sobald die Note bestätigt ist.'], 'rv.first.b': ['Continue', 'Weiter'],
  'rv.gap': ['Suggested learning gap', 'Vorgeschlagene Lernlücke'], 'gap.name': ['Comparing fractions', 'Brüche vergleichen'], 'gap.name.other': ['/ Brüche vergleichen', '/ Comparing fractions'],
  'gap.mistake': ['Compares only the numerators and ignores the denominators.', 'Vergleicht nur die Zähler und ignoriert die Nenner.'],
  'rv.conf': ['Rule met (mock evidence)', 'Regel erfüllt (Beispielbelege)'], 'rv.rule.unmet': ['Below chosen gap threshold — teacher review needed', 'Unter gewähltem Schwellenwert — Lehrerin muss prüfen'], 'rv.rule': ['Gap rule: {n}+ questions or {n}+ exams', 'Lückenregel: {n}+ Fragen oder {n}+ Prüfungen'],
  'rv.mistake': ['Repeated mistake', 'Wiederholter Fehler'], 'rv.evidence': ['Evidence', 'Belege'],
  'act.confirm': ['Confirm', 'Bestätigen'], 'act.edit': ['Edit', 'Bearbeiten'], 'act.dismiss': ['Dismiss', 'Verwerfen'],
  'dec.confirmed': ['Confirmed', 'Bestätigt'], 'dec.dismissed': ['Dismissed', 'Verworfen'],
  'rv.flag': ['Red flag', 'Rote Flagge'], 'rv.flag.t': ['Needs extra support: {g}', 'Braucht extra Unterstützung: {g}'], 'rv.sev': ['Severity', 'Schweregrad'],
  'sev.low': ['Low', 'Niedrig'], 'sev.medium': ['Medium', 'Mittel'], 'sev.high': ['High', 'Hoch'],
  'rv.why': ['Why it was raised', 'Warum sie gesetzt wurde'], 'rv.why.d': ['The same fraction-comparison mistake appears in three consecutive exams (Sep 21, Oct 5 and Oct 12).', 'Derselbe Fehler beim Vergleichen von Brüchen tritt in drei Prüfungen nacheinander auf (21. Sep, 5. Okt und 12. Okt).'],
  'rv.dismiss': ['If you dismiss it, tell us why', 'Wenn du sie verwirfst, sag uns warum'], 'rv.reason': ['Choose a reason', 'Grund wählen'],
  'dr.slip': ['One-off slip', 'Einmaliger Ausrutscher'], 'dr.agreed': ['Already agreed with parents', 'Schon mit Eltern besprochen'], 'dr.other': ['Other', 'Anderes'],
  'rv.flag.confirm': ['Confirm flag', 'Flagge bestätigen'], 'rv.flag.dismiss': ['Dismiss flag', 'Flagge verwerfen'], 'rv.needreason': ['Choose a reason to dismiss', 'Wähle einen Grund zum Verwerfen'],
  'rv.teacheronly': ['Severity and reason are visible to you only.', 'Schweregrad und Grund sind nur für dich sichtbar.'],
  'rv.fb': ['Feedback for {n}', 'Rückmeldung für {n}'], 'fb.both': ['Both', 'Beide'],
  'fb.en.default': ['Great job on multiplication, Youssef. Let us practise comparing fractions with different denominators this week.', 'Great job on multiplication, Youssef. Let us practise comparing fractions with different denominators this week.'],
  'fb.de.default': ['Tolle Arbeit bei der Multiplikation, Youssef. Diese Woche üben wir, Brüche mit verschiedenen Nennern zu vergleichen.', 'Tolle Arbeit bei der Multiplikation, Youssef. Diese Woche üben wir, Brüche mit verschiedenen Nennern zu vergleichen.'],
  'rv.prac': ['Practice task', 'Übungsaufgabe'], 'pt.compare': ['Compare fractions (5 min)', 'Brüche vergleichen (5 Min.)'], 'pt.line': ['Fractions on a number line (5 min)', 'Brüche am Zahlenstrahl (5 Min.)'], 'pt.word': ['Word problems (10 min)', 'Sachaufgaben (10 Min.)'],
  'rv.sendto': ['Send to', 'Senden an'], 'rv.sheet': ['Printable practice sheet', 'Druckbares Arbeitsblatt'],
  'rv.release': ['Release to student', 'Für Schüler freigeben'], 'rv.needs': ['Decide on the gap and the red flag first.', 'Entscheide zuerst über Lücke und Flagge.'],
  'rv.released.t': ['Released to Youssef', 'An Youssef freigegeben'], 'rv.released.d': ['He now sees his grade, the things to practise and your message.', 'Er sieht jetzt seine Note, das Üben und deine Nachricht.'],
  'rv.see.s': ['See student view', 'Schüleransicht ansehen'], 'rv.see.p': ['See parent view', 'Elternansicht ansehen'],

  /* teacher: gaps, students, messages, settings, batch */
  'gaps.n': ['{n} students', '{n} Schüler'], 'gaps.open': ['Students with the gap:', 'Schüler mit der Lücke:'],
  'students.class': ['Class', 'Klasse'], 'students.last': ['Last exam', 'Letzte Prüfung'], 'students.msg': ['Message', 'Nachricht'], 'students.msgok': ['Message to {n} (demo)', 'Nachricht an {n} (Demo)'],
  'msgs.group': ['Grouped alerts', 'Gruppierte Hinweise'], 'msgs.group.d': ['{n} exams are waiting to be verified', '{n} Prüfungen warten auf Prüfung'], 'msgs.group.s': ['One alert for the whole queue, not one per exam', 'Ein Hinweis für die ganze Liste, nicht einer pro Prüfung'], 'msgs.log': ['Your recent alerts', 'Deine letzten Hinweise'],
  'set.mode': ['Default mode for this class', 'Standardmodus für diese Klasse'], 'set.mode.d': ['Picture mode for Grades 1–2, reader mode for Grades 3–5.', 'Bildmodus für Klasse 1–2, Lesemodus für Klasse 3–5.'],
  'set.gap': ['When is a mistake a gap?', 'Ab wann ist ein Fehler eine Lücke?'], 'set.gap.d': ['Set how many repeated questions make a gap, per grade.', 'Lege fest, wie viele wiederholte Fragen eine Lücke ergeben, je Klasse.'], 'set.grade': ['Grade {n}', 'Klasse {n}'], 'set.questions': ['questions', 'Fragen'],
  'set.quiet': ['Quiet hours', 'Ruhezeiten'], 'set.from': ['From', 'Von'], 'set.to': ['To', 'Bis'], 'set.quiet.d': ['No messages to students or parents in this time. Your own alerts are grouped.', 'Keine Nachrichten an Schüler oder Eltern in dieser Zeit. Deine Hinweise werden gruppiert.'], 'set.saved': ['Saved', 'Gespeichert'],
  'batch.drop': ['Drop a whole class set of scans here', 'Lege hier einen ganzen Klassensatz Scans ab'], 'batch.d': ['Demo: choosing files shows the fixed sample class, not automatic recognition.', 'Demo: Bei der Dateiauswahl erscheint eine feste Beispielklasse, keine automatische Erkennung.'], 'batch.choose': ['Choose files', 'Dateien wählen'], 'batch.sample': ['Use sample class set', 'Beispiel-Klassensatz nutzen'],
  'batch.found': ['Found 5 students', '5 Schüler erkannt'], 'batch.conf': ['Name match', 'Namens-Treffer'], 'batch.check': ['Check name', 'Namen prüfen'], 'batch.add': ['Add {n} exams to the queue', '{n} Prüfungen zur Liste hinzufügen'], 'batch.added': ['{n} exams added to the queue', '{n} Prüfungen zur Liste hinzugefügt'],

  /* parent */
  'par.grade': ['Grade', 'Klasse'], 'par.only': ['Only results confirmed by the teacher are shown.', 'Es werden nur Ergebnisse gezeigt, die die Lehrerin bestätigt hat.'],
  'par.latest': ['Latest result', 'Letztes Ergebnis'], 'par.pct': ['{p}% correct', '{p}% richtig'], 'par.confirmed': ['Confirmed by {n}', 'Bestätigt von {n}'], 'par.none': ['No confirmed result yet.', 'Noch kein bestätigtes Ergebnis.'],
  'par.none2': ['Nothing to practise yet.', 'Noch nichts zu üben.'], 'par.help': ['Extra help is planned in class.', 'Extra Hilfe ist im Unterricht geplant.'], 'par.sent': ['A practice task was sent to {n}.', 'Eine Übung wurde an {n} gesendet.'],
  'par.flags': ['Support flags', 'Unterstützungs-Flaggen'], 'par.flag': ['1 confirmed by {n}', '1 von {n} bestätigt'], 'par.noflag': ['No confirmed flags.', 'Keine bestätigten Flaggen.'],
  'par.progress': ['Progress across exams', 'Fortschritt über Prüfungen'], 'par.weekly': ['Friday summary preview (demo)', 'Vorschau der Freitagsübersicht (Demo)'], 'par.print': ['Printable report', 'Druckbarer Bericht'],
  'weekly.sub': ['Youssef’s week in Math', 'Youssefs Woche in Mathe'], 'weekly.en': ['Youssef scored {n} of {m} in the Fractions test, checked by Ms. Nadine. Next week we practise comparing fractions. At home: ask him to draw two bars and say which is bigger.', 'Youssef scored {n} of {m} in the Fractions test, checked by Ms. Nadine. Next week we practise comparing fractions. At home: ask him to draw two bars and say which is bigger.'],
  'weekly.de': ['Youssef erreichte {n} von {m} im Brüche-Test, geprüft von Frau Nadine. Nächste Woche üben wir, Brüche zu vergleichen. Zu Hause: Lassen Sie ihn zwei Balken zeichnen und sagen, welcher größer ist.', 'Youssef erreichte {n} von {m} im Brüche-Test, geprüft von Frau Nadine. Nächste Woche üben wir, Brüche zu vergleichen. Zu Hause: Lassen Sie ihn zwei Balken zeichnen und sagen, welcher größer ist.'],

  /* printable pages */
  'print.btn': ['Print', 'Drucken'],
  'ws.title': ['Practice sheet: comparing fractions', 'Arbeitsblatt: Brüche vergleichen'], 'ws.name': ['Name', 'Name'], 'ws.date': ['Date', 'Datum'],
  'ws.how': ['Colour the bars and circle the bigger fraction.', 'Male die Balken an und kreise den größeren Bruch ein.'], 'ws.left': ['left', 'links'], 'ws.same': ['same', 'gleich'], 'ws.right': ['right', 'rechts'],
  'ws.foot': ['From Ms. Nadine, Grade 4B', 'Von Frau Nadine, Klasse 4B'],
  'rep.title': ['Report for parents', 'Bericht für Eltern'], 'rep.conf': ['Confirmed by', 'Bestätigt von'], 'rep.date': ['Date', 'Datum'], 'rep.pts': ['Points', 'Punkte']
};
