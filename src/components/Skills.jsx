import { skills } from '../data/portfolio.js'
import Icon from './Icon.jsx'
import RevealItem from './RevealItem.jsx'

export default function Skills() {
  return (
    <section className="bg-surface-container-low/50 px-margin-mobile py-24 md:px-margin-desktop" id="skills">
      <div className="mx-auto max-w-container-max">
        <RevealItem className="mb-16 text-center" delay={80}>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">
            Technical <span className="text-primary">Arsenal</span>
          </h2>
          <p className="mt-2 font-code-md text-code-md text-on-surface-variant">
            // The tools I use to build modern web solutions
          </p>
        </RevealItem>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
          {skills.map((skill, index) => (
            <RevealItem className="glass-card group flex flex-col items-center gap-3 p-6" delay={120 + index * 55} key={skill.name}>
              <Icon className={`text-4xl transition-transform group-hover:scale-110 ${skill.color}`}>
                {skill.icon}
              </Icon>
              <span className="font-label-xs text-label-xs">{skill.name}</span>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  )
}
