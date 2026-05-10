import profilePic from '../assets/Profile/profilePic.png'
import bbjviImage from '../assets/websites-created/bbjvi.png'
import insightImage from '../assets/websites-created/insight.png'

export const navLinks = [
  { label: 'Home', href: '#top', icon: 'home' },
  { label: 'About', href: '#about', icon: 'person' },
  { label: 'Skills', href: '#skills', icon: 'bolt' },
  { label: 'Projects', href: '#projects', icon: 'work' },
  { label: 'Services', href: '#services', icon: 'design_services' },
  { label: 'Contact', href: '#contact', icon: 'mail' },
]

export const profile = {
  name: 'miles-dev',
  fullName: 'Miles David M. Damian',
  title: 'Web Developer',
  education: 'BSIT - Web & Mobile Applications',
  university: 'Tarlac State University',
  degree: 'Bachelor of Science in Information Technology',
  specialization: 'Web and Mobile Application',
  graduationDate: 'July 18, 2025',
  portrait: profilePic,
  summary:
    'I create practical websites and admin tools for businesses, with clean interfaces, responsive layouts, and features that are easy to manage.',
}

export const highlights = [
  { value: '2+', label: 'Years Experience', color: 'text-primary' },
  { value: '3', label: 'Projects Delivered', color: 'text-tertiary' },
]

export const skills = [
  { name: 'HTML', icon: 'html', color: 'text-primary' },
  { name: 'CSS', icon: 'css', color: 'text-primary' },
  { name: 'JAVASCRIPT', icon: 'javascript', color: 'text-tertiary' },
  { name: 'REACT', icon: 'deployed_code', color: 'text-primary' },
  { name: 'TAILWIND CSS', icon: 'style', color: 'text-primary' },
  { name: 'PHP', icon: 'php', color: 'text-on-secondary-container' },
  { name: 'MYSQL', icon: 'database', color: 'text-on-secondary-container' },
  { name: 'SUPABASE', icon: 'cloud', color: 'text-tertiary' },
  { name: 'GIT / GITHUB', icon: 'commit', color: 'text-on-surface-variant' },
  { name: 'VERCEL', icon: 'rocket_launch', color: 'text-on-surface-variant' },
  { name: 'RESPONSIVE', icon: 'devices', color: 'text-primary' },
  { name: 'UI DESIGN', icon: 'draw', color: 'text-tertiary' },
]

export const projects = [
  {
    title: 'BBJVI Website',
    description:
      'A modern corporate website for Bataan Baseco Joint Venture Inc., designed to present the company’s profile, leadership, locators, careers, news, and developments through a professional and responsive web experience.',
    image: bbjviImage,
    liveUrl: 'https://bbjvi.com.ph/',
    tags: ['SUPABASE', 'PHP', 'SQL', 'TAILWIND'],
  },
  {
    title: 'Insight Consultancy',
    description:
      'A professional business consultancy website for Insight Business Consultancy Inc., showcasing services in business registration, compliance, accounting, legal support, and digital solutions for entrepreneurs and growing companies.',
    image: insightImage,
    liveUrl: 'https://ibcph.com/',
    tags: ['REACT', 'SUPABASE'],
  },
  {
    title: 'Business Admin Panel',
    description:
      'Full-featured CMS and analytics dashboard for real-time business management and inventory tracking.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHQ6EGLB3vxOXeScxOlmggAPvcGB4aj4zAImNKAjtp3NMNGoccDyD9QeR7kmUwrIeRfy9sDkBbOttwCoTEuFsKm_agxJOsRqJvbUrOHY45Fuw8l32EQ1b4dwAGEe0oUavX6hTOIz7WyOyb4q2Izr5k95lQWNotB5vSX1Zi3WrbLXgVA9n-IiYcUyUIb-iUbtHpNor4ANe7AsIPwXw8MUP8aRhyjWNUYGygnwWeApXOLI8owib1KOjlyWJPMoc22zMUOse6ukitfPM',
    tags: ['PHP', 'MYSQL', 'ADMINLTE'],
  },
]

export const services = [
  {
    title: 'Website Development',
    icon: 'web',
    color: 'text-primary',
    background: 'bg-primary/10',
    description:
      'Building custom-coded websites from scratch using modern frameworks to ensure top-tier performance.',
  },
  {
    title: 'Website Redesign',
    icon: 'auto_fix_high',
    color: 'text-tertiary',
    background: 'bg-tertiary/10',
    description:
      'Modernizing outdated websites to improve user experience, conversion rates, and visual appeal.',
  },
  {
    title: 'Responsive Design',
    icon: 'devices',
    color: 'text-on-secondary-container',
    background: 'bg-on-secondary-container/10',
    description:
      'Ensuring your website looks and functions perfectly across all devices, from mobile to ultra-wide displays.',
  },
  {
    title: 'Admin Panel Setup',
    icon: 'settings_applications',
    color: 'text-primary',
    background: 'bg-primary/10',
    description:
      'Custom CMS solutions that give you complete control over your content without needing to touch a line of code.',
  },
  {
    title: 'Website Maintenance',
    icon: 'support_agent',
    color: 'text-tertiary',
    background: 'bg-tertiary/10',
    description:
      'Regular updates, security patches, and performance monitoring to keep your digital asset running at peak efficiency.',
    wide: true,
  },
]

export const contactItems = [
  {
    label: 'EMAIL',
    value: 'damianmilesdavid@gmail.com',
    icon: 'mail',
    url: 'mailto:damianmilesdavid@gmail.com',
  },
  {
    label: 'FACEBOOK',
    value: 'Miles Damian',
    icon: 'facebook',
    url: 'https://www.facebook.com/Chronosssssssssssssssssssssssssssssss',
  },
  { label: 'GITHUB', value: 'github.com/Miles-Damian', icon: 'terminal', url:'https://github.com/Miles-Damian' },
  { label: 'LOCATION', value: 'Pura, Tarlac, Philippines', icon: 'location_on' },
]
