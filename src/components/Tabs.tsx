import React from "react";
import MuiTabs from "@mui/material/Tabs";
import MuiTab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface TabsProps {
  labels: string[];
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  children: React.ReactNode[];
}

const Tabs: React.FC<TabsProps> = ({ labels, value, onChange, children }) => (
  <Box>
    <MuiTabs value={value} onChange={onChange}>
      {labels.map((label, idx) => (
        <MuiTab key={label} label={label} />
      ))}
    </MuiTabs>
    <Box mt={2}>{children[value]}</Box>
  </Box>
);

export default Tabs;
