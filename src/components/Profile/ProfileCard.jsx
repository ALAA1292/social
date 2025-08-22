import React from 'react'
import { Card, Dropdown, DropdownItem } from "flowbite-react";
import profile from "../../assets/imgs/profile.png"
import { Auth } from "../../Context/AuthContext";
import { useContext, useState, useRef, useEffect } from "react"
import { MdEdit } from "react-icons/md";
import { Button } from "flowbite-react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { MdCloudUpload } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Profile() {


  const navigate = useNavigate()

  const { UserData, setUserData, refreshUserData } = useContext(Auth)
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPass, setIsEditingPass] = useState(false);
  const fileInputRef = useRef(null);
  const fileInputRefPass = useRef(null);
  const fileInputRefNewPass = useRef(null);

  const [img, setImg] = useState(UserData.photo)
  const { handleSubmit, register, reset } = useForm()


  async function UpdateProfileImg(data) {

    const formData = new FormData();
    if (fileInputRef.current.files[0]) {
      formData.append("photo", fileInputRef.current.files[0])
      console.log(fileInputRef.current.files[0], "new image")
        await axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, formData, {
      headers: {
        token: localStorage.getItem("token")
      }
    });

    }
else{
  toast.error("Please select an image to upload", { theme: "dark" });
}
  
  }
  const queryClient = useQueryClient();

  const { mutate: handleUpdateProfileImg } = useMutation({
    mutationFn: UpdateProfileImg,
    onSuccess: () => {
      queryClient.invalidateQueries(['getPosts']);
      getUserData();
      setIsEditing(false);

    },
    onError: (error) => {
      console.error("Error editing post:", error);
    }
  })

  async function ChangePassword(data) {
    await axios.patch(`https://linked-posts.routemisr.com/users/change-password`, {
      password: fileInputRefPass.current.value,
      newPassword: fileInputRefNewPass.current.value
    }, {
      headers: {
        token: localStorage.getItem("token")
      }
    });

  }

  const { mutate: handleChangePassword } = useMutation({
    mutationFn: ChangePassword,
    onSuccess: (response) => {
      toast.success("Password changed successfully", { theme: "dark" });
      toast.success("you have to log in again", { theme: "dark" });

      setUserData(null);
      localStorage.removeItem("user");
      navigate("/login")
      localStorage.removeItem("token");
      setToken(null);
      setIsEditingPass(false);

    },
    onError: (error) => {
      console.error("Error changing password:", error);

      if (error.response?.status === 401) {
        toast.error(error.response?.data?.message || "Error changing password", { theme: "dark" });
        console.log("toaster");
      }
    }
  })






  async function getUserData() {
    try {
      const response = await axios.get("https://linked-posts.routemisr.com/users/profile-data",
        {
          headers: {
            token: localStorage.getItem("token")
          }
        }
      );
      console.log(response)
      console.log("user data fetched successfully")

      if (response.data.message === "success") {

        setUserData(response.data.user);
      }
      else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {
      console.log(error.response)
    }

  }





  return (
    <div>
      {UserData &&
       <Card className="min-w-full">

        <div className="flex flex-col items-center pb-5">
          <div className="img-card relative">
            {isEditing ? <>
              <form onSubmit={handleSubmit(handleUpdateProfileImg)}>
                <input type="file"  {...register("photo")} ref={fileInputRef} onChange={(e) => setImg(URL.createObjectURL(e.target.files[0]))} hidden />
                <div className="flex flex-col justify-center items-center">
                  <img
                    alt="Bonnie image"
                    height="96"
                    src={img}
                    width="96"
                    className="mb-3 rounded-full shadow-lg"
                  />
                  <div className="flex gap-2 ">
                    <Button className="p-1 rounded-5" type="submit">Upload</Button>

                    <Button className="p-2 rounded-5" onClick={() => setIsEditing(false)}>cancel</Button>
                    <MdCloudUpload className='text-white w-8 h-8  cursor-pointer' onClick={() => fileInputRef.current.click()} />

                  </div>
                </div>

              </form></> :
              <img
                alt="Bonnie image"
                height="96"
                src={UserData.photo}
                width="96"
                className="mb-3 rounded-full shadow-lg"
              />}
            {!isEditing && <MdEdit className="cursor-pointer text-white text-3xl absolute top-0 left-0" onClick={() => { setIsEditing(true) }} />}
          </div>

          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{UserData.name}</h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">{UserData.email}</span>
          <p className="text-sm text-gray-500 dark:text-gray-400">{UserData.dateOfBirth.split("T")[0]}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{UserData.gender}</p>

          <div className="mt-4 flex space-x-3 lg:mt-6">
            {isEditingPass ?
              <form onSubmit={handleSubmit(handleChangePassword)} >
                <div className="flex flex-col items-center">
                  <input type="password" {...register("oldPassword")} ref={fileInputRefPass} placeholder="Old Password" className="bg-transparent border p-3 rounded-xl border-white outline-none text-white mb-3   " />
                  <input type="password" {...register("newPassword")} ref={fileInputRefNewPass} placeholder=" New Password" className="bg-transparent border p-3 rounded-xl border-white outline-none text-white mb-3  " />
                  <div className="flex">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-2xl me-3 cursor-pointer">Update</button>
                    <button type="button" onClick={() => setIsEditingPass(false)} className="bg-blue-500 text-white p-2 rounded-2xl  cursor-pointer">cancel</button>

                  </div>
                </div>

              </form> :
              <button onClick={() => setIsEditingPass(true)} className="cursor-pointer inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
                Change password
              </button>
            }

          </div>
        </div>
      </Card>}
    </div >
  )
}
