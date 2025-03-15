import { Tooltip } from '@mui/material';
import React from 'react';

interface HeaderTooltipProps {
  title: string;
  children: React.ReactNode;
}

export const HeaderTooltip = ({ title, children }: HeaderTooltipProps) => {
  return (
    <Tooltip
      title={title}
      arrow
      componentsProps={{
        tooltip: {
          style: {
            backgroundColor: 'black',
            color: 'white',
            fontSize: '14px',
          },
        },
        arrow: {
          style: {
            color: 'black',
          },
        },
      }}
    >
      <div>{children} </div>
    </Tooltip>
  );
};
