/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Heatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from '@mui/material';

type ContributionValue = {
  date: string;
  count: number;
};

type ActivityCalendarProps = {
  values: ContributionValue[];
};

export const ActivityCalendar = ({ values }: ActivityCalendarProps) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  const getColorClass = (count: number): string => {
    if (!count) return 'bg-gray-700 dark:bg-gray-300 dark:fill-gray-300 fill-gray-700';
    if (count < 3) return 'bg-green-600 fill-green-600';
    if (count < 6) return 'bg-green-500 fill-green-500';
    if (count < 10) return 'bg-green-400 fill-green-400';
    if (count < 15) return 'bg-green-300 fill-green-300';
    if (count < 20) return 'bg-green-200 fill-green-200';
    return 'bg-green-700 fill-green-700';
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="p-4 border rounded-md border-gray-600">
      <div>
        <Heatmap
          startDate={startDate}
          endDate={endDate}
          values={values}
          classForValue={(value) => {
            if (!value) return getColorClass(0);
            return getColorClass(value.count);
          }}
          showWeekdayLabels={true}
          gutterSize={2}
          weekdayLabels={['', 'Mon', '', 'Wed', '', 'Fri', '']}
          transformDayElement={(element, value, index) => {
            const tooltipTitle =
              value && value.date
                ? `${value.count} contributions on ${formatDate(new Date(value.date))}`
                : 'No contributions';

            return (
              <Tooltip key={index} title={tooltipTitle} arrow>
                {React.cloneElement(element as React.ReactElement<any>, {
                  className: `${(element as any).props.className || ''} rounded-sm`,
                })}
              </Tooltip>
            );
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-2 mt-[-40px] text-xs text-gray-500">
        <span>Less</span>
        <div className="flex space-x-[5px]">
          <div className="w-3 h-3 dark:bg-gray-300 bg-gray-700 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-700 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>
    </div>
  );
};
