import type { Meta, StoryObj } from '@storybook/react-vite'
import { Section } from './Section'

const meta: Meta<typeof Section> = {
  title: 'Components/Layout/Section',
  component: Section,
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'inline-radio',
      options: ['section', 'div'],
    },
    maxWidth: {
      control: 'select',
      options: ['aligncontent', 'alignwide', 'alignfull'],
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
}

export default meta
type Story = StoryObj<typeof Section>

export const Primary: Story = {
  args: {
    as: 'section',
    isGrey: false,
    maxWidth: 'aligncontent',
    children: (
        <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam augue turpis, feugiat vitae viverra in,
            egestas vitae nulla. Quisque auctor ultrices mauris, et semper urna aliquam quis. Duis sed malesuada metus, et
            tristique dolor. Suspendisse vestibulum hendrerit. Aliquam blandit tellus odio, nec commodo est efficitur sit
            amet. Proin molestie, risus in mollis laoreet, lectus dui egestas augue, eu maximus velit dui sed quam.
            Pellentesque iaculis suscipit libero gravida tempus. Phasellus in egestas sapien ac libero.
        </p>
    ),
  },
}