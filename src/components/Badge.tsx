import React from "react";
import MuiBadge, { BadgeProps as MuiBadgeProps } from "@mui/material/Badge";

interface BadgeProps {
  badgeContent: React.ReactNode;
  color?: MuiBadgeProps["color"];
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({
  badgeContent,
  color = "primary",
  children,
}) => (
  <MuiBadge badgeContent={badgeContent} color={color}>
    {children}
  </MuiBadge>
);

export default Badge;
