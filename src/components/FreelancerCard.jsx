import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TokenAuthenticationResponseContext } from '../ContextApi/TokenAuth'

const FreelancerCard = () => {
    const navigate = useNavigate()
    const [ username, setUsername]=useState("")
    const {isAuthorized,setIsAuthorized} = useContext(TokenAuthenticationResponseContext)

    useEffect(()=>{
        if(sessionStorage.getItem("username")){
            setUsername(sessionStorage.getItem("username"))
        }else{
            setUsername("")
        }
    },[])

    const handleLogout = ()=>{
        sessionStorage.removeItem("username")
        sessionStorage.removeItem("tokenfreelancer")
        setIsAuthorized(false)
        navigate('/')
    }
  return (
    <>
    <div className='card container mx-auto card-bordered w-2/12 flex flex-col min-h-screen flex-grow text-white bg-blue-950 lg:m-4'>
                <div className='card-body text-center justify-between'>
                    <div>
                    <div className='container'>
                        <Link className='flex flex-row place-content-center lg:text-sm sm:text-xs' to={'../freelancerhome'}>
                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className='rounded-full w-14' alt="" />
                        <div className='w-full content-center'>{username}</div>
                        </Link>
                    </div>
                    <div className="divider divider-neutral"></div> 
                    <div  className='container '>
                        <Link className='flex flex-row place-content-center lg:text-sm sm:text-xs' to={'../freelancerprofile'}>
                        <div><i class="me-7 fa-solid fa-user"></i></div>
                        <div className=' content-center'>Profile</div>
                        </Link>
                    </div>
                    <div className="divider divider-neutral"></div> 
                    <Link className=' flex flex-row  place-content-center lg:text-sm sm:text-xs' to={'../freelancerbooking'}>
                        <div><i class="me-7 fa-solid fa-pen"></i></div>
                        <div className=' content-center'>Booking</div>
                    </Link>
                    <div className="divider divider-neutral"></div> 
                    <Link className=' flex flex-row  place-content-center lg:text-sm sm:text-xs' to={'../freelancerrequest'}>
                        <div><i class="me-7 fa-solid fa-hourglass-start"></i></div>
                        <div className=' content-center'>Request</div>
                    </Link> 
                    </div>  

                    <div className=' flex flex-row lg:mb-20 place-content-center lg:text-sm sm:text-xs'>
                        <div><i class="me-7  fa-solid fa-arrow-left"></i></div>
                        <div className=' content-center' onClick={handleLogout}>Logout</div>
                    </div>                
                </div>
            </div>
    </>
  )
}

export default FreelancerCard