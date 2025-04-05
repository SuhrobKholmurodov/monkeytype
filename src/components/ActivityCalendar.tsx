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
  endDate.setDate(endDate.getDate() + 1);
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
    <div className="pt-3 pr-6 pb-3 border rounded-md dark:border-[#c1c4ca] border-gray-600">
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
            const tooltipTitle = !value
              ? 'No test'
              : value.count === 0
              ? `No test on ${formatDate(new Date(value.date))}`
              : `${value.count} test${value.count > 1 ? 's' : ''} on ${formatDate(
                  new Date(value.date),
                )}`;
            return (
              <Tooltip
                key={index}
                title={tooltipTitle}
                arrow
                slotProps={{
                  tooltip: {
                    style: {
                      backgroundColor: 'black',
                      color: 'white',
                      fontSize: '14px',
                      borderRadius: '5px',
                      padding: '8px',
                    },
                  },
                  arrow: {
                    style: {
                      color: 'black',
                    },
                  },
                }}
              >
                {React.cloneElement(element as React.ReactElement<any>, {
                  className: `${(element as any).props.className || ''} rounded-md`,
                })}
              </Tooltip>
            );
          }}
        />
      </div>
      <div className="flex items-center justify-end gap-2 mt-[-50px] text-xs text-gray-500">
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
