import React from 'react'
import img from "../../assets/imgs/noposts.png"
// import profile from "../../assets/imgs/profile.png"
export default function NoPosts() {
  return (
    <div className='items-center flex-col justify-center gap-10 flex min-w-3xl mx-auto text-center text-2xl text-white font-bold'>
               <p className='text-4xl'>No posts found</p>

        <div className="w-3/4"><img src={img} alt="No posts found" /></div>

    </div>
  )
}
