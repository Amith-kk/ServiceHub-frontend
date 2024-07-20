import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBookingAPI, getAllFreelancerAPI } from '../../services/allAPI'
import { SERVER_URL } from '../../services/server_url'

const ClientHome = () => {

  const [searchKey,setSearchKey]= useState("")
  const [freelancers,setFreelancers] = useState([])
//  console.log(freelancers);
const [selectedFreelancer, setSelectedFreelancer] = useState(null);

  const viewFreelancers = async()=>{
  
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
  
        const result = await getAllFreelancerAPI(searchKey,reqHeader);
        // console.log(result);
        if(result.status===200){
          setFreelancers(result.data)
        }
         } catch(err){
        console.log(err);
      }
    }
  }

  useEffect(()=>{   
    viewFreelancers()
  },[searchKey])

  const handleShowDetails = (freelancer) => {
    setSelectedFreelancer(freelancer);
    document.getElementById('my_modal_5').showModal();
  }
  // onClick={() => document.getElementById('my_modal_5').showModal()}

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem('token');
    if(!token) {
      console.error('No token found');
      return;
    };

    const reqHeader ={
      'Authorization':`Bearer ${token}`
    };

    const bookingData = {
      freelancerId: selectedFreelancer._id
    }
    try {
      const result = await createBookingAPI(bookingData,reqHeader);
      if(result.status === 201){
        toast.success('Booking created successfully')
        document.getElementById('my_modal_5').close();
      } else {
        toast.error('Failed to create booking')
      }
    } catch (err){
      console.log(err);
      toast.error('Error creating booking')
    }
  }

  return (
    <>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">

  {selectedFreelancer && (<div className='flex w-full flex-row'>
                <div className=' w-5/12 m-3 flex flex-col'>
                  <img className=' rounded-full' src={`${SERVER_URL}/uploads/${selectedFreelancer.profile}`} alt="" />
                 <div>
                 <div className='text-center mx-2'>
                 <div className="font-bold text-center mt-4">{selectedFreelancer.username}</div>
                 <div className="text-center text-sm mt-2">{selectedFreelancer.job}</div>
                 </div>

                 </div>
                </div>
                <div className=' w-7/12  m-14 flex flex-col '>

                <div className="rating rating-md text-center my-2">
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-5" className="mask mask-star-2 bg-orange-400" />
</div>

                  <div className='text-base my-2'><span className='font-bold '>Contact : </span>{selectedFreelancer.contact}</div>
                  <div className='text-base my-2'><span className='font-bold '>Wage/Hour : </span>{selectedFreelancer.wage}</div>
                  <div className='text-base my-2'><span className='font-bold '>Location : </span>{selectedFreelancer.district}</div>
                  <div className='text-base my-2'><span className='font-bold '>Address : </span>{selectedFreelancer.address}</div>
                </div>
                </div>)}

    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn me-3" onClick={handleBookingSubmit}>Connect</button>
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>




        <Header/>
        <div className='container mx-auto'>
          <div className='flex justify-center m-5'>  
          <input type="text" placeholder="Search worker" onChange={e=>setSearchKey(e.target.value)} className="input input-bordered w-full lg:w-3/6" />
          </div>

         <div className='m-6 lg:m-20'>
         <div class="grid grid-cols-4 gap-4  justify-between">
         {freelancers.length > 0 ?
  freelancers.map((freelancer, index) => (
    <div key={index} className="flex flex-col items-center">
      <div className="card w-auto bg-base-200 my-2 shadow-xl">
        <figure className="px-6 pt-6">
          <img 
            src={`${SERVER_URL}/uploads/${freelancer.profile}`} 
            alt="profile" 
            className="rounded-none object-cover" 
            style={{ height: '150px', width: '100%' }} 
          />
        </figure>
        <div className="card-body items-center text-center min-h-56">
          <h2 className="card-title">{freelancer?.username}</h2>
          <div className='flex flex-col'>
            <div className='m-3 text-sm'>
              <i className="fa-solid fa-briefcase me-2"></i> {freelancer.job}
            </div>
            <div className='m-3 text-sm'>
              <i className="fa-solid fa-location-dot me-2"></i> {freelancer.district}
            </div>
          </div>
          <div className="card-actions">
            <button className="btn btn-primary btn-sm" onClick={() => handleShowDetails(freelancer)}>Details</button>
          </div>
        </div>
      </div>
    </div>
  ))
  : <div className='text-center text-red-600 text-2xl lg:p-40'>No freelancers found</div>
}


           
           </div>
         </div>
         <ToastContainer position='top-center' autoClose={1800} theme='colored' />
        </div>
        <Footer/>
    </>
  )
}

export default ClientHome