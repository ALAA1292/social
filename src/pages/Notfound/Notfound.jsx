import React from 'react'
import { BsBalloonHeart } from "react-icons/bs";

export default function Notfound() {
  return (
    <div className='flex flex-col gap-4 items-center justify-center h-screen bg-gray-950'>
    <div className='flex'>
    <BsBalloonHeart className="text-white text-[100px]" /> 
   <span className="self-center whitespace-nowrap text-[50px] font-semibold dark:text-white">Gatherly</span>
   </div>  
          <h1 className='text-3xl font-bold text-white mt-8'>...Oops Notfound</h1>
 
    
    </div>
  )
}
