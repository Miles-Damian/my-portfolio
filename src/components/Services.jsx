import { services } from '../data/portfolio.js'
import Icon from './Icon.jsx'
import RevealItem from './RevealItem.jsx'

export default function Services() {
  return (
    <section className="bg-surface-container-low/50 px-margin-mobile py-24 md:px-margin-desktop" id="services">
      <div className="mx-auto max-w-container-max">
        <RevealItem className="mb-16 text-center" delay={80}>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            My <span className="text-primary">Services</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-on-surface-variant">
            I provide tailored web development solutions that help businesses scale their
            online presence and optimize their internal workflows.
          </p>
        </RevealItem>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <RevealItem
              as="article"
              className={`glass-card rounded-xl p-8 transition-transform duration-300 hover:-translate-y-2 ${
                service.wide ? 'lg:col-span-2' : ''
              }`}
              delay={140 + index * 95}
              key={service.title}
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg ${service.background} ${service.color}`}
              >
                <Icon>{service.icon}</Icon>
              </div>
              <h5 className="mb-3 text-headline-lg font-bold text-on-surface">{service.title}</h5>
              <p className="text-body-sm text-on-surface-variant">{service.description}</p>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  )
}
