import CowModel from '../models/cow.js';

const index = async (req, res) => {
    try {
        const filters = req.query;
        const [rows] = await CowModel.all(filters);
        
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

// Menampilkan sapi berdasarkan ID
const show = async (req, res) => {
    try {
        const { id } = req.params; // Mengambil ID dari parameter URL

        const [rows] = await CowModel.findById(id); // Memanggil model untuk mencari sapi berdasarkan ID

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cow not found' }); // Jika sapi tidak ditemukan
        }

        res.status(200).json({
            message: 'Cow details fetched successfully',
            data: rows[0] // Mengembalikan data sapi pertama (karena hasil query adalah array)
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Update/Edit
const update = async (req, res) => {
    const id = req.params.id;
    const { body } = req;

    try {
        const [rows] = await CowModel.findById(id); // Memanggil model untuk mencari sapi berdasarkan ID

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cow not found' }); // Jika sapi tidak ditemukan
        }
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }

    try {
        await CowModel.update(id, body);

        res.status(200).send({
            status: 'Success',
            message: 'Cow updated successfully',
            data: {
                id: id,
                ...body
            }
        });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Delete
const destroy = async (req, res) => {
    const id = req.params.id;

    try {
        const [rows] = await CowModel.findById(id); // Memanggil model untuk mencari sapi berdasarkan ID

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cow not found' }); // Jika sapi tidak ditemukan
        }
    } catch (error) {
        return res.status(404).send({ message: error.message });
    }

    try {
        await CowModel.destroy(id);
        res.status(200).send({ message: 'Cow deleted' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

export default {
    store,
    index,
    show,
    update,
    destroy
}