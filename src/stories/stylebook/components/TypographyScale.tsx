import config from '../../../../c2b.config.json';

const prefix = config.prefix;
const baseStyles = config.baseStyles;
const fontSizes = config.tokens.fontSize;
const fontFamilies = config.tokens.fontFamily;

const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

export function HeadingScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
      {headingLevels.map((level) => {
        const styles = baseStyles[level];
        if (!styles) return null;
        return (
          <div key={level} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <div
              style={{
                fontSize: styles.fontSize,
                fontWeight: styles.fontWeight,
                fontStyle: 'fontStyle' in styles ? styles.fontStyle : undefined,
                color: `var(--${prefix}--color-${baseStyles.heading.color})`,
                lineHeight: 1.2,
              }}
            >
              Heading {level.slice(1)} — {styles.fontSize}
            </div>
            <code style={{ fontSize: '0.75rem', color: '#666' }}>
              {level}: {styles.fontSize} / weight {styles.fontWeight}
            </code>
          </div>
        );
      })}
    </div>
  );
}

export function BodySizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
      {Object.entries(fontSizes).map(([name, size]) => {
        const clamp = `clamp(${size.min}, 2vw, ${size.max})`;
        return (
          <div key={name} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <p style={{ fontSize: clamp, margin: 0, lineHeight: 1.5 }}>
              {name} — The quick brown fox jumps over the lazy dog
            </p>
            <code style={{ fontSize: '0.75rem', color: '#666' }}>
              var(--{prefix}--font-size-{name}) · {size.min} → {size.max}
            </code>
          </div>
        );
      })}
    </div>
  );
}

export function FontFamilies() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
      {Object.entries(fontFamilies).map(([name, def]) => {
        const family = typeof def === 'string' ? def : def.value;
        return (
          <div key={name} style={{ borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            <p style={{ fontFamily: family, fontSize: '1.25rem', margin: 0 }}>
              {name} — The quick brown fox jumps over the lazy dog
            </p>
            <code style={{ fontSize: '0.75rem', color: '#666' }}>
              var(--{prefix}--font-family-{name}) · {family}
            </code>
          </div>
        );
      })}
    </div>
  );
}
