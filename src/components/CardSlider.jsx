import React from 'react'
import { card } from '../constants/data'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CardSlider = () => {
    const settings ={
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll:1
        
    }
  return (
    <>
    <div className="w-3/4 m-auto">
    <div className="mt-20">
        <Slider {...settings}>
            {card.map((data, id) => (
                <div key={id} className='image-full bg-white h-[450px] w-[450px] text-black rounded-xl my-6'>
                    <div className='h-[70%]  rounded-lg bg-blue-950 flex justify-center items-center'>
                        <img src={data.img} alt="" className='h-full w-full rounded-xl object-cover' />
                    </div>
                    <div className='flex flex-col justify-center items-center gap-4 p-4'>
                        <h2 className='text-xl font-semibold'>{data.title}</h2>
                        <div className='flex '>
                        <p className='text-sm'>{data.desc}</p>
                        <button className="mx-2 rounded-xl  btn btn-outline">Get Service</button>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>  
    </div>
</div>

    </>
  )
}

export default CardSlider