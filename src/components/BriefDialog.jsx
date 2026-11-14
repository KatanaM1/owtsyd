import { useEffect, useRef, useState } from 'react'

const PLAN_OPTIONS = [
  'Free redesign concept',
  'Starter',
  'Business',
  'Graphic design',
  'Monthly website maintenance',
  'Help me choose',
]

const TELEGRAM_URL = 'https://t.me/manager_owtsyd'

export default function BriefDialog({ open, plan, onClose }) {
  const dialogRef = useRef(null)
  const formRef = useRef(null)
  const businessRef = useRef(null)
  const goalRef = useRef(null)
  const resultRef = useRef(null)

  const [business, setBusiness] = useState('')
  const [existing, setExisting] = useState('')
  const [currentPlan, setCurrentPlan] = useState(plan)
  const [goal, setGoal] = useState('')
  const [status, setStatus] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [preparedText, setPreparedText] = useState('')

  // Синхронизация open/close с нативным <dialog>
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
    } else if (!open && dialog.open) {
      dialog.close()
    }
  }, [open])

  // Сброс внутреннего состояния при каждом открытии
  useEffect(() => {
    if (!open) return
    setCurrentPlan(plan)
    setStatus('')
    setShowResult(false)
    setPreparedText('')
    businessRef.current?.setCustomValidity('')
    goalRef.current?.setCustomValidity('')
  }, [open, plan])

  // Нативное закрытие (Escape) → сообщаем родителю
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const handleClose = () => onClose()
    dialog.addEventListener('close', handleClose)
    return () => dialog.removeEventListener('close', handleClose)
  }, [onClose])

  // Автовыделение текста при fallback-копировании
  useEffect(() => {
    if (showResult && resultRef.current) {
      resultRef.current.select()
    }
  }, [showResult, preparedText])

  function prepareBrief() {
    const name = business.trim()
    const description = goal.trim()

    businessRef.current?.setCustomValidity(
      name ? '' : 'Enter your business name.'
    )
    goalRef.current?.setCustomValidity(
      description ? '' : 'Tell us what you need help with.'
    )
    if (!formRef.current?.reportValidity()) return ''

    const currentSite = existing.trim()
    return [
      'Project brief for OWTSYD',
      `Business: ${name}`,
      `Interested in: ${currentPlan}`,
      currentSite && `Current site: ${currentSite}`,
      `Goal: ${description}`,
    ]
      .filter(Boolean)
      .join('\n\n')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const brief = prepareBrief()
    if (!brief) return

    const telegram = new URL(TELEGRAM_URL)
    telegram.searchParams.set('text', brief)
    window.location.assign(telegram.href)
  }

  async function handleCopy() {
    const brief = prepareBrief()
    if (!brief) return

    try {
      await navigator.clipboard.writeText(brief)
      setShowResult(false)
      setPreparedText('')
      setStatus('Brief copied.')
    } catch {
      setPreparedText(brief)
      setShowResult(true)
      setStatus('Copy the selected text to save your brief.')
    }
  }

  return (
    <dialog
      ref={dialogRef}
      id="brief-form"
      aria-labelledby="brief-title"
    >
      <form
        ref={formRef}
        id="project-form"
        data-telegram={TELEGRAM_URL}
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="dialog-head">
          <h2 id="brief-title">Your project brief</h2>
          <button
            type="button"
            className="close"
            aria-label="Close project brief"
            onClick={() => dialogRef.current?.close()}
          >
            ×
          </button>
        </div>
        <p className="brief-note">
          Fill out a few details, then open Telegram to send your brief.
        </p>

        <label htmlFor="business">Business name</label>
        <input
          id="business"
          ref={businessRef}
          value={business}
          onChange={(e) => {
            setBusiness(e.target.value)
            e.target.setCustomValidity('')
          }}
          autoComplete="organization"
          maxLength={150}
          required
        />

        <label htmlFor="existing">
          Current website <span>(optional)</span>
        </label>
        <input
          id="existing"
          type="url"
          value={existing}
          onChange={(e) => setExisting(e.target.value)}
          inputMode="url"
          placeholder="https://…"
          maxLength={300}
        />

        <label htmlFor="plan">I’m interested in</label>
        <select
          id="plan"
          value={currentPlan}
          onChange={(e) => setCurrentPlan(e.target.value)}
        >
          {PLAN_OPTIONS.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>

        <label htmlFor="goal">What do you need help with?</label>
        <textarea
          id="goal"
          ref={goalRef}
          value={goal}
          onChange={(e) => {
            setGoal(e.target.value)
            e.target.setCustomValidity('')
          }}
          rows={3}
          placeholder="A new site, a poster, monthly updates…"
          maxLength={2000}
          required
        />

        <div className="form-actions">
          <button className="button accent" type="submit">
            Continue in Telegram <span aria-hidden="true">↗</span>
          </button>
          <button
            type="button"
            className="copy"
            onClick={handleCopy}
          >
            Copy brief
          </button>
        </div>

        <p id="form-status" role="status">{status}</p>
        <textarea
          id="brief-result"
          aria-label="Prepared brief"
          ref={resultRef}
          value={preparedText}
          readOnly
          hidden={!showResult}
        />
      </form>
    </dialog>
  )
}