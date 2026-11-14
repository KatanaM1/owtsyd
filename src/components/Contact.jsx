export default function Contact({ onOpenBrief }) {
  return (
    <section className="section wine contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <p className="label"><i></i> Let’s talk</p>
        <h2 id="contact-title">Tell us what you’re working on.</h2>
        <div className="contact-actions">
          <a
            className="button accent"
            href="https://t.me/manager_owtsyd"
            target="_blank"
            rel="noopener"
          >
            Chat on Telegram <span aria-hidden="true">↗</span>
          </a>
          <button
            type="button"
            className="button outline"
            onClick={() => onOpenBrief('Help me choose')}
          >
            Start a Project Brief <span aria-hidden="true">↗</span>
          </button>
        </div>
      </div>
    </section>
  )
}