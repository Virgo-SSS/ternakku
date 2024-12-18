import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import usePerfectScrollbar from "../../hooks/usePerfectScrollbar";
import TaskHelper from "../../helper/taskHelper";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Flatpickr from "react-flatpickr";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.jsx";

export const TaskPage = () => {
    usePerfectScrollbar('kanban-wrapper');

    return (
        <>
            <div className="app-kanban">
                <Board />   
            </div>
        </>
    )
};

const Board = () => {
    const axiosPrivate = useAxiosPrivate();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const response = await axiosPrivate.get('/task');
    
                const tasks = response.data.data.map((task) => ({
                    id: task.id,
                    title: task.title,
                    priority: task.priority,
                    column: TaskHelper.getStatusLabel(task.status),
                    worker: task.worker_id,
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
        <div className="kanban-wrapper" id="kanban-wrapper">
            <div className="kanban-container" style={{ width: "1370px" }}>
                <Column
                    title="Belum Mulai"
                    column="Pending"
                    tasks={tasks}
                    setTasks={setTasks}
                />
                <Column
                    title="Sedang Berjalan"
                    column="Dalam Proses"
                    tasks={tasks}
                    setTasks={setTasks}
                />
                <Column
                    title="Sudah Selesai"
                    column="Selesai"
                    tasks={tasks}
                    setTasks={setTasks}
                />
                <div className="gap-4 align-items-center">
                    <AddBarrel setTasks={setTasks} />
                    <DeleteBarrel setTasks={setTasks} />
                </div>
            </div>
        </div>
    );
};

const Column = ({ title, column, tasks, setTasks }) => {
    const axiosPrivate = useAxiosPrivate();

    const [isLoading, setIsLoading] = useState(false);

    const handleDragStart = (e, task) => {
        e.dataTransfer.setData("cardId", task.id);
    };

    const handleDragEnd = async (e) => {
        const cardId = Number(e.dataTransfer.getData("cardId"));

        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before === cardId) { 
            return;
        }

        let copy = [...tasks];
        let cardToTransfer = copy.find((c) => c.id === cardId);
        if (!cardToTransfer) return;

        cardToTransfer = { ...cardToTransfer, column };
        copy = copy.filter((c) => c.id !== cardId);

        const moveToBack = before === "-1";

        try {
            setIsLoading(true);
           
            await axiosPrivate .patch(`/task/${cardId}`, { 
                status: TaskHelper.getStatusKey(column) 
            });


            // If the card is moved to the last index, push it to the end of the array
            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                // if not last then reorder the index
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;
    
                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setIsLoading(false);
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message || error || 'Failed to update task status',
                icon: 'error',
                confirmButtonText: 'OK'
            });

            setIsLoading(false);
            
        }

        setTasks(copy);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);
    };

    const clearHighlights = (els) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e, indicators) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };

    const handleDragLeave = () => {
        clearHighlights();
    };

    const filteredTasks = tasks.filter((c) => c.column === column);

    return (
        <div className="kanban-board" style={{ width: "250px", marginLeft: "12px", marginRight: "12px" }}>
            <header className="kanban-board-header">
                <div className="kanban-title-board">{title}</div>
            </header>

            {
                isLoading ? <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div> : null
            }

            <main 
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className="kanban-drag"
            >
                {filteredTasks.map((t) => {
                    return <Card key={t.id} {...t} handleDragStart={handleDragStart} />;
                })}
                 <DropIndicator beforeId={null} column={column} />
            </main>
            <footer></footer>
        </div>
    );
};

