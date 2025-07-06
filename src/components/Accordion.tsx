import React from "react";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface AccordionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
  title,
  children,
  defaultExpanded = false,
}) => (
  <MuiAccordion defaultExpanded={defaultExpanded}>
    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>{children}</AccordionDetails>
  </MuiAccordion>
);

export default Accordion;
