import React from 'react'
import PostHeader from './PostHeader'
import { useState } from 'react'
import { useRef } from 'react'
import profile from "../../assets/imgs/profile.png"
import { useMutation,useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form'
import { data } from 'react-router-dom'
export default function CommentCard({ CommentDetails }) {

const commentId = CommentDetails._id;
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit } = useForm();

async function editPost(data){
    console.log("data", data)
  return await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`,
    {
      content: data.content,
    },
     {
    headers: {
      token: localStorage.getItem("token"),
    }
  })
}
const queryClient = useQueryClient();

const{mutate:handleEditPost}=useMutation({
    mutationFn:editPost,
    onSuccess: () => {
    console.log("Post edited successfully");
    setIsEditing(false);
    queryClient.invalidateQueries(['getPosts']);

  },
  onError: (error) => {
    console.error("Error editing post:", error);
  }
})

    
    return (
        <div>
            {isEditing ? (
                <form onSubmit={handleSubmit(handleEditPost)}>
                <input type="text" className='bg-transparent border p-3 rounded-3xl border-white outline-none text-white w-full' 
                 defaultValue={CommentDetails.content} {...register("content")} />
                 <button type="submit" className='bg-blue-500 text-white p-2 rounded-xl mt-4 cursor-pointer'>Save</button>
                </form>
            ) : (
                <>
                    <PostHeader  postUserId={CommentDetails.commentCreator._id}
                     isPost={false} photo={CommentDetails.commentCreator.photo} 
                     name={CommentDetails.commentCreator.name}
                      createdAt={CommentDetails.createdAt}
                       commentId={CommentDetails._id}
                       setIsEditing={setIsEditing} />
                    <p className='text-white'>{CommentDetails.content}</p>
                </>
            )}

        </div>
    )
}