const Card = ({ id, title, priority, column, worker, handleDragStart }) => {
    const [selectedTask, setSelectedTask] = useState(null); // State to store selected task data
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Handler to open the modal and set the selected task
    const handleCardClick = (task) => {
        setSelectedTask(task); // Set the clicked task as selected
        setIsModalOpen(true); // Open the modal
    };

    // Handle modal close
    const handleModalClose = () => {
        setIsModalOpen(false); // Hide the modal
    };

    const image = null;

    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div          
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, { title, id, column })}
                className="kanban-item" 
                onClick={() => handleCardClick({ title, priority, id, worker })}
            >
                <div className="d-flex justify-content-between flex-wrap align-items-center mb-2">
                    <div className="item-badges">
                        <div className={`badge bg-label-${TaskHelper.getPriorityColor(Number(priority))}`}>
                            {TaskHelper.getPriorityLabel(Number(priority))}
                        </div>
                    </div>
                </div>
                {
                    image ? <img className="img-fluid rounded mb-2" src={image} /> : null
                }
                <span className="kanban-text">{title}</span>
                <div className="d-flex justify-content-between align-items-center flex-wrap mt-2">
                    {
                        worker ?
                        <div className="d-flex align-items-center">
                            <span>{worker}</span>
                        </div> : null
                    }
                </div>
            </motion.div>

            {/* {
                isModalOpen && (
                    <div className="modal fade show d-block" id={`update-task-modal-${id}`} tabIndex="-1" aria-labelledby="updateTaskModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateTaskModalLabel">Update Task</h5>
                                    <button type="button" className="btn-close" onClick={handleModalClose}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="title">Title</label>
                                            <input type="text" id="title" className="form-control" defaultValue={selectedTask.title} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="priority">Priority</label>
                                            <select id="priority" className="form-select">
                                                <option value="1" selected={selectedTask.priority === 1}>Low</option>
                                                <option value="2" selected={selectedTask.priority === 2}>Medium</option>
                                                <option value="3" selected={selectedTask.priority === 3}>High</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Worker</label>
                                            <div>{selectedTask.worker}</div>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="attachments">Attachments</label>
                                            <input type="file" className="form-control" id="attachments" />
                                        </div>
                                        <div className="d-flex">
                                            <button type="button" className="btn btn-primary me-4">
                                                Update
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } */}
        </>
    );
};

const DropIndicator = ({ beforeId, column }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={column}
            className="w-100 bg-primary"
            style={{
                height: '2px', 
                margin: '2px 0', 
                opacity: 0
            }}
        />
    );
};

const DeleteBarrel = ({ setTasks }) => {
    const axiosPrivate = useAxiosPrivate();
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = async (e) => {
        const cardId = Number(e.dataTransfer.getData("cardId"));

        try {
            await axiosPrivate.delete(`/task/${cardId}`);
            
            setTasks((pv) => pv.filter((c) => c.id !== cardId ));

            withReactContent(Swal).fire({
                title: 'Success',
                text: 'Task has been deleted',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        } catch (error) {
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message || error || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`d-flex align-items-center justify-content-center mt-4 rounded border ${
                active
                    ? "border-danger bg-danger bg-opacity-25 text-danger"
                    : "border-secondary bg-secondary bg-opacity-25 text-secondary"
            }`}
            style={{ height: '5rem', width: '5rem' }} 
        >
            <i className="bx bx-trash"></i>
        </div>
    );
};

const AddBarrel = ({ setTasks }) => {
    const axiosPrivate = useAxiosPrivate();
    const [workers, setWorkers] = useState([]);
    const [cows, setCows] = useState([]);

    const[formData, setFormData] = useState({
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
    
    useEffect(() => {
        const fetchWorkersCows = async () => {
            try {
                const [workersResponse, cowsResponse] = await Promise.all([
                    axiosPrivate.get('/worker'),
                    axiosPrivate.get('/cow')
                ]);

                setWorkers(workersResponse.data.data);
                setCows(cowsResponse.data.data);
            } catch (error) {
                withReactContent(Swal).fire({
                    title: 'Error',
                    text: error.response?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };

        fetchWorkersCows();
    }, []);
    
    const handleFormChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await  axiosPrivate.post('/task', formData);

            const newTask = {
                id: response.data.data.id,
                title: response.data.data.title,
                priority: response.data.data.priority,
                column: TaskHelper.getStatusLabel(Number(response.data.data.status)),
                worker: response.data.data.worker_id,
            }

            setTasks((pv) => [...pv, newTask]);
            bootstrap.Modal.getInstance(document.getElementById('addTaskModal')).hide();

            withReactContent(Swal).fire({
                title: 'Success',
                text: response.data.message,
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
            withReactContent(Swal).fire({
                title: 'Error',
                text: error.response.data.message || error || 'Something went wrong',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <>
            <motion.div
                layout
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="d-flex align-items-center justify-content-center mt-4 rounded border
                    border-secondary bg-primary bg-opacity-25 text-secondary"
                data-bs-toggle="modal"
                data-bs-target="#addTaskModal"
                style={{ height: '5rem', width: '5rem' }} 
            >
                
                <i className="bx bx-plus text-white"></i>
            </motion.div>

            <div className="modal fade" data-bs-backdrop="static" id="addTaskModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form onSubmit={handleSubmit}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel1">Add Task</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
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
                                        <option value="1">Dalam Proses</option>
                                        <option value="2">Selesai</option>
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
                            </div>
                            <div className="modal-footer">
                                <button aria-label='Click me' type="button" className="btn btn-outline-secondary"
                                    data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button aria-label='Click me' type="submit" className="btn btn-primary">Tambah</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};