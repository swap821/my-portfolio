import { useLiveCursors } from './hooks/useLiveCursors';
import Background3D from './components/Background3D';
import Navbar from './components/Navbar';

// Content Components
import Hero from './components/Hero';
import Skills from './components/Skills';
import ProjectSlider from './components/ProjectSlider';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Floating Global Widgets
import Chatbot from './components/Chatbot';
import GlobalReactions from './components/GlobalReactions';

/* ─────────────────────────────────────────────────────────────────
   Global CSS — all design tokens live here.
   Edit this single block to retheme the entire site.
───────────────────────────────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  :root {
    --font-display : 'Syne', sans-serif;
    --font-body    : 'DM Sans', sans-serif;

    /* Ink scale — warmer, more editorial */
    --ink-0 : #ffffff;
    --ink-1 : #e2e4ef;
    --ink-2 : #9499b0;
    --ink-3 : #565a70;

    /* Surface scale — deeper, richer blacks */
    --surf-0 : #06070a;
    --surf-1 : #0a0b10;
    --surf-2 : #10121a;
    --surf-3 : #181a24;
    --surf-4 : #1e202c;

    /* Primary accent — refined electric azure */
    --a-100  : #eef2ff;
    --a-300  : #a3c4ff;
    --a-400  : #6b9fff;
    --a-500  : #4d7dff;
    --a-600  : #345dd1;
    --a-glow : rgba(107,159,255,0.22);

    /* Secondary accent — sophisticated violet */
    --b-300  : #d4c6ff;
    --b-400  : #b49aff;
    --b-glow : rgba(180,154,255,0.18);

    /* Tertiary — subtle mint for variety */
    --c-400  : #7dd4c0;
    --c-glow : rgba(125,212,192,0.15);

    /* Border system */
    --brd-subtle : rgba(255,255,255,0.04);
    --brd-soft   : rgba(255,255,255,0.08);
    --brd-accent : rgba(107,159,255,0.30);

    /* Radii — 2026 pill-heavy system */
    --r-xs   : 4px;
    --r-sm   : 6px;
    --r-md   : 10px;
    --r-lg   : 14px;
    --r-xl   : 20px;
    --r-2xl  : 28px;
    --r-full : 9999px;

    /* Easing — more sophisticated curves */
    --ease-spring : cubic-bezier(0.34, 1.56, 0.64, 1);
    --ease-out    : cubic-bezier(0.16, 1, 0.3, 1);
    --ease-smooth : cubic-bezier(0.4, 0, 0.2, 1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    margin: 0;
    background: var(--surf-0);
    color: var(--ink-1);
    font-family: var(--font-body);
    font-size: 16px;
    line-height: 1.65;
    overflow-x: hidden;
  }

  /* Scrollbar — ultra refined */
  ::-webkit-scrollbar             { width: 5px; }
  ::-webkit-scrollbar-track       { background: transparent; }
  ::-webkit-scrollbar-thumb       { background: var(--surf-3); border-radius: var(--r-full); border: 1px solid transparent; background-clip: padding-box; }
  ::-webkit-scrollbar-thumb:hover { background: var(--a-500); }

  /* Selection — premium glow */
  ::selection { background: rgba(107,159,255,0.18); color: var(--ink-0); }

  /* Kill default cursor on desktop */
  @media (min-width: 768px) { * { cursor: none !important; } }

  /* ── Cursor ring — more refined glass ── */
  .app-cursor-ring {
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 1.5px solid rgba(107,159,255,0.45);
    background: radial-gradient(circle, rgba(107,159,255,0.08) 0%, transparent 70%);
    backdrop-filter: blur(6px) saturate(1.2);
    -webkit-backdrop-filter: blur(6px) saturate(1.2);
    transform: translate(-50%, -50%);
    transition: left 120ms var(--ease-out), top 120ms var(--ease-out), width 200ms var(--ease-spring), height 200ms var(--ease-spring);
    will-change: left, top;
    display: none;
    box-shadow: 0 0 20px rgba(107,159,255,0.08), inset 0 0 8px rgba(107,159,255,0.04);
  }
  @media (min-width: 768px) { .app-cursor-ring { display: block; } }

  /* ── Cursor dot — crisper glow ── */
  .app-cursor-dot {
    position: fixed;
    pointer-events: none;
    z-index: 10001;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--ink-0);
    transform: translate(-50%, -50%);
    transition: left 25ms linear, top 25ms linear;
    will-change: left, top;
    box-shadow: 0 0 10px rgba(255,255,255,0.8), 0 0 30px rgba(107,159,255,0.35), 0 0 60px rgba(107,159,255,0.1);
    display: none;
  }
  @media (min-width: 768px) { .app-cursor-dot { display: block; } }

  /* ── Guest cursor pill — premium glass ── */
  .app-guest-cursor {
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px 4px 8px;
    border-radius: var(--r-full);
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
    color: #fff;
    white-space: nowrap;
    backdrop-filter: blur(10px) saturate(1.3);
    -webkit-backdrop-filter: blur(10px) saturate(1.3);
    border: 1px solid rgba(255,255,255,0.08);
    box-shadow: 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12);
    transition: left 50ms linear, top 50ms linear, opacity 150ms ease;
  }
  .app-guest-cursor::before {
    content: '';
    display: block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(255,255,255,0.8);
    flex-shrink: 0;
    box-shadow: 0 0 6px rgba(255,255,255,0.4);
  }

  /* ── Projects section ── */
  .app-projects-section {
    position: relative;
    padding: 140px 0 100px;
    width: 100%;
  }

  /* Ambient glow — more sophisticated, multi-layered */
  .app-projects-glow {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 320px;
    background: radial-gradient(
      ellipse at center,
      rgba(107,159,255,0.10) 0%,
      rgba(180,154,255,0.05) 45%,
      transparent 70%
    );
    pointer-events: none;
    filter: blur(40px);
  }

  /* Eyebrow — refined editorial detail */
  .app-eyebrow {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin-bottom: 24px;
  }
  .app-eyebrow-line {
    width: 48px;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--a-400));
    opacity: 0.6;
  }
  .app-eyebrow-line:last-child {
    background: linear-gradient(90deg, var(--a-400), transparent);
  }
  .app-eyebrow-text {
    font-family: var(--font-body);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--a-400);
    opacity: 0.9;
  }

  /* Title — tighter, more editorial */
  .app-projects-title {
    font-family: var(--font-display);
    font-size: clamp(2.6rem, 5.8vw, 4.2rem);
    font-weight: 800;
    line-height: 1.05;
    text-align: center;
    margin: 0 0 24px;
    letter-spacing: -0.04em;
    color: var(--ink-0);
  }
  .app-projects-title em {
    font-style: normal;
    background: linear-gradient(115deg, var(--a-300) 0%, var(--b-400) 55%, var(--c-400) 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 24px rgba(107,159,255,0.15));
  }

  /* Subtitle — more breathing room */
  .app-projects-subtitle {
    font-family: var(--font-body);
    font-weight: 300;
    font-size: 1.125rem;
    color: var(--ink-2);
    text-align: center;
    max-width: 520px;
    margin: 0 auto 72px;
    padding: 0 24px;
    line-height: 1.8;
    letter-spacing: 0.01em;
  }

  /* ── Noise grain overlay — higher quality, lower opacity ── */
  .app-noise {
    position: fixed;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    opacity: 0.018;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 256px 256px;
  }

  /* ── Vignette — cinematic, softer ── */
  .app-vignette {
    position: fixed;
    inset: 0;
    z-index: 2;
    pointer-events: none;
    background: radial-gradient(ellipse at 50% 38%, transparent 55%, rgba(6,7,10,0.55) 100%);
  }
