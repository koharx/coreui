import React from "react";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  separator = "/",
}) => (
  <MuiBreadcrumbs separator={separator} aria-label="breadcrumb">
    {items.map((item, idx) =>
      item.href ? (
        <Link
          key={item.label}
          color={idx === items.length - 1 ? "text.primary" : "inherit"}
          href={item.href}
          onClick={item.onClick}
          underline="hover"
          aria-current={idx === items.length - 1 ? "page" : undefined}
        >
          {item.label}
        </Link>
      ) : (
        <Typography key={item.label} color="text.primary">
          {item.label}
        </Typography>
      )
    )}
  </MuiBreadcrumbs>
);

export default Breadcrumbs;
