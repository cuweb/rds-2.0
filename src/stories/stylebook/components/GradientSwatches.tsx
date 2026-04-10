import config from '../../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const gradients = config.tokens.gradient;

type GradientSwatchesProps = {
  title?: string;
  description?: string;
};

export function GradientSwatches({ title, description }: GradientSwatchesProps) {
  return (
    <section className="sb-section">
      {(title || description) && (
        <header className="sb-header">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      )}
      <div className="sb-grid sb-grid--wide">
        {Object.entries(gradients).map(([name, def]) => (
          <div key={name} className="sb-gradient">
            <div className="sb-gradient__bar" style={{ background: def.value }} />
            <strong className="sb-swatch__name">{name}</strong>
            <code className="sb-swatch__var">
              var(--{prefix}--gradient-{def.slug})
            </code>
          </div>
        ))}
      </div>
    </section>
  );
}