`;

/* Inject once */
if (typeof document !== 'undefined' && !document.getElementById('__portfolio-global')) {
  const el = document.createElement('style');
  el.id = '__portfolio-global';
  el.textContent = GLOBAL_STYLES;
  document.head.appendChild(el);
}

/* ─────────────────────────────────────────────────────────────────
   App
───────────────────────────────────────────────────────────────── */
function App() {
  const { activeUsers, localCursor } = useLiveCursors();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'transparent',
        color: 'var(--ink-1)',
        overflowX: 'hidden',
      }}
    >

      {/* ── Atmosphere: grain + vignette ── */}
      <div className="app-noise"    aria-hidden="true" />
      <div className="app-vignette" aria-hidden="true" />

      {/* LAYER 0: 3D Background */}
      <Background3D />

      {/* LAYER 1: Navigation */}
      <Navbar />

      {/* LAYER 2.1: Local cursor */}
      {localCursor && (
        <>
          <div
            className="app-cursor-ring"
            style={{
              left: `${localCursor.x * 100}vw`,
              top:  `${localCursor.y * 100}vh`,
            }}
          />
          <div
            className="app-cursor-dot"
            style={{
              left: `${localCursor.x * 100}vw`,
              top:  `${localCursor.y * 100}vh`,
            }}
          />
        </>
      )}

      {/* LAYER 2.2: Networked guest cursors */}
      {Object.entries(activeUsers).map(([id, user]) => (
        <div
          key={id}
          className="app-guest-cursor"
          style={{
            left:            `${user.x * 100}vw`,
            top:             `${user.y * 100}vh`,
            backgroundColor: user.color || 'var(--a-500)',
            boxShadow:       `0 4px 24px ${user.color ? user.color + '40' : 'rgba(77,125,255,0.30)'}, inset 0 1px 0 rgba(255,255,255,0.12)`,
          }}
        >
          Guest {id.slice(0, 4)}
        </div>
      ))}

      {/* LAYER 3: Content */}
      <main
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          minHeight: '100vh',
          background: 'transparent',
        }}
      >
        <div id="hero"><Hero /></div>
        <div id="skills"><Skills /></div>

        {/* Projects */}
        <div id="projects" className="app-projects-section">

          <div className="app-projects-glow" aria-hidden="true" />

          <div className="app-eyebrow">
            <span className="app-eyebrow-line" />
            <span className="app-eyebrow-text">Selected work</span>
            <span className="app-eyebrow-line" />
          </div>

          <h2 className="app-projects-title">
            Featured <em>Projects</em>
          </h2>

          <p className="app-projects-subtitle">
            Swipe through some of my favorite recent builds, featuring modern
            web architectures and real-time integrations.
          </p>

          <ProjectSlider />
        </div>

        <div id="about"><About /></div>
        <div id="contact"><Contact /></div>
      </main>

      {/* LAYER 4: Footer */}
      <Footer />

      {/* LAYER 5: Floating widgets */}
      <Chatbot />
      <GlobalReactions />

    </div>
  );
}

export default App;