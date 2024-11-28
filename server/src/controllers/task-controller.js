import TaskModel from '../models/task.js'

const index = async (req, res) => {
    try {
        const [rows] = await TaskModel.all();
        res.status(200).json({
            message: 'Success',
            data: rows
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const store = async (req, res) => {
    try {
        const { body } = req;

        const [rows] = await TaskModel.create({
            title: body.title,
            deadline: body.deadline,
            category: body.category,
            priority: body.priority,
            status: body.status,
            details: body.details,
            reminder_date: body.reminder_date,
            worker_id: body.worker_id,
            cow_id: body.cow_id,
        });

        res.status(201)
        .json({
            message: 'Task created successfully',
            data: {
                id: rows.insertId,
                title: body.title,
                deadline: body.deadline,
                category: body.category,
                priority: body.priority,
                status: body.status,
                details: body.details,
                reminder_date: body.reminder_date,
                worker_id: body.worker_id,
                cow_id: body.cow_id
            }   
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const upcomingTask = async (req, res) => {
    try {
        const [rows] = await TaskModel.findUpcomingTask();
        res.status(200).json({
            message: 'Success',
            data: rows
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export default {
    index,
    store,
    upcomingTask
}