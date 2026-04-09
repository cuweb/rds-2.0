import config from '../../../../c2b.config.json';

const prefix = config.prefix;
const colors = config.tokens.color;

type ColorEntry = { name: string; hex: string; cssVar: string; cssOnly?: boolean };

function parseColors(): ColorEntry[] {
  return Object.entries(colors).map(([name, value]) => ({
    name,
    hex: typeof value === 'string' ? value : value.value,
    cssVar: `--${prefix}-color-${name}`,
    cssOnly: typeof value === 'object' && 'cssOnly' in value ? value.cssOnly : false,
  }));
}

export function ColorSwatches({ filter }: { filter?: 'brand' | 'semantic' | 'neutral' }) {
  let entries = parseColors();

  if (filter === 'brand') {
    entries = entries.filter((e) => e.name.startsWith('primary') || e.name.startsWith('secondary'));
  } else if (filter === 'semantic') {
    entries = entries.filter((e) =>
      ['success', 'warning', 'error', 'info'].includes(e.name),
    );
  } else if (filter === 'neutral') {
    entries = entries.filter(
      (e) => !['primary', 'primary-hover', 'secondary', 'secondary-hover', 'success', 'warning', 'error', 'info'].includes(e.name),
    );
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
      {entries.map((entry) => (
        <div
          key={entry.name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 130,
            gap: '0.5rem',
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              backgroundColor: entry.hex,
              borderRadius: 8,
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
          <strong style={{ fontSize: '0.875rem' }}>{entry.name}</strong>
          <code style={{ fontSize: '0.75rem', color: '#666', textAlign: 'center' }}>
            var({entry.cssVar})
          </code>
          <span style={{ fontSize: '0.75rem', color: '#999' }}>{entry.hex}</span>
          {entry.cssOnly && (
            <span style={{ fontSize: '0.625rem', color: '#aaa', fontStyle: 'italic' }}>
              CSS only
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
