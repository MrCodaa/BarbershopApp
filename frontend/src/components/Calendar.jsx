import { useState } from 'react'
import {
  format, startOfMonth, endOfMonth, eachDayOfInterval,
  getDay, addMonths, subMonths, isBefore, startOfDay, isSameDay,
} from 'date-fns'
import { bs } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DOW = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned']

export default function Calendar({ selectedDate, onChange }) {
  const today = startOfDay(new Date())
  const [viewMonth, setViewMonth] = useState(
    selectedDate ? startOfMonth(new Date(selectedDate)) : startOfMonth(today)
  )

  const monthStart = startOfMonth(viewMonth)
  const monthEnd = endOfMonth(viewMonth)
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Mon=0 offset (getDay returns 0=Sun, so we shift)
  const startOffset = (getDay(monthStart) + 6) % 7

  const selected = selectedDate ? new Date(selectedDate) : null

  return (
    <div className="bg-stone-800 border border-stone-700 rounded-xl p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setViewMonth(subMonths(viewMonth, 1))}
          className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="font-medium text-white capitalize">
          {format(viewMonth, 'MMMM yyyy', { locale: bs })}
        </span>
        <button
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          className="p-1.5 text-stone-400 hover:text-white hover:bg-stone-700 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DOW.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-stone-500 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {/* Empty cells for offset */}
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {days.map((day) => {
          const isPast = isBefore(day, today)
          const isSelected = selected && isSameDay(day, selected)
          const isToday = isSameDay(day, today)

          return (
            <button
              key={day.toISOString()}
              disabled={isPast}
              onClick={() => onChange(format(day, 'yyyy-MM-dd'))}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-lg transition-all font-medium
                ${isPast ? 'text-stone-700 cursor-not-allowed' : ''}
                ${isSelected ? 'bg-amber-500 text-stone-900 font-bold' : ''}
                ${isToday && !isSelected ? 'border border-amber-500 text-amber-400' : ''}
                ${!isPast && !isSelected ? 'text-stone-200 hover:bg-stone-700' : ''}
              `}
            >
              {format(day, 'd')}
            </button>
          )
        })}
      </div>
    </div>
  )
}
