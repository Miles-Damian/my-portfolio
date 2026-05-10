import { contactItems } from '../data/portfolio.js'
import Icon from './Icon.jsx'
import RevealItem from './RevealItem.jsx'

function ContactIcon({ icon }) {
  if (icon === 'facebook') {
    return (
      <svg aria-hidden="true" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.46h-1.25c-1.23 0-1.62.77-1.62 1.56v1.9h2.75l-.44 2.91h-2.31V22C18.34 21.24 22 17.08 22 12.06Z" />
      </svg>
    )
  }

  return <Icon>{icon}</Icon>
}

export default function Contact() {
  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-24 md:px-margin-desktop" id="contact">
      <div className="grid gap-12 md:grid-cols-2">
        <div>
          <RevealItem as="h2" className="mb-6 font-headline-lg text-headline-lg text-on-surface" delay={80}>
            Let's build <span className="text-primary">something together</span>
          </RevealItem>
          <RevealItem as="p" className="mb-12 text-on-surface-variant" delay={160}>
            Have a project in mind? Reach out and let's discuss how we can bring your
            vision to life.
          </RevealItem>
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <RevealItem
                className="glass-card flex cursor-pointer items-center gap-4 rounded-xl p-4 transition-colors hover:border-primary"
                delay={240 + index * 85}
                as={item.url ? 'a' : 'div'}
                href={item.url}
                key={item.label}
                rel={item.url ? 'noreferrer' : undefined}
                target={item.url ? '_blank' : undefined}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ContactIcon icon={item.icon} />
                </div>
                <div>
                  <div className="text-label-xs text-outline">{item.label}</div>
                  <div className="font-code-md text-on-surface">{item.value}</div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>

        <RevealItem className="glass-card rounded-xl p-8" delay={260}>
          <form
            action="https://formsubmit.co/damianmilesdavid@gmail.com"
            className="space-y-6"
            method="POST"
          >
            <input name="_captcha" type="hidden" value="false" />
            <input name="_subject" type="hidden" value="New portfolio inquiry" />
            <input name="_template" type="hidden" value="table" />
            <input className="hidden" name="_honey" tabIndex="-1" type="text" />
            <div>
              <label className="mb-2 block font-code-md text-outline" htmlFor="name">
                // Name
              </label>
              <input
                className="w-full rounded-lg border border-primary/20 bg-surface-container-lowest px-4 py-3 text-on-surface outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                id="name"
                name="name"
                placeholder="Jane Doe"
                required
                type="text"
              />
            </div>
            <div>
              <label className="mb-2 block font-code-md text-outline" htmlFor="email">
                // Email
              </label>
              <input
                className="w-full rounded-lg border border-primary/20 bg-surface-container-lowest px-4 py-3 text-on-surface outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                id="email"
                name="email"
                placeholder="jane@example.com"
                required
                type="email"
              />
            </div>
            <div>
              <label className="mb-2 block font-code-md text-outline" htmlFor="message">
                // Message
              </label>
              <textarea
                className="w-full rounded-lg border border-primary/20 bg-surface-container-lowest px-4 py-3 text-on-surface outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-primary"
                id="message"
                name="message"
                placeholder="Describe your project..."
                required
                rows="4"
              />
            </div>
            <button className="w-full rounded-lg bg-primary py-4 font-bold text-on-primary shadow-lg transition-all hover:shadow-primary/30 active:scale-95" type="submit">
              Send Message
            </button>
          </form>
        </RevealItem>
      </div>
    </section>
  )
}
