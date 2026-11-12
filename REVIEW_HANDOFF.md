# LernStar — Milestone 3 code review and handoff

**Review date:** 11 November 2026
**Upstream:** https://github.com/Samerbdwy/lernstar-prototype (baseline commit `7b7a552`)
**Review copy:** `D:\ChatGPT_Workspace\Repos\LernStar-Milestone3-Review`
**Scope:** local clone only. The teammates' upstream `main` and existing GitHub Pages deployment were **not** changed.

## What was fixed

- Parent printable report now checks both **teacher release** and the **to-parent sharing option**, including when its URL is opened directly; parent progress no longer includes the new exam when sharing is disabled.
- Release action rejects a missing OCR verification, grade confirmation, gap decision, flag decision, or outstanding re-scan request. A child re-scan acknowledgement clears the simulated wait.
- OCR **answer language** (English, German, mixed) is saved separately for each question instead of having a no-op selection handler.
- Q4's second point now assesses **correct German decimal-comma notation** rather than a unit that the question never requested. The walkthrough still goes from **7/11 to 8/11** after teacher review.
- Teacher gap-rule setting now changes whether the sample evidence meets the threshold; teachers can still make their own review decision.
- Quiet-hours rule defers newly generated student notifications in the prototype UI until a non-quiet viewing period. This is **not** real push scheduling.
- Student file picker now accepts filenames for image/PDF mock pages, with a visible note that the contents are not OCR processed. The *Take photo* path remains a simulation.
- Disabled the incomplete **Plants** exam option so the student cannot select Plants but be marked on the Fractions dataset.
- Child practice shows **one question at a time**, prevents advancement before the current question is answered, and does not award a completed streak for wrong answers.
- Keyboard Enter/Space can open focusable teacher queue rows.
- Mobile accessibility control is compact and the page has extra bottom spacing.
- Existing `localStorage` records are merged with new state defaults, avoiding missing-field errors.
- Clarified mock behavior in UI and README; added regression tests.

## What I verified

- `node --test tests/review.test.cjs`: **11 passed / 0 failed**.
- `node --check` for JavaScript files: passed.
- `git diff --check`: passed.
- Interactive localhost browser walkthrough: Student login → choose Fractions → capture three mock pages and retake blurry one → submit → hidden result → Teacher corrects Q3/Q6/Q8 OCR and confirms decimal comma → AI grade review → teacher changes 7/11 to 8/11 → confirms gap/flag → Release → Student sees **8 of 11** and feedback. No browser page errors were reported in the tested flow.
- Browser visual check at desktop and at a 375px mobile viewport.

## Mandatory human checks / blockers (DO NOT mark complete automatically)

1. **Real teacher interview.** The course brief requires interviewing at least one *real* teacher. Milestone 2, section 2, explicitly labels its teacher interview an AI role-play. This is a substantive academic noncompliance. Obtain a genuine teacher interview and submit the recording/transcript with proper provenance, revise the personas/evidence as appropriate, or obtain the TA's explicit written ruling. Do not misrepresent the simulated interview as real.
2. **Walkthrough video accuracy.** The submitted video runs approximately 3:45 (within the 2–4-minute rule), but Q4's rubric was corrected in code. Rewatch the voice-over/screens and re-record or adjust any outdated reference to “Unit written,” then confirm the new recording is still within 2–4 minutes.
3. **AI conversation history and academic integrity.** The Milestone 3 PDF says the appendix omits Claude tool calls/outputs, while the brief requests the full chat and prompt history. Confirm what the TA accepts and provide missing logs if required. The separate originality/research-gap claim must be supported by the actual reviewed sources.
4. **Reconcile PDF with updated code.** Check Milestone 3 section 3/4 and the HTD screenshots against the now-disabled Plants option, Q4 label, one-ta[REDACTED] practice, and explicit mock upload behavior. Update submission PDFs where statements/screenshots materially differ.
5. **Deploy/access checks.** This local review branch is not the public website. Test the exact *final* deployed URL, the GitHub repository, and the Drive walkthrough in a fresh incognito window with no signed-in account. Verify the TA has access.
6. **Two real users / devices.** Have a teacher actually navigate the correction, grading and red-flag decisions; have a child/representative try Student upload, feedback and one-question practice without coaching. Run a real phone/tablet touch check (375px preview alone is insufficient). Test German speech/audio on the intended device.
7. **Export and printing.** Manually open exported `draft-grades-4B.csv` or `confirmed-grades-4B.csv` in a spreadsheet and check all eight rows, 8/11 and German characters. Print/preview both worksheet and parent report. Before teacher release and when `Send to Parent` is off, no new parent feedback/result should appear.
8. **Prototype honesty.** There is deliberately no backend: login is not authentication; scans, AI grading, batch recognition and Friday summary are simulated. Make this explicit in the presentation; do not claim the uploaded file was analyzed.

## Re-run locally

```powershell
cd D:\ChatGPT_Workspace\Repos\LernStar-Milestone3-Review
node --test tests/review.test.cjs
python -m http.server 8000
```

Open http://localhost:8000 (or use the free port shown by Python). Click **Reset demo** for a fresh end-to-end run. Use the numbered sequence in README. No npm dependencies or build step are necessary.

## Handoff decision

The interactive **main Fractions demo** has been exercised and is substantially more consistent with its requirements. The academic real-interview blocker and final submission permissions/video/user testing cannot be resolved through code; they require a team decision and manual evidence. **Do not submit the unchanged upstream deployment as the corrected version.**

## Follow-up UX interaction fixes (11 November 2026)

- Implemented teacher→student messages and student→teacher replies with browser-local persistence and unread counts. Student inbox is the Youssef demo only; other student recipients are clearly marked sample-only outbox items.
- Teacher queue sample rows now open read-only data previews instead of inert toast messages.
- Added Teacher Settings effect preview, clamped thresholds to 1–6 and apply the saved class default upon re-entering Student.
- Clarified quiet hours only defer alert badges; users may still open messages. No background delivery or server messages.
- Added tests/messaging.test.cjs (10 tests) alongside the 11 original tests. Manual browser verification included cross-role send/reply and mobile Settings view. Existing academic and publishing blockers above remain unchanged.
- To recheck: run node --test tests/review.test.cjs tests/messaging.test.cjs.
