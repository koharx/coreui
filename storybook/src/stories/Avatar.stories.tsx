import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "../../../src/components/Avatar";
import React from "react";

const meta = {
  title: "CoreUI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const WithImage: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/men/32.jpg",
    alt: "User Avatar",
  },
};

export const WithAlt: Story = {
  args: {
    src: "https://randomuser.me/api/portraits/women/44.jpg",
    alt: "Jane Doe",
  },
};

export const WithInitials: Story = {
  args: {
    children: "JD",
  },
};

export const CustomSize: Story = {
  render: (args) => (
    <div style={{ width: 56, height: 56 }}>
      <Avatar {...args} />
    </div>
  ),
  args: {
    children: "XL",
  },
};
