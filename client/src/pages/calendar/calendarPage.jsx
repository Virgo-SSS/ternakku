import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Flatpickr from "react-flatpickr";
import interactionPlugin from "@fullcalendar/interaction"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import dateHelper from '../../helper/dateHelper.js';
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

export const CalendarPage = () => {
    const date = new Date();

    const axiosPrivate = useAxiosPrivate();
    const calendarRef = useRef(null)
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        start_date: '',
        end_date: '',
        details: '',
    });

    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.post('/event', formData);

            const newEvent = {
                id: response.data.data.id,
                title: response.data.data.title,
                start_date: response.data.data.start_date,
                end_date: response.data.data.end_date,
                details: response.data.data.details,
            }

            setEvents([...events, newEvent]);
            bootstrap.Modal.getInstance(document.getElementById('addEventModal')).hide();
            
            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            resetForm();
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosPrivate.put(`/event/${selectedEvent.id}`, formData);

            const newEvent = {
                title: response.data.data.title,
                start_date: response.data.data.start_date,
                end_date: response.data.data.end_date,
                details: response.data.data.details,
            }

            setEvents(events.map(event => 
                event.id === selectedEvent.id 
                ? {...event, ...newEvent} 
                : event
            ));

            bootstrap.Modal.getInstance(document.getElementById('updateEventModal')).hide();

            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            resetForm();
        } catch (error) {
            resetForm();
            bootstrap.Modal.getInstance(document.getElementById('updateEventModal')).hide();

            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message || error || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleDelete = async () => {
        try {
            const response = await axiosPrivate.delete(`/event/${selectedEvent.id}`);

            const newEvents = events.filter((event) => event.id !== selectedEvent.id);

            setEvents(newEvents);
            bootstrap.Modal.getInstance(document.getElementById('updateEventModal')).hide();

            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            });

            resetForm();
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message || error || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    const handleModalClose = () => {
        resetForm();
    }

    const resetForm = () => {
        setFormData({
            title: '',
            start_date: '',
            end_date: '',
            details: '',
        });
    }

    // Handle event click (Optional if needed)
    const handleTaskClick = (info) => {
        const event = events.find((event) => event.id === Number(info.event.id));

        setSelectedEvent(event);

        setFormData({
            title: event.title,
            start_date: event.start,
            end_date: event.end,
            details: event.details,
        });

        new bootstrap.Modal(document.getElementById('updateEventModal')).show();
    };

    useEffect(() => {
        const geEvents = async () => {
            try {
                const response = await axiosPrivate.get('/event');

                const events = response.data.data.map((event) => ({
                    id: event.id,
                    title: event.title,
                    start: dateHelper.formatDate(event.start_date),
                    end: dateHelper.formatDate(event.end_date),
                    details: event.details,
                }));

                setEvents(events);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error || error.response.data.message || 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        geEvents();
    }, []);

    return (
        <>
            <div className="card app-calendar-wrapper">
                <div className="row g-0">
                    {/* <!-- Calendar Sidebar --> */}
                    <div className="col app-calendar-sidebar border-end" id="app-calendar-sidebar">
                        <div className="border-bottom p-6 my-sm-0 mb-4">
                            <button aria-label='Click me' type="button" className="btn btn-primary btn-toggle-sidebar w-100" data-bs-toggle="modal"
                                data-bs-target="#addEventModal">
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
                                onChange={(selectedDates, dateStr, instance) => {
                                    const calendarApi = calendarRef.current.getApi()
                                    calendarApi.gotoDate(dateStr)
                                }}
                            />
                        </div>
                        <hr className="mb-6 mx-n4 mt-3" />
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
                                    headerToolbar={{
                                        start: 'prev,next, title',
                                        center: '',
                                        end: 'dayGridMonth,dayGridWeek,dayGridDay'
                                    }}
                                    buttonText={{
                                        week: 'Minggu',
                                        month: 'Bulan',
                                        day: 'Hari',
                                    }}
                                    eventClick={handleTaskClick}
                                    ref={calendarRef}
                                />
                            </div>
                        </div>
                        {/* /Calendar */}
                    </div>

                    {/* <!-- Add Event Modal --> */}
                    <div className="modal fade" data-bs-backdrop="static" id="addEventModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <form onSubmit={handleSubmit}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel1">Add Event</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleFormChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="start_date" className="form-label">Start Date</label>
                                            <Flatpickr
                                                className='form-control'
                                                id="start_date"
                                                name="start_date"
                                                required
                                                value={formData.start_date}
                                                options={{
                                                    altInput: true,
                                                    altFormat: 'F j, Y H:i',
                                                    dateFormat: 'Y-m-d H:i',
                                                    enableTime: true,
                                                    altInputClass: 'form-control',
                                                }}
                                                onChange={(selectedDates, dateStr, instance) => {
                                                    setFormData({
                                                        ...formData,
                                                        start_date: dateStr
                                                    });
                                                }}
                                            
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="end_date" className="form-label">End Date</label>
                                            <Flatpickr
                                                className='form-control'
                                                id="end_date"
                                                name="end_date"
                                                required
                                                value={formData.end_date}
                                                options={{
                                                    altInput: true,
                                                    altFormat: 'F j, Y H:i',
                                                    dateFormat: 'Y-m-d H:i',
                                                    enableTime: true,
                                                    altInputClass: 'form-control',
                                                }}
                                                onChange={(selectedDates, dateStr, instance) => {
                                                    setFormData({
                                                        ...formData,
                                                        end_date: dateStr
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="details" className="form-label">Details</label>
                                            <textarea className="form-control" id="details" name="details" value={formData.details} onChange={handleFormChange}></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button aria-label='Click me' type="button" className="btn btn-outline-secondary"
                                            data-bs-dismiss="modal" onClick={handleModalClose}>
                                            Close
                                        </button>
                                        <button aria-label='Click me' type="submit" className="btn btn-primary">Tambah</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Update Event Modal */}
                    <div className="modal fade" data-bs-backdrop="static" id="updateEventModal" tabIndex="-1" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <form onSubmit={handleUpdateSubmit}>
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel1">Update Event</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <label htmlFor="title" className="form-label">Title</label>
                                            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleFormChange} required />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="start_date" className="form-label">Start Date</label>
                                            <Flatpickr
                                                className='form-control'
                                                id="start_date"
                                                name="start_date"
                                                required
                                                value={formData.start_date}
                                                options={{
                                                    altInput: true,
                                                    altFormat: 'F j, Y H:i',
                                                    dateFormat: 'Y-m-d H:i',
                                                    enableTime: true,
                                                    altInputClass: 'form-control',
                                                }}
                                                onChange={(selectedDates, dateStr, instance) => {
                                                    setFormData({
                                                        ...formData,
                                                        start_date: dateStr
                                                    });
                                                }}
                                            
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="end_date" className="form-label">End Date</label>
                                            <Flatpickr
                                                className='form-control'
                                                id="end_date"
                                                name="end_date"
                                                required
                                                value={formData.end_date}
                                                options={{
                                                    altInput: true,
                                                    altFormat: 'F j, Y H:i',
                                                    dateFormat: 'Y-m-d H:i',
                                                    enableTime: true,
                                                    altInputClass: 'form-control',
                                                }}
                                                onChange={(selectedDates, dateStr, instance) => {
                                                    setFormData({
                                                        ...formData,
                                                        end_date: dateStr
                                                    });
                                                }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="details" className="form-label">Details</label>
                                            <textarea className="form-control" id="details" name="details" value={formData.details} onChange={handleFormChange}></textarea>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        {/* add delete button at right side */}
                                        <button aria-label='Click me' type="button" className="btn btn-danger me-auto" onClick={handleDelete}>
                                            Delete
                                        </button>
                                        <button aria-label='Click me' type="button" className="btn btn-outline-secondary"
                                            data-bs-dismiss="modal" onClick={handleModalClose}>
                                            Close
                                        </button>
                                        <button aria-label='Click me' type="submit" className="btn btn-primary">Updates</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
