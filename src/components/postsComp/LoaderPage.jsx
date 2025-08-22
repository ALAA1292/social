import React from 'react'
import {PuffLoader } from "react-spinners";

export default function Loaderpage() {
    console.log("loading...")
    
  return (
    <div className='flex justify-center items-center h-screen bg-gray-950 '><PuffLoader   color="#ffffff" /></div>
  )
}
