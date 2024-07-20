import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthenticationResponseContext } from '../ContextApi/TokenAuth';

const Header = () => {
  const [userType, setUserType] = useState(null); // To store the type of user (client, freelancer, admin)
  const navigate = useNavigate();

  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthenticationResponseContext)

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const adminToken = sessionStorage.getItem("admintoken");
    const freelancerToken = sessionStorage.getItem("tokenfreelancer");

    if (token) {
      setUserType('client');
    } else if (adminToken) {
      setUserType('admin');
    } else if (freelancerToken) {
      setUserType('freelancer');
    } else {
      setUserType(null);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("admintoken");
    sessionStorage.removeItem("tokenfreelancer");
    sessionStorage.removeItem("username");
    setIsAuthorized(false)
    navigate('/');
    setUserType(null); // Reset userType to null on logout
  };

  return (
    <>
      <div className="navbar text-white bg-blue-950">
        <div className="flex-1">
          <Link to={'/'} className="btn btn-ghost ms-16 text-2xl font-bold">ServiceHub</Link>
        </div>
        <div className="flex-none">
          <ul className="font-bold menu menu-horizontal px-5">
            {userType === 'client' && <li><Link to={'/clienthome'}>Home</Link></li>}
            {userType === 'client' && <li><Link to={'/clientprofile'}>Profile</Link></li>}
            {userType === 'client' && <li><a onClick={handleLogout}>Logout</a></li>}
            {/* {userType === 'freelancer' && <li><Link to={'/freelancerhome'}>Home</Link></li>}
            {userType === 'freelancer' && <li><Link to={'/freelancerprofile'}>Profile</Link></li>}
            {userType === 'freelancer' && <li><a onClick={handleLogout}>Logout</a></li>}
            {userType === 'admin' && <li><Link to={'/adminhome'}>Home</Link></li>}
            {userType === 'admin' && <li><Link to={'/adminprofile'}>Profile</Link></li>} */}
            {userType === 'admin' && <li><a onClick={handleLogout}>Logout</a></li>}
            <li><a>About us</a></li>
            {!userType && ( // Only show the login button if no user is logged in
              <li>
                <details>
                  <summary>
                    Login
                  </summary>
                  <ul className="p-2 bg-blue-950 text-white rounded-t-none">
                    <li><Link to={'/clientlogin'}>Clients</Link></li>
                    <li><Link to={'/freelancerlogin'}>Freelancers</Link></li>
                    <li><Link to={'/adminlogin'}>Admin</Link></li>
                  </ul>
                </details>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Header;
