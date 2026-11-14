import ComparisonSlider from './ComparisonSlider.jsx'

const PROJECTS = [
  {
    id: 'apollo',
    title: 'Apollo Tattoo & Piercing',
    description:
      'Santa Monica tattoo studio · Mobile booking and artist discovery',
    before: '/apollo-before.webp',
    after: '/apollo-after.webp',
    altBefore:
      'Screenshot of the original Apollo homepage with a gold and navy design and booking buttons',
    altAfter:
      'Screenshot of the Apollo redesign with bold typography, monochrome artwork, and separate tattoo and piercing booking options',
  },
  {
    id: 'lash',
    title: 'Lash Pilot',
    description:
      'Lash and brow studio · Service browsing and appointment booking',
    before: '/lash-before.webp',
    after: '/lash-after.webp',
    altBefore:
      'Screenshot of the original Lash Pilot homepage with pink navigation and a beauty portrait',
    altAfter:
      'Lash Pilot redesign mockup with black and white photography, a services menu, and a pink appointment button',
    afterWidth: 724,
    afterHeight: 543,
  },
]

export default function Work() {
  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="wrap">
        <div className="section-heading">
          <div>
            <p className="label">Portfolio</p>
            <h2 id="work-title">Selected redesigns.</h2>
          </div>
          <p>Drag the slider to compare each original homepage with our redesign.</p>
        </div>
        <div className="work-grid">
          {PROJECTS.map((p) => (
            <article className="project" key={p.id} aria-labelledby={`${p.id}-title`}>
              <h3 id={`${p.id}-title`}>{p.title}</h3>
              <p>{p.description}</p>
              <ComparisonSlider
                before={p.before}
                after={p.after}
                altBefore={p.altBefore}
                altAfter={p.altAfter}
                label={`Compare ${p.title} before and after`}
                beforeWidth={960}
                beforeHeight={720}
                afterWidth={p.afterWidth}
                afterHeight={p.afterHeight}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}