import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FreelancerCard from '../../components/FreelancerCard';
import { getFreelancerStatusAPI, resubmitApprovalRequestAPI } from '../../services/allAPI';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FreelancerHome = () => {
  const [freelancerStatus, setFreelancerStatus] = useState("");

  useEffect(() => {
    const fetchFreelancerStatus = async () => {

      const token = sessionStorage.getItem('tokenfreelancer')
      // console.log('Token',token);

    if (!token) {
      console.error('No token found');
      return;
    }
    if(token){
      const reqHeader ={
        // 'Content-Type':preview?'multipart/form-data':"application/json",
        'Authorization':`Bearer ${token}`
      };
      // console.log(reqHeader);
      
      try {
        const response = await getFreelancerStatusAPI(reqHeader);
        // console.log('Response',response.data);
        setFreelancerStatus(response.data.status);
      } catch (err) {
        console.log('Error',err);
      }
    }
    };
    fetchFreelancerStatus();
  }, []);

  const handleResubmit = async () => {
    const token = sessionStorage.getItem('tokenfreelancer')
    console.log('token',token);
    if (!token) {
      console.error('No token found');
      return;
    }
    if(token){
      const reqHeader ={
        // 'Content-Type':preview?'multipart/form-data':"application/json",
        'Authorization':`Bearer ${token}`
      };
      const reqBody = {}
    try {
      const response = await resubmitApprovalRequestAPI(reqBody,reqHeader);
      console.log(response);
      toast.success('Approval request resubmitted');
      setFreelancerStatus('pending');
    } catch (err) {
      console.log(err);
      toast.error('Failed to resubmit approval request');
    }
  }
  };

  return (
    <>
      <Header />
      <div className='container mx-auto flex flex-row '>
        <FreelancerCard />
        <div className='card card-bordered bg-base-200 m-4 w-10/12'>
          <div className='container mx-auto font-semibold lg:my-14 text-center text-black text-5xl'>
            Connect. Learn. <span className='text-red-600'>Earn</span>
          </div>
          <div className="divider"></div>
          <div className='mx-auto lg:m-10 flex flex-row justify-evenly'>
            <div className='container text-center mx-auto flex flex-col lg:mx-30'>
              <div className='text-7xl font-bold text-black lg:m-6'>10</div>
              <div className='text-sm text-black'>Work Taken</div>
            </div>
            <div className='container text-center mx-auto flex flex-col lg:mx-30'>
              <div className='text-7xl font-bold text-black lg:m-6'>03</div>
              <div className='text-sm text-black'>Work Request</div>
            </div>
            <div className='container text-center mx-auto flex flex-col lg:mx-30'>
              <div className='text-7xl font-bold text-black lg:m-6'>4.5<span className='text-lg'>/5</span></div>
              <div className='text-sm text-black'>Rating</div>
            </div>
          </div>
          <div className="divider"></div>
          <div className='container text-center mx-auto flex flex-col lg:mx-30  p-6 rounded-lg shadow-lg'>
            <div className='text-3xl font-bold text-black lg:my-6'>
              Your Request has been
            </div>
            <div className={`flex justify-center align-middle text-white text-lg font-semibold py-2 px-4 rounded-lg ${freelancerStatus === 'approved' ? 'bg-green-600' : 'bg-red-600'}`}>
              {freelancerStatus.charAt(0).toUpperCase() + freelancerStatus.slice(1)}
            </div>
            {freelancerStatus === 'rejected' && (
              <button onClick={handleResubmit} className='btn bg-blue-500 text-white mt-4 py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300'>
                Resubmit Approval Request
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position='top-center' autoClose={1900} theme='colored' />
    </>
  );
};

export default FreelancerHome;
