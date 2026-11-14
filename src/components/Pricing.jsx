const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    type: 'One-page website',
    price: '$800',
    audience: 'Independent professionals and small businesses that need one page to introduce their services and make it easy to get in touch.',
    features: ['Custom design and development for one page', 'Layouts for phones and desktops', 'Pre-launch testing and fixes'],
  },
  {
    id: 'business',
    name: 'Business',
    type: 'Multi-page website',
    price: '$2,500',
    audience: 'Businesses that need dedicated pages for their services, work, or locations so customers can find the details they need.',
    features: ['Custom design and development for up to five pages', 'On-page SEO essentials', 'Custom animations'],
    feature: true,
  },
]

export default function Pricing({ onOpenBrief }) {
  return (
    <section className="section wrap pricing" id="pricing" aria-labelledby="pricing-title">
      <div className="section-heading">
        <div><p className="label">Services &amp; pricing</p><h2 id="pricing-title">Clear starting prices.</h2></div>
      </div>
      <div className="plans">
        {PLANS.map((plan) => (
          <article key={plan.id} className={`plan${plan.feature ? ' feature' : ''}`}>
            <h3>{plan.name}</h3>
            <p className="plan-type">{plan.type}</p>
            <p className="price"><span>From</span> {plan.price}</p>
            <p className="plan-audience"><strong>Best for:</strong> {plan.audience}</p>
            <ul aria-label="What’s included">
              {plan.features.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a className="button outline" href="#brief-form" onClick={(e) => { e.preventDefault(); onOpenBrief(plan.name); }}>
              Discuss {plan.name} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
      <p className="addons"><strong>Add-ons</strong> <span>Logo design</span><span>Copywriting</span></p>
      
      <article className="maintenance">
        <div>
          <p className="label">Monthly subscription</p>
          <h3>Website Maintenance</h3>
          <p className="care-price"><span>From</span> $149<span> / month</span></p>
          <p>Optional paid support after launch, available with both website packages. We confirm the scope and monthly fee before you subscribe.</p>
        </div>
        <div>
          <ul>
            <li>Up to one hour of small content updates and fixes per month</li>
            <li>Form and booking link checks</li>
          </ul>
          <a className="button outline" href="#brief-form" onClick={(e) => { e.preventDefault(); onOpenBrief('Monthly website maintenance'); }}>
            Ask About a Monthly Plan <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </section>
  )
}