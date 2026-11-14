const STEPS = [
  { n: '01', title: 'The Brief & Deposit', text: 'Share your goals in a short brief. Once we agree on scope, a 50% deposit starts the build.' },
  { n: '02', title: 'Build & Test', text: 'Once the design and content are ready, we spend several days building and testing your site. We check mobile and desktop layouts, links, and forms, then fix any issues before launch. The exact timeline depends on the scope.' },
  { n: '03', title: 'Launch & Handoff', text: 'We make final edits, collect the balance, and hand over your site and access.' },
]

export default function Process() {
  return (
    <section className="section process" id="process" aria-labelledby="process-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="label">How it works</p>
            <h2 id="process-title">From brief to launch.</h2>
          </div>
        </div>
        <ol className="steps">
          {STEPS.map((s) => (
            <li key={s.n}>
              <span aria-hidden="true">{s.n}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}