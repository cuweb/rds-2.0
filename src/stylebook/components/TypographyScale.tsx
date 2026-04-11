import config from '../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const baseStyles = config.baseStyles;
const fontSizes = config.tokens.fontSize;
const fontFamilies = config.tokens.fontFamily;

const headingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;

const SAMPLE_PARAGRAPH =
  'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow.';

type SectionProps = {
  title?: string;
  description?: string;
};

// fontSize tokens have two possible shapes:
//   { min, max }                                           — simple clamp
//   { value, fluid: { min, max }, cssOnly }                — explicit value + fluid range
// This normalizes both into a common { min, max } pair for display.
type FontSizeValue = { min: string; max: string } | { value: string; fluid: { min: string; max: string }; cssOnly?: boolean };

function getFluidRange(size: FontSizeValue): { min: string; max: string } {
  return 'fluid' in size ? size.fluid : { min: size.min, max: size.max };
}

function SectionWrapper({
  title,
  description,
  children,
}: SectionProps & { children: React.ReactNode }) {
  return (
    <section className="sb-section">
      {(title || description) && (
        <header className="sb-header">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </header>
      )}
      <div className="sb-stack">{children}</div>
    </section>
  );
}

export function HeadingScale({ title, description }: SectionProps) {
  return (
    <SectionWrapper title={title} description={description}>
      {headingLevels.map((level) => {
        const styles = baseStyles[level];
        if (!styles) return null;
        return (
          <div key={level} className="sb-stack__item">
            <div
              className="sb-stack__sample"
              style={{
                fontSize: `var(--${prefix}--font-size-${styles.fontSize})`,
                fontWeight: `var(--${prefix}--font-weight-${styles.fontWeight})`,
                fontStyle: 'fontStyle' in styles ? styles.fontStyle : undefined,
                lineHeight: `var(--${prefix}--line-height-tight)`,
              }}
            >
              Heading {level.slice(1)}
            </div>
            <code className="sb-stack__meta">
              {level}: {styles.fontSize} / weight {styles.fontWeight}
            </code>
          </div>
        );
      })}
    </SectionWrapper>
  );
}

export function BodySizes({ title, description }: SectionProps) {
  return (
    <SectionWrapper title={title} description={description}>
      {(Object.entries(fontSizes) as [string, FontSizeValue][]).map(([name, size]) => {
        const { min, max } = getFluidRange(size);
        return (
          <div key={name} className="sb-stack__item">
            <p
              className="sb-stack__sample"
              style={{
                fontSize: `var(--${prefix}--font-size-${name})`,
                lineHeight: `var(--${prefix}--line-height-normal)`,
              }}
            >
              {SAMPLE_PARAGRAPH}
            </p>
            <code className="sb-stack__meta">
              var(--{prefix}--font-size-{name}) · {min} → {max}
            </code>
          </div>
        );
      })}
    </SectionWrapper>
  );
}

export function FontFamilies({ title, description }: SectionProps) {
  return (
    <SectionWrapper title={title} description={description}>
      {Object.entries(fontFamilies).map(([name, def]) => {
        const family = typeof def === 'string' ? def : def.value;
        return (
          <div key={name} className="sb-stack__item">
            <p
              className="sb-stack__sample"
              style={{ fontFamily: family, fontSize: '1.25rem', lineHeight: 1.4 }}
            >
              <strong>{name}</strong> — The quick brown fox jumps over the lazy dog
            </p>
            <code className="sb-stack__meta">
              var(--{prefix}--font-family-{name}) · {family}
            </code>
          </div>
        );
      })}
    </SectionWrapper>
  );
}
