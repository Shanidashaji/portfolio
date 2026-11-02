// Illustrative interface compositions for projects without public screenshots.
// They describe each product's purpose with abstract UI — no invented data,
// and every one is labelled as an illustration where it is shown.

const Bars = ({ n, seed = 1 }: { n: number; seed?: number }) => (
  <>
    {Array.from({ length: n }, (_, i) => (
      <i key={i} className="pv-skel" style={{ width: `${38 + ((i * 37 + seed * 23) % 52)}%` }} />
    ))}
  </>
);

export function QspotPreview() {
  const nav = ['Courses', 'Subjects', 'Quizzes', 'Questions', 'Gradebook', 'Certificates', 'Analytics'];
  return (
    <div className="pv pv--qspot">
      <aside className="pv-side">
        <b className="pv-logo">Qspot</b>
        {nav.map((n) => (
          <span key={n} className={n === 'Quizzes' ? 'is-on' : ''}>
            {n}
          </span>
        ))}
      </aside>
      <div className="pv-main">
        <div className="pv-head">
          <b>Quiz attempts</b>
          <span className="pv-chip">Results</span>
        </div>
        <div className="pv-table">
          {Array.from({ length: 6 }, (_, i) => (
            <div className="pv-row" key={i}>
              <i className="pv-dot" />
              <Bars n={1} seed={i} />
              <i className="pv-skel pv-skel--s" />
              <span className={`pv-status ${i % 3 === 1 ? 'is-pending' : ''}`}>{i % 3 === 1 ? 'Pending' : 'Graded'}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pv-phone">
        <div className="pv-phone__bar" />
        <span className="pv-q">Question</span>
        <i className="pv-progress">
          <i />
        </i>
        <Bars n={2} seed={4} />
        <div className="pv-opts">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={i === 2 ? 'is-on' : ''}>
              <i />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ElectionPreview() {
  return (
    <div className="pv pv--election">
      <div className="pv-results">
        <div className="pv-head">
          <b>Results</b>
          <span className="pv-chip">Published</span>
        </div>
        {[86, 64, 41, 22].map((w, i) => (
          <div className="pv-result" key={i}>
            <i className="pv-avatar" />
            <span className="pv-meter">
              <i style={{ width: `${w}%` }} />
            </span>
          </div>
        ))}
        <div className="pv-tiles">
          {['Voters', 'Groups', 'Nominees', 'Audit log'].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className="pv-phone pv-phone--ballot">
        <div className="pv-phone__bar" />
        <b className="pv-ballot-title">Ballot</b>
        <span className="pv-q">Select one nominee</span>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`pv-nominee ${i === 1 ? 'is-on' : ''}`}>
            <i className="pv-avatar" />
            <Bars n={1} seed={i + 2} />
            <i className="pv-radio" />
          </div>
        ))}
        <span className="pv-cta">Cast vote</span>
      </div>
    </div>
  );
}

export function MalarvadiPreview() {
  return (
    <div className="pv pv--malarvadi">
      <div className="pv-site-nav">
        <b>Malarvadi</b>
        <span className="pv-links">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="pv-lang">
          <em className="is-on">EN</em>
          <em>ML</em>
        </span>
      </div>
      <div className="pv-site-hero">
        <span className="pv-ml">Malarvadi</span>
        <Bars n={2} seed={7} />
        <span className="pv-cta">Programmes</span>
      </div>
      <div className="pv-timeline">
        {['1980', '2003', '2009', '2024'].map((y) => (
          <span key={y}>
            <i />
            {y}
          </span>
        ))}
      </div>
      <div className="pv-cards">
        {['Events', 'News', 'Gallery'].map((t) => (
          <span key={t}>
            <i />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function QscPreview() {
  return (
    <div className="pv pv--qsc">
      <div className="pv-login">
        <b className="pv-logo">QSC</b>
        <b className="pv-login__h">Sign in</b>
        <label>
          Email
          <i />
        </label>
        <label>
          Password
          <i />
        </label>
        <span className="pv-cta">Continue</span>
      </div>
      <div className="pv-dash">
        <div className="pv-head">
          <b>Dashboard</b>
          <i className="pv-avatar" />
        </div>
        <div className="pv-kpis">
          {[0, 1, 2].map((i) => (
            <span key={i}>
              <i className="pv-skel pv-skel--s" />
              <i className="pv-skel pv-skel--l" />
            </span>
          ))}
        </div>
        <div className="pv-chart">
          {[40, 62, 48, 75, 58, 88, 66, 92].map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  );
}
