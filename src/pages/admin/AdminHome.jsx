import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { adminGetAllFreelancerAPI, approveFreelancerAPI, rejectFreelancerAPI } from '../../services/allAPI'

const AdminHome = () => {

  const [freelancers,setFreelancers] = useState([])
  //  console.log(freelancers);
    const viewFreelancers = async()=>{
    
      const token = sessionStorage.getItem('admintoken')
  
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
    
          const result = await adminGetAllFreelancerAPI(reqHeader);
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
    },[])

    const handleApprove = async (freelancerId)=>{
      const token = sessionStorage.getItem('admintoken')
    if (token) {
      const reqHeader = {
        'Authorization': `Bearer ${token}`
      };
      try {
        const response = await approveFreelancerAPI({ freelancerId }, reqHeader);
        if (response.status === 200) {
          setFreelancers(freelancers.filter(freelancer => 
            freelancer._id !== freelancerId  ));
        }
      } catch (err) {
        console.log(err);
      }
    }
    }


    const handleReject = async (freelancerId) => {
      const token = sessionStorage.getItem('admintoken')
      if (token) {
        const reqHeader = {
          'Authorization': `Bearer ${token}`
        };
        try {
          const response = await rejectFreelancerAPI({ freelancerId }, reqHeader);
          if (response.status === 200) {
            setFreelancers(freelancers.filter(freelancer => 
              freelancer._id !== freelancerId ));
          }
        } catch (err) {
          console.log(err);
        }
      }
    }


  return (
    <>
    <Header/>
    <div className="overflow-x-auto m-10 flex flex-col min-h-screen">
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th> 
        <th>Name</th> 
        <th>Service</th> 
        <th>Contact</th> 
        <th>location</th> 
        <th>Approve</th> 
        <th>Reject</th>
      </tr>
    </thead> 
    <tbody>
    {freelancers.length > 0 ?
              freelancers.map((freelancer, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{freelancer.username}</td>
                  <td>{freelancer.job}</td>
                  <td>{freelancer.contact}</td>
                  <td>{freelancer.district}</td>
                  <td>
                    <button className="btn text-white bg-green-700 btn-ghost btn-xs" onClick={()=> handleApprove(freelancer._id)}>Approve</button>
                  </td>
                  <td>
                    <button className="btn text-white bg-red-700 btn-ghost btn-xs" onClick={()=> handleReject(freelancer._id)}>Reject</button>
                  </td>
                </tr>
              )) :
              <tr>
                <td colSpan="7" className='text-center text-red-600 text-2xl lg:p-40'>No freelancers found</td>
              </tr>}
    </tbody>
  </table>
</div>
<Footer/>
    </>
  )
}

export default AdminHome