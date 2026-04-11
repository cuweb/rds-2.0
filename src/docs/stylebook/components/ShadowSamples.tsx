import config from '../../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const shadows = config.tokens.shadow;

type ShadowSamplesProps = {
  title?: string;
  description?: string;
};

export function ShadowSamples({ title, description }: ShadowSamplesProps) {
  return (
    <section className="sb-section">
      {(title || description) && (
        <header className="sb-header">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      )}
      <div className="sb-grid">
        {Object.entries(shadows).map(([name, value]) => (
          <div key={name} className="sb-swatch">
            <div
              className="sb-swatch__color"
              style={{ backgroundColor: '#f0f0f0', boxShadow: value }}
            />
            <strong className="sb-swatch__name">{name}</strong>
            <code className="sb-swatch__var">
              var(--{prefix}--shadow-{name})
            </code>
          </div>
        ))}
      </div>
    </section>
  );
}
