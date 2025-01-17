import WorkerModel from '../models/worker.js';

const index = async (req, res) => {
    try {
        const filters = req.query;
        const user = req.user;

        filters.user_id = user.id;
        const [rows] = await WorkerModel.all(filters);
        
        res.status(200)
        .send({
            message: 'Success',
            data: rows
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const store = async (req, res) => {
    try {
        const { body, user } = req;

        const [rows] = await WorkerModel.create({
            user_id: user.id,
            name: body.name,
            gender: body.gender,
            phone_number: body.phone_number,
            email: body.email,
            status: true
        });

        res.status(201).send({
            message: 'Worker created',
            data: {
                id: rows.insertId,
                ...body,
                status: true
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const show = async (req, res) => {
    const id = req.params.id;
    const user = req.user;

    try {
        const worker = await WorkerModel.findById(id, user.id);
   
        res.status(200).send({
            status: 'Success',
            message: 'Worker retrieved',
            data: worker
        });
    } catch (error) {
        res.status(404).send({ message: error.message });
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    const { body, user } = req;

    try {
        await WorkerModel.findById(id, user.id);
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }

    try {
        await WorkerModel.update(id, user.id, {
            name: body.name,
            gender: body.gender,
            phone_number: body.phone_number,
            email: body.email,
            status: body.status
        });

        res.status(200).send({
            status: 'Success',
            message: 'Worker updated',
            data: {
                id: id,
                ...body
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const destroy = async (req, res) => {
    const id = req.params.id;
    const user = req.user;

    try {
        await WorkerModel.findById(id, user.id);
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }

    try {
        await WorkerModel.destroy(id, user.id);
        res.status(200).send({ 
            status: 'Success',
            message: 'Worker deleted' 
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export default {
    index,
    store,
    show,
    update,
    destroy
};