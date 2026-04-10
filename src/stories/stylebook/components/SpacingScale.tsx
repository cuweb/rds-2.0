import config from '../../../../c2b.config.json';

const prefix = config.prefix;
const spacing = config.tokens.spacing;

export function SpacingScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
      {Object.entries(spacing).map(([name, def]) => (
        <div key={name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: def.value,
              height: 32,
              minWidth: 4,
              backgroundColor: '#0073aa',
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <strong style={{ fontSize: '0.875rem' }}>{name}</strong>
            <code style={{ fontSize: '0.75rem', color: '#666' }}>
              var(--{prefix}--spacing-{name}) · {def.value}
            </code>
          </div>
        </div>
      ))}
    </div>
  );
}
