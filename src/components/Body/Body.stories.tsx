import type { Meta, StoryObj } from '@storybook/react-vite'
import { Body } from './Body'

const meta: Meta<typeof Body> = {
  title: 'Components/Layout/Body',
  component: Body,
  tags: ['autodocs'],
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
}

export default meta
type Story = StoryObj<typeof Body>

export const Primary: Story = {
  args: {
    children: 'Body component',
    className: 'cu-utils--alignfull',
  },
}
