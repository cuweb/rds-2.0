import type { Meta, StoryObj } from '@storybook/react-vite';
import { Main } from '../../components/Main/Main';

const meta: Meta = {
  title: 'Overview/Stylebook/Content Flow',
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

export const ContentFlow: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false },
          { id: 'landmark-complementary-is-top-level', enabled: false },
        ],
      },
    },
  },
  render: () => (
    <Main>
      <h1>Heading One: Page Title</h1>

      <p>
        This is an example page. It is different from a blog post because it will stay in one place
        and will show up in your site navigation (in most themes). Most people start with an About
        page that introduces them to potential site visitors. It might say something like this:
      </p>

      <h2>Heading Two</h2>
      <SinglePara />

      <h3>Heading Three</h3>
      <SinglePara />

      <h4>Heading Four</h4>
      <SinglePara />

      <h5>Heading Five</h5>
      <SinglePara />

      <h6>Heading Six</h6>
      <SinglePara />

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

      <SinglePara />

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

      <SinglePara />

      <p>
        Hi there! I am a bike messenger by day, aspiring actor by night, and this is my website. I
        live in Los Angeles, have a great dog named Jack, and I like piña coladas. (And getting
        caught in the rain.)
      </p>

      <SinglePara />
    </Main>
  ),
};
