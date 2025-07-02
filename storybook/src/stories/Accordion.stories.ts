import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from 'coreui';

const meta = {
  title: 'Library/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    defaultExpanded: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: {
    title: 'Accordion Title',
    defaultExpanded: false,
    children: 'Accordion content goes here.',
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Accordion Title',
    defaultExpanded: false,
    children: 'Accordion content goes here.',
  },
};

export const Expanded: Story = {
  args: {
    title: 'Expanded Accordion',
    defaultExpanded: true,
    children: 'This accordion is expanded by default.',
  },
}; 