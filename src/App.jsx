import { useCallback, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Work from './components/Work.jsx'
import GraphicDesign from './components/GraphicDesign.jsx'
import Pricing from './components/Pricing.jsx'
import Process from './components/Process.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import BriefDialog from './components/BriefDialog.jsx'

export default function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('Free redesign concept')

  const openBrief = useCallback((plan = 'Free redesign concept') => {
    setSelectedPlan(plan)
    setDialogOpen(true)
  }, [])

  const closeBrief = useCallback(() => setDialogOpen(false), [])

  return (
    <div id="top">
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero onOpenBrief={openBrief} />
        <Work />
        <GraphicDesign onOpenBrief={openBrief} />
        <Pricing onOpenBrief={openBrief} />
        <Process />
        <About />
        <Contact onOpenBrief={openBrief} />
      </main>
      <Footer />
      <BriefDialog open={dialogOpen} plan={selectedPlan} onClose={closeBrief} />
    </div>
  )
}