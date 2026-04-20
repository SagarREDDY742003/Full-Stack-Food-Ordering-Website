import React from 'react'

const CarouselItem = ({image,title}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <img className='w-[3rem] h-[3rem] sm:w-[4rem] sm:h-[4rem] md:w-[6rem] md:h-[6rem] lg:h-[10rem] lg:w-[10rem] rounded-full object-cover object-center' src={image} alt="" />
        <span className='py-4 font-semibold lg:text-xl text-gray-400'>{title}</span>
    </div>
  )
}

export default CarouselItem
