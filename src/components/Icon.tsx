import React from 'react';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import MenuIcon from '@mui/icons-material/Menu';
import { SvgIconProps } from '@mui/material';

const iconMap: Record<string, React.ElementType> = {
  chart: ShowChartIcon,
  menu: MenuIcon,
};

export interface IconProps extends SvgIconProps {
    name: string;
}

const Icon: React.FC<IconProps> = ({ name, ...props }) => {
    const IconComponent = iconMap[name] || MenuIcon;
    return <IconComponent {...props} />;
};

export default Icon;
