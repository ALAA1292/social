import React from 'react';
import PostItem from '../postsComp/PostItem';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loaderpage  from "../postsComp/LoaderPage";    
export default function PostDetails() {

  const { id } = useParams();   // Get the post ID from the URL parameters




  function getPostDetails() {
    // Fetch post details using the post ID from the URL
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("token"),
      }
    })

  }

  const { data, isFetching, isLoading, isError, isFetched } = useQuery(
    {
      queryKey: ["getSinglePost", id],
      queryFn: getPostDetails,
    }
  )
  if (isLoading) {
    return <Loaderpage />
  }
  console.log("posatDetails", data.data.post)
  if (isError) {
    return <div className='bg-gray-950 text-white text-center d-flex items-center justify-center w-100 h-screen' >
      <h2>Page error</h2>
      <Link to='/' >Go to Home</Link>
    </div>
  }

  return (
    <div className='bg-gray-950  flex items-center justify-center min-h-screen text-white'>
      <div className="md:w-[60%] p-12 bg-gray-950 ">
        <PostItem post={data.data.post}  isInSinglePage={true}/>
       
      </div>
    </div>
  )
}

