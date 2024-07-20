import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import FreelancerCard from '../../components/FreelancerCard'
import Footer from '../../components/Footer'
import { getAllApprovedRequestAPI } from '../../services/allAPI'

const FreelancerBooking = () => {

  const [booking, setBooking]= useState([])

  // console.log(booking);
  const viewBooking = async()=>{
    
    const token = sessionStorage.getItem('tokenfreelancer')

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
  
        const result = await getAllApprovedRequestAPI(reqHeader);
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

  return (
    <>
        <Header/>
        <div className='container mx-auto flex flex-row '>
            <FreelancerCard/>
            <div className='card card-bordered bg-base-200 m-4 w-10/12   '>
            <div className="overflow-x-auto sm:m-3 lg:m-8">
            {
              booking.length > 0 ? (
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        
        <th>NAME</th>
        <th>PLACE</th>
        <th>DATE</th>
        <th>CONTACT</th>
      </tr>
    </thead>
    <tbody>
    { booking.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className='flex items-center gap-3'>
                        
                        <div>
                          <div className='font-bold'>{item.userDetails.name}</div>
                          
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className=''>{item.userDetails.district}</div>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className=''>{item.userDetails.contact}</div>
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
        </div>
    <Footer/>
    </>
  )
}

export default FreelancerBooking