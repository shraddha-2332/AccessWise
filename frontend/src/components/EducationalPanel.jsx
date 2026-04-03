import React from 'react';

const guidance = [
  {
    title: 'Hiring and talent acquisition',
    body: 'Remove coded fit terms, age signals, and class markers. Keep requirements essential and mention accommodations explicitly.',
  },
  {
    title: 'Marketing and public messaging',
    body: 'Avoid implying who is worthy, successful, advanced, or normal. Segment by need or use case instead of identity stereotypes.',
  },
  {
    title: 'Education and learning content',
    body: 'Use asset-based language. Describe support needs without framing learners or families as inherently lacking.',
  },
];

export const EducationalPanel = () => (
  <section className="card-panel p-8">
    <p className="eyebrow">Practice guidance</p>
    <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-3xl font-semibold text-white">What professional teams look for during review</h2>
        <p className="mt-3 max-w-3xl text-stone-300">
          Inclusion review works best when teams connect language choices to operational risk, accessibility, and audience trust.
        </p>
      </div>
    </div>

    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {guidance.map((item) => (
        <article key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-stone-300">{item.body}</p>
        </article>
      ))}
    </div>
  </section>
);
