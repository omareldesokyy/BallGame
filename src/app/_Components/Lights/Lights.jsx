import { useFrame } from '@react-three/fiber'
import React, { useRef } from 'react'

export default function Lights() {
    const dirLight =  useRef()

    useFrame((state)=>{
        dirLight.current.position.z = state.camera.position.z+1
        dirLight.current.target.position.z = state.camera.position.z
        dirLight.current.target.updateMatrixWorld()
    })

    return (
        <>
            <ambientLight intensity={.5} />
            <directionalLight
                ref={dirLight}
                castShadow
                position={[4, 4, 1]}
                intensity={3}
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={1}
                shadow-camera-far={10}
                shadow-camera-top={10}
                shadow-camera-right={10}
                shadow-camera-bottom={- 10}
                shadow-camera-left={- 10}
            />
        </>
    )
}
