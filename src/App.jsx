
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import ClientAuth from './pages/client/ClientAuth'
import FreelancerAuth from './pages/freelancer/FreelancerAuth'
import ClientHome from './pages/client/ClientHome'
import AdminLogin from './pages/admin/AdminLogin'
import FreelancerHome from './pages/freelancer/FreelancerHome'
import FreelancerProfile from './pages/freelancer/FreelancerProfile'
import FreelancerBooking from './pages/freelancer/FreelancerBooking'
import FreelancerRequest from './pages/freelancer/FreelancerRequest'
import ClientProfile from './pages/client/ClientProfile'
import AdminHome from './pages/admin/AdminHome'
import { useContext } from 'react'
import { TokenAuthenticationResponseContext } from './ContextApi/TokenAuth'


function App() {

  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthenticationResponseContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/clientlogin' element={<ClientAuth/>}/>
      <Route path='/clientregister' element={<ClientAuth clientRegister/>}/>
      <Route path='/clienthome' element={isAuthorized? <ClientHome/>:<Home/>}/>
      <Route path='/clientprofile' element={isAuthorized? <ClientProfile/>:<Home/>}/>
      <Route path='/freelancerlogin' element={<FreelancerAuth/>}/>
      <Route path='/freelancerregister' element={<FreelancerAuth freelancerRegister/>}/>
      <Route path='/freelancerhome' element={isAuthorized? <FreelancerHome/>:<Home/>}/>
      <Route path='/freelancerprofile' element={isAuthorized? <FreelancerProfile/>:<Home/>}/>
      <Route path='/freelancerbooking' element={isAuthorized? <FreelancerBooking/>:<Home/>}/>
      <Route path='/freelancerrequest' element={isAuthorized? <FreelancerRequest/>:<Home/>}/>
      <Route path='/adminlogin' element={<AdminLogin/>}/>
      <Route path='/adminhome' element={isAuthorized? <AdminHome/>:<Home/>}/>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
    </>
  )
}

export default App
