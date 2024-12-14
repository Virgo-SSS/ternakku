import EventModel from '../models/event.js';

const index = async (req, res) => {
    try {
        const [rows] = await EventModel.all();

        res.status(200).json({
            status: 'success',
            message: 'Events retrieved successfully',
            data: rows
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const store = async (req, res) => {
    try {
        const { body } = req;

        const [rows] = await EventModel.create({
            title: body.title,
            start_date: body.start_date,
            end_date: body.end_date,
            details: body.details
        });

        res.status(201).json({
            status: 'success',
            message: 'Event created successfully',
            data: {
                id: rows.insertId,
                title: body.title,
                start_date: body.start_date,
                end_date: body.end_date,
                details: body.details
            }
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const update = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;

        const [rows] = await EventModel.update({
            title: body.title,
            start_date: body.start_date,
            end_date: body.end_date,
            details: body.details
        }, id);

        res.status(200).json({
            status: 'success',
            message: 'Event updated successfully',
            data: {
                id: req.params.id,
                title: body.title,
                start_date: body.start_date,
                end_date: body.end_date,
                details: body.details
            }
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params;

        await EventModel.destroy(id);

        res.status(200).json({
            status: 'success',
            message: 'Event deleted successfully'
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export default {
    index,
    store,
    update,
    destroy
};