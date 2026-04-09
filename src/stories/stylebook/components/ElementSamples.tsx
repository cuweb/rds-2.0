import config from '../../../../c2b.config.json';

const prefix = config.prefix;
const baseStyles = config.baseStyles;

export function ButtonSample() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
      <button
        type="button"
        style={{
          color: `var(--${prefix}-color-${baseStyles.button.color})`,
          backgroundColor: `var(--${prefix}-color-${baseStyles.button.background})`,
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: 4,
          fontSize: '1rem',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        Primary Button
      </button>
    </div>
  );
}

export function LinkSample() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
      <p style={{ margin: 0 }}>
        This is a paragraph with a{' '}
        <a
          href="https://example.com"
          style={{
            color: `var(--${prefix}-color-${baseStyles.link.color})`,
          }}
        >
          sample link
        </a>{' '}
        styled with the design system tokens.
      </p>
      <code style={{ fontSize: '0.75rem', color: '#666' }}>
        color: var(--{prefix}-color-{baseStyles.link.color}) · hover: var(--{prefix}-color-
        {baseStyles.link.hoverColor})
      </code>
    </div>
  );
}

export function CaptionSample() {
  const caption = baseStyles.caption;
  return (
    <div style={{ marginTop: '1rem' }}>
      <p
        style={{
          fontStyle: caption.fontStyle,
          fontWeight: caption.fontWeight,
          margin: 0,
        }}
      >
        This is a caption element styled with design tokens.
      </p>
      <code style={{ fontSize: '0.75rem', color: '#666' }}>
        font-size: var(--{prefix}-font-size-{caption.fontSize}) · weight: {caption.fontWeight} ·
        style: {caption.fontStyle}
      </code>
    </div>
  );
}
