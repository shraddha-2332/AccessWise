import React from 'react';

const principles = [
  {
    title: 'Human impact beats compliance theater',
    body: 'A useful audit explains which people get blocked from completing a service, not just which rule was violated.',
  },
  {
    title: 'Essential platforms need plain-language design',
    body: 'Scholarship, healthcare, job, and civic portals often fail because instructions are dense, stressful, and unforgiving for first-time users.',
  },
  {
    title: 'Different services fail in different ways',
    body: 'A job portal, hospital booking flow, and scholarship form should not be reviewed with the same assumptions or the same remediation playbook.',
  },
];

const personas = [
  {
    title: 'First-time applicant',
    body: 'Needs calm, explicit guidance and cannot rely on insider knowledge to complete the flow.',
  },
  {
    title: 'Low-bandwidth user',
    body: 'May use shared devices, unstable internet, or limited upload time, so one-sitting flows become exclusionary.',
  },
  {
    title: 'Translation-dependent user',
    body: 'Needs plain language and multilingual cues to avoid being filtered out by English-heavy instructions.',
  },
];

export function KnowledgeRail({ education, stats }) {
  return (
    <aside className="knowledge-rail">
      {stats ? (
        <div className="panel">
          <p className="kicker">Portfolio signals</p>
          <h3>What your inclusion trail is showing</h3>
          <div className="knowledge-list">
            {(stats.topCategories || []).length === 0 ? (
              <article className="knowledge-card">
                <h4>No dominant issue category yet</h4>
                <p>As more audits are completed, the system will surface the barriers that repeatedly hurt service access.</p>
              </article>
            ) : (
              stats.topCategories.map((item) => (
                <article key={item.category} className="knowledge-card">
                  <h4>{item.category}</h4>
                  <p>{item.count} flagged findings across saved audits.</p>
                </article>
              ))
            )}
          </div>
        </div>
      ) : null}

      <div className="panel">
        <p className="kicker">Why this is different</p>
        <h3>Built as an inclusive service copilot, not a generic checker.</h3>
        <div className="knowledge-list">
          {principles.map((item) => (
            <article key={item.title} className="knowledge-card">
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="panel">
        <p className="kicker">Persona lens</p>
        <h3>Who this audit is protecting</h3>
        <div className="knowledge-list">
          {personas.map((item) => (
            <article key={item.title} className="knowledge-card">
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>

      {education ? (
        <div className="panel">
          <p className="kicker">Audit guidance</p>
          <h3>Inclusion principles from the API</h3>
          <div className="knowledge-list">
            {education.guides.map((item) => (
              <article key={item.id} className="knowledge-card">
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </article>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
