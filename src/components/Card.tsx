import React from 'react';
import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';

const Card: React.FC<MuiCardProps> = (props) => {
  return <MuiCard {...props} />;
};

export default Card;
