import { useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import GraphicDesign from './components/GraphicDesign.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('Free redesign prototype')

  const handleOpenBrief = useCallback((plan) => {
    setSelectedPlan(plan || 'Free redesign prototype')
    
    // Плавный скролл к форме и фокус на поле
    setTimeout(() => {
      const formSection = document.getElementById('brief-form')
      if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth' })
        document.getElementById('business')?.focus({ preventScroll: true })
      }
    }, 50)
  }, [])

  return (
    <div id="top">
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero onOpenBrief={handleOpenBrief} />
        <Work />
        <GraphicDesign onOpenBrief={handleOpenBrief} />
        <Pricing onOpenBrief={handleOpenBrief} />
        <Process />
        <About />
        <Contact selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} onOpenBrief={handleOpenBrief} />
      </main>
      <Footer />
    </div>
  )
}