import config from '../../../../c2b.config.json';

const prefix = config.prefix;
const radii = config.tokens.radius;

export function BorderRadiusSamples() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', marginTop: '1rem' }}>
      {Object.entries(radii).map(([name, value]) => (
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
              width: 100,
              height: 100,
              backgroundColor: '#0073aa',
              borderRadius: value,
            }}
          />
          <strong style={{ fontSize: '0.875rem' }}>{name}</strong>
          <code style={{ fontSize: '0.75rem', color: '#666' }}>
            var(--{prefix}-radius-{name}) · {value}
          </code>
        </div>
      ))}
    </div>
  );
}
