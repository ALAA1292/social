import React, { useRef, useState } from 'react'
import { Button, Card } from "flowbite-react";
import profile from "../../assets/imgs/profile.png"
import PostHeader from './PostHeader';
import { FaComment } from "react-icons/fa";
import { AiFillLike } from "react-icons/ai";
import { IoIosShareAlt } from "react-icons/io";
import CommentCard from './CommentCard';
import { Link } from 'react-router-dom';
import { IoSend } from "react-icons/io5";
import Add from './Add';

import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';




export default function PostItem({ post, isInSinglePage }) {
    const [isEditing, setIsEditing] = useState(false);
    const comments = post.comments;
    const FirstComment = post.comments?.[0]
    const user = post.user;
    console.log(FirstComment)
    console.log(post)
    const postUserId = user._id;
    console.log("postUserId", postUserId)
    const commentRef = useRef(null);
    const reversedComments = structuredClone(comments).reverse();
   

    async function AddComment() {
        const comment = commentRef.current.value;

        return await axios.post("https://linked-posts.routemisr.com/comments", {
            content: comment,
            post: post.id
        }, {
            headers: {
                token: localStorage.getItem("token"),
            }
        })
    }
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: AddComment,
        onSuccess: (data) => {
            console.log("Comment added successfully", data);
            queryClient.invalidateQueries(['getPosts']);

        },
        onError: (error) => {
            console.log("Error adding comment", error);
        },
        onSettled: () => {
            commentRef.current.value = "";
        }
    });


    return (
        <div> 
            {isEditing?<Add isEditing={isEditing} setIsEditing={setIsEditing}  Post={post} PostId={post._id } />:
             <Card className=''>

            <PostHeader isPost={true} photo={user.photo} 
            name={user.name} createdAt={post.createdAt} 
            PostId={post._id} postUserId={postUserId}
            setIsEditing={setIsEditing} />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {post.body}
            </h5>
            <div className='w-[90%] mx-auto'>
                <img src={post.image ? post.image : profile} alt="Post Image" />
            </div>
            <footer className='flex justify-between items-center text-white text-2xl'>
                <AiFillLike className='cursor-pointer' />
                <FaComment className='cursor-pointer' />
                <IoIosShareAlt className='cursor-pointer' />



            </footer>

            <div className="w-full">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">

                    </div>
                    <input ref={commentRef} type="text" id="default-search" className="block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 " placeholder="Write a comment..." />
                    <button type="submit" onClick={mutate} className="text-white absolute end-2.5 bottom-2.5   focus:outline-none  font-medium  text-lg px-4 py-2 cursor-pointer"><IoSend /></button>
                </div>
            </div>
            {!isInSinglePage && <Link to={`/PostDetails/${post.id}`} className='text-white text-bold text-center cursor-pointer'>view more comments...</Link>}
            {!isInSinglePage && FirstComment && <CommentCard CommentDetails={FirstComment} />}
            {isInSinglePage && comments.length > 0 && reversedComments.map((comment, index) => (
                <CommentCard key={index} CommentDetails={comment} postUserId={postUserId} />
            ))}
            </Card>}
           
        </div>
    )
}
