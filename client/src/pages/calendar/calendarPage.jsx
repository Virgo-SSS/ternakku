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
                                            <h5 className="modal-title" id="addEventModalLabel">Add Event</h5>
                                            <button type="button" className="btn-close" onClick={handleModalClose}></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="eventTitle">Title</label>
                                                <input type="text" className="form-control" id="eventTitle" name="eventTitle" placeholder="Event Title" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="eventLabel">Label</label>
                                                <select className="form-select" id="eventLabel" name="eventLabel">
                                                    <option value="Business">Business</option>
                                                    <option value="Personal">Personal</option>
                                                    <option value="Family">Family</option>
                                                    <option value="Holiday">Holiday</option>
                                                    <option value="ETC">ETC</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="eventStartDate">Start Date</label>
                                                <input type="text" className="form-control" id="eventStartDate" name="eventStartDate" placeholder="Start Date" readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="eventEndDate">End Date</label>
                                                <input type="text" className="form-control" id="eventEndDate" name="eventEndDate" placeholder="End Date" readOnly />
                                            </div>
                                            <div className="mb-3">
                                                <div className="form-check form-switch">
                                                    <input type="checkbox" className="form-check-input" id="allDaySwitch" />
                                                    <label className="form-check-label" htmlFor="allDaySwitch">All Day</label>
                                                </div>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="eventURL">Event URL</label>
                                                <input type="url" className="form-control" id="eventURL" name="eventURL" placeholder="https://www.google.com" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="eventGuests">Add Guests</label>
                                                <select className="form-select" id="eventGuests" name="eventGuests" multiple>
                                                    <option value="Jane Foster">Jane Foster</option>
                                                    <option value="Donna Frank">Donna Frank</option>
                                                    <option value="Gabrielle Robertson">Gabrielle Robertson</option>
                                                    <option value="Lori Spears">Lori Spears</option>
                                                    <option value="Sandy Vega">Sandy Vega</option>
                                                    <option value="Cheryl May">Cheryl May</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="eventLocation">Location</label>
                                                <input type="text" className="form-control" id="eventLocation" name="eventLocation" placeholder="Enter Location" />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label" htmlFor="eventDescription">Description</label>
                                                <textarea className="form-control" id="eventDescription" name="eventDescription"></textarea>
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
