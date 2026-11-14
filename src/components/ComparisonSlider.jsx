import { useId, useState } from 'react'

export default function ComparisonSlider({
  before,
  after,
  altBefore,
  altAfter,
  label,
  beforeWidth = 960,
  beforeHeight = 720,
  afterWidth,
  afterHeight,
}) {
  const [position, setPosition] = useState(50)
  const id = useId()

  const ariaText =
    position === 0
      ? 'After only'
      : position === 100
        ? 'Before only'
        : `${position}% before, ${100 - position}% after`

  return (
    <figure className="comparison">
      <figcaption>
        <span>Before</span>
        <span>After</span>
      </figcaption>
      <div
        className="comparison-stage"
        style={{ '--position': `${position}%` }}
      >
        <img
          className="comparison-after"
          src={after}
          alt={altAfter}
          width={afterWidth ?? beforeWidth}
          height={afterHeight ?? beforeHeight}
          loading="lazy"
          draggable="false"
        />
        <img
          className="comparison-before"
          src={before}
          alt={altBefore}
          width={beforeWidth}
          height={beforeHeight}
          loading="lazy"
          draggable="false"
        />
        <span className="comparison-divider" aria-hidden="true">
          <span>‹ ›</span>
        </span>
        <input
          id={id}
          className="comparison-control"
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={label}
          aria-valuetext={ariaText}
        />
      </div>
    </figure>
  )
}