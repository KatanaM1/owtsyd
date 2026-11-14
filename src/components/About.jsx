export default function About() {
  return (
    <section className="section wrap about" id="about" aria-labelledby="about-title">
      <figure className="about-portrait">
        <img
          src="/studio-portrait.webp"
          alt="Portrait of the designer behind OWTSYD on a palm-lined street"
          width={1080}
          height={1440}
          loading="lazy"
        />
      </figure>
      <div>
        <p className="label">About OWTSYD</p>
        <h2 id="about-title">An independent design studio for small businesses.</h2>
<p>Our team brings 10 years of experience in web and graphic design. We work with small businesses on websites, brand identities, and the design they need day to day.</p>
      </div>
    </section>
  )
}