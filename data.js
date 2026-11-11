/* Sample data for the LernStar prototype (CSEN 909, Milestone 3, team Scrum refusers).
   Everything is mock data. The "AI" results are hard-coded, as allowed by the project brief. */
window.DATA = {
  student: { id: 'youssef', name: 'Youssef A.', first: 'Youssef', grade: '4B' },
  teacher: { name: 'Ms. Nadine', class: '4B' },
  parent: { name: 'Mrs. Aya' },

  /* The one exam that is walked through end to end: 8 questions, 11 marks, German exam. */
  exam: {
    id: 'fractions',
    title: { en: 'Math: Fractions test', de: 'Mathe: Brüche-Test' },
    date: 'Oct 12',
    max: 11,
    questions: [
      { id: 1, q: { en: '6 × 7 = ?', de: '6 × 7 = ?' },
        truth: '6 × 7 = 42', ocr: '6 × 7 = 42', conf: {},
        steps: [{ en: 'Correct product', de: 'Richtiges Produkt', m: 1, ai: true }],
        reason: { en: 'Correct product.', de: 'Richtiges Produkt.' } },
      { id: 2, q: { en: '3/5 + 1/5 = ?', de: '3/5 + 1/5 = ?' },
        truth: '3/5 + 1/5 = 4/5', ocr: '3/5 + 1/5 = 4/5', conf: {},
        steps: [{ en: 'Correct sum', de: 'Richtige Summe', m: 1, ai: true }],
        reason: { en: 'Correct sum, same denominator.', de: 'Richtige Summe, gleicher Nenner.' } },
      { id: 3, q: { en: 'Which fraction is bigger: 2/5 or 1/2?', de: 'Welcher Bruch ist größer: 2/5 oder 1/2?' },
        truth: '2/5 ist größer, weil 2 mehr als 1 ist.', ocr: '2/5 ist gröber, weil 2 mehr als 1 ist.',
        conf: { 2: 62 },
        steps: [{ en: 'Right comparison', de: 'Richtiger Vergleich', m: 1, ai: false },
                { en: 'Reason shown', de: 'Begründung', m: 1, ai: false }],
        reason: { en: 'Compares only the numerators, so the order is wrong.', de: 'Vergleicht nur die Zähler, die Reihenfolge ist falsch.' } },
      { id: 4, q: { en: '1,5 + 2,25 = ?', de: '1,5 + 2,25 = ?' },
        truth: '1,5 + 2,25 = 3,75', ocr: '1,5 + 2,25 = 3,75',
        conf: {}, decimal: true,
        steps: [{ en: 'Correct sum', de: 'Richtige Summe', m: 1, ai: true },
                { en: 'Decimal-comma notation correct', de: 'Dezimalkomma korrekt verwendet', m: 1, ai: false }],
        reason: { en: 'Correct sum. The AI missed the correct decimal-comma notation; the teacher can restore this mark.', de: 'Richtige Summe. Die KI hat das korrekte Dezimalkomma übersehen; die Lehrerin kann diesen Punkt geben.' } },
      { id: 5, q: { en: 'Lena has 24 apples and shares them between 4 children. How many does each child get?',
                    de: 'Lena hat 24 Äpfel und teilt sie auf 4 Kinder auf. Wie viele bekommt jedes Kind?' },
        truth: '24 : 4 = 6 Äpfel', ocr: '24 : 4 = 6 Äpfel', conf: {},
        steps: [{ en: 'Right method', de: 'Richtige Rechnung', m: 1, ai: true },
                { en: 'Right answer', de: 'Richtige Antwort', m: 1, ai: true }],
        reason: { en: 'Correct method and answer.', de: 'Richtige Rechnung und Antwort.' } },
      { id: 6, q: { en: 'Write 1.000 in words.', de: 'Schreibe 1.000 in Worten.' },
        truth: 'Eintausend', ocr: 'Eintausand', conf: { 0: 71 },
        steps: [{ en: 'Correct word', de: 'Richtiges Wort', m: 1, ai: true }],
        reason: { en: 'Correct: 1.000 is one thousand.', de: 'Richtig: 1.000 ist eintausend.' } },
      { id: 7, q: { en: 'Which fraction is bigger: 3/10 or 1/2?', de: 'Welcher Bruch ist größer: 3/10 oder 1/2?' },
        truth: '3/10 ist größer, weil 3 mehr als 1 ist.', ocr: '3/10 ist größer, weil 3 mehr als 1 ist.', conf: {},
        steps: [{ en: 'Right comparison', de: 'Richtiger Vergleich', m: 1, ai: false }],
        reason: { en: 'Compares only the numerators, same mistake as question 3.', de: 'Vergleicht nur die Zähler, derselbe Fehler wie in Frage 3.' } },
      { id: 8, q: { en: 'What is 2,5 × 4?', de: 'Wie viel ist 2,5 × 4?' },
        truth: '2,5 × 4 = 10', ocr: '2,5 × 4 = 40', conf: { 4: 58 },
        steps: [{ en: 'Correct product', de: 'Richtiges Produkt', m: 1, ai: true }],
        reason: { en: 'Correct product.', de: 'Richtiges Produkt.' } }
    ]
  },

  /* Earlier confirmed results (out of 11 points) */
  history: {
    math: [{ d: 'Sep 7', s: 6 }, { d: 'Sep 21', s: 7 }, { d: 'Oct 5', s: 7 }],
    science: [{ d: 'Sep 14', s: 8 }, { d: 'Oct 1', s: 9 }]
  },

  /* Evidence for the learning gap (teacher-only until released) */
  evidence: [
    { where: { en: 'Q3, this exam', de: 'F3, diese Prüfung' }, text: { en: '“2/5 is bigger because 2 is more than 1”', de: '„2/5 ist größer, weil 2 mehr als 1 ist“' } },
    { where: { en: 'Q7, this exam', de: 'F7, diese Prüfung' }, text: { en: '“3/10 is bigger because 3 is more than 1”', de: '„3/10 ist größer, weil 3 mehr als 1 ist“' } },
    { where: { en: 'Exam 2, Oct 5', de: 'Prüfung 2, 5. Okt' }, text: { en: 'Same pattern in 1 of 4 questions', de: 'Dasselbe Muster in 1 von 4 Fragen' } },
    { where: { en: 'Exam 1, Sep 21', de: 'Prüfung 1, 21. Sep' }, text: { en: 'Same pattern in 2 of 4 questions', de: 'Dasselbe Muster in 2 von 4 Fragen' } }
  ],

  /* Queue rows other than Youssef's exam (which is driven by the live state) */
  queue: [
    { id: 'lina', name: 'Lina M.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'EN', status: 'verify', flag: false },
    { id: 'karim', name: 'Karim S.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'DE', status: 'verify', flag: false },
    { id: 'mariam', name: 'Mariam H.', exam: { en: 'Geometry', de: 'Geometrie' }, lang: 'EN', status: 'confirm', flag: true },
    { id: 'omar', name: 'Omar T.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'EN', status: 'done', flag: false },
    { id: 'salma', name: 'Salma R.', exam: { en: 'Geometry', de: 'Geometrie' }, lang: 'DE', status: 'verify', flag: true },
    { id: 'noah', name: 'Noah B.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'DE', status: 'done', flag: false }
  ],

  /* Names "read" from a class set in the batch upload demo */
  batch: [
    { name: 'Nour E.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'DE', conf: 96 },
    { name: 'Hana K.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'EN', conf: 94 },
    { name: 'Adam F.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'DE', conf: 91 },
    { name: 'Jana W.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'EN', conf: 88 },
    { name: 'Tarek L.', exam: { en: 'Fractions', de: 'Brüche' }, lang: 'DE', conf: 63 }
  ],

  topics: [
    { name: { en: 'Comparing fractions', de: 'Brüche vergleichen' }, share: 6 },
    { name: { en: 'Word problems', de: 'Sachaufgaben' }, share: 4 },
    { name: { en: 'Place value', de: 'Stellenwert' }, share: 2 },
    { name: { en: 'Multiplication', de: 'Multiplikation' }, share: 1 }
  ],

  students: [
    { name: 'Youssef A.', last: 'Math', flag: 'live' },
    { name: 'Lina M.', last: 'Math', flag: false },
    { name: 'Karim S.', last: 'Math', flag: false },
    { name: 'Mariam H.', last: 'Geometry', flag: true },
    { name: 'Omar T.', last: 'Math', flag: false },
    { name: 'Salma R.', last: 'Geometry', flag: true },
    { name: 'Noah B.', last: 'Math', flag: false }
  ]
};