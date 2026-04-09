import config from '../../../../c2b.config.json';

const prefix = config.prefix;
const gradients = config.tokens.gradient;

export function GradientSwatches() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem' }}>
      {Object.entries(gradients).map(([name, def]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            width: 240,
          }}
        >
          <div
            style={{
              height: 80,
              borderRadius: 8,
              background: def.value,
              border: '1px solid rgba(0,0,0,0.1)',
            }}
          />
          <strong style={{ fontSize: '0.875rem' }}>{name}</strong>
          <code style={{ fontSize: '0.75rem', color: '#666' }}>
            var(--{prefix}-gradient-{def.slug})
          </code>
        </div>
      ))}
    </div>
  );
}
