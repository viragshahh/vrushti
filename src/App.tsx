import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, MoveUpRight, Pin } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { n: '01', title: 'Social Media', type: 'SOCIAL / PERFORMANCE', note: 'A real account story, told through the numbers.', color: 'yellow', rotate: '-2deg' },
  { n: '02', title: 'Reels', type: 'SHORT FORM / VIDEO', note: 'Vertical stories designed to stop the scroll.', color: 'pink', rotate: '1.5deg' },
  { n: '03', title: 'Posts', type: 'SOCIAL / DESIGN', note: 'Feed creatives with a clear visual point of view.', color: 'blue', rotate: '-1.5deg' },
  { n: '04', title: 'Campaigns', type: 'CAMPAIGN / SYSTEM', note: 'From one idea to a complete communication system.', color: 'paper', rotate: '2deg' },
  { n: '05', title: 'Branding', type: 'BRANDING / IDENTITY', note: 'A visual language that gives the business its own feel.', color: 'yellow', rotate: '-1deg' },
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
  const [activeReel, setActiveReel] = useState(0)
  const [activePost, setActivePost] = useState(0)
  const [reelStartX, setReelStartX] = useState<number | null>(null)

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
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.count-number').forEach((el) => {
        const target = Number(el.dataset.count || 0)
        const state = { value: 0 }
        gsap.to(state, {
          value: target,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          onUpdate: () => { el.textContent = Math.round(state.value).toLocaleString() },
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
          <div className="desk-note note-yellow n1" style={{transform:'rotate(-5deg)'}}><Pin size={18}/><strong>TODO</strong><span>make something<br/>people remember</span><small>✓ design<br/>✓ social<br/>□ magic</small></div>
          <div className="desk-note note-pink n2" style={{transform:'rotate(4deg)'}}><span className="hand">idea #27</span><strong>MAKE IT FEEL<br/>LIKE YOU.</strong><small>keep this one.</small></div>
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
            <div className="approach-heading"><h3>Here’s how I <em>work.</em></h3><p>I treat every project like it is my own. I ask first, research properly, make the idea, work with the client and keep refining until it feels right.</p></div>
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
            <p>A look at the real kind of work I do across social media, reels, design, campaigns, branding and analytics.</p>
          </div>

          <div className="portfolio-stack">
            <article className="portfolio-feature analytics-feature">
              <div className="feature-label mono">01 / ANALYTICS</div>
              <div className="analytics-copy">
                <div>
                  <h3>The numbers<br/><em>moved.</em></h3>
                  <p>One reported account moved from a May baseline of 6,352 views, 93 interactions and 60 new follows to 69.3K views, 2.7K interactions and 165 new follows in the current reporting window.</p>
                </div>
                <div className="analytics-equation">
                  <span>AVERAGE UPLIFT</span>
                  <strong>+<span className="count-number" data-count="1323">0</span>%</strong>
                  <small>Arithmetic mean of the three reported percentage changes below. This is an account metric average, not a claim of 1,323% business growth.</small>
                </div>
              </div>
              <div className="math-grid">
                <div className="math-card"><span className="mono">VIEWS</span><strong>+<span className="count-number" data-count="991">0</span>%</strong><div className="math-line"><i style={{width:'99.1%'}} /></div><small>6,352 → 69.3K</small></div>
                <div className="math-card"><span className="mono">INTERACTIONS</span><strong>+<span className="count-number" data-count="2803">0</span>%</strong><div className="math-line"><i style={{width:'100%'}} /></div><small>93 → 2.7K</small></div>
                <div className="math-card"><span className="mono">NEW FOLLOWS</span><strong>+<span className="count-number" data-count="175">0</span>%</strong><div className="math-line"><i style={{width:'17.5%'}} /></div><small>60 → 165</small></div>
              </div>
              <div className="analytics-formula mono">(+991% + 2,803% + 175%) ÷ 3 = +1,323%</div>
              <div className="analytics-source mono">MAY 2026 BASELINE / CURRENT WINDOW: 5 JUNE – 4 JULY 2026</div>
            </article>

            <article className="portfolio-feature reels-feature">
              <div className="feature-label mono">02 / REELS</div>
              <div className="feature-heading"><h3>Swipe<br/><span>the reels.</span></h3><p>Built for the 9:16 frame. One reel at a time, so the work gets the screen to itself.</p></div>
              <div className="reel-stage">
                <div className="reel-device" onPointerDown={(e) => setReelStartX(e.clientX)} onPointerUp={(e) => { if (reelStartX === null) return; const dx = e.clientX - reelStartX; if (Math.abs(dx) > 45) setActiveReel(dx < 0 ? 1 : 0); setReelStartX(null) }} onPointerCancel={() => setReelStartX(null)}>
                  <div className="reel-topbar"><span className="mono">REEL <b>{activeReel + 1}</b> / 2</span><span>9:16</span></div>
                  <div className="reel-screen">
                    <div className="reel-orbit orbit-a" />
                    <div className="reel-orbit orbit-b" />
                    <strong>{activeReel === 0 ? 'REEL 01' : 'REEL 02'}</strong>
                    <span>{activeReel === 0 ? 'VERTICAL STORY / PRODUCT' : 'VERTICAL STORY / SOCIAL'}</span>
                  </div>
                  <div className="reel-caption"><span>SWIPE TO CHANGE</span><b>{activeReel === 0 ? '01' : '02'}</b></div>
                </div>
                <div className="reel-controls">
                  {[0,1].map(i => <button key={i} className={activeReel === i ? 'active' : ''} onClick={() => setActiveReel(i)} aria-label={`Show reel ${i + 1}`}><span>{String(i + 1).padStart(2,'0')}</span></button>)}
                </div>
              </div>
            </article>

            <article className="portfolio-feature posts-feature">
              <div className="feature-label mono">03 / POSTS</div>
              <div className="post-heading"><h3>Feed<br/><em>pieces.</em></h3><p>A clean little gallery for the actual post designs. The frame stays consistent while the creative changes.</p></div>
              <div className="post-gallery">
                {[0,1].map(i => (
                  <button key={i} className={`post-card ${activePost === i ? 'selected' : ''}`} onClick={() => setActivePost(i)}>
                    <div className="post-art">
                      <span className="mono">POST {String(i + 1).padStart(2,'0')}</span>
                      <strong>{i === 0 ? 'MAKE IT<br/>STOP.' : 'GOOD<br/>DESIGN<br/>SELLS THE<br/>FEELING.'}</strong>
                      <i>{i === 0 ? 'SOCIAL CREATIVE' : 'PROMOTIONAL POST'}</i>
                    </div>
                  </button>
                ))}
              </div>
              <div className="post-selected mono">SELECTED / POST {String(activePost + 1).padStart(2,'0')} <span>CLICK ANOTHER TO SWITCH</span></div>
            </article>

            <article className="portfolio-feature campaign-feature">
              <div className="feature-label mono">04 / CAMPAIGNS</div>
              <div className="campaign-heading"><h3>No picture.<br/><span>Just the system.</span></h3><p>Campaign work is shown as the thinking structure behind the creative, not as a random mockup.</p></div>
              <div className="campaign-map">
                <div className="campaign-node node-brief"><span className="mono">01</span><strong>BRIEF</strong><small>business goal</small></div>
                <div className="campaign-node node-idea"><span className="mono">02</span><strong>IDEA</strong><small>creative direction</small></div>
                <div className="campaign-node node-content"><span className="mono">03</span><strong>CONTENT</strong><small>posts + reels + stories</small></div>
                <div className="campaign-node node-response"><span className="mono">04</span><strong>RESPONSE</strong><small>attention + action</small></div>
                <div className="campaign-path path-one"><i /></div>
                <div className="campaign-path path-two"><i /></div>
                <div className="campaign-path path-three"><i /></div>
              </div>
              <div className="campaign-footer mono">ONE IDEA → MANY TOUCHPOINTS → ONE CONSISTENT STORY</div>
            </article>

            <article className="portfolio-feature branding-feature">
              <div className="feature-label mono">05 / BRANDING</div>
              <div className="branding-heading"><h3>A visual<br/><em>language.</em></h3><p>For now, this is a reserved system for the branding work. Once the branding resources are uploaded, this exact space will be rebuilt around the real assets.</p></div>
              <div className="brand-sheet">
                <div className="brand-mark">V<span>.</span></div>
                <div className="brand-type"><span className="mono">TYPE / COLOUR / FORM</span><strong>BRAND<br/>SYSTEM</strong></div>
                <div className="brand-swatches"><i/><i/><i/><i/></div>
              </div>
            </article>
          </div>
        </section>

        <section className="capabilities section" data-reveal>
          <h2>I design.<br/><i>I post.</i><br/>I make brands<br/><span>feel like brands.</span></h2>
          <div className="cap-list">{notes.map(([title, text], i) => <div className="cap-row" key={title}><span className="mono">0{i+1}</span><strong>{title}</strong><p>{text}</p><ArrowUpRight size={20}/></div>)}</div>
        </section>

        <section className="yellow-zone">
          <div className="yellow-inner">
            <h2>Ideas before<br/><span>they become briefs.</span></h2>
            <p>Personal experiments, visual studies, trend tests and tiny obsessions. This is the messy corner of the desk.</p>
            <div className="floating-mini mini-one">try this</div><div className="floating-mini mini-two">maybe later?</div><div className="floating-mini mini-three">★ keep</div>
          </div>
        </section>

        <section className="about section" id="about" data-reveal>
          <div className="about-layout">
            <div className="about-number">V<span>.</span></div>
            <div><h2>Design brain.<br/><em>Social instinct.</em></h2><p>I like visual systems that have a point of view, expressive enough to be remembered, clear enough to work. I'm early in my journey, curious by default and always collecting references.</p><div className="about-tags"><span>GRAPHIC DESIGN</span><span>SOCIAL MEDIA</span><span>CONTENT</span></div></div>
          </div>
        </section>

        <section className="contact section" id="contact">
          <div className="contact-note"><h2>Got a good<br/><span>idea?</span></h2><p>Let's put it on the desk.</p><button className="paper-button dark" onClick={() => window.location.href='mailto:hello@vrushti.design'}>Start a conversation <MoveUpRight size={17}/></button></div>
          <div className="footer mono"><span>VRUSHTI / CREATIVE PORTFOLIO</span><span>© 2026</span><span>MADE WITH TOO MANY IDEAS ✦</span></div>
        </section>
      </main>
    </div>
  )
}
export default App