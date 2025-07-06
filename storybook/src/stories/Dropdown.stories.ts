import type { Meta, StoryObj } from '@storybook/react-vite';
import Dropdown from '../../components/Dropdown';
import React, { useState } from 'react';
import { SelectChangeEvent } from '@mui/material/Select';

const meta = {
  title: 'CoreUI/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('1');
    const handleChange = (event: SelectChangeEvent) => setValue(event.target.value);
    return <Dropdown {...args} value={value} onChange={handleChange} />;
  },
  args: {
    options,
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState('2');
    const handleChange = (event: SelectChangeEvent) => setValue(event.target.value);
    return <Dropdown {...args} value={value} onChange={handleChange} />;
  },
  args: {
    options,
    label: 'Choose an option',
  },
};

export const Disabled: Story = {
  render: (args) => {
    const [value, setValue] = useState('3');
    const handleChange = (event: SelectChangeEvent) => setValue(event.target.value);
    return <Dropdown {...args} value={value} onChange={handleChange} />;
  },
  args: {
    options,
    disabled: true,
  },
};

export const FullWidth: Story = {
  render: (args) => {
    const [value, setValue] = useState('1');
    const handleChange = (event: SelectChangeEvent) => setValue(event.target.value);
    return <Dropdown {...args} value={value} onChange={handleChange} />;
  },
  args: {
    options,
    fullWidth: true,
    label: 'Full Width',
  },
}; 