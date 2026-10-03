import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, MoveUpRight, Paperclip, Pin } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { n: '01', title: 'Visual Identity', type: 'Brand / Design', note: 'MAKE IT LOOK LIKE IT MEANS SOMETHING.', tone: 'yellow' },
  { n: '02', title: 'Social Universe', type: 'Content / Social', note: 'STOP THE SCROLL. START A STORY.', tone: 'pink' },
  { n: '03', title: 'Campaign Lab', type: 'Digital / Campaign', note: 'IDEAS FIRST. POLISH SECOND.', tone: 'blue' },
]

const services = [
  ['01', 'DESIGN', 'turn ideas into visuals'],
  ['02', 'SOCIAL', 'make people stop scrolling'],
  ['03', 'CONTENT', 'give brands a voice'],
]

function App() {
  const root = useRef<HTMLDivElement>(null)
  const notebook = useRef<HTMLDivElement>(null)
  const cursor = useRef<HTMLDivElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cursorLabel, setCursorLabel] = useState('')

  useEffect(() => {
    if (!root.current || !notebook.current) return

    const ctx = gsap.context(() => {
      const pages = gsap.utils.toArray<HTMLElement>('.notebook-page')
      const totalTurns = pages.length - 1

      pages.forEach((page, index) => {
        gsap.set(page, {
          zIndex: pages.length - index,
          transformOrigin: 'left center',
          rotateY: 0,
        })
      })

      const intro = gsap.timeline()
      intro.from('.cover-content > *, .cover-note, .cover-sticker', {
        y: 24,
        opacity: 0,
        duration: .7,
        stagger: .08,
        ease: 'power3.out',
      })

      const flip = gsap.timeline({
        scrollTrigger: {
          trigger: notebook.current,
          start: 'top top',
          end: () => `+=${Math.max(window.innerHeight * totalTurns, window.innerHeight * 5.5)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / totalTurns,
            duration: { min: .18, max: .55 },
            delay: .05,
            ease: 'power2.out',
          },
        },
      })

      pages.forEach((page, index) => {
        if (index === pages.length - 1) return
        flip.to(page, {
          rotateY: -180,
          duration: 1,
          ease: 'none',
        }, index)
      })

      gsap.utils.toArray<HTMLElement>('[data-page-reveal]').forEach((el) => {
        gsap.fromTo(el, { y: 18, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: .65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            containerAnimation: flip,
            start: 'left 85%',
            once: true,
          },
        })
      })
    }, root)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const el = cursor.current
    if (!el || window.matchMedia('(pointer: coarse)').matches) return

    let x = innerWidth / 2
    let y = innerHeight / 2
    let tx = x
    let ty = y
    let raf = 0

    const move = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }

    const tick = () => {
      x += (tx - x) * .18
      y += (ty - y) * .18
      el.style.transform = `translate3d(${x}px,${y}px,0)`
      raf = requestAnimationFrame(tick)
    }

    addEventListener('mousemove', move)
    raf = requestAnimationFrame(tick)

    return () => {
      removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  const jumpToPage = (pageIndex: number) => {
    if (!notebook.current) return
    const start = notebook.current.getBoundingClientRect().top + window.scrollY
    const distance = Math.max(window.innerHeight * 5.5, window.innerHeight * 5)
    const totalTurns = 7
    window.scrollTo({
      top: start + (distance / totalTurns) * pageIndex,
      behavior: 'smooth',
    })
    setMenuOpen(false)
  }

  return (
    <div className="site" ref={root}>
      <div ref={cursor} className="cursor" aria-hidden="true">
        <span>{cursorLabel}</span>
      </div>
      <div className="paper-grain" aria-hidden="true" />

      <header className="nav">
        <button className="wordmark" onClick={() => jumpToPage(0)}>VRUSHTI<span>.</span></button>
        <div className="nav-center mono">CREATIVE NOTEBOOK / VOL. 01</div>
        <nav className="nav-links" aria-label="Primary">
          <button onClick={() => jumpToPage(2)}>Work</button>
          <button onClick={() => jumpToPage(1)}>About</button>
          <button onClick={() => jumpToPage(5)}>Contact</button>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>Menu</button>
      </header>

      {menuOpen && (
        <div className="mobile-menu">
          <button onClick={() => jumpToPage(2)}>Work</button>
          <button onClick={() => jumpToPage(1)}>About</button>
          <button onClick={() => jumpToPage(5)}>Contact</button>
        </div>
      )}

      <main>
        <section className="notebook-scroll" id="top" ref={notebook}>
          <div className="notebook-stage">
            <div className="notebook-shadow" aria-hidden="true" />
            <div className="notebook-spine" aria-hidden="true" />

            <article className="notebook-page page-cover">
              <div className="cover-content">
                <div className="cover-top mono">
                  <span>VOL. 01 / 2026</span>
                  <span>PRIVATE NOTES</span>
                </div>

                <div className="cover-title">
                  <span className="cover-small hand">the creative notebook of</span>
                  <h1>VRUSHTI<span>.</span></h1>
                  <p>DESIGN · SOCIAL · CONTENT</p>
                </div>

                <div className="cover-bottom">
                  <span className="mono">OPEN →</span>
                  <span className="hand">ideas live here.</span>
                </div>
              </div>

              <div className="cover-note cover-note-one">
                <Pin size={15} />
                <strong>NOTE TO SELF</strong>
                <span>make it<br />memorable.</span>
              </div>

              <div className="cover-note cover-note-two">
                <span className="hand">idea #01</span>
                <strong>LESS BORING.<br />MORE YOU.</strong>
                <small>keep this one.</small>
              </div>

              <div className="cover-note cover-note-three">
                <Paperclip size={15} />
                <strong>currently into:</strong>
                <span>good type<br />weird layouts<br />great coffee</span>
              </div>

              <div className="cover-sticker">✦<br /><span>MAKE<br />GOOD<br />STUFF</span></div>
              <div className="cover-tape" />
            </article>

            <article className="notebook-page page-paper paper-cream">
              <div className="page-inner about-page">
                <div className="page-number mono">01 / ABOUT</div>
                <div className="paperclip-mark"><Paperclip size={22} /></div>
                <div className="about-copy" data-page-reveal>
                  <span className="hand red">hello, you found page one.</span>
                  <h2>Hi, I'm<br /><em>Vrushti.</em></h2>
                  <p>I'm a graphic designer and social media creative who likes turning ideas into visuals people actually want to look at.</p>
                  <p className="muted">I'm early in my journey, curious by default and usually collecting references, typefaces and little ideas that might become something later.</p>
                </div>
                <div className="margin-note hand">start here →</div>
                <div className="highlighter highlighter-yellow">design brain</div>
                <div className="page-doodle">↗</div>
              </div>
            </article>

            <article className="notebook-page page-paper paper-white">
              <div className="page-inner work-page">
                <div className="page-number mono">02 / WORK</div>
                <div className="work-intro" data-page-reveal>
                  <span className="hand red">things I've made / things I want to make</span>
                  <h2>Pick something<br /><em>up.</em></h2>
                  <p>Placeholder studies for now. Real work, client names and case studies can drop into this notebook when ready.</p>
                </div>

                <div className="mini-projects">
                  {projects.map((project) => (
                    <article
                      key={project.n}
                      className={`mini-project ${project.tone}`}
                      onMouseEnter={() => setCursorLabel('LOOK')}
                      onMouseLeave={() => setCursorLabel('')}
                    >
                      <div className="mini-project-top mono"><span>{project.n}</span><ArrowUpRight size={15} /></div>
                      <div className="mini-project-image"><b>{project.title.split(' ')[0]}</b><i /><i /></div>
                      <span className="mono">{project.type}</span>
                      <h3>{project.title}</h3>
                      <p>{project.note}</p>
                    </article>
                  ))}
                </div>
              </div>
            </article>

            <article className="notebook-page page-paper paper-yellow">
              <div className="page-inner services-page">
                <div className="page-number mono">03 / WHAT I DO</div>
                <div className="services-heading" data-page-reveal>
                  <span className="hand red">the useful stuff</span>
                  <h2>I design.<br /><em>I post.</em><br />I make brands<br /><mark>feel like brands.</mark></h2>
                </div>
                <div className="service-list">
                  {services.map(([number, title, copy]) => (
                    <div className="service-row" key={title}>
                      <span className="mono">{number}</span>
                      <strong>{title}</strong>
                      <p>{copy}</p>
                      <ArrowUpRight size={18} />
                    </div>
                  ))}
                </div>
                <div className="side-note hand">good ideas<br />need good<br />systems.</div>
              </div>
            </article>

            <article className="notebook-page page-paper paper-blue">
              <div className="page-inner playground-page">
                <div className="page-number mono">04 / PLAYGROUND</div>
                <div className="playground-copy" data-page-reveal>
                  <span className="hand red">do not overthink this page.</span>
                  <h2>Ideas before<br /><em>they become briefs.</em></h2>
                  <p>Personal experiments, visual studies, trend tests and tiny obsessions. The messy corner of the desk.</p>
                </div>
                <div className="scribble scribble-one">TRY THIS</div>
                <div className="scribble scribble-two">maybe later?</div>
                <div className="scribble scribble-three">★ KEEP</div>
                <div className="polaroid">
                  <div className="polaroid-art"><span>TYPE<br />IS<br />A<br />MOOD.</span></div>
                  <small className="hand">reference / 07</small>
                </div>
                <div className="red-circle">↗</div>
              </div>
            </article>

            <article className="notebook-page page-paper paper-pink">
              <div className="page-inner person-page">
                <div className="page-number mono">05 / THE PERSON</div>
                <div className="person-grid">
                  <div className="portrait-placeholder" data-page-reveal>
                    <div className="portrait-letter">V</div>
                    <span className="hand">photo goes here</span>
                  </div>
                  <div className="person-copy" data-page-reveal>
                    <span className="hand red">behind the pixels</span>
                    <h2>Design brain.<br /><em>Social instinct.</em></h2>
                    <p>I like visual systems with a point of view — expressive enough to be remembered, clear enough to work.</p>
                    <div className="tags"><span>GRAPHIC DESIGN</span><span>SOCIAL MEDIA</span><span>CONTENT</span></div>
                  </div>
                </div>
                <div className="taped-note">curious<br />by default.</div>
              </div>
            </article>

            <article className="notebook-page page-paper paper-contact">
              <div className="page-inner contact-page">
                <div className="page-number mono">06 / LAST PAGE</div>
                <div className="contact-copy" data-page-reveal>
                  <span className="hand yellow-hand">okay, your turn.</span>
                  <h2>Got a good<br /><em>idea?</em></h2>
                  <p>Let's put it on the desk.</p>
                  <button className="notebook-button" onClick={() => setCursorLabel('')}>
                    Start a conversation <MoveUpRight size={17} />
                  </button>
                </div>
                <div className="contact-note hand">write to me →</div>
                <div className="contact-footer mono"><span>VRUSHTI / CREATIVE NOTEBOOK</span><span>© 2026</span></div>
              </div>
            </article>

            <article className="notebook-page page-back">
              <div className="back-cover-content">
                <div className="back-symbol">✦</div>
                <span className="mono">END OF NOTEBOOK / VOL. 01</span>
                <span className="hand">more ideas soon.</span>
              </div>
            </article>
          </div>

          <div className="scroll-cue mono"><span>SCROLL</span><ArrowDown size={14} /></div>
          <div className="page-progress mono"><span>01</span><i /><span>06</span></div>
        </section>
      </main>
    </div>
  )
}

export default App
