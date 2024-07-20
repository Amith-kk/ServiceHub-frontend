import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import FreelancerCard from '../../components/FreelancerCard'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFreelancerAPI, updateFreelancerAPI } from '../../services/allAPI';
import { SERVER_URL } from '../../services/server_url';


const FreelancerProfile = () => {
  
  const placeholderImage  = "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
  const [preview, setPreview]= useState(placeholderImage)
  const [fileStatus, setFileStatus] = useState(false)
  const [freelancerData,setFreelancerData]=useState({
    username:"",email:"",contact:"",district:"",wage:"",address:"",profile:"",job:""
})
// console.log(freelancerData.profile);
// console.log(preview);
const [tempData, setTempData] = useState({
  username:"",email:"",contact:"",district:"",wage:"",address:"",profile:"",job:""
})
// console.log(freelancerData);
// const token = sessionStorage.getItem('tokenfreelancer')
// console.log(token);

useEffect(() => {
  
  const getFreelancerData = async () => {
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

      // console.log(reqHeader);
      // console.log('Request Header:', reqHeader);

      const response = await getFreelancerAPI(reqHeader);
      // console.log(response);
      // console.log('API Response:', response);
      const {username,email,contact,district,wage,address,profile,job} =response.data
      setFreelancerData({username,email,contact,district,wage,address,profile,job})
      setTempData({username,email,contact,district,wage,address,profile,job})
      setPreview(profile ? `${SERVER_URL}/uploads/${profile}` : placeholderImage); 
       } catch(err){
      console.log(err);
    }
  }
} 
    getFreelancerData()
  

},[])

useEffect(() => {
  
    if (tempData.profile.type === "image/png" || tempData.profile.type === "image/jpg" || tempData.profile.type === "image/jpeg") {
      setPreview(URL.createObjectURL(tempData.profile));
      setFileStatus(false);
    } else {
      setFileStatus(true);
      setPreview(placeholderImage);
      setFreelancerData({ ...freelancerData, profile: "" });
    }
    // https://www.svgrepo.com/show/508699/landscape-placeholder.svg
}, [tempData.profile]);


