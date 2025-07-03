import type { Meta, StoryObj } from '@storybook/react-vite';
import DatePicker from '../../components/DatePicker';
import React, { useState } from 'react';

const meta = {
  title: 'CoreUI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {},
};

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState(null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Select Date',
  },
};

export const CustomFormat: Story = {
  render: (args) => {
    const [value, setValue] = useState(null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Custom Format',
    format: 'dd/MM/yyyy',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState(null);
    return <DatePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    label: 'Disabled',
    disabled: true,
  },
}; 