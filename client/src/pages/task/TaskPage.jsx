
import React, { useState } from "react";
import { motion } from "framer-motion";
import usePerfectScrollbar from "../../hooks/usePerfectScrollbar";

const DEFAULT_CARDS = [
    {
        title: "Look into render bug in dashboard",
        label: "bug",
        id: "1",
        column: "open",
        image: "../../assets/img/elements/1.jpg",
        assigned: ["Bruce", "Clark"]
    },
    {
        title: "SOX compliance checklist",
        label: "compliance",
        id: "2",
        column: "open"
    },
    {
        title: "[SPIKE] Migrate to Azure",
        label: "spike",
        id: "3",
        column: "open"
    },
    {
        title: "Document Notifications service",
        label: "docs",
        id: "4",
        column: "open"
    },
    {
        title: "Research DB options for new microservice",
        label: "research",
        id: "5",
        column: "finished",
    },
    {
        title: "Postmortem for outage",
        label: "postmortem",
        id: "6",
        column: "canceled"
    },
    {
        title: "Sync with product on Q3 roadmap",
        label: "sync",
        id: "7",
        column: "canceled"
    },
    {
        title: "Refactor context providers to use Zustand",
        label: "refactor",
        id: "8",
        column: "doing",
    },
    {
        title: "Add logging to daily CRON",
        label: "logging",
        id: "9",
        column: "doing"
    },
    {
        title: "Set up DD dashboards for Lambda listener",
        label: "dashboards",
        id: "10",
        column: "finished",
    },
];

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
    const [cards, setCards] = useState(DEFAULT_CARDS);

    return (
        <div className="kanban-wrapper" id="kanban-wrapper">
            <div className="kanban-container" style={{ width: "1370px" }}>
                <Column
                    title="Belum Mulai"
                    column="open"
                    cards={cards}
                    setCards={setCards}
                />
                <Column
                    title="In progress"
                    column="doing"
                    cards={cards}
                    setCards={setCards}
                />
                <Column
                    title="Sudah Selesai"
                    column="finished"
                    cards={cards}
                    setCards={setCards}
                />
                <Column
                    title="Batal"
                    column="Canceled"
                    cards={cards}
                    setCards={setCards}
                />
                <BurnBarrel setCards={setCards} />
            </div>
        </div>
    );
};

const Column = ({ title, cards, column, setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragStart = (e, card) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
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
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.column === column);

    return (
        <div className="kanban-board" style={{ width: "250px", marginLeft: "12px", marginRight: "12px" }}>
            <header className="kanban-board-header">
                <div className="kanban-title-board">{title}</div>
            </header>

            <main 
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className="kanban-drag"
            >
                {filteredCards.map((c) => {
                    return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
                })}
                 <DropIndicator beforeId={null} column={column} />
                 <AddCard column={column} setCards={setCards} />
            </main>
            <footer></footer>
        </div>
    );
};

const Card = ({ title, label, id, image, assigned, column, handleDragStart}) => {
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

    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div          
                layout
                layoutId={id}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, { title, id, column })}
                className="kanban-item" 
                onClick={() => handleCardClick({ title, label, id, image, assigned })}
            >
                <div className="d-flex justify-content-between flex-wrap align-items-center mb-2">
                    <div className="item-badges">
                        <div className="badge bg-label-success">{label}</div>
                    </div>
                </div>
                {
                    image ? <img className="img-fluid rounded mb-2" src={image} /> : null
                }
                <span className="kanban-text">{title}</span>
                <div className="d-flex justify-content-between align-items-center flex-wrap mt-2">
                    <div className="d-flex"> 
                        <span className="d-flex align-items-center me-2">
                            <i className="bx bx-paperclip me-1"></i>
                            <span className="attachments">4</span>
                        </span>
                        <span className="d-flex align-items-center ms-2">
                            <i className="bx bx-chat me-1"></i>
                            <span>12 </span>
                        </span>
                    </div>
                    {
                        assigned ?
                        <div className="avatar-group d-flex align-items-center assigned-avatar">
                        {
                            assigned.map((a, i) => (
                                <div key={i} className="avatar avatar-xs" data-bs-toggle="tooltip" data-bs-placement="top" aria-label={a} data-bs-original-title={a}>
                                    <img src={`../../assets/img/avatars/${i + 1}.png`} alt="Avatar" className="rounded-circle  pull-up"/>
                                </div>
                            ))
                        }
                        </div> : null
                    }
                </div>

            </motion.div>

            {
                isModalOpen && (
                    <div className="modal fade show d-block" id={`update-task-modal-${id}`} tabIndex="-1" aria-labelledby="updateTaskModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="updateTaskModalLabel">Add Event</h5>
                                    <button type="button" className="btn-close" onClick={handleModalClose}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="title">Title</label>
                                            <input type="text" id="title" className="form-control" defaultValue={selectedTask.title} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label" htmlFor="label">Label</label>
                                            <input type="text" id="label" className="form-control" defaultValue={selectedTask.label} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Assigned</label>
                                            <div>{selectedTask.assigned}</div>
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
            }
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

const BurnBarrel = ({ setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData("cardId");

        setCards((pv) => pv.filter((c) => c.id !== cardId));

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
            style={{ height: '14rem', width: '14rem' }} 
        >
            <i className="bx bx-trash"></i>
        </div>
    );
};

const AddCard = ({ column, setCards }) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard = {
            column,
            title: text.trim(),
            id: Math.random().toString(),
        };

        setCards((pv) => [...pv, newCard]);

        setAdding(false);
    };

    return (
        <>
            {adding ? (
                <motion.form  layout onSubmit={handleSubmit} className="new-item-form">
                    <div class="mb-4">
                        <textarea  onChange={(e) => setText(e.target.value)}
                            autoFocus
                            placeholder="Add new task..."
                            className="form-control add-new-item"
                            rows="2"  autofocus="" required=""
                        ></textarea>
                    </div>
                    <div class="mb-4">
                        <button type="submit" class="btn btn-primary btn-sm me-4">Add</button>
                        <button type="button" onClick={() => setAdding(false)} class="btn btn-label-secondary btn-sm cancel-add-item">Cancel</button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className="btn btn-link text-secondary p-0 d-flex align-items-center gap-2"
                >
                    <i className='bx bx-plus-medical'></i>
                    <span>Add card</span>
                </motion.button>
            )}
        </>
    );
};

