import { profile } from '../data/portfolio.js'
import RevealItem from './RevealItem.jsx'
import TypewriterText from './TypewriterText.jsx'

export default function Hero() {
  const heroPhrases = ['Hello, I\'m Miles David M. Damian', `I'm a ${profile.title}`]

  return (
    <section
      className="mx-auto flex min-h-[795px] max-w-container-max flex-col items-center justify-center px-margin-mobile md:px-margin-desktop xl:max-w-[1500px]"
      id="home"
    >
      <div className="grid w-full items-center gap-14 md:grid-cols-2 md:gap-20 lg:gap-28 xl:grid-cols-[minmax(0,1fr)_minmax(620px,1.1fr)]">
        <div className="space-y-6 text-center md:text-left xl:max-w-[640px] xl:space-y-8">
          <RevealItem as="span" className="inline-block rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label-xs text-label-xs text-primary" delay={80}>
            AVAILABLE FOR FREELANCE
          </RevealItem>
          <RevealItem as="h1" className="font-headline-xl text-headline-xl text-on-surface lg:text-[58px] xl:text-[64px]" delay={180}>
            <span className="text-white">
              <TypewriterText phrases={heroPhrases} />
            </span>
          </RevealItem>
          <RevealItem as="p" className="mx-auto max-w-lg text-body-md text-on-surface-variant md:mx-0 lg:max-w-xl lg:text-[18px] xl:text-[20px]" delay={280}>
            {profile.summary}
          </RevealItem>
          <RevealItem className="flex flex-wrap justify-center gap-4 md:justify-start" delay={380}>
            <a
              className="rounded-lg bg-primary px-8 py-4 font-bold text-on-primary shadow-[0_0_20px_rgba(165,231,255,0.4)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(165,231,255,0.6)] active:scale-95 lg:px-10 lg:py-5 lg:text-lg"
              href="#projects"
            >
              View Projects
            </a>
            <a
              className="glass-card rounded-lg px-8 py-4 font-medium text-on-surface transition-all duration-300 hover:bg-surface-variant active:scale-95 lg:px-10 lg:py-5 lg:text-lg"
              href="#contact"
            >
              Contact Me
            </a>
          </RevealItem>
        </div>

        <RevealItem className="group relative" delay={220}>
          <div className="absolute -inset-4 bg-primary/20 opacity-30 blur-3xl transition-opacity duration-500 group-hover:opacity-50" />
          <div className="glass-card relative overflow-hidden rounded-xl shadow-2xl">
            <div className="terminal-header flex items-center gap-2 px-4 py-3 lg:px-6 lg:py-4">
              <div className="h-3 w-3 rounded-full bg-[#ff5f56] lg:h-4 lg:w-4" />
              <div className="h-3 w-3 rounded-full bg-[#ffbd2e] lg:h-4 lg:w-4" />
              <div className="h-3 w-3 rounded-full bg-[#27c93f] lg:h-4 lg:w-4" />
              <span className="ml-4 font-code-md text-code-md text-outline-variant lg:text-[16px]">
                miles-portfolio.jsx
              </span>
            </div>
            <div className="p-6 font-code-md text-code-md leading-relaxed lg:p-8 lg:text-[16px] xl:p-10 xl:text-[18px]">
              <p className="text-secondary">
                <span className="text-tertiary">const</span> developer = &#123;
              </p>
              <p className="pl-4 text-on-surface">
                name: <span className="text-on-secondary-container">'{profile.fullName}'</span>,
              </p>
              <p className="pl-4 text-on-surface">
                role: <span className="text-on-secondary-container">'{profile.title}'</span>,
              </p>
              <p className="pl-4 text-on-surface">
                stack: <span className="text-primary">['React', 'Tailwind', 'PHP', 'MySQL']</span>,
              </p>
              <p className="pl-4 text-on-surface">
                focus: <span className="text-on-secondary-container">'Responsive web experiences'</span>,
              </p>
              <p className="pl-4 text-on-surface">
                education: <span className="text-on-secondary-container">'BSIT - WMA'</span>,
              </p>
              <p className="pl-4 text-on-surface">
                availableFor: <span className="text-on-secondary-container">'Freelance projects'</span>,
              </p>
              <p className="mt-4 text-on-surface-variant opacity-60">
                // Building clean interfaces with practical backend logic
              </p>
              <p className="text-secondary">&#125;;</p>
              <div className="mt-4 flex items-center gap-2 text-tertiary">
                <span className="animate-pulse">_</span>
                <span className="terminal-status text-xs text-on-surface-variant opacity-40">
                  Ready to ship your next website
                </span>
              </div>
            </div>
          </div>
        </RevealItem>
      </div>
    </section>
  )
}
