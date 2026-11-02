import { principles, profile, publication } from '../data/profile';
import { SecHead, Split, Ticks } from '../components/Bits';
import { Tilt } from '../components/ProjectMedia';

const facts = [
  ['Based in', profile.location],
  ['Currently', 'Full Stack Developer, D4DX Innovations'],
  ['Degree', 'MCA, 2026 · BCA, 2023'],
  ['Published', `${publication.venue}, ${publication.date}`],
  ['Speaks', profile.languages.join(', ')],
];

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="shell">
        <SecHead id="about-title" index="01" label="About" title="About" aside="Who is behind the code, and how the work gets done." />

        <div className="about__grid">
          <div className="about__lead">
            <figure className="portrait">
              <Tilt max={4}>
                <div className="portrait__frame" data-reveal="clip">
                  {/* reveal zoom runs on the wrapper so it never fights the CSS drift on the img */}
                  <div className="portrait__media" data-reveal-inner>
                    <img
                      src="/shanida-portrait-720.webp"
                      srcSet="/shanida-portrait-480.webp 480w, /shanida-portrait-720.webp 720w"
                      sizes="(max-width: 900px) 70vw, 360px"
                      width={720}
                      height={900}
                      alt={`Illustrated portrait of ${profile.name}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <span className="portrait__glint" aria-hidden="true" />
                  <Ticks />
                </div>
              </Tilt>
              <span className="portrait__hello mono" aria-hidden="true">
                Hi, I’m {profile.firstName} ✳
              </span>
              <figcaption className="portrait__cap mono muted">Illustrated from a photo</figcaption>
            </figure>
            <Split
              as="p"
              className="about__statement display"
              text="Fresh out of an MCA and already shipping on seven products."
              data-reveal="chars"
            />
            <dl className="about__facts" data-reveal="stagger">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="about__body">
            <p data-reveal="up">
              I’m Shanida — a full-stack developer at D4DX Innovations in Kerala. My work moves between the screen and the
              server: building mobile-first layouts, administrative dashboards and login pages, then tracing API issues and
              working on the examination, results and report-generation features that people rely on.
            </p>
            <p data-reveal="up">
              Before D4DX I interned at Riss Technologies on Python full-stack tasks — backend functionality and database
              integration. Through a BCA and an MCA I built a fire-detection system with computer vision, a Flutter and Flask
              meter-reading app, and a Django platform for a rural community, and published a paper on brain haemorrhage
              detection with deep learning.
            </p>

            <h3 className="about__sub mono" data-reveal="up">
              <span className="accent">↳</span> How I work
            </h3>
            <ol className="principles">
              {principles.map((p, i) => (
                <li key={p.k} className="principle" data-reveal="up">
                  <span className="principle__n mono">0{i + 1}</span>
                  <div>
                    <h4 className="principle__k">{p.k}</h4>
                    <p className="principle__v">{p.v}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
