import React from 'react'
import { useLocation, useParams } from "react-router-dom"

export const ProfilePage = () => {
 return (
<>
    <h3><b>Profile</b></h3>
    <div className='row gap-6'>
        <div className="card d-flex justify-content-start" style={{ width: "451px", height: "400px"}}>
            <div class="card-body">
                <div class="user-avatar-section">
                    <div class="d-flex align-items-center flex-column">
                        <img class="img-fluid rounded mb-4" src="../../assets/img/avatars/1.png" height="300" width="200" alt="User avatar"/>
                        <div class="user-info text-center">
                        <h3 className='mb-0'><b>Asep Stevanus</b></h3>
                        <h5 className="d-flex justify-content-center">Asep123@gmail.com</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="card d-flex justify-content-start p-2" style={{ width: "750px", height: "700px"}}>
            <div class="card-body">
                     <h5><b>User Information</b></h5>    
                    <div>
                    <label for="html5-text-input" class="col-md-2 col-form-label">Name</label>
                        <input type="text" class="form-control" id="defaultFormControlInput" placeholder="John Doe" aria-describedby="defaultFormControlHelp"/>  
                    </div>

                    <div>
                    <label for="html5-search-input" class="col-md-2 col-form-label">Email</label>
                        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>     
                        <button type="button" class="btn btn-primary mt-5 mb-10">Save</button>  
                    </div>

                    <h5><b>Password</b></h5>
                    <div>
                    <label for="inputPassword5" class="col-md-2 col-form-label">Current Password</label>
                        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>
                    </div>

                    <div>
                    <label for="inputPassword5" class="col-md-2 col-form-label">New Password</label>
                        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>
                    </div>

                    <div>
                    <label for="inputPassword5" class="col-md-2 col-form-label">Confirm New Password</label>
                        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" placeholder="********"/>
                        <button type="button" class="btn btn-primary mt-5">Change</button>
                    </div>
            </div>
        </div>

    </div>
    </>
  )
}
