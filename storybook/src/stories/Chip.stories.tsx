import type { Meta, StoryObj } from "@storybook/react-vite";
import Chip from "../../../src/components/Chip";
import React from "react";

const meta = {
  title: "CoreUI/Chip",
  component: Chip,
  tags: ["autodocs"],
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default Chip",
  },
};

export const Secondary: Story = {
  args: {
    label: "Secondary",
    color: "secondary",
  },
};

export const Deletable: Story = {
  render: (args) => <Chip {...args} onDelete={() => alert("Deleted!")} />,
  args: {
    label: "Deletable",
  },
};

export const Outlined: Story = {
  args: {
    label: "Outlined",
    variant: "outlined",
  },
};
