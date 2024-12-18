import User from '../models/user.js';
import bcrypt from 'bcrypt';

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
        const [ rows ] = await User.findById(id);
        const user = rows[0];

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (email !== user.email) {
            const [ isEmailExists ] = await User.findByEmail(email);

            if (isEmailExists.length > 0) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        await User.update(id, { name, email });

        const [ updatedRows ] = await User.findById(id);

        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: {
                user: {
                    id: updatedRows[0].id,
                    name: updatedRows[0].name,
                    email: updatedRows[0].email,
                }
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const changePassword = async (req, res) => {
    const { id } = req.params;
    const { old_password, new_password } = req.body;

    try {
        const [ rows ] = await User.findById(id);
        const user = rows[0];

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(old_password)
        const isPasswordMatch = await bcrypt.compare(old_password, user.password);
        console.log(isPasswordMatch);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(new_password, 13)
        console.log(hashedPassword);
        await User.updatePassword(id, hashedPassword);

        return res.status(200).json({
            status: 'success',
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    update,
    changePassword
}