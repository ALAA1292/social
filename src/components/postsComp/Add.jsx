import React from 'react'
import { Button, Card, Checkbox, Label, Textarea, TextInput } from "flowbite-react";
import { MdCloudUpload } from "react-icons/md";
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { is } from 'zod/v4/locales';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { BeatLoader } from "react-spinners";

export default function Add({ Post = undefined, isEditing = undefined, setIsEditing = undefined, PostId }) {


    const queryClient = useQueryClient();
    const fileInput = useRef();
    const [preview, setPreview] = useState(Post?.image);
    console.log("isEditing:", isEditing);

    const { handleSubmit, register, reset, formState } = useForm(
        {
            defaultValues: {
                body: Post?.body,
                image: Post?.image
            }
        }
    )


    //add post



    async function addPost(data) {
        console.log(data.body, fileInput.current.files[0])


        const formData = new FormData();
        if (data.body && fileInput.current.files[0]) {

            formData.append("body", data.body);
            formData.append("image", fileInput.current.files[0]);


            try {

                const { data: { message } } = await axios.post("https://linked-posts.routemisr.com/posts", formData, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                }

                )
                console.log(message);
                if (message === "success") {
                    reset();
                    toast.success("Post added successfully", { theme: "dark" });
                }
                else {
                    throw new Error("error");

                }
            } catch (error) {
                console.log(error)
            }
        }
        else {
            toast.error("Please make sure to select an image", { theme: "dark" });
        }
    }

    
    ///////////// for editing post

    async function editPost(data) {

        const formData = new FormData();
        formData.append("body", data.body);
        if (fileInput.current.files[0]) {
            formData.append("image", fileInput.current.files[0])
            console.log(fileInput.current.files[0], "new image")
        }

        await axios.put(`https://linked-posts.routemisr.com/posts/${PostId}`, formData, {
            headers: {
                token: localStorage.getItem("token")
            }
        });
    }

    const { mutate: handleEditPost } = useMutation({
        mutationFn: editPost,
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
        <div><Card className="">
            <form onSubmit={handleSubmit(isEditing ? handleEditPost : addPost)} className="flex flex-col gap-4">
                <div>
                    <div className="mb-2 block">
                        {isEditing ? <Label htmlFor="text">Edit your post</Label> : <Label htmlFor="text">post something</Label>}
                    </div>
                    <div className='flex items-center gap-4'>
                        {isEditing ? <Textarea row={5} {...register("body")} placeholder="What's on your mind?" required /> : <Textarea row={5} {...register("body")} placeholder="What's on your mind?" required />}
                        <input {...register("image")} type="file" ref={fileInput} onChange={() => {
                            {
                                setPreview(URL.createObjectURL(fileInput.current.files[0]));
                            }
                        }} hidden />

                        <MdCloudUpload className='text-white w-6 h-6 cursor-pointer' onClick={() => fileInput.current.click()} />
                    </div>

                    {isEditing && Post?.image && (
                        <img src={preview} alt="Old Post" className=" object-cover mt-2" />
                    )}
                </div>

                <Button type="submit">Submit {formState.isSubmitting && <BeatLoader color="#dbd1d1" />}</Button>
                {isEditing && <Button className='text-white' onClick={() => setIsEditing(false)}>cancel</Button>}
            </form>
        </Card></div>
    )
}
