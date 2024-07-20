import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAPI, registerAPI } from '../../services/allAPI';
import { TokenAuthenticationResponseContext } from '../../ContextApi/TokenAuth';

const ClientAuth = ({clientRegister}) => {


  const {isAuthorized,setIsAuthorized} = useContext(TokenAuthenticationResponseContext)
  const navigate = useNavigate()
  const [userData, setUserData]=useState({
    username:"",email:"",password:""
  })

  // console.log(userData);

  const handleRegister = async(e)=>{
      e.preventDefault()
      const {username,email,password}=userData
      if(!username || !email || !password){
        toast.info("Please fill all the fields")
      }else{
        try {
          const result = await registerAPI(userData)
        if(result.status===200){
          toast.success(`${result.data.username} has Successful Registered`)
          setUserData({
            username:"",email:"",password:""
          })
          setTimeout(()=>{
            navigate('/clientlogin')
          },2000)
        }else{
          toast.warning(result.response.data)
        }
        } catch (err) {
          console.error(err);
        }
      }
  }

  const handleLogin = async(e)=>{
    e.preventDefault()
    const {email,password}= userData
    if(!email || !password){
      toast.info("Please fill all the fields")
    }else{
      try {
        const result = await loginAPI({email,password})
        if(result.status===200){
          sessionStorage.setItem('username',result.data.existingUser.username)
          sessionStorage.setItem('token',result.data.token)
          setIsAuthorized(true)
          setUserData({
            email:"",password:""
          })
          navigate('/clienthome')
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
    { clientRegister ?( <h1 className='text-3xl font-bold text-center lg:py-4'>Create Your Account</h1>) :
     <h1 className='text-3xl font-bold text-center lg:py-4'>Login</h1>}
    {clientRegister && 
         <input type="text" placeholder="Username" onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username} className="input input-bordered w-full m-2 rounded-md" />
        }
    <input type="email" placeholder="Email" onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email} className="input input-bordered w-full m-2 rounded-md" />
    <input type="password" placeholder="Password" onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password} className="input input-bordered w-full m-2 rounded-md" />
    { clientRegister ? (<p className="text-center text-sm my-3">
    Already have an account? Please <Link to={'/clientlogin'} className="link link-hover text-blue-700">Login</Link>
    </p>) : <p className="text-center text-sm my-3">
        Don't have an account? Please <Link to={'/clientregister'} className="link link-hover text-blue-700">SignUp</Link>
    </p>}
        {clientRegister ? (    <button onClick={handleRegister} className='btn bg-blue-900 rounded-lg w-full hover:bg-blue-950 text-white'>Sign Up</button>
    ) :     <button onClick={handleLogin} className='btn bg-blue-900 rounded-lg w-full hover:bg-blue-950 text-white'>Sign In</button>
}
<ToastContainer position='top-center' autoClose={1900} theme='colored' />
    </div>
    <Footer/>
    </>
  )
}

export default ClientAuth