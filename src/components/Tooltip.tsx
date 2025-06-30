import React from "react";
import MuiTooltip, {
  TooltipProps as MuiTooltipProps,
} from "@mui/material/Tooltip";

interface TooltipProps {
  title: React.ReactNode;
  children: React.ReactElement;
  placement?: MuiTooltipProps["placement"];
}

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = "bottom",
}) => (
  <MuiTooltip title={title} placement={placement}>
    {children}
  </MuiTooltip>
);

export default Tooltip;
