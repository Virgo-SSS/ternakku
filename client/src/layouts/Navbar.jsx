import getGreetingMessage from '../utils/greetingHandler';
const Navbar = () => {
  return (
    <nav className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar">
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
        <a aria-label='toggle for sidebar' className="nav-item nav-link px-0 me-xl-4" href="#">
          <i className="bx bx-menu bx-sm"></i>
        </a>
      </div>

      <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
        {getGreetingMessage('Dwi')}
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          {/* notification */}
          <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
            <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown"
              data-bs-auto-close="outside" aria-expanded="false">
              <span className="position-relative">
                <i className="bx bx-bell bx-md"></i>
                <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
              </span>
            </a>
            <ul className="dropdown-menu dropdown-menu-end p-0">
              <li className="dropdown-menu-header border-bottom">
                <div className="dropdown-header d-flex align-items-center py-3">
                  <h6 className="mb-0 me-auto">Notification</h6>
                  <div className="d-flex align-items-center h6 mb-0">
                    <span className="badge bg-label-primary me-2">8 New</span>
                    <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-all p-2" data-bs-toggle="tooltip"
                      data-bs-placement="top" aria-label="Mark all as read" data-bs-original-title="Mark all as read"><i
                        className="bx bx-envelope-open text-heading"></i></a>
                  </div>
                </div>
              </li>
              <li className="dropdown-notifications-list">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item list-group-item-action dropdown-notifications-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <img src="../../assets/img/avatars/1.png" alt="" className="rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="small mb-0">Congratulation Lettie 🎉</h6>
                        <small className="mb-1 d-block text-body">Won the monthly best seller gold badge</small>
                        <small className="text-muted">1h ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"><span
                            className="badge badge-dot"></span></a>
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"><span
                            className="bx bx-x"></span></a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <span className="avatar-initial rounded-circle bg-label-danger">CF</span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="small mb-0">Charles Franklin</h6>
                        <small className="mb-1 d-block text-body">Accepted your connection</small>
                        <small className="text-muted">12hr ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"><span
                            className="badge badge-dot"></span></a>
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"><span
                            className="bx bx-x"></span></a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <img src="../../assets/img/avatars/2.png" alt="" className="rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="small mb-0">New Message ✉️</h6>
                        <small className="mb-1 d-block text-body">You have new message from Natalie</small>
                        <small className="text-muted">1h ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"><span
                            className="badge badge-dot"></span></a>
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"><span
                            className="bx bx-x"></span></a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item marked-as-read">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <img src="../../assets/img/avatars/2.png" alt="" className="rounded-circle" />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="small mb-0">New Message ✉️</h6>
                        <small className="mb-1 d-block text-body">You have new message from Natalie</small>
                        <small className="text-muted">1h ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"><span
                            className="badge badge-dot"></span></a>
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"><span
                            className="bx bx-x"></span></a>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item list-group-item-action dropdown-notifications-item">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar">
                          <span className="avatar-initial rounded-circle bg-label-success"><i
                              className="bx bx-cart"></i></span>
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <h6 className="small mb-0">Whoo! You have new order 🛒 </h6>
                        <small className="mb-1 d-block text-body">ACME Inc. made new order $1,154</small>
                        <small className="text-muted">1 day ago</small>
                      </div>
                      <div className="flex-shrink-0 dropdown-notifications-actions">
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-read"><span
                            className="badge badge-dot"></span></a>
                        <a onClick={(e) => e.preventDefault()} className="dropdown-notifications-archive"><span
                            className="bx bx-x"></span></a>
                      </div>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="border-top">
                <div className="d-grid p-4">
                  <a className="btn btn-primary btn-sm d-flex" href="#">
                    <small className="align-middle">View all notifications</small>
                  </a>
                </div>
              </li>
            </ul>
          </li>

          {/* User Profile */}
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <a aria-label='dropdown profile avatar' className="nav-link dropdown-toggle hide-arrow" href="#"
              data-bs-toggle="dropdown">
              <div className="avatar avatar-online">
                <img src="../assets/img/avatars/1.png" className="w-px-40 h-auto rounded-circle" alt="avatar-image"
                  aria-label='Avatar Image' />
              </div>
            </a>
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <a aria-label='go to profile' className="dropdown-item" href="#">
                  <div className="d-flex">
                    <div className="flex-shrink-0 me-3">
                      <div className="avatar avatar-online">
                        <img src="../assets/img/avatars/1.png" className="w-px-40 h-auto rounded-circle" alt='avatar-image'
                          aria-label='Avatar Image' />
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <span className="fw-medium d-block">John Doe</span>
                      <small className="text-muted">Admin</small>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a aria-label='go to profile' className="dropdown-item" href="#">
                  <i className="bx bx-user me-2"></i>
                  <span className="align-middle">My Profile</span>
                </a>
              </li>
              <li>
                <a aria-label='go to setting' className="dropdown-item" href="#">
                  <i className="bx bx-cog me-2"></i>
                  <span className="align-middle">Settings</span>
                </a>
              </li>
              <li>
                <a aria-label='go to billing' className="dropdown-item" href="#">
                  <span className="d-flex align-items-center align-middle">
                    <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                    <span className="flex-grow-1 align-middle ms-1">Billing</span>
                    <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">4</span>
                  </span>
                </a>
              </li>
              <li>
                <div className="dropdown-divider"></div>
              </li>
              <li>
                <a aria-label='click to log out' className="dropdown-item" href="#">
                  <i className="bx bx-power-off me-2"></i>
                  <span className="align-middle">Log Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default Navbar;