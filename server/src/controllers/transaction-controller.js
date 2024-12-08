import TransactionModel from '../models/transaction.js';


const index = async (req, res) => {
    try {
        const filters = req.query;
        const [rows] = await TransactionModel.all(filters);
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

const update = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    try {
        let [rows, fields] = await TransactionModel.exists(id);
        
        if(!rows[0].exist){
            res.status(404).json(
                {
                    status: 'error',
                    message: 'Transaction not found'
                }
            );
            return;
        }
    } catch(error){
        res.status(500).send({message: error.message});
    }

    try {
        await TransactionModel.update(id, body);
        res.status(200).json(
            {
                status: 'success',
                message: 'Transaction updated successfully',
                data: {
                    id: id,
                    ...body
                }
            }
        );
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

const destroy = async (req, res) => {
    const { id } = req.params;
    
    try {
        let [rows, fields] = await TransactionModel.exists(id);
        
        if(!rows[0].exist){
            res.status(404).json(
                {
                    status: 'error',
                    message: 'Transaction not found'
                }
            );
            return;
        }

        await TransactionModel.destroy(id);

        res.status(200).json(
            {
                status: 'success',
                message: 'Transaction deleted successfully'
            }
        );
    } catch (error) {
        res.status(500).send({message: error.message});
    }
}

export default {
    index,
    store,
    destroy,
    update
}