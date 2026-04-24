import type { Meta, StoryObj } from '@storybook/react-vite';
import { DepartmentBar } from './DepartmentBar';
import { defaultFooterButtons } from '../../data/FooterData';

const meta: Meta<typeof DepartmentBar> = {
  title: 'Components/Elements/Department Bar',
  component: DepartmentBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    controls: {
      sort: 'requiredFirst',
    },
  },
};
export default meta;
type Story = StoryObj<typeof DepartmentBar>;

export const Primary: Story = {
  render: (args) => <DepartmentBar {...args} />,
};
Primary.args = {
  deptName: 'Information Technology Services',
  officeNumber: '400',
  buildingName: 'Pigiarvik (ᐱᒋᐊᕐᕕᒃ)',
  phone: '613-520-2600',
  email: 'noreply@carleton.ca',
  buttons: defaultFooterButtons,
};
