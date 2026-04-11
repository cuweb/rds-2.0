import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Layouts/Templates',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['!autodocs'],
};

export default meta;
type Story = StoryObj;

const SinglePara = () => (
  <p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet tortor pellentesque,
    posuere tellus vitae, sagittis justo. Vivamus imperdiet turpis nec elit ultricies,{' '}
    <a href="https://carleton.ca">sed tempus diam dignissim</a>. Suspendisse condimentum magna vel
    orci vulputate, eget vulputate neque porttitor. Suspendisse euismod, urna et gravida volutpat,
    tortor risus vehicula nisl, in vulputate lectus dolor viverra est.
  </p>
);

const DoublePara = () => (
  <>
    <p>
      Aliquam luctus, velit eget suscipit tincidunt, sem ex tempus turpis, quis pulvinar metus
      sapien in urna. Nobis voluptatem dolorum et eum doloremque cupiditate velit. Praesentium
      architecto a distinctio aut reprehenderit ducimus. Perferendis excepturi delectus nihil
      voluptatem non.
    </p>
    <p>
      Nobis voluptatem dolorum et eum doloremque cupiditate velit. Praesentium architecto a
      distinctio aut reprehenderit ducimus. Perferendis excepturi delectus nihil voluptatem non.
      Molestiae quas dolores accusamus in. Praesent quis ligula quis nulla malesuada tempor.
    </p>
  </>
);

export const PageLayout: Story = {
  render: () => (
    <>
      <header>
        <nav aria-label="Primary">
          <a href="/">Raven Design System 2.0</a>
          <ul>
            <li>
              <a href="/about">About</a>
            </li>
            <li>
              <a href="/docs">Docs</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Basic Markup</h1>

        <SinglePara />

        <h2>Heading Two</h2>
        <SinglePara />
        <SinglePara />

        <h3>Heading Three</h3>
        <SinglePara />

        <h4>Heading Four</h4>
        <DoublePara />

        <h5>Heading Five</h5>
        <SinglePara />

        <h6>Heading Six</h6>
        <SinglePara />

        <h2>Inline Elements</h2>
        <p>
          A paragraph can contain <strong>bold text</strong>, <em>italic text</em>,{' '}
          <code>inline code</code>, <a href="https://carleton.ca">a link</a>, and{' '}
          <mark>highlighted text</mark>. Keyboard shortcuts look like{' '}
          <kbd>Cmd</kbd> + <kbd>K</kbd>, and abbreviations like{' '}
          <abbr title="Raven Design System">RDS</abbr> should render with dotted underlines.
        </p>

        <h2>Unordered List</h2>
        <ul>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet tortor
            pellentesque, posuere tellus vitae, sagittis justo.
          </li>
          <li>
            Suspendisse <a href="https://carleton.ca">velit eget suscipit tincidunt</a> vel orci
            vulputate, eget vulputate neque porttitor.
          </li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <ul>
              <li>Aenean sit amet tortor pellentesque, posuere tellus vitae, sagittis justo.</li>
              <li>Vivamus imperdiet turpis nec elit ultricies, sed tempus diam dignissim.</li>
              <li>
                Nested deeper
                <ul>
                  <li>Third level item one.</li>
                  <li>Third level item two.</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>Vivamus imperdiet turpis nec elit ultricies, sed tempus diam dignissim.</li>
        </ul>

        <h2>Ordered List</h2>
        <ol>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sit amet tortor
            pellentesque.
          </li>
          <li>Suspendisse condimentum magna vel orci vulputate, eget vulputate neque porttitor.</li>
          <li>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <ol>
              <li>Aenean sit amet tortor pellentesque, posuere tellus vitae, sagittis justo.</li>
              <li>Vivamus imperdiet turpis nec elit ultricies, sed tempus diam dignissim.</li>
            </ol>
          </li>
          <li>Vivamus imperdiet turpis nec elit ultricies, sed tempus diam dignissim.</li>
        </ol>

        <h2>Blockquote</h2>
        <blockquote cite="https://carleton.ca">
          <p>
            Nobis voluptatem dolorum et eum doloremque cupiditate velit. Praesentium architecto a
            distinctio aut reprehenderit ducimus. Perferendis excepturi delectus nihil voluptatem
            non.
          </p>
          <footer>
            — <cite>Jane Doe, Department of Examples</cite>
          </footer>
        </blockquote>

        <h2>Code Block</h2>
        <pre>
          <code>{`function greet(name) {
  return \`Hello, \${name}!\`;
}

greet('Raven');`}</code>
        </pre>

        <DoublePara />

        <hr />

        <DoublePara />
      </main>

      <footer>
        <p>&copy; Carleton University — Raven Design System 2.0</p>
      </footer>
    </>
  ),
};
