import config from '../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const colors = config.tokens.color;
const gradients = config.tokens.gradient;

type SwatchFilter = 'primary' | 'secondary' | 'semantic' | 'neutral' | 'gradient';

// Semantic colors have no natural name prefix, so they must be listed explicitly.
const SEMANTIC_NAMES = ['success', 'warning', 'error', 'info'] as const;

type SwatchEntry = {
  name: string;
  preview: string; // hex value or gradient string — set as the swatch background
  cssVar: string;
  displayValue?: string; // hex to show below; undefined for gradients
};

function categoryOf(name: string): Exclude<SwatchFilter, 'gradient'> {
  if (name === 'primary' || name.startsWith('primary-')) return 'primary';
  if (name === 'secondary' || name.startsWith('secondary-')) return 'secondary';
  if ((SEMANTIC_NAMES as readonly string[]).includes(name)) return 'semantic';
  return 'neutral';
}

function parseColors(filter?: SwatchFilter): SwatchEntry[] {
  return Object.entries(colors)
    .map(([name, value]) => {
      const hex = typeof value === 'string' ? value : value.value;
      return {
        name,
        preview: hex,
        cssVar: `--${prefix}--color-${name}`,
        displayValue: hex,
      };
    })
    .filter((e) => !filter || filter === 'gradient' || categoryOf(e.name) === filter);
}

function parseGradients(): SwatchEntry[] {
  return Object.entries(gradients).map(([name, def]) => ({
    name,
    preview: def.value,
    cssVar: `--${prefix}--gradient-${def.slug}`,
  }));
}

type ColorSwatchesProps = {
  filter?: SwatchFilter;
  title?: string;
  description?: string;
};

export function ColorSwatches({ filter, title, description }: ColorSwatchesProps) {
  const entries = filter === 'gradient' ? parseGradients() : parseColors(filter);

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
            <div className="sb-swatch__color" style={{ background: entry.preview }} />
            <strong className="sb-swatch__name">{entry.name}</strong>
            <code className="sb-swatch__var">var({entry.cssVar})</code>
            {entry.displayValue && <span className="sb-swatch__value">{entry.displayValue}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
