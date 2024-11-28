import WorkerModel from '../models/worker.js';


const index = async (req, res) => {
    try {
        const [rows] = await WorkerModel.all();
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
        const { body } = req;

        const [rows] = await WorkerModel.create({
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

export default {
    store,
    index
};