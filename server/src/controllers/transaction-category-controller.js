import TransactionCategoryModel from '../models/transaction-category.js';

const index = async (req, res) => {
    try {
        const [rows] = await TransactionCategoryModel.all();
        res.status(200).json({
            status: "success",
            message: "Transaction categories retrieved successfully",
            data: rows
        });
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const store = async (req, res) => {
    try {
        const { body } = req;

        const [rows] = await TransactionCategoryModel.create({
            name: body.name,
        });

        res.status(201)
        .json({
            message: 'Transaction category created successfully',
            data: {
                id: rows.insertId,
                name: body.name,
            }   
        })
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export default {
    index,
    store
};