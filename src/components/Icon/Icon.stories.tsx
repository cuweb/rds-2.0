import type { Meta, StoryObj } from '@storybook/react-vite';
import { iconList, type IconName } from '@cuweb/rds-icons';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components/Elements/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'select',
      options: iconList.map((i) => i.value),
    },
    size: {
      control: 'text',
    },
  },
  parameters: {
    controls: {
      sort: 'requiredFirst',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Primary: Story = {
  args: {
    name: 'circle-check',
    size: 32,
  },
};

export const InheritsTextColor: Story = {
  name: 'Inherits text color',
  render: () => (
    <span style={{ color: 'var(--rds--color-primary)', fontSize: '2rem' }}>
      <Icon name="circle-check" /> color inherits from parent
    </span>
  ),
};

export const ExplicitFill: Story = {
  name: 'Explicit fill',
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Icon name="circle-check" size={32} fill="var(--rds--color-success)" />
      <Icon name="circle-xmark" size={32} fill="var(--rds--color-error)" />
      <Icon name="circle-exclamation" size={32} fill="var(--rds--color-warning)" />
    </div>
  ),
};

export const AccessibleLabel: Story = {
  name: 'With accessible label',
  render: () => <Icon name="circle-check" size={32} title="Operation succeeded" />,
};

export const AllIcons: Story = {
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
        gap: '0.5rem',
        padding: '1.5rem',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {iconList.map((entry) => (
        <div
          key={entry.value}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '1.25rem 1rem',
            border: '1px solid var(--rds--color-grey-lighter)',
            borderRadius: 'var(--rds--radius-md)',
            fontSize: '1rem',
            textAlign: 'center',
            wordBreak: 'break-word',
          }}
        >
          <Icon name={entry.value as IconName} size={24} />
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  ),
};
