import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, MoveUpRight, Sparkles } from 'lucide-react'
import { gsap } from 'gsap'

const projects = [
  { n: '01', title: 'Visual Identity', type: 'Brand / Design', copy: 'A flexible identity system for a future-facing brand.', accent: 'lime' },
  { n: '02', title: 'Social Universe', type: 'Content / Social', copy: 'A visual language built to stop the scroll and keep the story moving.', accent: 'coral' },
  { n: '03', title: 'Campaign Lab', type: 'Digital / Campaign', copy: 'Concepts, compositions and campaign worlds made for attention.', accent: 'blue' },
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title > span, .hero-copy, .hero-actions', {
        y: 36,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(
          el,
          { y: 34, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: undefined,
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = cursor.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let targetX = x
    let targetY = y
    const move = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
    }
    const tick = () => {
      x += (targetX - x) * 0.16
      y += (targetY - y) * 0.16
      el.style.transform = `translate3d(${x}px,${y}px,0)`
      requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', move)
    const raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site" ref={root}>
      <div ref={cursor} className="cursor" aria-hidden="true"><span /></div>
      <div className="grain" aria-hidden="true" />

      <header className="nav">
        <button className="wordmark magnetic" onClick={() => scrollTo('top')}>V/</button>
        <div className="nav-links">
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('services')}>Services</button>
          <button onClick={() => scrollTo('about')}>About</button>
        </div>
        <button className="nav-cta" onClick={() => scrollTo('contact')}>Let's talk <MoveUpRight size={15} /></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">Menu</button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('services')}>Services</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </div>
      )}

      <main>
        <section className="hero section" id="top">
          <div className="hero-grid" />
          <div className="hero-noise" />
          <div className="hero-orbit orbit-a" />
          <div className="hero-orbit orbit-b" />
          <div className="hero-content">
            <div className="hero-kicker mono">CREATIVE / DIGITAL / SOCIAL</div>
            <h1 className="hero-title">
              <span>BRANDS</span>
              <span className="outline">SHOULD</span>
              <span>FEEL.</span>
            </h1>
            <p className="hero-copy">Vrushti is a graphic designer and social-first creative building visual worlds that make people pause, look twice and remember.</p>
            <div className="hero-actions">
              <button className="pill pill-dark magnetic" onClick={() => scrollTo('work')}>See selected work <ArrowDownRight size={17} /></button>
              <span className="availability mono"><i /> Available for select projects</span>
            </div>
          </div>
          <div className="hero-index mono">001 / 005</div>
          <div className="hero-side">DESIGN<br />SOCIAL<br />DIGITAL</div>
        </section>

        <section className="ticker" aria-label="Creative disciplines">
          <div className="ticker-inner">
            <span>ART DIRECTION</span><b>✳</b><span>GRAPHIC DESIGN</span><b>✳</b><span>SOCIAL MEDIA</span><b>✳</b><span>DIGITAL MARKETING</span><b>✳</b><span>ART DIRECTION</span><b>✳</b><span>GRAPHIC DESIGN</span>
          </div>
        </section>

        <section className="section manifesto" data-reveal>
          <div className="section-meta mono">002 / POINT OF VIEW</div>
          <div className="manifesto-copy">
            <p className="eyebrow">THE IDEA</p>
            <h2>Attention is a <em>design problem.</em></h2>
            <p className="manifesto-text">The feed is crowded. The timeline is fast. Good work needs more than polish — it needs a point of view, a rhythm and a reason to stop.</p>
          </div>
          <div className="scribble">MAKE IT<br /><span>UNMISSABLE.</span></div>
        </section>

        <section className="section" id="services">
          <div className="section-top" data-reveal>
            <div>
              <div className="section-meta mono">003 / CAPABILITIES</div>
              <h2 className="display">What I make.</h2>
            </div>
            <p className="section-intro">Strategy gets it moving. Design gives it shape. Social gives it a life.</p>
          </div>

          <div className="service-list">
            {[
              ['01', 'GRAPHIC DESIGN', 'Identity systems, campaign visuals, layouts, launch assets and the little details that make a brand feel intentional.'],
              ['02', 'SOCIAL MEDIA', 'Content direction, feed systems, post design, reels, stories and platform-native visual thinking.'],
              ['03', 'DIGITAL MARKETING', 'Creative concepts and communication built around what people actually see, click, share and remember.'],
            ].map(([num, title, text]) => (
              <div className="service-row" key={num}>
                <span className="mono service-num">{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <ArrowUpRight className="service-arrow" size={28} strokeWidth={1.5} />
              </div>
            ))}
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-top" data-reveal>
            <div>
              <div className="section-meta mono">004 / SELECTED WORK</div>
              <h2 className="display">Work, <i>in progress.</i></h2>
            </div>
            <p className="section-intro">A curated starting point. Real client projects, case studies and campaign assets can slot in here next.</p>
          </div>

          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project-card ${project.accent}`} key={project.n}>
                <div className="project-art">
                  <div className="project-num mono">{project.n}</div>
                  <div className="art-shape shape-1" />
                  <div className="art-shape shape-2" />
                  <div className="art-word">{project.title.split(' ')[0]}</div>
                  <span className="art-tag mono">{project.type}</span>
                </div>
                <div className="project-info">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.copy}</p>
                  </div>
                  <span className="circle-arrow"><ArrowUpRight size={18} /></span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="playground">
          <div className="playground-copy">
            <div className="section-meta mono">005 / PLAYGROUND</div>
            <h2>Curious by default.</h2>
            <p>Personal experiments, visual studies, trend tests and ideas that start before the brief exists.</p>
          </div>
          <div className="playground-orb"><Sparkles size={34} /><span>PLAY<br />TEST<br />REPEAT</span></div>
        </section>

        <section className="section process" id="about">
          <div className="section-meta mono">006 / PROCESS</div>
          <div className="process-head">
            <h2 className="display">How I think.</h2>
            <p>Less “make a post”. More “make a feeling”.</p>
          </div>
          <div className="process-grid">
            {['Understand', 'Concept', 'Create', 'Publish', 'Learn'].map((step, i) => (
              <div className="process-card" key={step}>
                <span className="mono">0{i + 1}</span>
                <strong>{step}</strong>
                <small>{['Context before aesthetics.', 'One sharp idea.', 'Make it tangible.', 'Ship with intent.', 'Use the signal.'][i]}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="about-band">
          <div className="about-mark">V</div>
          <div className="about-copy">
            <div className="section-meta mono">A LITTLE ABOUT ME</div>
            <h2>Design brain.<br /><span>Social instinct.</span></h2>
            <p>I like visual systems that are expressive without being noisy. I like ideas that can travel from a static post to a story, a reel, a landing page and beyond.</p>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-kicker mono">LET'S MAKE SOMETHING PEOPLE NOTICE.</div>
          <h2>Have a brand<br /><em>worth talking about?</em></h2>
          <button className="contact-button magnetic" onClick={() => window.location.href = 'mailto:hello@vrushti.design'}>
            Start a conversation <MoveUpRight size={18} />
          </button>
          <div className="contact-footer mono">
            <span>VRUSHTI / PORTFOLIO</span>
            <span>© 2026</span>
            <span>BUILT WITH INTENT</span>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
