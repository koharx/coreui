import React from "react";
import MuiPagination, {
  PaginationProps as MuiPaginationProps,
} from "@mui/material/Pagination";

interface PaginationProps {
  count: number;
  page: number;
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
  color?: MuiPaginationProps["color"];
  size?: MuiPaginationProps["size"];
  variant?: MuiPaginationProps["variant"];
  shape?: MuiPaginationProps["shape"];
}

const Pagination: React.FC<PaginationProps> = ({
  count,
  page,
  onChange,
  color = "primary",
  size = "medium",
  variant = "text",
  shape = "circular",
}) => (
  <MuiPagination
    count={count}
    page={page}
    onChange={onChange}
    color={color}
    size={size}
    variant={variant}
    shape={shape}
  />
);

export default Pagination;
