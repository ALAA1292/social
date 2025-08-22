import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { Radio } from "flowbite-react";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { toast } from 'react-toastify';
import BeatLoader from './../../../components/postsComp/LoaderPage';



const defaultValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  dateOfBirth: "",
  gender: ""

};


// schema ////////////////////////////////////////
const schema = z.object({
  name: z.string().nonempty({ message: "Name is required" })
    .min(3, { message: "min length is 3 " })
    .max(15, { message: "max length is 15 " }),

  email: z.email({ message: "invalid email" }),

  password: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "Password must 8 chars include 1 uppercase, 1 lowercase, 1 number and 1 special char"

    }),

  rePassword: z
    .string()
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: "must be equal to password"

    }),

  gender: z
    .enum(["male", "female"], { message: "must be selected" }),

dateOfBirth: z.coerce.date({
  invalid_type_error: "must be a valid date",
})

})
.refine((data) => data.password === data.rePassword, {
  path: ["rePassword"], 
  message: "Passwords must match",
})



// component function///////////////////////////////
export default function Register() {


  const navigate = useNavigate()  //for pragrammable navigation


  const { handleSubmit, register, formState: { errors },formState } = useForm({ defaultValues, resolver: zodResolver(schema) });

  async function myhandleSubmit(data) {      //submit function


    console.log(data)
    try {
      const { data: response, statusText } = await axios.post("https://linked-posts.routemisr.com/users/signup", data)

      toast.success("you are registered successfully", { theme: "dark" });

      navigate("/login")



    } catch (error) {
      toast.error(error.response.data.error, { theme: "dark" });

      console.log(error)
    }
  }

  return (
    <div className='bg-gray-950 py-10 flex justify-center items-center'>
      <form noValidate className="flex w-3xs flex-col gap-4" onSubmit={handleSubmit(myhandleSubmit)}>

        {/* name */}
        <div className="mb-2 block">
          <Label htmlFor="name">Your name</Label>
          <TextInput id="name" {...register("name")} type="text" placeholder="" required />
          {errors.name && <p className='text-red-400'>{errors.name?.message}</p>}
        </div>
        {/* email */}
        <div className="mb-2 block">
          <Label htmlFor="email">Your email</Label>
          <TextInput id="email" {...register("email")} type="email" placeholder="name@flowbite.com" required />
          {errors.email && <p className='text-red-400'>{errors.email?.message}</p>}

        </div>

        {/* pass */}
        <div className="mb-2 block">
          <Label htmlFor="password">Your password</Label>
          <TextInput id="password" {...register("password")} type="password" required />
          {errors.password && <p className='text-red-400'>{errors.password?.message}</p>}

        </div>

        {/* repass */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="rePassword"> re-type Your password</Label>
            <TextInput id="rePassword" {...register("rePassword")} type="password" placeholder="" required />
            {errors.rePassword && <p className='text-red-400'>{errors.rePassword?.message}</p>}

          </div>
        </div>

        {/* date */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dateOfBirth">Date of birth</Label>
          </div>
          <TextInput {...register("dateOfBirth")} id="dateOfBirth" type="date" placeholder="" required />
          {errors.dateOfBirth && <p className='text-red-400'>{errors.dateOfBirth?.message}</p>}

        </div>
        {/* remember */}



        <div className="flex items-center gap-2">
          <Radio {...register("gender")} id="female" name="gender" value="female" />
          <Label htmlFor="female">female</Label>

        </div>


        <div className="flex items-center gap-2">
          <Radio {...register("gender")} id="male" name="gender" value="male" />
          <Label htmlFor="male">male</Label>
        </div>
        {errors.gender && <p className='text-red-400'>{errors.gender?.message}</p>}

        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
