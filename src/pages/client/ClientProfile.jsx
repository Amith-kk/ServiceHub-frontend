import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteBookingAPI, getAllBookingAPI, getClient, updateClientAPI } from '../../services/allAPI'

const ClientProfile = () => {
  
  const [booking, setBooking]=useState([])
  const [userData, setUserData] = useState({
    username:"",email:"",contact:"",location:"",address:""
  })
  const [tempData, setTempData] = useState({
    username:"",email:"",contact:"",location:"",address:""
  })


  useEffect(() => {
  
    const getUserData = async () => {
      const token = sessionStorage.getItem('token')
  
      if (!token) {
        console.error('No token found');
        return;
      }
      if(token){
        const reqHeader ={
          // 'Content-Type':preview?'multipart/form-data':"application/json",
          'Authorization':`Bearer ${token}`
        };
        
      
      try{
  
        // console.log(reqHeader);
        // console.log('Request Header:', reqHeader);
  
        const response = await getClient(reqHeader);
        // console.log(response);
        // console.log('API Response:', response);
        const {username,email,contact,location,address} =response.data
        setUserData({username,email,contact,location,address})
        setTempData({username,email,contact,location,address})
         } catch(err){
        console.log(err);
      }
    }
  } 
      getUserData()
    
  
  },[])

  const handleClose = ()=>{
    setTempData(userData)
  }

  const handleUpdate = async()=>{
    const {username,email,contact,location,address}=tempData
    if(!username || !email || !contact || !location || !address ){
      toast.info("Please fill all the fields")
    }else{
      const token = sessionStorage.getItem('token')
      if(token){
        const reqHeader ={
          'Authorization':`Bearer ${token}`
        };
        
        // const formData = new FormData()
        // formData.append('username', username)
        // formData.append('email', email)
        // formData.append('contact', contact)
        // formData.append('location', location)
        // formData.append('address', address)

        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}: ${value}`);
        // }
        try {
          const formData = { username, email, contact, location, address };
          const response = await updateClientAPI(formData,reqHeader)
          // console.log(response);
          toast.success('Profile updated successfully')
          setUserData(tempData)
        } catch (err){
          console.log(err);
          toast.error('Failed to update profile')
        }
  
    }
  }
  }

  const viewBooking = async()=>{
  
    const token = sessionStorage.getItem('token')

    if (!token) {
      console.error('No token found');
      return;
    }
    if(token){
      const reqHeader ={
        // 'Content-Type':preview?'multipart/form-data':"application/json",
        'Authorization':`Bearer ${token}`
      };
      try{
  
        const result = await getAllBookingAPI(reqHeader);
        // console.log(result);
        if(result.status===200){
          setBooking(result.data)
        }
         } catch(err){
        console.log(err);
      }
    }
  }

  useEffect(()=>{   
    viewBooking()
  },[])

  const handleDelete = async(bid)=>{
    const token = sessionStorage.getItem("token")
    if(token){
      const reqHeader ={
        // 'Content-Type':'application/json',
        'Authorization':`Bearer ${token}`
      }
      const result = await deleteBookingAPI(bid,reqHeader)
      if(result.status===200){
        toast.success('Booking Deleted')
        viewBooking()  
      }else{
        toast.warning(result.response.data)
      }
    }
  }

  return (
    <>
    {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    
  <div className='border  flex flex-col text-center items-center'>
    <div className="flex flex-col gap-3 w-full">
        <input type="text" value={tempData.username} onChange={e=>setTempData({...tempData,username:e.target.value})} placeholder="Username" className="input input-bordered w-full m-2 rounded-md" />
        <input type="email" value={tempData.email} onChange={e=>setTempData({...tempData,email:e.target.value})} placeholder="Email" className="input input-bordered w-full m-2 rounded-md flex-grow" />
        <input type="text" value={tempData.contact} onChange={e=>setTempData({...tempData,contact:e.target.value})} placeholder="Phone number" className="input input-bordered w-full m-2 rounded-md flex-grow" />
        <input type="text" value={tempData.address} onChange={e=>setTempData({...tempData,address:e.target.value})} placeholder="Address" className="input input-bordered w-full m-2 rounded-md flex-grow" />
        <select onChange={e=>setTempData({...tempData,location:e.target.value})} value={tempData.location} className="select  input input-bordered w-full m-2 rounded-md flex-grow">
        <option disabled defaultValue value="">Select your district</option>
        <option value="Palakkad">Palakkad</option>
        <option value="Malappuram">Malappuram</option>
        <option value="Kozhikode">Kozhikode</option>
        <option value="Kannur">Kannur</option>
        <option value="Wayanad">Wayanad</option>
        <option value="Ernakulam">Ernakulam</option>

        </select>
    </div>
        
    </div>
    <div className="modal-action">
      <form method="dialog">
        <button className='btn mx-2' onClick={handleUpdate}>Update</button>
        {/* if there is a button in form, it will close the modal */}
        <button className="btn" onClick={handleClose}>Close</button>
      </form>
    </div>
  </div>
</dialog>
        <Header/>
        <div className='flex flex-col min-h-screen'>
        <div className='container mx-auto flex flex-row '>
            <div className='card card-bordered bg-base-200 w-3/12 m-4  min-h-screen'>
              
                <div className=''>
                
                <div className='  m-6  flex flex-col'>
                
                    <div className="font-bold text-center my-3">{userData.username}</div>
                <div className='text-base my-2'><span className='font-bold '>Email : </span>{userData.email}</div>
                  <div className='text-base my-2 flex flex-row'><span className='font-bold '>Contact : </span>{userData.contact? userData.contact : <div className='text-sm m-1 text-red-500 '>Please fill the missing field</div>}</div>
                  <div className='text-base my-2 flex flex-row'><span className='font-bold '>Location : </span>{userData.location? userData.location : <div className='text-sm m-1 text-red-500 '>Please fill the missing field</div>}</div>
                  <div className='text-base my-2 flex flex-row'><span className='font-bold '>Address : </span>{userData.address? userData.address : <div className='text-sm m-1 text-red-500 '>Please fill the missing field</div>}</div>
                
                    <button className="btn mx-3 my-4 bg-base-300 btn-ghost btn-sm flex " onClick={()=>document.getElementById('my_modal_5').showModal()}>Edit Profile</button>
                    
                </div>
                </div>
            </div>
            <div className='card card-bordered bg-base-200 w-8/12 m-4'>
                <div className='font-bold text-center my-6'>
                    Booking Details
                </div>
                {
              booking.length > 0 ? (
                <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <td>NAME</td>
        <th>SERVICE</th>
        <th>DATE</th>
        <th>STATUS</th>
        <th>DELETE</th>
      </tr>
    </thead>
    <tbody>
    { booking.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className='flex items-center gap-3'>
                        
                        <div>
                          <div className='font-bold'>{item.freelancerDetails.name}</div>
                          
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className=''>{item.freelancerDetails.job}</div>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className=''>{item.status}</div>
                    </td>
                    <td>
                    <i class="fa-solid fa-trash" onClick={()=>handleDelete(item?._id)}></i>
                    </td>
                    
                  </tr>))}
    </tbody>
    {/* foot
    <tfoot>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
        <th></th>
      </tr>
    </tfoot> */}
    
  </table>
   ) : (
    <div className='flex justify-center items-center h-full'>
      <div className='text-center text-red-600 text-2xl'>Nothing to show!</div>
    </div>
  )
}

            </div>
        </div>
        <ToastContainer position='top-center' autoClose={1900} theme='colored' />
        </div>
        
    <Footer/>
    </>
  )
}

export default ClientProfile