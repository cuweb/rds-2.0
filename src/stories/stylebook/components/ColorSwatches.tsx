import config from '../../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const colors = config.tokens.color;

type ColorEntry = { name: string; hex: string; cssVar: string; cssOnly?: boolean };
type ColorFilter = 'primary' | 'secondary' | 'semantic' | 'neutral';

// Semantic colors have no natural name prefix, so they must be listed explicitly.
const SEMANTIC_NAMES = ['success', 'warning', 'error', 'info'] as const;

function parseColors(): ColorEntry[] {
  return Object.entries(colors).map(([name, value]) => ({
    name,
    hex: typeof value === 'string' ? value : value.value,
    cssVar: `--${prefix}--color-${name}`,
    cssOnly: typeof value === 'object' && 'cssOnly' in value ? value.cssOnly : false,
  }));
}

function categoryOf(name: string): ColorFilter {
  if (name === 'primary' || name.startsWith('primary-')) return 'primary';
  if (name === 'secondary' || name.startsWith('secondary-')) return 'secondary';
  if ((SEMANTIC_NAMES as readonly string[]).includes(name)) return 'semantic';
  return 'neutral';
}

type ColorSwatchesProps = {
  filter?: ColorFilter;
  title?: string;
  description?: string;
};

export function ColorSwatches({ filter, title, description }: ColorSwatchesProps) {
  const entries = parseColors().filter((e) => !filter || categoryOf(e.name) === filter);

  return (
    <section className="sb-section">
      {(title || description) && (
        <header className="sb-header">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      )}
      <div className="sb-grid">
        {entries.map((entry) => (
          <div key={entry.name} className="sb-swatch">
            <div className="sb-swatch__color" style={{ backgroundColor: entry.hex }} />
            <strong className="sb-swatch__name">{entry.name}</strong>
            <code className="sb-swatch__var">var({entry.cssVar})</code>
            <span className="sb-swatch__value">{entry.hex}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
