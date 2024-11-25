import { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import Flatpickr from "react-flatpickr";
import interactionPlugin from "@fullcalendar/interaction" 
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from "../../api/api.js";
import TaskHelper from '../../helper/taskHelper';

export const CalendarPage = () => {
    const date  =  new Date();

    // State to manage modal visibility and selected date
    const calendarRef = useRef(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workers, setWorkers] = useState([]);
    const [cows, setCows] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        deadline: '',
        category: '',
        priority: '',
        status: '',
        detail: '',
        reminder_date: '',
        worker_id: '',
        cow_id: ''
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
            const response = await  axios.post('/task', formData);
            const newTask = {
                title: response.data.data.title,
                start: response.data.data.deadline,
                end: response.data.data.deadline,
                classNames: TaskHelper.getEventClassBasedOnPriority(Number(response.data.data.priority))
            }

            setTasks([...tasks, newTask]);
            handleModalClose();

            withReactContent(Swal).fire({
                title: 'Success',
                text: 'Task added successfully',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            setFormData({
                title: '',
                deadline: '',
                category: '',
                priority: '',
                status: '',
                details: '',
                reminder_date: '',
                worker_id: '',
                cow_id: ''
            });

        } catch (error) {
            console.log(error);

            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    // Handle event click (Optional if needed)
    const handleTaskClick = (info) => {
        console.log('Task clicked:', info.event.title);
    };

    // Handle date click to open modal
    const handleModalOpen = () => {
        setIsModalOpen(true); // Show the modal
    };
    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false); // Hide the modal
    };

    useEffect(() => {
        const getWorkers = async () => {
            try {
                const response = await axios.get('/worker');
                setWorkers(response.data.data);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getWorkers();
    }, []);

    useEffect(() => {
        const getCows = async () => {
            try {
                const response = await axios.get('/cow');
                setCows(response.data.data);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    
        getCows();
    }, []);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axios.get('/task');
    
                const tasks = response.data.data.map((task) => ({
                    title: task.title,
                    start: task.deadline,
                    end: task.deadline,
                    classNames: TaskHelper.getEventClassBasedOnPriority(task.priority)
                }));
    
                setTasks(tasks);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }

        getTasks();
    }, []);

    return (
        <>
            <div className="card app-calendar-wrapper">
                <div className="row g-0">
                    {/* <!-- Calendar Sidebar --> */}
                    <div className="col app-calendar-sidebar border-end" id="app-calendar-sidebar">
                        <div className="border-bottom p-6 my-sm-0 mb-4">
                            <button className="btn btn-primary btn-toggle-sidebar w-100" onClick={handleModalOpen}>
                                <i className="bx bx-plus bx-16px me-2"></i>
                                <span className="align-middle">Add Task</span>
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
                                    const calendarApi = calendarRef.current.getApi()
                                    calendarApi.gotoDate(dateStr)
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
                                    events={tasks}
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
                                    eventClick={handleTaskClick}
                                    ref={calendarRef}
                                />
                            </div>
                        </div>
                        {/* /Calendar */}
                    </div>
                    
                    {/* Modal To add task */}
                    {isModalOpen && (
                        <div className="modal fade show d-block" id="addTaskModal" tabIndex="-1" aria-labelledby="addTaskModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="addTaskModalLabel">Tambah Tugas</h5>
                                        <button type="button" className="btn-close" onClick={handleModalClose}></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-3">
                                                <label htmlFor="title" className="form-label">Name</label>
                                                <input type="text" name='title' id="title" value={formData.title} onChange={handleFormChange} className="form-control" required/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="deadline" className="form-label">Deadline</label>
                                                <Flatpickr
                                                    value={formData.deadline}
                                                    onChange={(selectedDates, dateStr, instance) => { 
                                                        setFormData({
                                                            ...formData,
                                                            deadline: dateStr
                                                        })
                                                    }}
                                                    className='form-control flatpickr-input active'
                                                    name="deadline"
                                                    id="deadline"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="category" className="form-label">Category</label>
                                                <input type="text" name="category" id="category" value={formData.category} onChange={handleFormChange} required className="form-control"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="priority" className="form-label">Priority</label>
                                                <select name='priority' id="priority" value={formData.priority} onChange={handleFormChange} className="form-select" required>
                                                    <option value="1">Low</option>
                                                    <option value="2">Medium</option>
                                                    <option value="3">High</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="status" className="form-label">Status</label>
                                                <select className="form-select" name='status' id="status" value={formData.status} onChange={handleFormChange} required>
                                                    <option value="0">Pending</option>
                                                    <option value="1">In Progress</option>
                                                    <option value="2">Completed</option>
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="detail" className="form-label">Detail</label>
                                                <textarea className="form-control" name='details' id="details" rows="3" required value={formData.details} onChange={handleFormChange}></textarea>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="reminder" className="form-label">Reminder Date</label>
                                                <Flatpickr
                                                    value={formData.reminder_date}
                                                    onChange={(selectedDates, dateStr, instance) => { 
                                                        setFormData({
                                                            ...formData,
                                                            reminder_date: dateStr
                                                        })
                                                    }}
                                                    className='form-control flatpickr-input active'
                                                    name="reminder_date"
                                                    id="reminder_date"
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="worker_id" className="form-label">Assigned</label>
                                                <select className="form-select" id="worker_id" name='worker_id' value={formData.worker_id} onChange={handleFormChange} required>
                                                    {workers.map((worker, index) => (
                                                        <option key={index} value={worker.id}>{worker.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="cow_id" className="form-label">Reference</label>
                                                <select className="form-select" id="cow_id" name='cow_id' value={formData.cow_id} onChange={handleFormChange} required>
                                                    {cows.map((cow, index) => (
                                                        <option key={index} value={cow.id}>{cow.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="d-flex justify-content-between mt-4">
                                                <button type="reset" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
                                                <button type="submit" className="btn btn-primary">Tambah</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* /Modal To add task */}
                </div>
            </div>
        </>
    )
}
