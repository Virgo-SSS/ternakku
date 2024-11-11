import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Flatpickr from "react-flatpickr";
import interactionPlugin from "@fullcalendar/interaction" 

export const CalendarPage = () => {
    const date  =  new Date();

    let events = [
        { title: 'Meeting', start: '2024-11-02T10:30:00', end: '2024-11-03T12:30:00', classNames: 'fc-event-danger' },
        { title: 'Meeting', start: '2024-11-05T13:00:00', end: '2024-11-10T15:00:00', classNames: 'fc-event-warning' },
        { title: 'Meeting', start: '2024-11-03T16:00:00', end: '2024-11-08T18:00:00', classNames: 'fc-event-success' },
        { title: 'Meeting', start: '2024-11-15T16:00:00', end: '2024-11-17T18:00:00', classNames: 'fc-event-primary' },
        { title: 'Meeting', start: '2024-11-15T16:00:00', end: '2024-11-17T18:00:00', classNames: 'fc-event-info' },
        { title: 'Meeting', start: '2024-11-12T16:00:00', end: '2024-11-14T18:00:00', classNames: 'fc-event-secondary' },
        { title: 'Meeting', start: '2024-11-16T16:00:00', end: '2024-11-16T18:00:00', classNames: 'fc-event-light' },
        { title: 'Meeting', start: '2024-11-20T16:00:00', end: '2024-11-25T18:00:00', classNames: 'fc-event-dark' },
        { title: 'Meeting', start: '2024-11-27T16:00:00', end: '2024-11-29T18:00:00', classNames: 'fc-event-gray' },
    ];

    // State to manage modal visibility and selected date
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    // Handle date click to open modal
    const handleFullcalendarDateClick = (info) => {
        setSelectedDate(info.dateStr); // Set selected date
        setIsModalOpen(true); // Show the modal
    };

    const handleAddEvent = () => {
        console.log('Add event');
    }

    // Handle event click (Optional if needed)
    const handleFullcalendarEventClick = (info) => {
        console.log('Event clicked:', info.event.title);
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false); // Hide the modal
    };
    const calendarRef = useRef(null)

    function goToDate(date) {
        const calendarApi = calendarRef.current.getApi()
        calendarApi.gotoDate(date)
    }

    return (
        <>
            <div className="card app-calendar-wrapper">
                <div className="row g-0">
                    {/* <!-- Calendar Sidebar --> */}
                    <div className="col app-calendar-sidebar border-end" id="app-calendar-sidebar">
                        <div className="border-bottom p-6 my-sm-0 mb-4">
                            <button className="btn btn-primary btn-toggle-sidebar w-100" onClick={handleFullcalendarDateClick}>
                                <i className="bx bx-plus bx-16px me-2"></i>
                                <span className="align-middle">Add Event</span>
                            </button>
                        </div>
                        <div className="px-3 pt-2">
                            <Flatpickr
                                value={date}
                                options={{ 
                                    inline: true,
                                    altInput: true,
                                    dateFormat: 'Y-m-d',
                                    enableTime: false,
                                    altInputClass: 'invisible',
                                }}
                                onChange= {(selectedDates, dateStr, instance) => {
                                    goToDate(dateStr)
                                }}
                            />
                        </div>
                        <hr className="mb-6 mx-n4 mt-3"/>
                    </div>
                    {/* <!-- /Calendar Sidebar --> */}

                    {/* <!-- Calendar --> */}
                    <div className="col app-calendar-content">
                        <div className="card shadow-none border-0">
                            <div className="card-body pb-0">
                                {/* <!-- FullCalendar --> */}
                                 <FullCalendar
                                    plugins={[dayGridPlugin, interactionPlugin]}
                                    weekends={true}
                                    events={events}
                                    headerToolbar= {{
                                        start: 'prev,next, title',
                                        center: '',
                                        end: 'dayGridMonth,dayGridWeek,dayGridDay'
                                    }}
                                    buttonText={ {
                                        week: 'Minggu',
                                        month: 'Bulan',
                                        day: 'Hari',
                                    }}
                                    dateClick={handleFullcalendarDateClick}
                                    eventClick={handleFullcalendarEventClick}
                                    ref={calendarRef}
                                />
                            </div>
                        </div>
                        {/* /Calendar */}

                        {/* Modal To add event */}
                        {isModalOpen && (
                            <div className="modal fade show d-block" id="addEventModal" tabIndex="-1" aria-labelledby="addEventModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="addEventModalLabel">Tambah Tugas</h5>
                                            <button type="button" className="btn-close" onClick={handleModalClose}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label htmlFor="eventName" className="form-label">Name</label>
                                                <input type="text" className="form-control" id="eventName" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="eventDeadline" className="form-label">Deadline</label>
                                                <input type="date" className="form-control" id="eventDeadline" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="eventCategory" className="form-label">Category</label>
                                                <select className="form-select" id="eventCategory">
                                                    <option value="work">Work</option>
                                                    <option value="personal">Personal</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="eventPriority" className="form-label">Priority</label>
                                                <select className="form-select" id="eventPriority">
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="eventStatus" className="form-label">Status</label>
                                                <select className="form-select" id="eventStatus">
                                                    <option value="pending">Pending</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="eventDetail" className="form-label">Detail</label>
                                                <textarea className="form-control" id="eventDetail" rows="3"></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="eventReminderDate" className="form-label">Reminder Date</label>
                                                <input type="date" className="form-control" id="eventReminderDate" />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="eventAssigned" className="form-label">Assigned</label>
                                                <select className="form-select" id="eventAssigned">
                                                    <option value="user1">User 1</option>
                                                    <option value="user2">User 2</option>
                                                    <option value="user3">User 3</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="eventReference" className="form-label">Reference</label>
                                                <select className="form-select" id="eventReference">
                                                    <option value="ref1">Reference 1</option>
                                                    <option value="ref2">Reference 2</option>
                                                    <option value="ref3">Reference 3</option>
                                                </select>
                                            </div>
                                            <div className="d-flex justify-content-between mt-4">
                                                <button type="submit" className="btn btn-primary" onClick={handleAddEvent}>Add</button>
                                                <button type="reset" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {/* /Modal To add event */}
                    </div>
                </div>
            </div>
        </>
    )
}
