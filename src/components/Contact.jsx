import { useRef, useState } from 'react'

const PLAN_OPTIONS = [
  'Free redesign prototype',
  'Starter',
  'Business',
  'Graphic design',
  'Monthly graphic design',
  'Monthly website maintenance',
  'Help me choose'
]

export default function Contact({ selectedPlan, setSelectedPlan, onOpenBrief }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Имитация отправки (Заглушка)
  async function handleSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('Submitting your brief…')

    // Имитируем задержку сети на 1 секунду
    setTimeout(() => {
      setIsSubmitting(false)
      setStatus('Thanks. We’ve received your brief. (Demo mode: no actual email sent)')
      
      // Очищаем форму для красоты
      if (formRef.current) {
        formRef.current.reset()
      }
      setSelectedPlan('Free redesign prototype')
    }, 1000)
  }

  return (
    <section className="section dark contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="label"><i></i> Let’s talk</p>
        <h2 id="contact-title">Tell us what you’re working on.</h2>
        <div className="contact-actions">
          <a className="button accent" href="https://t.me/manager_owtsyd" target="_blank" rel="noopener">
            Chat with Our Manager <span aria-hidden="true">↗</span>
          </a>
          <a className="button outline" href="#brief-form" onClick={(e) => { e.preventDefault(); onOpenBrief('Help me choose'); }}>
            Start a Project Brief <span aria-hidden="true">↗</span>
          </a>
        </div>
        <ul className="contact-links">
          <li><a href="https://t.me/IriDesigner" target="_blank" rel="noopener" aria-label="Contact Iri on Telegram">Telegram · @IriDesigner</a></li>
          <li><a href="tel:+12139044415">+1 213-904-4415</a></li>
          <li><a href="mailto:ira.735849@gmail.com">ira.735849@gmail.com</a></li>
        </ul>
      </div>

      <section id="brief-form" className="wrap brief-panel" aria-labelledby="brief-title">
        <form ref={formRef} id="project-form" onSubmit={handleSubmit}>
          <h3 id="brief-title">Your project brief</h3>
          <p className="brief-note">Tell us a little about your project and leave an email address so we can get back to you.</p>
          
          <label htmlFor="business">Business name</label>
          <input id="business" name="business" autoComplete="organization" maxLength={150} required />
          
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" autoComplete="email" maxLength={254} required />
          
          <label htmlFor="existing">Current website <span>(optional)</span></label>
          <input id="existing" name="website" inputMode="url" placeholder="https://…" maxLength={300} />
          
          <label htmlFor="plan">I’m interested in</label>
          <select id="plan" name="service" value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
            {PLAN_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          
          <label htmlFor="goal">What do you need help with?</label>
          <textarea id="goal" name="description" rows={3} placeholder="A new site, a poster, monthly updates…" maxLength={2000} required />
          
          <div className="form-actions">
            <button className="button accent" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Project Brief'} <span aria-hidden="true">↗</span>
            </button>
          </div>
          <p id="form-status" role="status">{status}</p>
        </form>
      </section>
    </section>
  )
}