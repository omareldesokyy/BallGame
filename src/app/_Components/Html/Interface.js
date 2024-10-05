import store from '@/lib/stores/store';
import { Text, useKeyboardControls } from '@react-three/drei'
import { addEffect, useFrame } from '@react-three/fiber';
import React, { useEffect, useRef } from 'react'
import Fireworks from 'react-canvas-confetti/dist/presets/fireworks';

export default function Interface() {
    const { forward, backward, left, right, jump } = useKeyboardControls((state) => { return state });
    const { restart, phase } = store((state) => { return state })
    const time = useRef()
    useEffect(() => {
        const timer = addEffect(() => {
            const state = store.getState()

            let elapsedTime = 0
            if (state.phase === 'playing') {
                elapsedTime = Date.now() - state.startTime
            }
            else if (state.phase === 'ended') {

                elapsedTime = state.endTime - state.startTime
            }

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if (time.current)
                time.current.textContent = elapsedTime
        }

        )

        return () => {
            timer()
        }


    }, [])

    return (
        <div>

            <div ref={time} className=' font-bebas text-7xl absolute text-white top-10  text-center uppercase bg-black bg-opacity-30 w-full'>
                0.00
            </div>
            {phase === 'ended' && <div className="text-7xl z-[5] cursor-pointer absolute text-white uppercase text-center top-56 bg-black bg-opacity-30 w-full font-bebas">
                <h1 onClick={() => { restart() }}>
                    Restart
                </h1>
            </div>}
            {phase === 'ended' && <Fireworks
                autorun={{ speed: 20, duration: 1000 }}
            />}
            <div className='absolute bottom-72 right-[50%] translate-x-[50%]'>

                <div className='flex flex-col justify-center items-center gap-3'>
                    <div className={`${forward && 'bg-opacity-70 '} w-14 h-14 border border-white bg-white shadow-inner bg-opacity-30`}></div>

                    <div className='flex gap-3'>
                        <div className={`${left && 'bg-opacity-70 '} w-14 h-14 border border-white bg-white shadow-inner bg-opacity-30`} ></div>
                        <div className={`${backward && 'bg-opacity-70 '} w-14 h-14 border border-white bg-white shadow-inner bg-opacity-30`}></div>
                        <div className={`${right && 'bg-opacity-70 '} w-14 h-14 border border-white bg-white shadow-inner bg-opacity-30`}></div>
                    </div>

                    <div className={`${jump && 'bg-opacity-70 '} w-48 h-14 border border-white bg-white shadow-inner bg-opacity-30`}></div>
                </div>
            </div>

        </div>
    )
}
