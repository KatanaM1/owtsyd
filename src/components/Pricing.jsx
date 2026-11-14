const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    type: 'Website in a Day',
    price: '$800',
    features: [
      'One-page website, built in a day once content is ready',
      'Vagaro or Calendly booking integration',
      'Mobile-first design',
    ],
  },
  {
    id: 'business',
    name: 'Business',
    type: 'Multi-page website',
    price: '$2,500',
    features: [
      'Up to five pages',
      'On-page SEO essentials',
      'Custom animations',
    ],
    feature: true,
  },
]

export default function Pricing({ onOpenBrief }) {
  return (
    <section className="section wrap pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="section-heading">
        <div>
          <p className="label">Services &amp; pricing</p>
          <h2 id="pricing-title">Clear starting prices.</h2>
        </div>
      </div>
      <div className="plans">
        {PLANS.map((plan) => (
          <article
            key={plan.id}
            className={`plan${plan.feature ? ' feature' : ''}`}
          >
            <h3>{plan.name}</h3>
            <p className="plan-type">{plan.type}</p>
            <p className="price">
              <span>From</span> {plan.price}
            </p>
            <ul>
              {plan.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <button
              type="button"
              className="button outline"
              onClick={() => onOpenBrief(plan.name)}
            >
              Discuss {plan.name} <span aria-hidden="true">↗</span>
            </button>
          </article>
        ))}
      </div>
      <p className="addons">
        <strong>Add-ons</strong> <span>Logo design</span>
        <span>Copywriting</span>
      </p>
      <article className="maintenance">
        <div>
          <p className="label">Monthly subscription</p>
          <h3>Website Maintenance</h3>
          <p>Ongoing support after launch, with a monthly plan scoped to your site.</p>
        </div>
        <div>
          <ul>
            <li>Content and image updates</li>
            <li>Form and booking link checks</li>
            <li>Troubleshooting and minor fixes</li>
          </ul>
          <button
            type="button"
            className="button outline"
            onClick={() => onOpenBrief('Monthly website maintenance')}
          >
            Ask About a Monthly Plan <span aria-hidden="true">↗</span>
          </button>
        </div>
      </article>
    </section>
  )
}