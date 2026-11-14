export default function Header() {
  return (
    <header className="blue">
      <div className="wrap header">
        <a className="brand" href="#top" aria-label="OWTSYD home">
           OWTSYD
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#graphic-design">Design</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
        </nav>
        <a className="top-link" href="#contact">
          Let’s talk <span aria-hidden="true">↗</span>
        </a>
      </div>
    </header>
  )
}