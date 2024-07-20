import { commonAPI } from "./commonAPI"
import { SERVER_URL } from "./server_url"

// admin login

export const adminLoginAPI = async(admin)=>{
    return await commonAPI('POST',`${SERVER_URL}/adminlogin`,admin,"")
}

// get allFreelancer for admin

export const adminGetAllFreelancerAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/adminhome`,"",reqHeader)
}

// admin approve freelancer

export const approveFreelancerAPI = async(data, reqHeader)=>{
    return await commonAPI('PATCH',`${SERVER_URL}/adminhome/approve`,data,reqHeader)
}

// admin reject freelancer

export const rejectFreelancerAPI = async(data, reqHeader)=>{
    return await commonAPI('PATCH',`${SERVER_URL}/adminhome/reject`,data,reqHeader)
}

// client register
export const registerAPI = async(users)=>{
    return await commonAPI('POST',`${SERVER_URL}/clientregister`,users,"")
}

// client login

export const loginAPI = async(user)=>{
    return await commonAPI('POST',`${SERVER_URL}/clientlogin`,user,"")
}

// get client 

export const getClient = async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/clientprofile`,"",reqHeader)
}

// update client

export const updateClientAPI = async(reqBody,reqHeader)=>{
    return await commonAPI('PUT',`${SERVER_URL}/clientprofile/profile`,reqBody,reqHeader)
}

// get allFreelancer 

export const getAllFreelancerAPI = async(searchKey,reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/clienthome?search=${searchKey}`,"",reqHeader)
}

// get allBooking 

export const getAllBookingAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/clientprofile/booking`,"",reqHeader)
}
 

// deleteProjectApi

export const deleteBookingAPI = async(id,reqHeader)=>{
    return await commonAPI('DELETE',`${SERVER_URL}/clientprofile/remove/${id}`,{},reqHeader)
}

// freelancer register
export const freelancerRegisterAPI = async(freelancers)=>{
    return await commonAPI('POST',`${SERVER_URL}/freelancerregister`,freelancers,"")
}

// freelancer login 

export const freelancerLoginAPI = async(freelancers)=>{
    return await commonAPI('POST',`${SERVER_URL}/freelancerlogin`,freelancers,"")
}

// get freelancer

export const getFreelancerAPI = async(reqHeader) =>{
    return await commonAPI('GET',`${SERVER_URL}/freelancerprofile`,"",reqHeader)

}

// update freelancer

export const updateFreelancerAPI = async(reqHeader,reqBody) =>{
    return await commonAPI('PATCH',`${SERVER_URL}/freelancerprofile`,reqHeader,reqBody)

}

// freelancer get status
export const getFreelancerStatusAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/freelancerhome`,"",reqHeader)
}

// resubmit status

export const resubmitApprovalRequestAPI = async(reqBody,reqHeader) =>{
    return await commonAPI('PUT',`${SERVER_URL}/freelancerhome/resubmit`,reqBody,reqHeader)

}

// create new booking

export const createBookingAPI = async (data, reqHeader) => {
    return await commonAPI('POST', `${SERVER_URL}/clienthome/booking`,data,reqHeader)
}

// get all pending req for freelancer

export const getAllBookingRequestAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/freelancerrequest/request`,"",reqHeader)
}

// freelancer approve booking

export const approveBookingAPI = async(data, reqHeader)=>{
    return await commonAPI('PATCH',`${SERVER_URL}/freelancerrequest/approve`,data,reqHeader)
}

// freelancer reject booking

export const rejectBookingAPI = async(data, reqHeader)=>{
    return await commonAPI('PATCH',`${SERVER_URL}/freelancerrequest/reject`,data,reqHeader)
}

// get all approved req for freelancer

export const getAllApprovedRequestAPI = async(reqHeader)=>{
    return await commonAPI('GET',`${SERVER_URL}/freelancerbooking`,"",reqHeader)
}