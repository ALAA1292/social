import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from 'react-hook-form';
import { Auth } from "../../../Context/AuthContext";
import { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";


export default function Login() {

  const navigate = useNavigate()

  const { token, setToken, setUserData } = useContext(Auth)


  const { handleSubmit, register, formState } = useForm({ mode: "onBlur" });

  async function myhandleSubmit(data) {
    console.log(data)
    try {
      const { data: response, statusText } = await axios.post("https://linked-posts.routemisr.com/users/signin", data)
      console.log(response.token)
      localStorage.setItem("token", response.token)
      setToken(response.token)
      navigate("/posts")



    } catch (error) {
      toast.error("invalid email or password", { theme: "dark" });

      console.log(error)
    }

  }
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
        toast.success("you are logged in successfully", { theme: "dark" });
        setUserData(response.data.user);
        console.log("user data fetched successfully", response.data.user)
        localStorage.setItem("user", JSON.stringify(response.data.user));

      }
      else {
        throw new Error("Failed to fetch user data");
      }
    } catch (error) {

      console.log(error)

    }

  }
  useEffect(() => {
    console.log(localStorage.getItem("token"))
    if (token) {
      getUserData();
    }


  }, [token])


  return (
    <div className='bg-gray-950 h-screen flex justify-center items-center'>
      <form className="flex w-3xs flex-col gap-4" onSubmit={handleSubmit(myhandleSubmit)}>


        <div className="mb-2 block">
          <Label htmlFor="email">Your email</Label>
          <TextInput id="email" {...register("email", {
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            required: {
              value: true,
              message: "Please enter a valid email address (e.g., example@domain.com)."
            },

            validate: function (value) {
              if (value.includes("@")) {
                return true;
              }
              else {
                return "email not valid"
              }
            }
          })} type="email" placeholder="name@flowbite.com" required />
          {formState.errors.email && formState.touchedFields.email && <p className='text-red-400'>{formState.errors.email.message}</p>}
        </div>

        {/* pass */}
        <div className="mb-2 block">
          <Label htmlFor="password">Your password</Label>
          <TextInput id="password" {...register("password")} type="password" required />
        </div>


        <Button type="submit">Submit
          {formState.isSubmitting && <BeatLoader color="#dbd1d1" />}
        </Button>
      </form>
    </div>
  )
}
