import { profile } from '../data/portfolio.js'
import useAboutContent from '../hooks/useAboutContent.js'
import Icon from './Icon.jsx'
import RevealItem from './RevealItem.jsx'

export default function About() {
  const aboutContent = useAboutContent()

  return (
    <section className="mx-auto max-w-container-max px-margin-mobile py-24 md:px-margin-desktop xl:max-w-[1500px]" id="about">
      <div className="grid items-start gap-12 md:grid-cols-12 lg:gap-16 xl:gap-24">
        <div className="md:col-span-5">
          <RevealItem className="glass-card group relative overflow-hidden rounded-xl p-8 md:p-10 xl:p-12" delay={80}>
            <img
              alt="Professional portrait"
              className="profile-portrait relative z-10 mx-auto mb-8 aspect-square w-full max-w-[260px] rounded-xl border-2 border-primary object-cover shadow-[0_0_32px_rgba(165,231,255,0.18)] xl:max-w-[340px]"
              src={profile.portrait}
            />
            <h3 className="relative z-10 mb-2 text-center font-headline-lg text-headline-lg text-on-surface xl:text-[40px]">
              {aboutContent.title}
            </h3>
            <p className="relative z-10 mb-6 text-center font-code-md text-code-md text-primary xl:text-[16px]">
              {aboutContent.education}
            </p>
            <div className="relative z-10 space-y-4 xl:text-[18px]">
              <div className="flex items-center gap-3">
                <Icon className="text-tertiary">code</Icon>
                <span className="text-on-surface-variant">{aboutContent.skillsLine}</span>
              </div>
              <div className="flex items-center gap-3">
                <Icon className="text-tertiary">work</Icon>
                <span className="text-on-surface-variant">{aboutContent.workLine}</span>
              </div>
            </div>
          </RevealItem>
        </div>

        <div className="md:col-span-7 xl:pt-2">
          <RevealItem as="h2" className="mb-8 border-l-4 border-primary pl-6 font-headline-lg text-headline-lg text-on-surface xl:text-[42px]" delay={140}>
            Professional <span className="text-primary">Introduction</span>
          </RevealItem>
          <RevealItem as="p" className="mb-6 max-w-3xl text-body-md leading-relaxed text-on-surface-variant xl:text-[19px]" delay={240}>
            {aboutContent.intro}
          </RevealItem>
          <RevealItem as="p" className="mb-10 max-w-3xl text-body-md leading-relaxed text-on-surface-variant xl:text-[19px]" delay={340}>
            {aboutContent.background}
          </RevealItem>
          <RevealItem className="mb-10 grid gap-4 rounded-xl border border-primary/15 bg-surface-container/70 p-6 md:grid-cols-2 xl:max-w-3xl xl:p-8" delay={400}>
            <div>
              <div className="mb-2 flex items-center gap-2 text-primary">
                <Icon className="text-[20px]">school</Icon>
                <span className="font-code-md text-code-md uppercase tracking-widest">
                  Education
                </span>
              </div>
              <p className="text-body-md text-on-surface">
                {aboutContent.degree}
              </p>
              <p className="mt-1 text-body-sm text-on-surface-variant">
                {aboutContent.specialization}
              </p>
            </div>
            <div>
              <div className="mb-2 flex items-center gap-2 text-tertiary">
                <Icon className="text-[20px]">event_available</Icon>
                <span className="font-code-md text-code-md uppercase tracking-widest">
                  Graduated
                </span>
              </div>
              <p className="text-body-md text-on-surface">
                {aboutContent.university}
              </p>
              <p className="mt-1 text-body-sm text-on-surface-variant">
                {aboutContent.graduationDate}
              </p>
            </div>
          </RevealItem>
          <div className="grid grid-cols-2 gap-6 xl:max-w-[760px] xl:gap-8">
            {aboutContent.highlights.map((item, index) => (
              <RevealItem className="rounded-xl bg-surface-container p-6 xl:p-8" delay={500 + index * 100} key={item.label}>
                <div className={`mb-1 text-headline-lg font-bold xl:text-[40px] ${item.color}`}>
                  {item.value}
                </div>
                <div className="text-label-xs uppercase tracking-widest text-outline">
                  {item.label}
                </div>
              </RevealItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
