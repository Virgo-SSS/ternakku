import TransactionModel from '../models/transaction.js';


const index = async (req, res) => {
    try {
        const [rows] = await TransactionModel.all();
        res.status(200).json(
            {
                status: 'success',
                message: 'Transactions retrieved successfully',
                data: rows
            }
        );
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const store = async (req, res) => {
    try {
        const { body } = req;

        const [rows] = await TransactionModel.create({
            name: body.name,
            date: body.date,
            category: body.category,
            amount: body.amount,
            type: body.type,
            notes: body.notes
        });

        res.status(201)
        .json({
            status: 'success',
            message: 'Transaction created successfully',
            data: {
                id: rows.insertId,
                name: body.name,
                date: body.date,
                category: body.category,
                amount: body.amount,
                type: body.type,
                notes: body.notes
            }   
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export default {
    index,
    store
}