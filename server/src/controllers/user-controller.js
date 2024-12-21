import UserModel from '../models/userModel.js';
import UserProfileModel from '../models/user-profile.js';
import bcrypt from 'bcrypt';

const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone_number } = req.body;

    try {
        const [ rows ] = await UserModel.findById(id);
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

        await UserModel.update(id, { name, email });
        await UserProfileModel.update(user.id, { phone_number });

        const [ updatedUserRows ] = await UserModel.findById(id);
        const [ updatedUserProfileRows ] = await UserProfileModel.findByUserId(user.id);

        return res.status(200).json({
            status: 'success',
            message: 'User updated successfully',
            data: {
                user: {
                    id: updatedUserRows[0].id,
                    name: updatedUserRows[0].name,
                    email: updatedUserRows[0].email,
                    phone_number: updatedUserProfileRows[0].phone_number
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
        const [ rows ] = await UserModel.findById(id);
        const user = rows[0];

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
       
        const isPasswordMatch = await bcrypt.compare(old_password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Old password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(new_password, 13)
        await UserModel.updatePassword(id, hashedPassword);

        return res.status(200).json({
            status: 'success',
            message: 'Password updated successfully'
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    update,
    changePassword
}