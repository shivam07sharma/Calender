import React, { useState, useEffect } from 'react';

const EventModal = ({ onClose, onSubmit, eventToEdit, selectedDate }) => {
    const [eventName, setEventName] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');
    useEffect(() => {
        if (eventToEdit) {
            setEventName(eventToEdit.name);
            setStartTime(eventToEdit.start);
            setEndTime(eventToEdit.end);
            setDescription(eventToEdit.description || '');
        } else {
            setEventName('');
            setStartTime('');
            setEndTime('');
            setDescription('');
        }
    }, [eventToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const event = {
            name: eventName,
            start: startTime,
            end: endTime,
            description,
        };
        onSubmit(event);
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded shadow-lg">
                    <h2 className="text-xl mb-4">{eventToEdit ? 'Edit Event' : 'Add Event'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-2">
                            <label className="block">Event Name</label>
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block">Start Time</label>
                            <input
                                type="datetime-local"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block">End Time</label>
                            <input
                                type="datetime-local"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="border p-2 w-full"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border p-2 w-full"
                            />
                        </div>
                        <div className="flex justify-between mt-4">
                            <button type="button" onClick={onClose} className="bg-gray-300 p-2 rounded">Cancel</button>
                            <button type="submit" className="bg-blue-500 text-white p-2 rounded">{eventToEdit ? 'Update' : 'Add'}</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default EventModal;