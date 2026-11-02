import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { TransitionProvider } from './lib/transition';
import { Nav } from './components/Nav';
import { Loader } from './components/Loader';
import { Cursor } from './components/Cursor';
import Home from './pages/Home';
import CaseStudy from './pages/CaseStudy';
import NotFound from './pages/NotFound';
import './styles/base.css';
import './styles/hero.css';
import './styles/layout.css';
import './styles/work.css';
import './styles/previews.css';
import './styles/case.css';

// the browser shouldn't restore old scroll positions across our own route transitions
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Loader />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Cursor />
      </TransitionProvider>
    </BrowserRouter>
  </StrictMode>,
);
