import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CardSlider from '../components/CardSlider'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <Header/>
    <div className="container">
        <h1 className='text-center lg:m-40  lg:text-5xl sm:text-2xl font-bold text-black'>Find <span className='font-bold text-red-600'>trusted workers</span> for your tasks, or showcase your expertise as a freelancer</h1>
        <div className='flex justify-between sm:flex-col md:flex-row lg:m-40'>
            <h1 className='font-bold '>
    Service Hub is a dynamic platform connecting clients with skilled freelancers. We offer a seamless experience for task completion, empowering users to find or offer services efficiently and effectively. Join us today!</h1>
    
        <div className='flex lg:mx-40 mt-5'>
        <button className="mx-5 rounded-xl btn btn-active btn-neutral hover:bg-white hover:text-black"><Link to={'/clientregister'}>FIND WORKERS</Link></button>
        <button className="rounded-xl btn btn-outline"><Link to={'/freelancerregister'}>FIND WORK</Link></button>
        </div>
        </div>
        <section>
            <h1 className='lg:text-3xl sm:text-xl lg:my-16 text-center font-bold text-black'>Popular Services</h1>
            <div className='bg-blue-950'>
            <CardSlider/>
            </div>
            
        </section>
        <div className="about-us-section lg:m-40">
    <h2 className='text-3xl lg:my-16 text-center font-bold text-black '>About Us</h2>
    <div className='font-bold m-12 text-justify'>
        <p>
        Welcome to ServiceHub, your go-to platform for all your home service needs! At ServiceHub, we understand the importance of a well-maintained home, and we've created a seamless solution to connect users with skilled professionals for a range of services, including painting, carpentry, plumbing, and more. Our user-friendly interface allows you to easily book or schedule appointments for the services you require, ensuring a hassle-free experience. What sets ServiceHub apart is our commitment to quality and reliability. We empower skilled workers to showcase their expertise by creating comprehensive work profiles, making it easier for users to find the perfect match for their needs. As a worker on ServiceHub, you can showcase your skills, experience, and previous projects, and effortlessly receive job requests from users seeking your expertise. Join our community and experience the convenience of ServiceHub – where homeowners find reliable professionals, and skilled workers find rewarding opportunities. Your home deserves the best, and ServiceHub is here to deliver it.
        </p>
        
    </div>

    <div className='flex sm:flex-col md:flex-row'>
    <div className="mission-section lg:m-12">
        <h3 className='text-xl font-bold text-center lg:my-8'>Our Mission</h3>
        <p className='font-bold text center'>At ServiceHub, our mission is to provide exceptional service solutions that exceed our clients' expectations. We are committed to delivering high-quality services with integrity, professionalism, and innovation.</p>
    </div>

    {/* <div className="history-section">
        <h3>Company History</h3>
        <p>Founded in [year], [Your Company Name] has quickly emerged as a leader in the [industry/service] industry. Over the years, we have proudly served countless clients, building long-lasting relationships based on trust and reliability.</p>
    </div> */}

    <div className="team-section bg-blue-950 text-white m-12 rounded-lg">
        <h3 className='text-xl font-bold text-center my-8'>Meet Our Team</h3>
        <p className='font-bold m-6'>Behind every success story is a dedicated team of professionals. Meet the faces behind ServiceHub, a diverse group of experts with a passion for excellence. Together, we bring a wealth of experience and expertise to every project we undertake.</p>
        <ul className='text-center my-6'>
            <li><span className='font-bold text-red-600 text-xl'>John Doe</span> - Founder & CEO</li>
            <li><span className='font-bold text-red-600 text-xl'>Jane Smith</span> - Head of Operations</li>
            <li><span className='font-bold text-red-600 text-xl'>David Johnson</span>- Chief Technology Officer</li>
            <li><span className='font-bold text-red-600 text-xl'>Emily Williams</span> - Creative Director</li>
        </ul>
    </div>
    </div>


    
    

    <div className="contact-section text-center font-bold m-12">
        {/* <h3>Contact Us</h3> */}
        <p>Ready to take your service to the next level? Contact us today to discuss how we can help you achieve your goals.</p>
        <p>Email: info@yourcompany.com</p>
        <p>Phone: <span className='text-blue-950'>123-456-7890</span></p>
        {/* <p>Follow us on [Social Media Links]</p> */}
    </div>
</div>

    </div>
    <Footer/>
    </>
  )
}

export default Home