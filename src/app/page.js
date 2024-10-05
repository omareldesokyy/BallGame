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
import { Leva, useControls } from "leva";
import LoadingScreen from "./_Components/LoadingScreen/LoadingScreen";


export default function Home() {


  let { blocksCount, phase, blocks } = store((state) => { return state })

  const controls = useControls('level', { 'numberOfTraps': { min: 3, max: 10, value: 5, step: 1 } })

  blocksCount = controls.numberOfTraps
  const { progress } = useProgress()
  
  // useEffect(()=>{

  //   if(controls.numberOfTraps){

  //     blocks(controls.numberOfTraps)

  //   }
  // },[blocksCount])

  return     <KeyboardControls
  map={[
    { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
    { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
    { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
    { name: 'right', keys: ['ArrowRight', 'KeyD'] },
    { name: 'jump', keys: ['Space'] },
  ]}
>

  <Canvas
    shadows
    style={{ position: "fixed" }}
  >

  <Suspense fallback={null}>

      <Lights />

      <Sky />

      <Physics debug>
        <Level count={blocksCount} />
        <Ball />
      </Physics>

      {phase === 'ready' && <Text scale={.5} font="./BebasNeue-Regular.ttf" position={[1, 1, 0]} rotation-x={-Math.PI * .1} maxWidth={1} textAlign="center">
        Ball Game
      </Text>}

    </Suspense>

  </Canvas>
  {progress === 100 ? null : <LoadingScreen />}

  <Leva collapsed />

  <Interface />

</KeyboardControls>

}