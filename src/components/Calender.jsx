import React, { useState, useEffect } from 'react';
import EventModal from './EventModal';
import { format, startOfMonth, endOfMonth, addMonths, subMonths, isSameDay, isToday } from 'date-fns';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const weekdays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const daysInMonth = Array.from({ length: endOfMonth(currentMonth).getDate() }, (_, i) => i + 1);
    const firstDayOfMonth = startOfMonth(currentMonth);
    const lastDayOfMonth = endOfMonth(currentMonth);
    const startDay = firstDayOfMonth.getDay();
    const totalDays = daysInMonth.length + startDay;

    const handleDateClick = (day) => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        setSelectedDate(date);
        setIsModalOpen(true);
    };

    const handleSubmit = (event) => {
        if (eventToEdit) {
            setEvents(events.map(e => (e.id === eventToEdit.id ? event : e)));
        } else {
            setEvents([...events, { ...event, id: Date.now() }]);
        }
        setIsModalOpen(false);
        setEventToEdit(null);
    };

    const handleEditEvent = (event) => {
        setEventToEdit(event);
        setIsModalOpen(true);
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
            <div className="flex justify-between mb-4">
                <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} 
                 className='py-2 px-4 bg-black text-white rounded-md text-center'   
                    >Previous</button>
                <h2 className="text-2xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
                <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className='py-2 px-4 bg-black text-white rounded-md text-center'    
                    >Next</button>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {weekdays.map(day=>(
                    <div key={day} className={`h-16 border p-2 text-base font-medium bg-blue-950 text-white opacity-90 text-center`}>{day}</div> 
                ))}
                {Array.from({ length: startDay }).map((_, i) => <div key={i} className="h-16" />)}
                {daysInMonth.map(day => {
                    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                    return (
                        <div key={day} className={`h-16 border p-2 shadow-md shadow-gray-200 bg-white opacity-90 text-center hover:bg-blue-400 hover:cursor-pointer ${isToday(date) ? 'bg-blue-200' : ''}`} 
                        onClick={() => handleDateClick(day)}>
                            <div>{day}</div>
                            {events.filter(event => isSameDay(new Date(event.start), date)).map(event => (
                                <div key={event.id} className="text-sm">
                                    {event.name}
                                    <button onClick={() => handleEditEvent(event)}>Edit</button>
                                    <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
            {isModalOpen && (
                <EventModal
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                    eventToEdit={eventToEdit}
                    selectedDate={selectedDate}
                />
            )}
        </div>
    );
};

export default Calendar;