import config from '../../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const fontSizes = config.tokens.fontSize;
const fontFamilies = config.tokens.fontFamily;

const SAMPLE_PARAGRAPH =
  'The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump! Sphinx of black quartz, judge my vow.';

const SAMPLE_HEADING = 'The quick brown fox jumps over the lazy dog';

type SectionProps = {
  title?: string;
  description?: string;
};

type FontSizeFilter = 'heading' | 'body' | 'all';

// fontSize tokens have two possible shapes:
//   { min, max }                                           — simple clamp
//   { value, fluid: { min, max }, cssOnly }                — explicit value + fluid range
// This normalizes both into a common { min, max } pair for display.
type FontSizeValue =
  | { min: string; max: string }
  | { value: string; fluid: { min: string; max: string }; cssOnly?: boolean };

function getFluidRange(size: FontSizeValue): { min: string; max: string } {
  return 'fluid' in size ? size.fluid : { min: size.min, max: size.max };
}

// Parse a font-size value (e.g. "1.5rem") into a number for sorting.
// For the simple {min, max} shape, use max as the representative size.
function sizeToNumber(size: FontSizeValue): number {
  const raw = 'value' in size ? size.value : size.max;
  return parseFloat(raw) || 0;
}

// Filter by token naming convention. Override per-usage with the `include`
// or `exclude` props if the convention doesn't fit a specific case.
function matchesFilter(name: string, filter: FontSizeFilter): boolean {
  if (filter === 'all') return true;
  const isHeading = name.startsWith('heading-');
  return filter === 'heading' ? isHeading : !isHeading;
}

function formatTokenName(name: string): string {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
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

type FontSizesProps = SectionProps & {
  /** Filter by token naming convention. Default `'all'`. */
  filter?: FontSizeFilter;
  /** Explicit list of token names to include. Overrides `filter`. */
  include?: string[];
  /** Explicit list of token names to exclude. Applied after filter/include. */
  exclude?: string[];
};

export function FontSizes({
  filter = 'all',
  include,
  exclude,
  title,
  description,
}: FontSizesProps) {
  const isHeadingView = filter === 'heading';
  const lineHeight = isHeadingView ? 'tight' : 'normal';

  const entries = (Object.entries(fontSizes) as [string, FontSizeValue][])
    .filter(([name]) => {
      if (include) return include.includes(name);
      if (!matchesFilter(name, filter)) return false;
      if (exclude?.includes(name)) return false;
      return true;
    })
    .sort(([, a], [, b]) => sizeToNumber(b) - sizeToNumber(a));

  return (
    <SectionWrapper title={title} description={description}>
      {entries.map(([name, size]) => {
        const { min, max } = getFluidRange(size);
        return (
          <div key={name} className="sb-stack__item">
            <p
              className="sb-stack__sample"
              style={{
                fontSize: `var(--${prefix}--font-size-${name})`,
                lineHeight: `var(--${prefix}--line-height-${lineHeight})`,
              }}
            >
              {isHeadingView ? formatTokenName(name) + ' — ' + SAMPLE_HEADING : SAMPLE_PARAGRAPH}
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

/**
 * Heading scale — shows font-size tokens whose names start with `heading-`.
 * Pass `include` or `exclude` to override the default naming filter.
 */
export function HeadingScale(props: Omit<FontSizesProps, 'filter'> & { filter?: FontSizeFilter }) {
  return <FontSizes {...props} filter={props.filter ?? 'heading'} />;
}

/**
 * Body sizes — shows font-size tokens whose names don't start with `heading-`.
 * Pass `include` or `exclude` to override the default naming filter.
 */
export function BodySizes(props: Omit<FontSizesProps, 'filter'> & { filter?: FontSizeFilter }) {
  return <FontSizes {...props} filter={props.filter ?? 'body'} />;
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
