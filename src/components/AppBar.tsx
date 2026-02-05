import React from 'react';
import { AppBar as MuiAppBar, Toolbar, AppBarProps as MuiAppBarProps } from '@mui/material';

const AppBar: React.FC<MuiAppBarProps> = ({ children, ...props }) => {
  return (
    <MuiAppBar position="static" {...props}>
      <Toolbar>{children}</Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
