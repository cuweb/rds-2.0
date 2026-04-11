import config from '../../../../c2b.config.json';
import '../stylebook.css';

const prefix = config.prefix;
const spacing = config.tokens.spacing;

type SpacingScaleProps = {
  title?: string;
  description?: string;
};

function SectionWrapper({
  title,
  description,
  children,
}: SpacingScaleProps & { children: React.ReactNode }) {
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

function MetaLabel({ name }: { name: string }) {
  const def = spacing[name as keyof typeof spacing];
  return (
    <div>
      <strong className="sb-swatch__name">{name}</strong>
      <div>
        <code className="sb-stack__meta">
          var(--{prefix}--spacing-{name}) · {def.value}
        </code>
      </div>
    </div>
  );
}

export function SpacingScale({ title, description }: SpacingScaleProps) {
  return (
    <SectionWrapper title={title} description={description}>
      {Object.entries(spacing).map(([name, def]) => (
        <div key={name} className="sb-stack__item">
          <div className="sb-spacing-row">
            <div className="sb-spacing-demo" style={{ gap: def.value }}>
              <div className="sb-spacing-demo__block" />
              <div className="sb-spacing-demo__block" />
            </div>
            <MetaLabel name={name} />
          </div>
        </div>
      ))}
    </SectionWrapper>
  );
}

export function PaddingScale({ title, description }: SpacingScaleProps) {
  return (
    <SectionWrapper title={title} description={description}>
      {Object.entries(spacing).map(([name, def]) => (
        <div key={name} className="sb-stack__item">
          <div className="sb-spacing-row">
            <div className="sb-padding-demo" style={{ padding: def.value }}>
              <span className="sb-padding-demo__content">content</span>
            </div>
            <MetaLabel name={name} />
          </div>
        </div>
      ))}
    </SectionWrapper>
  );
}
