import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const ProfilePage = () => {
    const { auth } = useAuth();

    return (
        <>
            <div className='row'>
                <h3>
                    <b>Profile</b>
                </h3>
                <div className="col-md-4">
                    <div className="card d-flex justify-content-start">
                        <div className="card-body">
                            <div className="user-avatar-section">
                                <div className="d-flex align-items-center flex-column">
                                    <img className="img-fluid rounded mb-4" src="../../assets/img/avatars/1.png" height="300" width="200" alt="User avatar"/>
                                    <div className="user-info text-center">
                                    <h3 className='mb-0'><b>{auth?.user?.name}</b></h3>
                                    <h5 className="d-flex justify-content-center">Email: {auth?.user?.email}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-8">
                    <div className="card d-flex justify-content-start p-2">
                        <div className="card-body">
                            <ProfileFormSection/>
                            <PasswordFormSection/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ProfileFormSection = () => {
    const { auth, setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.user.name,
        email: auth.user.email
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const response = await axiosPrivate.put(`/profile/${auth.user.id}`, formData);

            withReactContent(Swal).fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });

            setFormData({
                name: response.data.data.user.name,
                email: response.data.data.user.email,
            });

            setAuth({
                ...auth,
                user: {
                    ...auth.user,
                    name: response.data.data.user.name,
                    email: response.data.data.user.email,
                }
            });
        } catch (error) {
            console.log(error);
            withReactContent(Swal).fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error
            });
        }

        setIsLoading(false);
    }
        
    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <h5><b>User Information</b></h5>  
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="col-md-2 col-form-label">Name</label>
                            <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required placeholder="Edit Your name"/>  
                        </div>

                        <div>
                            <label htmlFor="email" className="col-md-2 col-form-label">Email</label>
                            <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com"/>     
                            <button type="submit" className="btn btn-primary mt-5 mb-10">Save</button>  
                            {
                                isLoading && <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            }
                        </div>
                    </form>  
                </div>
            </div>
        </>
    )
}

const PasswordFormSection = () => {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirmation_new_password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);

        try {
            // validate new password and confirmation new password
            if (formData.new_password !== formData.confirmation_new_password) {
                throw new Error('New password and confirmation new password do not match');
            }

            const response = await axiosPrivate.put(`/profile/${auth.user.id}/password/change`, formData);

            withReactContent(Swal).fire({
                icon: 'success',
                title: 'Success',
                text: response.data.message,
            });

            setFormData({
                old_password: '',
                new_password: '',
                confirmation_new_password: ''
            });
        } catch (error) {
            console.log(error);
            withReactContent(Swal).fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response?.data?.message || error.message
            });
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                        <h5>
                            <b>Password</b>
                        </h5>
                        <div>
                            <label htmlFor="old_password" className="col-md-2 col-form-label">Current Password</label>
                            <input type="password" id="old_password" name="old_password" value={formData.old_password} onChange={handleChange} required className="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>
                        </div>

                        <div>
                            <label htmlFor="new_password" className="col-md-2 col-form-label">New Password</label>
                            <input type="password" id="new_password" name="new_password" value={formData.new_password} onChange={handleChange} required className="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>
                        </div>

                        <div>
                            <label htmlFor="confirmation_new_password" className="col-md-2 col-form-label">Confirm New Password</label>
                            <input type="password" id="confirmation_new_password" name="confirmation_new_password" 
                                value={formData.confirmation_new_password} onChange={handleChange} required
                                className="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>

                            <button type="submit" className="btn btn-primary mt-5">Change</button>
                            {
                                isLoading 
                                && <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                            }
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}