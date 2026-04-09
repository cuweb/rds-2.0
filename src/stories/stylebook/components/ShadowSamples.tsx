import config from '../../../../c2b.config.json';

const prefix = config.prefix;
const shadows = config.tokens.shadow;

export function ShadowSamples() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem' }}>
      {Object.entries(shadows).map(([name, value]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          <div
            style={{
              width: 120,
              height: 120,
              backgroundColor: '#fff',
              borderRadius: 8,
              boxShadow: value,
            }}
          />
          <strong style={{ fontSize: '0.875rem' }}>{name}</strong>
          <code style={{ fontSize: '0.75rem', color: '#666' }}>var(--{prefix}-shadow-{name})</code>
        </div>
      ))}
    </div>
  );
}
