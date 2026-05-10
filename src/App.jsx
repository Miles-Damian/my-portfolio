import { useEffect, useState } from 'react'
import About from './components/About.jsx'
import AdminPanel from './components/AdminPanel.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import SectionReveal from './components/SectionReveal.jsx'
import Services from './components/Services.jsx'
import Skills from './components/Skills.jsx'

export default function App() {
  const [currentHash, setCurrentHash] = useState(window.location.hash)

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash)

    window.addEventListener('hashchange', updateHash)

    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  if (currentHash === '#admin') {
    return <AdminPanel />
  }

  return (
    <>
      <Header />
      <main className="pt-24">
        <SectionReveal>
          <Hero />
        </SectionReveal>
        <SectionReveal>
          <About />
        </SectionReveal>
        <SectionReveal>
          <Skills />
        </SectionReveal>
        <SectionReveal>
          <Projects />
        </SectionReveal>
        <SectionReveal>
          <Services />
        </SectionReveal>
        <SectionReveal>
          <Contact />
        </SectionReveal>
      </main>
      <Footer />
    </>
  )
}
