import { Html, useProgress } from '@react-three/drei'
import React from 'react'

export default function LoadingScreen() {
    const {progress} = useProgress()
    // console.log(progress);

    return (
        <>
            <div className='z-10 w-screen h-screen absolute bg-black'>
                <div className={`origin-top-left scale-x-${progress} bg-white h-2 w-full absolute top-[50%] -translate-y-[50%]`}>

                </div>
                

                <div className={`origin-top-left font-bebas text-7xl  absolute top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%]`}>
                    {progress}%
                </div>
            </div>
        </>
    )
}
