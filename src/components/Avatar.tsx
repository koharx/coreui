import React from "react";
import MuiAvatar from "@mui/material/Avatar";

interface AvatarProps {
  src?: string;
  alt?: string;
  children?: React.ReactNode;
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, children }) => (
  <MuiAvatar src={src} alt={alt}>
    {children}
  </MuiAvatar>
);

export default Avatar;