const handleClose = ()=>{
  setTempData(freelancerData)
  setPreview(freelancerData.profile ? `${SERVER_URL}/uploads/${freelancerData.profile}` : placeholderImage);

}

  const handleUpdate = async()=>{
    const {username,email,contact,district,wage,address,job,profile}=tempData
    if(!username || !email || !contact || !district || !wage || !address || !job){
      toast.info("Please fill all the fields")
    }else{
      const token = sessionStorage.getItem('tokenfreelancer')
      if(token){
        const reqHeader ={
          'Authorization':`Bearer ${token}`
        };
        const formData = new FormData()
        formData.append('username', username)
        formData.append('email', email)
        formData.append('contact', contact)
        formData.append('district', district)
        formData.append('wage', wage)
        formData.append('address', address)
        formData.append('job', job)
        if (profile instanceof File) {
          formData.append('profile', profile);
          reqHeader['Content-Type'] = 'multipart/form-data';
        }
        try {
          const response = await updateFreelancerAPI(formData, reqHeader);
          toast.success('Profile updated successfully');
          const updatedProfile = profile instanceof File ? URL.createObjectURL(profile) : `${SERVER_URL}/uploads/${profile}`;
          setFreelancerData({ ...tempData, profile: updatedProfile });
          setPreview(updatedProfile);
        } catch (err) {
          console.log(err);
          toast.error('Failed to update profile');
        }
  
    }
  }
  }
  


  return (
    <>

      {/* Open the modal using document.getElementById('ID').showModal() method */}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
     
  <div className='border  flex flex-col text-center items-center'>
    <div className="flex flex-col gap-2 w-full">
    <label>
     <input type="file" style={{display:'none'}} onChange={e=>setTempData({...tempData,profile:e.target.files[0]})}/>
     <img className='w-full mt-1 h-40' src={`${SERVER_URL}/uploads/${freelancerData.profile}`} alt="" />
     </label>
     {fileStatus&& <div className="mt-2 text-red-600">Please upload following formats [jpeg/png/jpg] only...</div>}
        {/* <input type="file" placeholder="Profile" className="input input-bordered w-full m-2 rounded-md flex-grow file-input file-input-ghost" /> */}
        <input type="text" value={tempData.username} onChange={e=>setTempData({...tempData,username:e.target.value})} placeholder="Username" className="input input-bordered w-full m-2 rounded-md" />
        <input type="email" value={tempData.email} onChange={e=>setTempData({...tempData,email:e.target.value})} placeholder="Email" className="input input-bordered w-full m-2 rounded-md flex-grow" />
        <input type="text" value={tempData.wage} onChange={e=>setTempData({...tempData,wage:e.target.value})} placeholder="Wage/Hour" className="input input-bordered w-full m-2 rounded-md flex-grow" />
        <input type="text" value={tempData.contact} onChange={e=>setTempData({...tempData,contact:e.target.value})} placeholder="Phone number" className="input input-bordered w-full m-2 rounded-md flex-grow" />
        <input type="text" value={tempData.address} onChange={e=>setTempData({...tempData,address:e.target.value})} placeholder="Address" className="input input-bordered w-full m-2 rounded-md flex-grow" />

    </div>
        <div className="grid gap-3 grid-cols-2 w-full">
        <select onChange={e=>setTempData({...tempData,job:e.target.value})} value={tempData.job} className="select max-w-xs input input-bordered w-full m-2 rounded-md">
        <option disabled defaultValue value="">Select your Job</option>
        <option value="Designing">Designing</option>
        <option value="Electrician">Electrician Services</option>
        <option value="Plumbing">Plumbing Services</option>
        <option value="Web Development">Web Development</option>
        <option value="Home Cleaning">Home Cleaning</option>
        <option value="Painting">Painting Services</option>
        <option value="Catering">Catering Services</option>
        <option value="Tutoring">Tutoring Services</option>

        </select>
        <select onChange={e=>setTempData({...tempData,district:e.target.value})} value={tempData.district} className="select max-w-xs input input-bordered w-full m-2 rounded-md">
        <option defaultValue value="" disabled>Select your district</option>
        <option value="palakkad">Palakkad</option>
        <option value="malappuram">Malappuram</option>
        <option value="kozhikode">Kozhikode</option>
        <option value="kannur">Kannur</option>
        <option value="wayanad">Wayanad</option>
        <option value="ernakulam">Ernakulam</option>

        </select>
    </div>
    </div>
    <div className="modal-action">
      <form method="dialog">
        <button onClick={handleUpdate} className='btn mx-2'>Update</button>
        {/* if there is a button in form, it will close the modal */}
        <button className="btn" onClick={handleClose}>Close</button>
      </form>
    </div>
  </div>
</dialog>
        <Header/>
        <div className='container mx-auto flex flex-row '>
            <FreelancerCard/>
            <div className='card card-bordered bg-base-200 m-4 w-10/12 '>
              <div className=' m-5 lg:my-8 text-right'>
              <button className="btn mx-3 bg-base-300 btn-ghost btn-sm" onClick={()=>document.getElementById('my_modal_5').showModal()}>Edit Profile</button>
              {/* <button className="btn  btn-ghost bg-base-300 btn-sm">Upload CV</button>  */}
              </div>
                <div className='flex w-full flex-row'>
                <div className=' w-5/12 m-3 flex flex-col items-center'>
                  <label>
                  <img className='w-44 rounded-full' src={preview? preview: placeholderImage} alt="" />
                  </label>
                 <div>
                 <div className='text-center m-8 '>
                 <div className="font-bold   ">{freelancerData.username}</div>
                 <div className=" text-sm mt-2">{freelancerData.job  }</div>
                 </div>

                 </div>
                </div>
                <div className=' w-7/12  m-3  mt-10 flex flex-col justify-center items-center'>
                <div className='text-base my-2'><span className='font-bold '>Email : </span>{freelancerData.email}</div>
                  <div className='text-base my-2'><span className='font-bold '>Contact : </span>{freelancerData.contact}</div>
                  <div className='text-base my-2 flex flex-row'><span className='font-bold '>Wage/Hour  ₹: </span>{freelancerData.wage? freelancerData.wage : <div className='text-sm m-1 text-red-500 '>Please fill the missing field</div>}</div>
                  <div className='text-base my-2'><span className='font-bold '>Location : </span>{freelancerData.district}</div>
                  <div className='text-base my-2 flex flex-row'><span className='font-bold '>Address : </span>{freelancerData.address? freelancerData.address: <div className='text-sm m-1 text-red-500 '>Please fill the missing field</div>} </div>
                </div>
                </div>
            </div>
            <ToastContainer position='top-center' autoClose={1900} theme='colored' /> 
        </div>
    <Footer/>
    </>
  )
}

export default FreelancerProfile