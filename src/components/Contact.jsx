import { useState } from 'react'
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
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormStatus('')
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const payload = {
      email: formData.get('email'),
      message: formData.get('message'),
      name: formData.get('name'),
    }

    try {
      const response = await fetch('/api/contact', {
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        const errorDetails = await response.json().catch(() => null)
        throw new Error(errorDetails?.error || 'Unable to send message.')
      }

      event.currentTarget.reset()
      setFormStatus('Message sent. I will get back to you soon.')
    } catch (error) {
      setFormStatus(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto max-w-container-max overflow-hidden px-margin-mobile py-16 md:px-margin-desktop md:py-24" id="contact">
      <div className="grid min-w-0 gap-10 md:grid-cols-2 md:gap-12">
        <div className="min-w-0">
          <RevealItem as="h2" className="mb-6 max-w-full font-headline-lg text-headline-lg text-on-surface max-[360px]:text-[28px]" delay={80}>
            Let's build <span className="text-primary">something together</span>
          </RevealItem>
          <RevealItem as="p" className="mb-10 max-w-full text-on-surface-variant md:mb-12" delay={160}>
            Have a project in mind? Reach out and let's discuss how we can bring your
            vision to life.
          </RevealItem>
          <div className="space-y-6">
            {contactItems.map((item, index) => (
              <RevealItem
                className="glass-card flex min-w-0 cursor-pointer items-start gap-3 rounded-xl p-4 transition-colors hover:border-primary sm:items-center sm:gap-4"
                delay={240 + index * 85}
                as={item.url ? 'a' : 'div'}
                href={item.url}
                key={item.label}
                rel={item.url ? 'noreferrer' : undefined}
                target={item.url ? '_blank' : undefined}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <ContactIcon icon={item.icon} />
                </div>
                <div className="min-w-0 flex-1 overflow-hidden">
                  <div className="text-label-xs text-outline">{item.label}</div>
                  <div className="break-all font-code-md text-[12px] leading-relaxed text-on-surface sm:text-code-md">
                    {item.value}
                  </div>
                </div>
              </RevealItem>
            ))}
          </div>
        </div>

        <RevealItem className="glass-card rounded-xl p-5 md:p-8" delay={260}>
          <form className="space-y-6" onSubmit={handleSubmit}>
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
            <button
              className="w-full rounded-lg bg-primary py-4 font-bold text-on-primary shadow-lg transition-all hover:shadow-primary/30 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {formStatus && (
              <p className="text-center font-code-md text-code-md text-primary">
                {formStatus}
              </p>
            )}
          </form>
        </RevealItem>
      </div>
    </section>
  )
}
