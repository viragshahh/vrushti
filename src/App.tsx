import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, MoveUpRight, Sparkles, Pin, Paperclip } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { n: '01', title: 'Visual Identity', type: 'Brand / Design', note: 'MAKE IT LOOK LIKE IT MEANS SOMETHING.', color: 'yellow', rotate: '-3deg' },
  { n: '02', title: 'Social Universe', type: 'Content / Social', note: 'STOP THE SCROLL. START A STORY.', color: 'pink', rotate: '2deg' },
  { n: '03', title: 'Campaign Lab', type: 'Digital / Campaign', note: 'IDEAS FIRST. POLISH SECOND.', color: 'blue', rotate: '-2deg' },
]

const notes = [
  ['DESIGN', 'turn ideas into visuals'],
  ['SOCIAL', 'make people stop scrolling'],
  ['CONTENT', 'give brands a voice'],
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')

  useEffect(() => {
    if (!root.current) return
    const ctx = gsap.context(() => {
      gsap.from('.desk-note, .hero-copy, .hero-title, .hero-actions', {
        y: 28, opacity: 0, rotation: 0, duration: .85, stagger: .08, ease: 'power3.out', delay: .12,
      })
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: .75, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = cursor.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return
    let x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y, raf = 0
    const move = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY }
    const tick = () => {
      x += (tx - x) * .18; y += (ty - y) * .18
      el.style.transform = `translate3d(${x}px,${y}px,0)`
      raf = requestAnimationFrame(tick)
    }
    addEventListener('mousemove', move); raf = requestAnimationFrame(tick)
    return () => { removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <div className="site" ref={root}>
      <div ref={cursor} className="cursor" aria-hidden="true"><span>{cursorLabel}</span></div>
      <div className="paper-grain" aria-hidden="true" />

      <header className="nav">
        <button className="wordmark" onClick={() => scrollTo('top')}>VRUSHTI<span>.</span></button>
        <nav className="nav-links" aria-label="Primary">
          <button onClick={() => scrollTo('work')}>Work</button>
          <button onClick={() => scrollTo('about')}>About</button>
          <button onClick={() => scrollTo('contact')}>Contact</button>
        </nav>
        <button className="nav-note" onClick={() => scrollTo('contact')}>Say hi <MoveUpRight size={14}/></button>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      </header>

      {menuOpen && <div className="mobile-menu">
        <button onClick={() => scrollTo('work')}>Work</button>
        <button onClick={() => scrollTo('about')}>About</button>
        <button onClick={() => scrollTo('contact')}>Contact</button>
      </div>}

      <main>
        <section className="desk-hero section" id="top">
          <div className="desk-lines" />
          <div className="hero-main">
            <div className="mono kicker">CREATIVE PORTFOLIO / 2026</div>
            <h1 className="hero-title">Hi, I'm<br/><span>Vrushti.</span></h1>
            <p className="hero-copy">Graphic designer + social-first creative. I make brands feel a little more <strong>alive.</strong></p>
            <div className="hero-actions">
              <button className="paper-button" onClick={() => scrollTo('work')}>Pick up my work <ArrowDownRight size={17}/></button>
              <span className="tiny-note">currently collecting good ideas ✦</span>
            </div>
          </div>

          <div className="desk-note note-yellow n1" style={{transform:'rotate(-5deg)'}}>
            <Pin size={18}/><strong>TODO</strong><span>make something<br/>people remember</span><small>✓ design<br/>✓ social<br/>□ magic</small>
          </div>
          <div className="desk-note note-pink n2" style={{transform:'rotate(4deg)'}}>
            <span className="hand">idea #27</span><strong>LESS BORING.<br/>MORE YOU.</strong>
            <small>keep this one.</small>
          </div>
          <div className="desk-note note-blue n3" style={{transform:'rotate(-3deg)'}}>
            <Paperclip size={18}/><strong>currently into:</strong><span>good type<br/>weird layouts<br/>great coffee</span>
          </div>
          <div className="desk-sticker">✦<br/><span>MAKE<br/>GOOD<br/>STUFF</span></div>
          <div className="hero-bottom mono"><span>SCROLL TO EXPLORE ↓</span><span>DESIGN / SOCIAL / CONTENT</span></div>
        </section>

        <section className="intro section" data-reveal>
          <div className="section-label mono">01 / THE DESK</div>
          <div>
            <p className="big-copy">Somewhere between <mark>strategy</mark> and “wait, this would look cool” is where I like to work.</p>
            <p className="sub-copy">I create visual identities, social content and digital ideas for brands that want to be noticed without shouting.</p>
          </div>
          <div className="tape tape-one" />
        </section>

        <section className="work section" id="work">
          <div className="work-heading" data-reveal>
            <div><div className="section-label mono">02 / THINGS I'VE MADE</div><h2>Pick something<br/><span>up.</span></h2></div>
            <p>These are placeholder projects for now. Real work, client names and case studies come next.</p>
          </div>
          <div className="notes-grid">
            {projects.map((p) => (
              <article className={`work-note ${p.color}`} key={p.n}
                style={{transform:`rotate(${p.rotate})`}}
                onMouseEnter={() => setCursorLabel('OPEN')} onMouseLeave={() => setCursorLabel('')}>
                <div className="note-top"><span className="mono">{p.n}</span><Pin size={16}/></div>
                <div className="fake-image"><div className="fake-shape one"/><div className="fake-shape two"/><b>{p.title.split(' ')[0]}</b></div>
                <div className="note-info"><span className="mono">{p.type}</span><h3>{p.title}</h3><p>{p.note}</p></div>
                <div className="note-arrow"><ArrowUpRight size={19}/></div>
              </article>
            ))}
          </div>
        </section>

        <section className="capabilities section" data-reveal>
          <div className="section-label mono">03 / THINGS I DO</div>
          <h2>I design.<br/><i>I post.</i><br/>I make brands<br/><span>feel like brands.</span></h2>
          <div className="cap-list">
            {notes.map(([title, text], i) => <div className="cap-row" key={title}><span className="mono">0{i+1}</span><strong>{title}</strong><p>{text}</p><ArrowUpRight size={20}/></div>)}
          </div>
        </section>

        <section className="yellow-zone">
          <div className="yellow-inner">
            <div className="section-label mono">04 / PLAYGROUND</div>
            <h2>Ideas before<br/><span>they become briefs.</span></h2>
            <p>Personal experiments, visual studies, trend tests and tiny obsessions. This is the messy corner of the desk.</p>
            <div className="floating-mini mini-one">try this</div>
            <div className="floating-mini mini-two">maybe later?</div>
            <div className="floating-mini mini-three">★ keep</div>
          </div>
        </section>

        <section className="about section" id="about" data-reveal>
          <div className="section-label mono">05 / ABOUT VRUSHTI</div>
          <div className="about-layout">
            <div className="about-number">V<span>.</span></div>
            <div>
              <h2>Design brain.<br/><em>Social instinct.</em></h2>
              <p>I like visual systems that have a point of view — expressive enough to be remembered, clear enough to work. I'm early in my journey, curious by default and always collecting references.</p>
              <div className="about-tags"><span>GRAPHIC DESIGN</span><span>SOCIAL MEDIA</span><span>CONTENT</span></div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-note">
            <div className="section-label mono">06 / SAY HELLO</div>
            <h2>Got a good<br/><span>idea?</span></h2>
            <p>Let's put it on the desk.</p>
            <button className="paper-button dark" onClick={() => window.location.href='mailto:hello@vrushti.design'}>Start a conversation <MoveUpRight size={17}/></button>
          </div>
          <div className="footer mono"><span>VRUSHTI / CREATIVE PORTFOLIO</span><span>© 2026</span><span>MADE WITH TOO MANY IDEAS ✦</span></div>
        </section>
      </main>
    </div>
  )
}
export default App