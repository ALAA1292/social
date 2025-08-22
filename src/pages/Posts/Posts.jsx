import React, { useContext } from 'react'
import { Auth } from '../../Context/AuthContext'
import { Button, Card } from "flowbite-react";
import post from "../../assets/imgs/profile.png"
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import PostsList from '../../components/postsComp/PostsList';
export default function Posts() {





  return (
    <>
      <div className=" bg-gray-950 min-h-screen flex items-center justify-center flex-col gap-4 ">
        <PostsList isHome={true} />


      </div>

    </>
  )
}
