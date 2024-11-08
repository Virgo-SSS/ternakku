import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { Calendar } from '@fullcalendar/core';

const events = [
    { title: 'Meeting', start: new Date() },
    { title: 'Meeting', start: '2024-11-02T10:30:00', end: '2024-11-03T12:30:00' },
    { title: 'Meeting', start: '2024-11-05T13:00:00', end: '2024-11-10T15:00:00' },
    { title: 'Meeting', start: '2024-11-03T16:00:00', end: '2024-11-08T18:00:00' },
]

// a custom render function
function renderEventContent(eventInfo) {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

export const CalendarPage = () => {
    
    return (
        <>
            <div className="card app-calendar-wrapper">
                <div className="row g-0">
                    {/* <!-- Calendar Sidebar --> */}
                    <div className="col app-calendar-sidebar border-end" id="app-calendar-sidebar">
                        <div className="border-bottom p-6 my-sm-0 mb-4">
                            <button className="btn btn-primary btn-toggle-sidebar w-100" data-bs-toggle="offcanvas"
                                data-bs-target="#addEventSidebar" aria-controls="addEventSidebar">
                                <i className="bx bx-plus bx-16px me-2"></i>
                                <span className="align-middle">Add Event</span>
                            </button>
                        </div>
                        <div className="px-3 pt-2">
                            <div className="inline-calendar flatpickr-input" readOnly="readonly"></div>
                            <div className="flatpickr-calendar animate inline" tabIndex="-1">
                                <div className="flatpickr-months"><span className="flatpickr-prev-month"><svg version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 17 17">
                                            <g></g>
                                            <path
                                                d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z">
                                            </path>
                                        </svg></span>
                                    <div className="flatpickr-month">
                                        <div className="flatpickr-current-month"><span className="cur-month">November </span>
                                            <div className="numInputWrapper"><input className="numInput cur-year" type="number"
                                                    tabIndex="-1" aria-label="Year"/><span className="arrowUp"></span><span
                                                    className="arrowDown"></span></div>
                                        </div>
                                    </div><span className="flatpickr-next-month"><svg version="1.1"
                                            xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 17 17">
                                            <g></g>
                                            <path
                                                d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z">
                                            </path>
                                        </svg></span>
                                </div>
                                <div className="flatpickr-innerContainer">
                                    <div className="flatpickr-rContainer">
                                        <div className="flatpickr-weekdays">
                                            <div className="flatpickr-weekdaycontainer">
                                                <span className="flatpickr-weekday">
                                                    Sun</span><span className="flatpickr-weekday">Mon</span><span
                                                    className="flatpickr-weekday">Tue</span><span
                                                    className="flatpickr-weekday">Wed</span><span
                                                    className="flatpickr-weekday">Thu</span><span
                                                    className="flatpickr-weekday">Fri</span><span className="flatpickr-weekday">Sat
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flatpickr-days" tabIndex="-1">
                                            <div className="dayContainer"><span className="flatpickr-day prevMonthDay"
                                                    aria-label="October 27, 2024" tabIndex="-1">27</span><span
                                                    className="flatpickr-day prevMonthDay" aria-label="October 28, 2024"
                                                    tabIndex="-1">28</span><span className="flatpickr-day prevMonthDay"
                                                    aria-label="October 29, 2024" tabIndex="-1">29</span><span
                                                    className="flatpickr-day prevMonthDay" aria-label="October 30, 2024"
                                                    tabIndex="-1">30</span><span className="flatpickr-day prevMonthDay"
                                                    aria-label="October 31, 2024" tabIndex="-1">31</span><span
                                                    className="flatpickr-day" aria-label="November 1, 2024"
                                                    tabIndex="-1">1</span><span className="flatpickr-day"
                                                    aria-label="November 2, 2024" tabIndex="-1">2</span><span
                                                    className="flatpickr-day" aria-label="November 3, 2024"
                                                    tabIndex="-1">3</span><span className="flatpickr-day"
                                                    aria-label="November 4, 2024" tabIndex="-1">4</span><span
                                                    className="flatpickr-day" aria-label="November 5, 2024"
                                                    tabIndex="-1">5</span><span className="flatpickr-day"
                                                    aria-label="November 6, 2024" tabIndex="-1">6</span><span
                                                    className="flatpickr-day" aria-label="November 7, 2024"
                                                    tabIndex="-1">7</span><span className="flatpickr-day today"
                                                    aria-label="November 8, 2024" aria-current="date"
                                                    tabIndex="-1">8</span><span className="flatpickr-day"
                                                    aria-label="November 9, 2024" tabIndex="-1">9</span><span
                                                    className="flatpickr-day" aria-label="November 10, 2024"
                                                    tabIndex="-1">10</span><span className="flatpickr-day"
                                                    aria-label="November 11, 2024" tabIndex="-1">11</span><span
                                                    className="flatpickr-day" aria-label="November 12, 2024"
                                                    tabIndex="-1">12</span><span className="flatpickr-day"
                                                    aria-label="November 13, 2024" tabIndex="-1">13</span><span
                                                    className="flatpickr-day" aria-label="November 14, 2024"
                                                    tabIndex="-1">14</span><span className="flatpickr-day"
                                                    aria-label="November 15, 2024" tabIndex="-1">15</span><span
                                                    className="flatpickr-day" aria-label="November 16, 2024"
                                                    tabIndex="-1">16</span><span className="flatpickr-day"
                                                    aria-label="November 17, 2024" tabIndex="-1">17</span><span
                                                    className="flatpickr-day" aria-label="November 18, 2024"
                                                    tabIndex="-1">18</span><span className="flatpickr-day"
                                                    aria-label="November 19, 2024" tabIndex="-1">19</span><span
                                                    className="flatpickr-day" aria-label="November 20, 2024"
                                                    tabIndex="-1">20</span><span className="flatpickr-day"
                                                    aria-label="November 21, 2024" tabIndex="-1">21</span><span
                                                    className="flatpickr-day" aria-label="November 22, 2024"
                                                    tabIndex="-1">22</span><span className="flatpickr-day"
                                                    aria-label="November 23, 2024" tabIndex="-1">23</span><span
                                                    className="flatpickr-day" aria-label="November 24, 2024"
                                                    tabIndex="-1">24</span><span className="flatpickr-day"
                                                    aria-label="November 25, 2024" tabIndex="-1">25</span><span
                                                    className="flatpickr-day" aria-label="November 26, 2024"
                                                    tabIndex="-1">26</span><span className="flatpickr-day"
                                                    aria-label="November 27, 2024" tabIndex="-1">27</span><span
                                                    className="flatpickr-day" aria-label="November 28, 2024"
                                                    tabIndex="-1">28</span><span className="flatpickr-day"
                                                    aria-label="November 29, 2024" tabIndex="-1">29</span><span
                                                    className="flatpickr-day" aria-label="November 30, 2024"
                                                    tabIndex="-1">30</span><span className="flatpickr-day nextMonthDay"
                                                    aria-label="December 1, 2024" tabIndex="-1">1</span><span
                                                    className="flatpickr-day nextMonthDay" aria-label="December 2, 2024"
                                                    tabIndex="-1">2</span><span className="flatpickr-day nextMonthDay"
                                                    aria-label="December 3, 2024" tabIndex="-1">3</span><span
                                                    className="flatpickr-day nextMonthDay" aria-label="December 4, 2024"
                                                    tabIndex="-1">4</span><span className="flatpickr-day nextMonthDay"
                                                    aria-label="December 5, 2024" tabIndex="-1">5</span><span
                                                    className="flatpickr-day nextMonthDay" aria-label="December 6, 2024"
                                                    tabIndex="-1">6</span><span className="flatpickr-day nextMonthDay"
                                                    aria-label="December 7, 2024" tabIndex="-1">7</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="mb-6 mx-n4 mt-3"/>
                        <div className="px-6 pb-2">
                            {/* <!-- Filter --> */}
                            <div>
                                <h5>Event Filters</h5>
                            </div>

                            <div className="form-check form-check-secondary mb-5 ms-2">
                                <input className="form-check-input select-all" type="checkbox" id="selectAll" data-value="all"
                                />
                                <label className="form-check-label" htmlFor="selectAll">View All</label>
                            </div>

                            <div className="app-calendar-events-filter text-heading">
                                <div className="form-check form-check-danger mb-5 ms-2">
                                    <input className="form-check-input input-filter" type="checkbox" id="select-personal"
                                        data-value="personal"/>
                                    <label className="form-check-label" htmlFor="select-personal">Personal</label>
                                </div>
                                <div className="form-check mb-5 ms-2">
                                    <input className="form-check-input input-filter" type="checkbox" id="select-business"
                                        data-value="business"/>
                                    <label className="form-check-label" htmlFor="select-business">Business</label>
                                </div>
                                <div className="form-check form-check-warning mb-5 ms-2">
                                    <input className="form-check-input input-filter" type="checkbox" id="select-family"
                                        data-value="family"/>
                                    <label className="form-check-label" htmlFor="select-family">Family</label>
                                </div>
                                <div className="form-check form-check-success mb-5 ms-2">
                                    <input className="form-check-input input-filter" type="checkbox" id="select-holiday"
                                        data-value="holiday"/>
                                    <label className="form-check-label" htmlFor="select-holiday">Holiday</label>
                                </div>
                                <div className="form-check form-check-info ms-2">
                                    <input className="form-check-input input-filter" type="checkbox" id="select-etc"
                                        data-value="etc"/>
                                    <label className="form-check-label" htmlFor="select-etc">ETC</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Calendar Sidebar --> */}

                    {/* <!-- Calendar & Modal --> */}
                    <div className="col app-calendar-content">
                        <div className="card shadow-none border-0">
                            <div className="card-body pb-0">
                                {/* <!-- FullCalendar --> */}
                                 <FullCalendar
                                    plugins={[dayGridPlugin]}
                                    weekends={true}
                                    events={events}
                                    eventContent={renderEventContent}
                                    headerToolbar= {{
                                        start: 'title',
                                        center: '',
                                        end: 'dayGridMonth,dayGridWeek,dayGridDay'
                                    }}
                                    buttonText={ {
                                        week: 'Minggu',
                                        month: 'Bulan',
                                        day: 'Hari',
                                    }}

                                />
                            </div>
                        </div>
                        <div className="app-overlay"></div>
                        {/* <!-- FullCalendar Offcanvas --> */}
                        <div className="offcanvas offcanvas-end event-sidebar" tabIndex="-1" id="addEventSidebar"
                            aria-labelledby="addEventSidebarLabel">
                            <div className="offcanvas-header border-bottom">
                                <h5 className="offcanvas-title" id="addEventSidebarLabel">Add Event</h5>
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                                    aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <form className="event-form pt-0 fv-plugins-bootstrap5 fv-plugins-framework" id="eventForm"
                                    onSubmit={() => false}
                                    noValidate="novalidate">
                                    <div className="mb-6 fv-plugins-icon-container">
                                        <label className="form-label" htmlFor="eventTitle">Title</label>
                                        <input type="text" className="form-control" id="eventTitle" name="eventTitle"
                                            placeholder="Event Title"/>
                                        <div
                                            className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="form-label" htmlFor="eventLabel">Label</label>
                                        <div className="position-relative"><select
                                                className="select2 select-event-label form-select select2-hidden-accessible"
                                                id="eventLabel" name="eventLabel" data-select2-id="eventLabel" tabIndex="-1"
                                                aria-hidden="true">
                                                <option data-label="primary" value="Business" data-select2-id="2">
                                                    Business</option>
                                                <option data-label="danger" value="Personal">Personal</option>
                                                <option data-label="warning" value="Family">Family</option>
                                                <option data-label="success" value="Holiday">Holiday</option>
                                                <option data-label="info" value="ETC">ETC</option>
                                            </select><span className="select2 select2-container select2-container--default"
                                                dir="ltr" data-select2-id="1" style={{ width: "335px" }}><span
                                                    className="selection"><span className="select2-selection select2-selection--single"
                                                        role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0"
                                                        aria-disabled="false"
                                                        aria-labelledby="select2-eventLabel-container"><span
                                                            className="select2-selection__rendered"
                                                            id="select2-eventLabel-container" role="textbox"
                                                            aria-readonly="true" title="Business"><span
                                                                className="badge badge-dot bg-primary me-2">
                                                            </span>Business</span><span className="select2-selection__arrow"
                                                            role="presentation"><b
                                                                role="presentation"></b></span></span></span><span
                                                    className="dropdown-wrapper" aria-hidden="true"></span></span></div>
                                    </div>
                                    <div className="mb-6 fv-plugins-icon-container">
                                        <label className="form-label" htmlFor="eventStartDate">Start Date</label>
                                        <input type="text" className="form-control flatpickr-input" id="eventStartDate"
                                            name="eventStartDate" placeholder="Start Date" readOnly="readonly"/>
                                        <div
                                            className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                                        </div>
                                    </div>
                                    <div className="mb-6 fv-plugins-icon-container">
                                        <label className="form-label" htmlFor="eventEndDate">End Date</label>
                                        <input type="text" className="form-control flatpickr-input" id="eventEndDate"
                                            name="eventEndDate" placeholder="End Date" readOnly="readonly"/>
                                        <div
                                            className="fv-plugins-message-container fv-plugins-message-container--enabled invalid-feedback">
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div className="form-check form-switch">
                                            <input type="checkbox" className="form-check-input allDay-switch" id="allDaySwitch"/>
                                            <label className="form-check-label" htmlFor="allDaySwitch">All Day</label>
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="form-label" htmlFor="eventURL">Event URL</label>
                                        <input type="url" className="form-control" id="eventURL" name="eventURL"
                                            placeholder="https://www.google.com"/>
                                    </div>
                                    <div className="mb-4 select2-primary">
                                        <label className="form-label" htmlFor="eventGuests">Add Guests</label>
                                        <div className="position-relative"><select
                                                className="select2 select-event-guests form-select select2-hidden-accessible"
                                                id="eventGuests" name="eventGuests" multiple="" data-select2-id="eventGuests"
                                                tabIndex="-1" aria-hidden="true">
                                                <option data-avatar="1.png" value="Jane Foster">Jane Foster</option>
                                                <option data-avatar="3.png" value="Donna Frank">Donna Frank</option>
                                                <option data-avatar="5.png" value="Gabrielle Robertson">Gabrielle Robertson
                                                </option>
                                                <option data-avatar="7.png" value="Lori Spears">Lori Spears</option>
                                                <option data-avatar="9.png" value="Sandy Vega">Sandy Vega</option>
                                                <option data-avatar="11.png" value="Cheryl May">Cheryl May</option>
                                            </select><span className="select2 select2-container select2-container--default"
                                                dir="ltr" data-select2-id="3" style={{ width: "335px" }}><span
                                                    className="selection"><span
                                                        className="select2-selection select2-selection--multiple" role="combobox"
                                                        aria-haspopup="true" aria-expanded="false" tabIndex="-1"
                                                        aria-disabled="false">
                                                        <ul className="select2-selection__rendered">
                                                            <li className="select2-search select2-search--inline"><input
                                                                    className="select2-search__field" type="search" tabIndex="0"
                                                                    autoComplete="off" autoCorrect="off" autoCapitalize="none"
                                                                    spellCheck="false" role="searchbox" aria-autocomplete="list"
                                                                    placeholder="Select value" style={{ width: "305px" }}/></li>
                                                        </ul>
                                                    </span></span><span className="dropdown-wrapper"
                                                    aria-hidden="true"></span></span></div>
                                    </div>
                                    <div className="mb-6">
                                        <label className="form-label" htmlFor="eventLocation">Location</label>
                                        <input type="text" className="form-control" id="eventLocation" name="eventLocation"
                                            placeholder="Enter Location"/>
                                    </div>
                                    <div className="mb-6">
                                        <label className="form-label" htmlFor="eventDescription">Description</label>
                                        <textarea className="form-control" name="eventDescription" id="eventDescription"></textarea>
                                    </div>
                                    <div className="d-flex justify-content-sm-between justify-content-start mt-6 gap-2">
                                        <div className="d-flex">
                                            <button type="submit" id="addEventBtn"
                                                className="btn btn-primary btn-add-event me-4">Add</button>
                                            <button type="reset" className="btn btn-label-secondary btn-cancel me-sm-0 me-1"
                                                data-bs-dismiss="offcanvas">Cancel</button>
                                        </div>
                                        <button className="btn btn-label-danger btn-delete-event d-none">Delete</button>
                                    </div>
                                    <input type="hidden"/>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* <!-- /Calendar & Modal --> */}
                </div>
            </div>
        </>
    )
}