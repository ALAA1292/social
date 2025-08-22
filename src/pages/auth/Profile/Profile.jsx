import React from 'react'
import PostsList from '../../../components/postsComp/PostsList';
export default function Profile() {





    return (
        <>
            <div className=" bg-gray-950 min-h-screen flex items-center justify-center flex-col gap-4">

                
                <PostsList isHome={false} />


            </div>

        </>
    )
}
