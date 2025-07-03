import type { Meta, StoryObj } from '@storybook/react-vite';
import Breadcrumbs from '../../../src/components/Breadcrumbs';

const meta = {
  title: 'CoreUI/Breadcrumbs',
  component: Breadcrumbs,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Library', href: '/library' },
      { label: 'Data' },
    ],
    separator: '>'
  },
};

export const ClickableLinks: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Section', href: '/section' },
      { label: 'Current Page' },
    ],
  },
};

export const LastItemCurrent: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/' },
      { label: 'Profile', href: '/profile' },
      { label: 'Settings' },
    ],
  },
}; 