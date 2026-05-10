import { highlights, profile } from './portfolio.js'

export const aboutContentStorageKey = 'miles-about-content'

export const defaultAboutContent = {
  fullName: profile.fullName,
  title: profile.title,
  education: profile.education,
  university: profile.university,
  degree: profile.degree,
  specialization: profile.specialization,
  graduationDate: profile.graduationDate,
  skillsLine: 'React / Tailwind / PHP',
  workLine: 'Freelance Projects',
  intro:
    "I'm Miles David M. Damian, a dedicated Web Developer focused on creating seamless digital experiences. I build responsive, user-friendly websites that balance clean frontend interfaces with practical backend logic.",
  background:
    'I graduated from Tarlac State University with a degree in Bachelor of Science in Information Technology, specialized in Web and Mobile Application. My work is shaped by turning real business needs into high-performing websites, admin panels, and digital tools that are simple to use and built with purpose.',
  highlights,
}
