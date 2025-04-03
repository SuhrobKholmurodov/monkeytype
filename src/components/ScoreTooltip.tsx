import { Tooltip, Zoom } from '@mui/material'

interface ScoreTooltipProps {
  maxWPM: number
  accuracy: number
  completedAt: string
  label: string
}

export const ScoreTooltip = ({
  maxWPM,
  accuracy,
  completedAt,
  label
}: ScoreTooltipProps) => {
  return (
    <Tooltip
      title={
        <div className='flex items-center flex-col gap-1 p-2'>
          <p className='text-gray-200'>{maxWPM} WPM</p>
          <p className='text-gray-200'>{accuracy}% Accuracy</p>
          <p className='text-gray-200'>{completedAt}</p>
        </div>
      }
      placement='top'
      arrow
      TransitionComponent={Zoom}
      slotProps={{
        tooltip: {
          style: {
            backgroundColor: '#1f2930',
            color: 'white',
            fontSize: '14px',
            borderRadius: '8px',
            padding: '8px'
          }
        },
        arrow: {
          style: {
            color: '#1f2930'
          }
        }
      }}
    >
      <div className='flex flex-col items-center cursor-pointer'>
        <p className='text-gray-500'>{label}</p>
        <p className='text-[40px] font-[500]'>{maxWPM}</p>
        <p className='text-gray-400 text-[22px]'>{accuracy}%</p>
      </div>
    </Tooltip>
  )
}
