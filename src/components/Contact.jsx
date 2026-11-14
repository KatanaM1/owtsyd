import { useRef, useState, useEffect } from 'react'

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
  const requestIdRef = useRef()
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInput = () => { requestIdRef.current = undefined }

  async function handleSubmit(e) {
    e.preventDefault()
    requestIdRef.current ??= crypto.randomUUID()
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)
    const submittedId = requestIdRef.current
    data.requestId = submittedId

    setIsSubmitting(true)
    setStatus('Submitting your brief…')

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      
      if (!response.ok || result.saved !== true) {
        setStatus(result.error || 'Could not submit your brief. Please try again.')
        return
      }
      
      if (requestIdRef.current === submittedId) {
        formRef.current.reset()
        setSelectedPlan('Free redesign prototype')
        requestIdRef.current = undefined
      }
      setStatus('Thanks. We’ve received your brief and will reply by email.')
    } catch {
      setStatus('Could not confirm submission. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
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
        <form ref={formRef} id="project-form" onSubmit={handleSubmit} onInput={handleInput}>
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
              Submit Project Brief <span aria-hidden="true">↗</span>
            </button>
          </div>
          <p id="form-status" role="status">{status}</p>
        </form>
      </section>
    </section>
  )
}