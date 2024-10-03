import store from '@/lib/stores/store';
import { useAnimations, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'


const box = new THREE.BoxGeometry(1, 1, 1);
const floorStartEndMaterial = new THREE.MeshStandardMaterial({ color: 'green' })
const floorremainingMaterial = new THREE.MeshStandardMaterial({ color: 'greenyellow' })
const wallMaterial = new THREE.MeshStandardMaterial({ color: 'orange' })


const obstacleMaterial = new THREE.MeshStandardMaterial({ color: 'orangered' })


function StartBlock({ position }) {

    return <group position={position}>
        <mesh
            scale={[4, .2, 4]}
            position={[0, -.2, 0]}
            geometry={box}
            material={floorStartEndMaterial}
            receiveShadow
        />
    </group>
}

function SpinnerBlock({ position }) {

    const spinner = useRef()
    const [speed] = useState((Math.random() + .4) * (Math.random() < .5 ? -1 : 1));

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const rotation = new THREE.Quaternion();
        rotation.setFromEuler(new THREE.Euler(0, time * speed, 0));
        spinner.current.setNextKinematicRotation(rotation);
    })

    return <group position={position}>
        <mesh
            scale={[4, .2, 4]}
            position={[0, -.2, 0]}
            geometry={box}
            material={floorremainingMaterial}
            receiveShadow
        />
        <RigidBody ref={spinner} type="kinematicPosition">
            <mesh
                scale={[3.5, .3, .3]}
                position={[0, .1, 0]}
                geometry={box}
                material={obstacleMaterial}
                castShadow
            />
        </RigidBody >
    </group>
}

function YAxesBlock({ position }) {

    const YAxes = useRef()
    const [offset] = useState(Math.random() * Math.PI * 2)


    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const translation = Math.sin(time + offset) + 1.15;
        YAxes.current.setNextKinematicTranslation({ x: position[0], y: translation, z: position[2] });
    })

    return <group position={position}>
        <mesh
            scale={[4, .2, 4]}
            position={[0, -.2, 0]}
            geometry={box}
            material={floorremainingMaterial}
            receiveShadow
        />
        <RigidBody ref={YAxes} type="kinematicPosition">
            <mesh
                scale={[3.5, .3, .3]}
                position={[0, .1, 0]}
                geometry={box}
                material={obstacleMaterial}
                castShadow
            />
        </RigidBody >
    </group>
}

function XAxesBlock({ position }) {

    const XAxes = useRef()
    const [timeOffset] = useState(Math.random() * 2)
    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        const translation = Math.sin(time + timeOffset) * 1.15;
        XAxes.current.setNextKinematicTranslation({ x: translation, y: position[1] + .75, z: position[2] });
    })

    return <group position={position}>
        <mesh
            scale={[4, .2, 4]}
            position={[0, -.2, 0]}
            geometry={box}
            material={floorremainingMaterial}
            receiveShadow
        />

        <RigidBody ref={XAxes} type="kinematicPosition">
            <mesh
                scale={[1.6, 1.5, .3]}
                position={[0, -.1, 0]}
                geometry={box}
                material={obstacleMaterial}
                castShadow
            />
        </RigidBody >
    </group>
}

function EndBlock({ position }) {

    const flag = useGLTF("./pirate_flag_animated.glb")

    flag.scene.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
        }
    });

    const animations = useAnimations(flag.animations, flag.scene)
    useEffect(() => {
        animations.actions.flag.play()
    }, [])
    return <group position={position}>
        <RigidBody type='fixed'>
            <mesh
                scale={[4, .2, 4]}
                position={[0, -.1, 0]}
                geometry={box}
                material={floorStartEndMaterial}
                receiveShadow
            />
        </RigidBody>

        <RigidBody type='fixed' colliders='hull'>
            <primitive  object={flag.scene} position={[-.2, 0, 0]} scale={.008} ></primitive>
        </RigidBody>


    </group>
}

function Walls({ length }) {
    return <RigidBody type='fixed'>
        <mesh
            scale={[.2, 2, length]}
            position={[2.1, .5, -(length) / 2 + 2]}
            geometry={box}
            material={wallMaterial}
            receiveShadow
            castShadow
        />
        <mesh
            scale={[.2, 2, length]}
            position={[-2.1, .5, -(length) / 2 + 2]}
            geometry={box}
            material={wallMaterial}
            receiveShadow
            castShadow
        />
        <mesh
            scale={[4.4, 2, .3]}
            position={[0, .5, -(length) + 2]}
            geometry={box}
            material={wallMaterial}
            receiveShadow
            castShadow
        />
        <CuboidCollider
            args={[2, .1, length / 2]}
            restitution={.2} friction={.5}
            position={[0, -.2, -(length / 2) + 2]}

        />
    </RigidBody>

}

export default function Level({ count }) {

    const {seed} = store((state)=>{return state})
    
    const types = [SpinnerBlock, YAxesBlock, XAxesBlock]

    const blocks = useMemo(() => {
        const blocks = []
        for (let i = 0; i < count; i++) {
            blocks.push(types[Math.floor(Math.random() * types.length)])
        }
        return blocks
    }, [count,seed])

    return (
        <>
            <StartBlock position={[0, 0, 0]} />

            {blocks.map((Block, index) => {
                return <Block key={index} position={[0, 0, -(index + 1) * 4]} />
            })}

            <EndBlock position={[0, 0, - (count + 1) * 4]} />

            <Walls length={[(count + 2) * 4]} />
        </>
    )
}
