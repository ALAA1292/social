import React, { useContext } from 'react'
import profile from "../../assets/imgs/profile.png"
import { Dropdown, DropdownItem } from "flowbite-react";
import { useMutation,useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import { Auth } from "../../Context/AuthContext";

export default function PostHeader({ photo, name, createdAt,isPost,PostId,commentId,postUserId ,setIsEditing}) {
const{UserData}=useContext(Auth)

const{mutate:handleDeletePost}=useMutation({
  mutationFn:deletePost,
    onSuccess: () => {
    console.log("Post deleted successfully");
    queryClient.invalidateQueries(['getPosts']);

  },
  onError: (error) => {
    console.error("Error deleting post:", error);
  }
})
let api;
if(isPost){
  api=`https://linked-posts.routemisr.com/posts/${PostId}`
}
else{
  api=`https://linked-posts.routemisr.com/comments/${commentId}`
}

async function deletePost(){
  return await axios.delete(api, {
    headers: {
      token: localStorage.getItem("token"),
    }
  })
  
}
console.log("postUserId", postUserId);
console.log("PostId", PostId); 

const queryClient = useQueryClient();

  
  return (

    <div>
      <header className='flex items-center'>
        <div className='w-8'>
          <img onError={(e) => { e.target.src = profile }} src={photo} alt={name} />
        </div>
        <div className="content text-white ms-3">
          <p>{name}</p>
          <span>{createdAt.split("T")[0]}</span>
        </div>
        <div className='ms-auto text-white '>
      {UserData?._id===postUserId &&  <Dropdown inline label="" >
         
            <DropdownItem onClick={() => {setIsEditing(true)}
            
            } >
          Edit
            </DropdownItem>

            <DropdownItem onClick={handleDeletePost}>
            Delete
            </DropdownItem>
          </Dropdown>}
        </div>


      </header>
    </div>
  )
}
