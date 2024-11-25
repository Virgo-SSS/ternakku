import CowModel from '../models/cow.js';

const index = async (req, res) => {
    try {
        const [rows] = await CowModel.all();
        res.status(200).json({
            message: 'Success',
            data: rows
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

const store =   async (req, res) => {
    try {
        const { body } = req;

        const [rows] = await CowModel.create({
            name: body.name,
            status: body.status,
            gender: body.gender,
            birth_date: body.birth_date,
            weight: body.weight,
            type: body.type,
            is_bought: body.is_bought,
        });

        res.status(201)
        .json({
            message: 'Cow created successfully',
            data: {
                id: rows.insertId,
                name: body.name,
                status: body.status,
                gender: body.gender,
                birth_date: body.birth_date,
                weight: body.weight,
                type: body.type,
                is_bought: body.is_bought
            }   
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
};

export default {
    store,
    index
}