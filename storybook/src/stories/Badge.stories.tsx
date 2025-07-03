import type { Meta, StoryObj } from "@storybook/react-vite";
import Badge from "../../../src/components/Badge";
import MailIcon from "@mui/icons-material/Mail";
import React from "react";

const meta = {
  title: "CoreUI/Badge",
  component: Badge,
  tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Badge {...args} badgeContent={4}>
      <MailIcon />
    </Badge>
  ),
  args: {},
};

export const Secondary: Story = {
  render: (args) => (
    <Badge {...args} badgeContent={99} color="secondary">
      <MailIcon />
    </Badge>
  ),
  args: {},
};

export const Dot: Story = {
  render: (args) => (
    <Badge {...args} badgeContent="" color="primary">
      <MailIcon />
    </Badge>
  ),
  args: {},
};

export const WithIcon: Story = {
  render: (args) => (
    <Badge {...args} badgeContent={<MailIcon fontSize="small" />} color="error">
      <MailIcon />
    </Badge>
  ),
  args: {},
};
