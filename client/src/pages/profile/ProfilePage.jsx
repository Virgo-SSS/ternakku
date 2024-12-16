import useAuth from "../../hooks/useAuth";

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
                            <div className="row">
                                <div className="col-md-12">
                                    <h5><b>User Information</b></h5>    
                                    <div>
                                        <label htmlFor="html5-text-input" className="col-md-2 col-form-label">Name</label>
                                        <input type="text" className="form-control" id="defaultFormControlInput" placeholder="John Doe" aria-describedby="defaultFormControlHelp"/>  
                                    </div>

                                    <div>
                                        <label htmlFor="html5-search-input" className="col-md-2 col-form-label">Email</label>
                                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>     
                                        <button type="button" className="btn btn-primary mt-5 mb-10">Save</button>  
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
                                    <h5><b>Password</b></h5>
                                    <div>
                                        <label htmlFor="password" className="col-md-2 col-form-label">Current Password</label>
                                        <input type="password" id="password" className="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>
                                    </div>

                                    <div>
                                        <label htmlFor="new_password" className="col-md-2 col-form-label">New Password</label>
                                        <input type="password" id="new_password" className="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>
                                    </div>

                                    <div>
                                        <label htmlFor="confirmation_new_password" className="col-md-2 col-form-label">Confirm New Password</label>
                                        <input type="password" id="confirmation_new_password" className="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>
                                        <button type="button" className="btn btn-primary mt-5">Change</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
