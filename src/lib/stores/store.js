<<<<<<< HEAD
=======
import { numberOfTraps } from "@/app/page";
import { useControls } from "leva";
>>>>>>> 9fcb2c7 (edit commit)
import { create } from "zustand";
import { subscribeWithSelector } from 'zustand/middleware'


export default create(subscribeWithSelector((set)=>{
<<<<<<< HEAD
    return {
        blocksCount:10,
=======

    return {
        blocksCount:5,
>>>>>>> 9fcb2c7 (edit commit)
        
        //Phases

        phase:'ready',
        seed:0,
        startTime: 0,
        endTime: 0,

        start:()=>{
            set((state)=>{
                if(state.phase === 'ready'){

                    return {phase:'playing', startTime:Date.now()}
                }

                return{}
            })
        },
        restart:()=>{
            set((state)=>{

                if(state.phase === 'playing' || state.phase === 'ended'){

                    return {phase:'ready',seed : Math.random()}
                }
                return {}
            })
        },
        end:()=>{
            set((state)=>{
                if(state.phase === 'playing'){
                    return {phase:'ended', endTime:Date.now()}
                }
                return {}
            })
<<<<<<< HEAD
=======
        },
        blocks:(number)=>{
            set((state)=>{
                return {blocksCount:number}
            })
>>>>>>> 9fcb2c7 (edit commit)
        }

    }
}))