import React from 'react'
import PostItem from './PostItem'
import Add from './Add'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Loaderpage from './LoaderPage';
import { useQuery } from '@tanstack/react-query';
import { useContext } from "react"
import { Auth } from "../../Context/AuthContext";
import Profilecard from '../../components/Profile/ProfileCard';
import NoPosts from '../NoPosts/NoPosts';
import { Link } from 'react-router-dom';

export default function PostsList({isHome})
 {
  const { UserData, setUserData } = useContext(Auth)


let token=localStorage.getItem("token")
let api;
if(isHome){
  api="https://linked-posts.routemisr.com/posts?limit=50"
}
else{
  api=`https://linked-posts.routemisr.com/users/${UserData._id}/posts?limit=5`

}

function getPosts() {
  return axios.get(api, {
    headers: {
      token,
    },
  });
}
const {data,isFetching,isLoading,isError,error}=useQuery(
  {
    queryKey:["getPosts"],
    queryFn:getPosts,
    
    onSuccess: (data) => {
      console.log("Posts fetched successfully", data);
    },
     onError: (error) => {
      console.error("Error fetching posts", error);
    },
  
  },
  
   
);


if(isLoading){
  return <Loaderpage />
}

if(isError)
{
  return <>
  <h2>Page error</h2>
  <Link to='/' >Go to Home</Link>
  </>
}

    return (
        <div>
            <section className='py-12 max-w-[90%] mx-auto'>
                <div className="max-w-3xl mx-auto flex flex-col gap-5" >
                    <Add />
                   {!isHome &&<Profilecard />}  
                    {data.data.posts && data.data.posts.map(
                        (post)=><PostItem key={post._id} post={post} isInSinglePage={false} />
                    )}
                    {data.data.posts.length === 0 && <NoPosts />}

                </div>
            </section>
          
        </div>
    )
}
