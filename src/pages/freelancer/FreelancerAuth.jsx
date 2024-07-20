import React, { useContext, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { freelancerLoginAPI, freelancerRegisterAPI } from '../../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TokenAuthenticationResponseContext } from '../../ContextApi/TokenAuth'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

const FreelancerAuth = ({freelancerRegister}) => {

    const navigate = useNavigate()
    const {isAuthorized,setIsAuthorized} = useContext(TokenAuthenticationResponseContext)
    const [freelancerData,setFreelancerData]=useState({
        username:"",email:"",password:"",contact:"",district:"",
    })
    // console.log(freelancerData);
//     const validationSchema = Yup.object().shape({
//         username: Yup.string().when('freelancerRegister', {
//             is:true,
//             then:Yup.string().required('Username is required')
//         }),
//         email: Yup.string().email('Invalid email').required('Email is required'),
//         password: Yup.string().min(6,'Password should be at least 6 character long').required('Password is required'),
//         contact: Yup.string().min(10, 'Contact number should be at least 10 digit long').required('Contact number is required'),
//         district:Yup.string().required('District is required')
// })
    const handleRegister = async(e)=>{
        e.preventDefault();
        const {username,email,password,contact,district} = freelancerData
        if(!username || !email || !password || !contact || !district){
            toast.info("Please fill all the fields")
        }else{
            try {
                const result = await freelancerRegisterAPI(freelancerData)
                if(result.status===200){
                    setFreelancerData({username:"",email:"",password:"",contact:"",district:""})
                    navigate('/freelancerlogin')

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
        const {email, password}= freelancerData
        if(!email || !password){
            toast.info("Please fill all the fields")
        }else{
            try {
               const result = await freelancerLoginAPI({email,password})
               if(result.status===200){
                // console.log(result);
                sessionStorage.setItem('username',result.data.existingFreelancer.username)
                sessionStorage.setItem('tokenfreelancer',result.data.token)
                setIsAuthorized(true)
                setFreelancerData({
                email:"",password:""
                })
          navigate('/freelancerhome')
                
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
    <div className='border m-[2%] md:mx-[28%] sm:mx-[5%]  md:p-10 lg:p-14 flex flex-col text-center items-center'>
    {
        freelancerRegister ? 
        (    <h1 className='text-3xl font-bold text-center lg:py-4'>Create your Account</h1>):
        (    <h1 className='text-3xl font-bold text-center lg:py-4'>Login to your Account</h1>  )

    }  
    <div className="flex flex-col gap-3 w-full">
        {
            freelancerRegister &&        
             <input type="text" placeholder="Username" onChange={e=>setFreelancerData({...freelancerData,username:e.target.value})} value={freelancerData.username} className="input input-bordered w-full m-2 rounded-md" />
        }
        <input type="email" placeholder="Email" onChange={e=>setFreelancerData({...freelancerData,email:e.target.value})} value={freelancerData.email} className="input input-bordered w-full m-2 rounded-md flex-grow" />
        <input type="password" placeholder="Password" onChange={e=>setFreelancerData({...freelancerData,password:e.target.value})} value={freelancerData.password} className="input input-bordered w-full m-2 rounded-md flex-grow" />
    </div>
    {
        freelancerRegister &&
        <div className="grid gap-3 grid-cols-2 w-full">
        <input type="text" placeholder="Phone number" onChange={e=>setFreelancerData({...freelancerData,contact:e.target.value})} value={freelancerData.contact} className="input input-bordered w-full m-2 rounded-md" />
        <select onChange={e=>setFreelancerData({...freelancerData,district:e.target.value})} value={freelancerData.district} className="select max-w-xs input input-bordered w-full m-2 rounded-md">
        <option defaultValue value="" disabled>Select your district</option>
        <option value="palakkad">Palakkad</option>
        <option value="malappuram">Malappuram</option>
        <option value="kozhikode">Kozhikode</option>
        <option value="kannur">Kannur</option>
        <option value="wayanad">Wayanad</option>
        <option value="ernakulam">Ernakulam</option>

        </select>
    </div>
    }
    { freelancerRegister ? (<p className="text-center text-sm my-3">
    Already have an account? Please <Link to={'/freelancerlogin'} className="link link-hover text-blue-700">Login</Link>
    </p>) : <p className="text-center text-sm my-3">
        Don't have an account? Please <Link to={'/freelancerregister'} className="link link-hover text-blue-700">SignUp</Link>
    </p>}
    { 
        freelancerRegister ? (
            <button onClick={handleRegister} className='btn my-3 lg:ms-2 bg-blue-900 rounded-lg w-full hover:bg-blue-950 text-white'>Create</button>
        ) : (
            <button onClick={handleLogin} className='btn my-3 lg:ms-2 bg-blue-900 rounded-lg w-full hover:bg-blue-950 text-white'>Login</button>
        )
    }
    <ToastContainer position='top-center' autoClose={1900} theme='colored' />
</div>
    <Footer/>
    </>
  )
}

export default FreelancerAuth