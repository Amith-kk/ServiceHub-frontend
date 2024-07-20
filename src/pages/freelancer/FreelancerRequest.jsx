import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import FreelancerCard from '../../components/FreelancerCard'
import Footer from '../../components/Footer'
import { approveBookingAPI, getAllBookingRequestAPI, rejectBookingAPI } from '../../services/allAPI'

const FreelancerRequest = () => {

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
  
        const result = await getAllBookingRequestAPI(reqHeader);
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

  const handleApprove = async (bookingId)=>{
    const token = sessionStorage.getItem('tokenfreelancer')
  if (token) {
    const reqHeader = {
      'Authorization': `Bearer ${token}`
    };
    try {
      const response = await approveBookingAPI({ bookingId }, reqHeader);
      if (response.status === 200) {
        setBooking(booking.filter(item => 
          item._id !== bookingId  ));
      }
    } catch (err) {
      console.log(err);
    }
  }
  }


  const handleReject = async (bookingId)=>{
    const token = sessionStorage.getItem('tokenfreelancer')
  if (token) {
    const reqHeader = {
      'Authorization': `Bearer ${token}`
    };
    try {
      const response = await rejectBookingAPI({ bookingId }, reqHeader);
      if (response.status === 200) {
        setBooking(booking.filter(item => 
          item._id !== bookingId  ));
      }
    } catch (err) {
      console.log(err);
    }
  }
  }

  return (
    <>
      <Header />
      <div className='container mx-auto flex flex-row '>
        <FreelancerCard />
        <div className='card card-bordered bg-base-200 m-4 w-10/12'>
          <div className="overflow-x-auto sm:m-3 lg:m-8">
            {
              booking.length > 0 ? (
                <table className="table">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>CONTACT</th>
                      <th>PLACE</th>
                      <th>Date</th>
                      <th>APPROVE</th>
                      <th>REJECT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <div className='flex items-center gap-3'>
                            <div>
                              <div className='font-bold'>{item.userDetails.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className=''>{item.userDetails.contact}</div>
                        </td>
                        <td>
                          <div className=''>{item.userDetails.district}</div>
                        </td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button className='btn text-white bg-green-700 btn-ghost btn-sm' onClick={() => handleApprove(item._id)}>approve</button>
                        </td>
                        <td>
                          <button className='btn text-white bg-red-700 btn-ghost btn-sm' onClick={() => handleReject(item._id)}>reject</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
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
      <Footer />
    </>
  )
}

export default FreelancerRequest