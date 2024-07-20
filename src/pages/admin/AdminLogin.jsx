import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { adminLoginAPI } from '../../services/allAPI';
import { TokenAuthenticationResponseContext } from '../../ContextApi/TokenAuth';

const AdminLogin = () => {

  const {isAuthorized,setIsAuthorized} = useContext(TokenAuthenticationResponseContext)
  const navigate = useNavigate()
  const [adminData, setAdminData]=useState({
    email:"",password:""
  })

  const handleLogin = async(e)=>{
    e.preventDefault()
    const {email,password}= adminData
    if(!email || !password){
      toast.info("Please fill all the fields")
    }else{
      try {
        const result = await adminLoginAPI({email,password})
        if(result.status===200){
          // sessionStorage.setItem('admin',result.data.existingAdmin.username)
          sessionStorage.setItem('admintoken',result.data.token)
          setIsAuthorized(true)
          setAdminData({
            email:"",password:""
          })
          navigate('/adminhome')
        }else{
          toast.warning(result.response?.data?.message || 'Login failed')
        }
      } catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || 'An error occured during login')
      }
    }
  }

  

  return (
    <>
    <Header/>
    <div className='border  m-[2%] md:mx-[28%] md:p-10 lg:p-14 flex flex-col items-center'>
     <h1 className='text-3xl font-bold text-center lg:py-4'>Login</h1>
    <input type="email" placeholder="Email" onChange={e=>setAdminData({...adminData,email:e.target.value})} value={adminData.email} className="input input-bordered w-full m-2 rounded-md" />
    <input type="password" placeholder="Password" onChange={e=>setAdminData({...adminData,password:e.target.value})} value={adminData.password} className="input input-bordered w-full m-2 rounded-md" />
    <button className='btn bg-blue-900 rounded-lg w-full hover:bg-blue-950 text-white' onClick={handleLogin}>Login</button>
    <ToastContainer position='top-center' autoClose={1900} theme='colored' />
    </div>
    <Footer/>
    </>
  )
}

export default AdminLogin