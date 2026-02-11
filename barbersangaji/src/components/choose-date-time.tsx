import { useState, useEffect } from 'react'
import { useAppointment } from '../lib/appointment-provider'
import { TabPage } from './appointment-service'
import { useI18n } from '../lib/i18n'

export default function ChooseDateTime({
    setActiveTab,
}: {
    setActiveTab: React.Dispatch<React.SetStateAction<TabPage>>
}) {
    const { handleSetDate } = useAppointment()
    const { t, lang } = useI18n()
    const locale = lang === 'id' ? 'id-ID' : 'en-US'

    const dateNow = new Date()

    const [selectedDate, setSelectedDate] = useState(dateNow)
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('')
    const [timeOfDay, setTimeOfDay] = useState('Morning')

    const morningSlots = [
        '7:00 am',
        '7:15 am',
        '7:30 am',
        '7:45 am',
        '8:00 am',
        '8:15 am',
        '8:30 am',
        '10:00 am',
        '10:15 am',
        '10:30 am',
        '10:45 am',
        '11:00 am',
        '11:15 am',
        '11:30 am',
        '11:45 am',
    ]
    const afternoonSlots = [
        '12:00 pm',
        '12:15 pm',
        '12:30 pm',
        '12:45 pm',
        '1:00 pm',
        '1:15 pm',
        '1:30 pm',
        '1:45 pm',
        '2:00 pm',
        '2:15 pm',
        '2:30 pm',
        '2:45 pm',
        '3:00 pm',
        '3:15 pm',
        '3:30 pm',
    ]

    // Function to get the start of the current week (Sunday)
    const getStartOfWeek = (date: Date) => {
        const startOfWeek = new Date(date)
        const dayOfWeek = startOfWeek.getDay()
        startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek) // Adjust to the previous Sunday
        return startOfWeek
    }

    // Function to get the full week dates based on a start date
    const getWeekDates = (startDate: Date) => {
        const week = []
        for (let i = 0; i < 7; i++) {
            const day = new Date(startDate)
            day.setDate(startDate.getDate() + i)
            week.push(day)
        }
        return week
    }

    // Set the starting point of the week based on the current date
    const [weekDate, setWeekDate] = useState(getStartOfWeek(dateNow))
    const [weekDates, setWeekDates] = useState(getWeekDates(weekDate))

    const formatDateRange = (dates: Date[]) => {
        const start = dates[0]
        const end = dates[dates.length - 1]
        const options: Intl.DateTimeFormatOptions = {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }
        return `${start.toLocaleDateString(locale, options)} - ${end.toLocaleDateString(locale, options)}`
    }

    const handlePrevWeek = () => {
        const newDate = new Date(weekDate)
        newDate.setDate(weekDate.getDate() - 7)
        setWeekDate(newDate)
        setWeekDates(getWeekDates(newDate))
    }

    const handleNextWeek = () => {
        const newDate = new Date(weekDate)
        newDate.setDate(weekDate.getDate() + 7)
        setWeekDate(newDate)
        setWeekDates(getWeekDates(newDate))
    }

    const formatSelectedDateTime = () => {
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }
        const formattedDate = selectedDate.toLocaleDateString(locale, options)
        return `${formattedDate}, ${selectedTimeSlot}`
    }

    // Update week dates whenever the selected date changes
    useEffect(() => {
        setWeekDate(getStartOfWeek(selectedDate))  // Recalculate start of the week when selectedDate changes
        setWeekDates(getWeekDates(getStartOfWeek(selectedDate))) // Update the full week dates
    }, [selectedDate])

    return (
        <div className='container p-4 rounded-lg'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
                <div className='small text-white'>{formatDateRange(weekDates)}</div>
                <div className='btn-group'>
                    <button className='btn btn-secondary btn-week-nav' onClick={handlePrevWeek}>
                        <i className='fa fa-chevron-left'></i>
                    </button>
                    <button className='btn btn-secondary btn-week-nav' onClick={handleNextWeek}>
                        <i className='fa fa-chevron-right'></i>
                    </button>
                </div>
            </div>

            <div className='row mb-4 flex-nowrap container-date-picker overflow-auto'>
                {weekDates.map((date, index) => (
                    <div key={index} className='col text-center'>
                        <div className='small mb-1 text-white'>{date.toLocaleDateString(locale, { weekday: 'short' })}</div>
                        <button
                            className={`btn btn-sm ${date.toDateString() === selectedDate.toDateString()
                                ? 'btn-primary'
                                : 'bg-light-subtle text-white'
                                } w-100`}
                            style={{ aspectRatio: '1' }}
                            onClick={() => setSelectedDate(date)}
                        >
                            {date.getDate()}
                        </button>
                    </div>
                ))}
            </div>

            <h2 className='h5 mb-3 text-white'>{t('booking.choose_time')}</h2>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <div className='btn-group'>
                    <button
                        className={`btn ${timeOfDay === 'Morning' ? 'btn-primary' : 'bg-light-subtle text-white'}`}
                        onClick={() => setTimeOfDay('Morning')}
                    >
                        {t('booking.morning')}
                    </button>
                    <button
                        className={`btn ${timeOfDay === 'Afternoon' ? 'btn-primary' : 'bg-light-subtle text-white'}`}
                        style={{ marginLeft: '0.5rem' }}
                        onClick={() => setTimeOfDay('Afternoon')}
                    >
                        {t('booking.afternoon')}
                    </button>
                </div>
            </div>

            <h3 className='h5 mb-3 text-white'>{timeOfDay === 'Morning' ? t('booking.morning') : t('booking.afternoon')}</h3>
            <div className='row row-cols-2 row-cols-sm-4 g-2'>
                {(timeOfDay === 'Morning' ? morningSlots : afternoonSlots).map(
                    (slot) => (
                        <div key={slot} className='col'>
                            <button
                                className={`btn btn-sm bg-light-subtle text-white w-100 ${selectedTimeSlot === slot ? 'border border-primary' : ''}`}
                                onClick={() => setSelectedTimeSlot(slot)}
                            >
                                {slot}
                            </button>
                        </div>
                    )
                )}
            </div>
            <div className='w-100 d-flex justify-content-end'>
                <button
                    className='btn btn-primary mt-4'
                    onClick={() => {
                        handleSetDate(formatSelectedDateTime())
                        setActiveTab('Customer Info')
                    }}
                    disabled={selectedTimeSlot === ''}
                >
                    {t('booking.continue')}
                </button>
            </div>
        </div>
    )
}
