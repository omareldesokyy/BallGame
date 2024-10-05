'use client'
import { Html, KeyboardControls, Loader, OrbitControls, Sky, Sparkles, Text, useProgress } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import Lights from './_Components/Lights/Lights';
import Level from "./_Components/Level/Level";
import Ball from "./_Components/Ball/Ball";
import store from "@/lib/stores/store";
import { Suspense, useEffect, useState } from "react";
import Interface from "./_Components/Html/Interface";
<<<<<<< HEAD
import { useControls } from "leva";
=======
import { Leva, useControls } from "leva";
>>>>>>> 9fcb2c7 (edit commit)
import LoadingScreen from "./_Components/LoadingScreen/LoadingScreen";





export default function Home() {


<<<<<<< HEAD
  let { blocksCount, phase } = store((state) => { return state })

  const {progress} = useProgress()
=======
  let { blocksCount, phase, blocks } = store((state) => { return state })

  const controls = useControls('level', { 'numberOfTraps': { min: 3, max: 10, value: 5, step: 1 } })
  controls.collapsed = true

  blocksCount = controls.numberOfTraps

  // useEffect(()=>{

  //   if(controls.numberOfTraps){

  //     blocks(controls.numberOfTraps)

  //   }
  // },[blocksCount])

  const { progress } = useProgress()
>>>>>>> 9fcb2c7 (edit commit)
  return (
    <KeyboardControls
      map={[
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
      ]}
    >

<<<<<<< HEAD
      <Canvas
        shadows
        style={{ position: "fixed" }}
      >
        <Suspense fallback={null}>
=======

      <Suspense fallback={null}>

        <Canvas
          shadows
          style={{ position: "fixed" }}
        >
>>>>>>> 9fcb2c7 (edit commit)
          <Lights />

          <Sky />


<<<<<<< HEAD
          <Physics>
=======
          <Physics debug>
>>>>>>> 9fcb2c7 (edit commit)
            <Level count={blocksCount} />
            <Ball />
          </Physics>

          {phase === 'ready' && <Text scale={.5} font="./BebasNeue-Regular.ttf" position={[1, 1, 0]} rotation-x={-Math.PI * .1} maxWidth={1} textAlign="center">
            Ball Game
          </Text>}

<<<<<<< HEAD
        </Suspense>

      </Canvas>
      {progress === 100 ? null : <LoadingScreen />}

=======

        </Canvas>
      </Suspense>
      {progress === 100 ? null : <LoadingScreen />}

      <Leva collapsed />

>>>>>>> 9fcb2c7 (edit commit)
      <Interface />

    </KeyboardControls>
  )
};