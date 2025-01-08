import TransactionModel from '../models/transaction.js';


const index = async (req, res) => {
    try {
        const user = req.user;
        const filters = req.query;
        filters.user_id = user.id;
        const [ rows ] = await TransactionModel.all(filters);

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
        const { user } = req;

        const [rows] = await TransactionModel.create({
            user_id: user.id,
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
                user_id: user.id,
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

const show = async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    try {
        let [rows, fields] = await TransactionModel.findById(id, user.id);

        if(!rows[0]){
            res.status(404).json(
                {
                    status: 'error',
                    message: 'Transaction not found'
                }
            );
            return;
        }

        res.status(200).json(
            {
                status: 'success',
                message: 'Transaction retrieved successfully',
                data: rows[0]
            }
        );
    } catch(error){
        res.status(500).send({message: error.message});
    }
}

const update = async (req, res) => {
    const { id } = req.params;
    const user = req.user;
    const body = req.body;

    try {
        let [rows, fields] = await TransactionModel.exists(id, user.id);

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
        await TransactionModel.update(id, user.id, body);

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
    const user = req.user;
    
    try {
        let [rows, fields] = await TransactionModel.exists(id, user.id);
        
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
    show,
    update,
    destroy
}