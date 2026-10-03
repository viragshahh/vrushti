import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, MoveUpRight, Pin } from 'lucide-react'
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
      <div ref={cursor} className={`cursor ${cursorLabel ? "cursor-active" : ""}`} aria-hidden="true"><span>{cursorLabel || "✦"}</span></div>
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
          <div className="hero-spark spark-one">✦</div>
          <div className="hero-spark spark-two">✧</div>

          <div className="hero-main">
            <div className="mono kicker">CREATIVE PORTFOLIO / DIGITAL DESK</div>
            <span className="desk-welcome">welcome to my desk ↗</span>
            <h1 className="hero-title">Hi, I'm<br/><span>Vrushti.</span></h1>
            <p className="hero-copy">Graphic designer + social media creative. I make brands feel a little more <strong>alive.</strong></p>
            <div className="hero-actions">
              <button className="paper-button" onClick={() => scrollTo('work')}>Pick up my work <ArrowDownRight size={17}/></button>
              <span className="tiny-note">currently collecting good ideas ✦</span>
            </div>
          </div>

          <div className="desk-note note-yellow n1" style={{transform:'rotate(-5deg)'}}>
            <Pin size={18}/><strong>TODO</strong><span>make something<br/>people remember</span><small>✓ design<br/>✓ social<br/>□ magic</small>
          </div>
          <div className="desk-note note-pink n2" style={{transform:'rotate(4deg)'}}>
            <span className="hand">idea #27</span><strong>MAKE IT FEEL<br/>LIKE YOU.</strong>
            <small>keep this one.</small>
          </div>

          <div className="desk-sticker"><span className="sticker-star">✦</span><span>MAKE<br/>GOOD<br/>STUFF</span></div>
          <div className="hero-bottom mono"><span>SCROLL TO EXPLORE ↓</span><span>DESIGN / SOCIAL / CONTENT</span></div>
        </section>

                <section className="intro section" data-reveal>
          <div className="desk-intro-copy">
            <p className="desk-kicker">YOU BRING THE <mark>BUSINESS.</mark></p>
            <p className="desk-lead">I help turn what you do into a social presence that looks like you, sounds like you and gives people a reason to stop and pay attention.</p>
          </div>

          <div className="offer-grid">
            <article className="offer-card offer-main"><span className="mono">01 / SOCIAL</span><strong>Social Media<br/>Management</strong><p>Content planning, calendars, publishing, page management and the day to day work that keeps a brand active.</p><div className="offer-tags"><span>PLANNING</span><span>CALENDARS</span><span>MANAGEMENT</span></div></article>
            <article className="offer-card offer-pink"><span className="mono">02 / CONTENT</span><strong>Content &amp;<br/>Creatives</strong><p>Posts, stories, reels, edits and promotional creatives built around the brand and its audience.</p><div className="offer-tags"><span>POSTS</span><span>STORIES</span><span>REELS</span></div></article>
            <article className="offer-card offer-blue"><span className="mono">03 / DIRECTION</span><strong>Strategy &amp;<br/>Analytics</strong><p>Content strategy, trend research, performance tracking and practical insights for what to try next.</p><div className="offer-tags"><span>STRATEGY</span><span>ANALYTICS</span><span>INSIGHTS</span></div></article>
            <article className="offer-card offer-paper"><span className="mono">04 / GROWTH</span><strong>Collaborations &amp;<br/>Campaigns</strong><p>Influencer collaborations, campaign ideas and supporting creative work when the brand needs a bigger push.</p><div className="offer-tags"><span>COLLABS</span><span>CAMPAIGNS</span><span>CREATIVE</span></div></article>
          </div>

          <div className="desk-approach">
            <div className="approach-heading"><h3>Then we get<br/><em>to work.</em></h3><p>I treat every project like it is my own. I ask first, research properly, make the idea, work with the client and keep refining until it feels right.</p></div>
            <div className="approach-steps">
              <article><span className="mono">01</span><strong>UNDERSTAND</strong><p>Ask questions and get clear on the business, audience and goal.</p></article>
              <article><span className="mono">02</span><strong>EXPLORE</strong><p>Study the brand, competitors and trends before choosing a direction.</p></article>
              <article><span className="mono">03</span><strong>CREATE</strong><p>Turn the direction into content, reels, creatives and campaigns.</p></article>
              <article><span className="mono">04</span><strong>REFINE</strong><p>Review with the client, publish, track and learn from what happens next.</p></article>
            </div>
          </div>

          <div className="desk-services"><span className="mono">THE DESK CAN HANDLE</span><div className="desk-service-list"><span>SOCIAL MEDIA</span><span>CONTENT</span><span>CREATIVES</span><span>REELS</span><span>STRATEGY</span><span>ANALYTICS</span><span>COLLABORATIONS</span></div></div>
          <div className="tape tape-one" />
        </section>

        <section className="work section" id="work">
          <div className="work-heading" data-reveal>
            <div><h2>Pick something<br/><span>up.</span></h2></div>
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
          
          <h2>I design.<br/><i>I post.</i><br/>I make brands<br/><span>feel like brands.</span></h2>
          <div className="cap-list">
            {notes.map(([title, text], i) => <div className="cap-row" key={title}><span className="mono">0{i+1}</span><strong>{title}</strong><p>{text}</p><ArrowUpRight size={20}/></div>)}
          </div>
        </section>

        <section className="yellow-zone">
          <div className="yellow-inner">
            
            <h2>Ideas before<br/><span>they become briefs.</span></h2>
            <p>Personal experiments, visual studies, trend tests and tiny obsessions. This is the messy corner of the desk.</p>
            <div className="floating-mini mini-one">try this</div>
            <div className="floating-mini mini-two">maybe later?</div>
            <div className="floating-mini mini-three">★ keep</div>
          </div>
        </section>

        <section className="about section" id="about" data-reveal>
          
          <div className="about-layout">
            <div className="about-number">V<span>.</span></div>
            <div>
              <h2>Design brain.<br/><em>Social instinct.</em></h2>
              <p>I like visual systems that have a point of view, expressive enough to be remembered, clear enough to work. I'm early in my journey, curious by default and always collecting references.</p>
              <div className="about-tags"><span>GRAPHIC DESIGN</span><span>SOCIAL MEDIA</span><span>CONTENT</span></div>
            </div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-note">
            
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