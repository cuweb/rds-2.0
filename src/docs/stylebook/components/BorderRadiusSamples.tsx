import config from '../../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const radii = config.tokens.radius;

type BorderRadiusSamplesProps = {
  title?: string;
  description?: string;
};

export function BorderRadiusSamples({ title, description }: BorderRadiusSamplesProps) {
  return (
    <section className="sb-section">
      {(title || description) && (
        <header className="sb-header">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      )}
      <div className="sb-grid">
        {Object.entries(radii).map(([name, value]) => (
          <div key={name} className="sb-swatch">
            <div
              className="sb-swatch__color"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #191919',
                borderRadius: value,
              }}
            />
            <strong className="sb-swatch__name">{name}</strong>
            <code className="sb-swatch__var">
              var(--{prefix}--radius-{name})
            </code>
            <span className="sb-swatch__value">{value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
