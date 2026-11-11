# LernStar: AI-assisted assessment prototype (CSEN 909, Milestone 3)

Team **Scrum refusers** · German University in Cairo · Winter 2026

A coded, interactive front-end prototype (HTML, CSS, JavaScript, no build step, no framework, no backend).
It covers the whole workflow of the project brief:

Student uploads exam → OCR → teacher verifies text → AI grading → teacher confirms → learning gap → red flag → personalised feedback → student views results.

All names, scans and "AI" results are **mock data**, as the brief allows. Nothing is sent anywhere.

## Run it locally

```bash
cd lernstar-prototype   # the folder you cloned or unzipped
python3 -m http.server 8000     # or: npx serve .
# open http://localhost:8000
```

Opening `index.html` directly (double-click) also works in most browsers.
An internet connection is only needed for the Google Fonts (Nunito, Caveat, Atkinson Hyperlegible). Without it the page falls back to system fonts.

## Deploy (GitHub Pages)

1. Create a public repository and put the files of this folder at the **root** of the `main` branch (`index.html` must sit at the top level).
2. Repository → **Settings → Pages → Build and deployment → Source: Deploy from a branch → `main` / root → Save**.
3. After about a minute the site is live at `https://<user>.github.io/<repo>/`. Open it in an incognito window to check it.

(Vercel or Netlify also work: import the repository, framework "Other", no build command, output directory `.`.)

## How to test the full walk-through (5 minutes)

The grey **Prototype demo** bar on top switches between Student, Teacher and Parent, EN/DE, picture/reader mode, and **Reset demo**. "Feature tags" shows the feature IDs (U1.x, U2.x, S, T, X) from Milestone 2 on every screen.

1. **Student** → "I am a student" → Let's go → *Send my exam* → Next → *Take photo* three times (page 2 is blurry, tap *Retake*) → Next → *Send to my teacher*.
2. Open *My results*: the grade is hidden ("Ms. Nadine is checking your exam").
3. Switch to **Teacher** → dashboard → click Youssef's row → **Verify text**: tap the dashed words (Q3 "gröber", Q6 "Eintausand", Q8 "40"), correct them, confirm the decimal comma on Q4 (use *Next uncertain*) → *Verified: send to AI grading*.
4. **Review the AI grade**: tick the "Decimal-comma notation correct" step on Q4 (score changes, 7/11 → 8/11) → *Export to spreadsheet* (downloads a CSV) → *Confirm grades*.
5. **Gap, red flag, feedback**: *Confirm* the gap, *Confirm flag*, choose EN / DE / Both, *Release to student*.
6. Switch to **Student**: the green banner appears → *Open* → "8 of 11", things to practise, extra help from the teacher → *Start practice*, *My progress*.
7. Switch to **Parent**: confirmed result, weekly summary (EN/DE), printable report.
8. Extras: Teacher → *Class gaps*, *Settings* (gap rule per grade, quiet hours, default mode), *Batch upload*; Student/Teacher → *Printable practice sheet*; bottom-left **Accessibility** (larger text, high contrast, dyslexia-friendly font).

Shortcut: on the teacher dashboard, **Load sample exam** adds Youssef's exam without using the student view.

## Files

| File | Purpose |
|---|---|
| `index.html` | Page shell and script loading |
| `styles.css` | All styles (responsive, print styles for the worksheet and report) |
| `data.js` | Mock data: Youssef's exam (8 questions, 11 marks), history, queue, topics |
| `i18n.js` | All interface text in English and German |
| `core.js` | State, routing, icons, shell, demo bar |
| `student.js` | Landing, login, home, send exam, results, practice, progress, messages |
| `teacher.js` | Dashboard, queue, verify text, confirm grades, gap/flag/feedback, class gaps, settings, batch upload |
| `parent.js` | Parent view and the two printable pages |

State is kept in the browser's `localStorage` (use **Reset demo** to clear it).
The practice screen shows one question at a time for the child-centred interaction requirement.
The student upload picker accepts image/PDF filenames as mock pages; **no file contents are sent or OCR-processed**.
The camera flow, login, batch recognition, Friday email and AI scores are simulations.
Only the Fractions exam is an end-to-end scenario; the Plants card is disabled rather than silently showing the wrong grading flow.
New student notifications created during quiet hours are deferred in the on-screen Messages list until the next non-quiet viewing period; there is no real push service.

## Scope notes

- Responsive: the student view works at phone width (a family tablet or phone is the student persona's device). The teacher view works at phone width too, but is designed for a laptop.
- Speech ("Listen") uses the browser's built-in speech synthesis (English and German voices depend on the device).
- Printing uses the browser's print dialog (`Print` button on the worksheet and report pages).

## AI use

The prototype code and the HTD diagrams were produced with Claude (Anthropic) and reviewed by the team. The full AI chat history is included in the Milestone 3 submission PDF (Appendix B), as the course brief requires.

## Interactive messaging (local-only)

- Teacher → Students → Message now opens a composer. For Youssef A., send a short message, then switch to Student → bell / Messages for you to read it.
- From Student messages, Write to Ms. Nadine and send a reply; it appears under Teacher → Messages → Messages from Youssef.
- Teacher messages have an outbox and student messages have a sent-history view. Both persist with localStorage in this browser until Reset demo.
- Other named students and queue entries are sample-only; queue entries open honest read-only details and sent messages to sample students stay in the teacher outbox. Only Youssef has a simulated student inbox.
- Teacher → Settings shows live examples of how the mode, repeated-mistake threshold, and quiet hours affect the demo. The chosen default mode is applied on entering Student. Quiet hours defer alert badges, not access to the inbox.
- This is not a communication service: no genuine accounts, authentication, background jobs, server, secure storage or message delivery.

Run both suites:

    node --test tests/review.test.cjs tests/messaging.test.cjs
