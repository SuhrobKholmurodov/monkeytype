/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Heatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Tooltip } from '@mui/material';
import { ContributionValue } from '~/pages/Profile';

type ActivityCalendarProps = {
  values: ContributionValue[];
};

export const ActivityCalendar = ({ values }: ActivityCalendarProps) => {
  const endDate = new Date();
  endDate.setDate(endDate.getDate());
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);

  const totalTests = values.reduce((sum, value) => sum + value.count, 0);

  const getColorClass = (count: number): string => {
    const maxTestsPerDay = Math.max(...values.map((el) => el.count));
    if (!count) return 'bg-gray-700 dark:bg-gray-300 dark:fill-gray-300 fill-gray-700';

    const level = Math.round((count / maxTestsPerDay) * 5);

    if (level === 0) return 'bg-green-700 fill-green-700';
    if (level === 1) return 'bg-green-600 fill-green-600';
    if (level === 2) return 'bg-green-500 fill-green-500';
    if (level === 3) return 'bg-green-400 fill-green-400';
    if (level === 4) return 'bg-green-300 fill-green-300';
    return 'bg-green-200 fill-green-200';
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
          endDate={endDate}
          values={values}
          startDate={startDate}
          showMonthLabels={true}
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

      <div className="flex items-center ml-[60px] justify-between mt-[-50px]">
        <Tooltip
          title="Total count of tests!"
          arrow
          placement="top"
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
          <div className="text-center hover:cursor-pointer border px-6 dark:border-gray-300 py-1 rounded-md border-gray-500 text-lg font-medium text-gray-400">
            {totalTests} test{totalTests !== 1 ? 's' : ''}
          </div>
        </Tooltip>
        <div className="flex items-center justify-end gap-2 text-xs text-gray-500">
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
    </div>
  );
};
