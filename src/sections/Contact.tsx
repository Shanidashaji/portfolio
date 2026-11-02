import { useState } from 'react';
import { profile } from '../data/profile';
import { Arrow, LocalTime, Split } from '../components/Bits';

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  const channels = [
    { k: 'Email', v: profile.email, href: `mailto:${profile.email}` },
    { k: 'Phone', v: profile.phone, href: profile.phoneHref },
    ...profile.links.map((l) => ({ k: l.label, v: l.handle, href: l.href, ext: true })),
    { k: 'Résumé', v: 'PDF, 2 pages', href: profile.resume, ext: true },
  ];

  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="shell">
        <p className="sec-head__idx mono contact__idx">
          <b>05</b>
          <span>/</span>
          <span>Contact</span>
        </p>
        <h2 id="contact-title" className="contact__title display">
          <Split text="Got something" data-reveal="chars" />
          <br />
          <Split text="to build?" className="accent" data-reveal="chars" data-delay="0.1" />
        </h2>

        <div className="contact__mail" data-reveal="up">
          <a className="contact__email" href={`mailto:${profile.email}`} data-cursor="Write">
            {profile.email}
          </a>
          <button className="btn" onClick={copy} aria-live="polite">
            {copied ? 'Copied ✓' : 'Copy address'}
          </button>
        </div>

        <ul className="channels" data-reveal="stagger">
          {channels.map((c) => (
            <li key={c.k}>
              <a href={c.href} {...(c.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="channel">
                <span className="mono muted">{c.k}</span>
                <span className="channel__v">{c.v}</span>
                <Arrow />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <footer className="footer shell">
        <span className="mono muted">© 2026 {profile.name}</span>
        <span className="mono muted">
          {profile.location} · <LocalTime />
        </span>
        <span className="mono muted">Built with React, GSAP &amp; Vite</span>
        <a className="mono link-u" href="#home">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
