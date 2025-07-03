import type { Meta, StoryObj } from '@storybook/react-vite';
import Modal from '../../components/Modal';
import React, { useState } from 'react';
import Button from '@mui/material/Button';

const meta = {
  title: 'CoreUI/Modal',
  component: Modal,
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Modal {...args} open={open} onClose={() => setOpen(false)}>
        Modal Content
      </Modal>
    );
  },
  args: {},
};

export const WithTitle: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Modal {...args} open={open} onClose={() => setOpen(false)} title="Modal Title">
        Modal Content
      </Modal>
    );
  },
  args: {},
};

export const WithActions: Story = {
  render: (args) => {
    const [open, setOpen] = useState(true);
    return (
      <Modal
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm Action"
        actions={
          <>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Confirm
            </Button>
          </>
        }
      >
        Are you sure you want to proceed?
      </Modal>
    );
  },
  args: {},
}; 