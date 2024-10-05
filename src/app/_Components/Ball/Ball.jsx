import store from '@/lib/stores/store';
import { Html, useKeyboardControls } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import { Physics, RigidBody, useRapier } from '@react-three/rapier'
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';
import * as THREE from 'three'

export default function Ball() {
    const rapier = useRapier()
    const [subscribedKeys, getKeys] = useKeyboardControls();
    const ball = useRef();

    const {start,end,blocksCount,restart} = store((state)=>{return state})

    const [smoothedCameraTarget] = useState(new THREE.Vector3())
    const [smoothedCameraPosition] = useState(new THREE.Vector3())

    


    useFrame((state) => {
        const { forward, backward, left, right } = getKeys();
        if (forward) {
            ball.current.applyImpulse(new THREE.Vector3(0, 0, -.01))
        }
        else if (backward) {
            ball.current.applyImpulse(new THREE.Vector3(0, 0, .01))
        }
        else if (left) {
            ball.current.applyImpulse(new THREE.Vector3(-.01, 0, 0))
        }
        else if (right) {
            ball.current.applyImpulse(new THREE.Vector3(.01, 0, 0))
        }

        const ballPosition = ball.current.translation()


        const cameraPosition = new THREE.Vector3()
        cameraPosition.copy(ballPosition)

        cameraPosition.z += 2.25
        cameraPosition.y += 0.65

        const cameraTarget = new THREE.Vector3()

        cameraTarget.copy(ballPosition)
        cameraTarget.y += 0.25


        smoothedCameraPosition.lerp(cameraPosition, 0.05)
        smoothedCameraTarget.lerp(cameraTarget, 0.05)

        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)


        if(ballPosition.z < -(blocksCount * 4 + 2))
            end()

        if(ballPosition.y < -4)
            restart()
    })

    const jump = () => {
        const ballOrigin = ball.current.translation(); //Ball Origin
        ballOrigin.y -= .31;

        const direction = { x: 0, y: -1, z: 0 }; // -Y Direction

        const ray = new rapier.rapier.Ray(ballOrigin, direction);
        const intersect = rapier.world.castRay(ray);

        if (intersect.timeOfImpact < .2) {

<<<<<<< HEAD
            ball.current.applyImpulse(new THREE.Vector3(0, .35, 0))
=======
            ball.current.applyImpulse(new THREE.Vector3(0, .5, 0))
>>>>>>> 9fcb2c7 (edit commit)
        }

    }

    const reset = ()=>{
        ball.current.setTranslation({x:0,y:3,z:0})
        ball.current.setAngvel({x:0,y:0,z:0})
        ball.current.setLinvel({x:0,y:0,z:0})
    }

    useEffect(() => {

        const checkPhase =  store.subscribe(
            (state)=>{return state.phase},
            (value)=>{
                if(value === 'ready'){
                    reset();
                }
            }
        )


        const unsubscribedJump = subscribedKeys(
            (state) => {
                return state.jump
            },
            (value) => {
                if (value) {
                    jump();
                }
        })


        const startPlaying = subscribedKeys(
                () => {
                    start();
                }
            )

        return ()=>{
            unsubscribedJump()
            startPlaying()
            checkPhase()
        }
        
    }, [blocksCount])

    return (


        <RigidBody
            canSleep={false}
            ref={ball}
            restitution={.2}
            friction={.5}
            linearDamping={.5}
            angularDamping={.5}
            position={[0, 2, 0]}
            colliders='ball'
        >
            <mesh castShadow>
                <icosahedronGeometry args={[0.3, 1]} />
                <meshNormalMaterial flatShading />
            </mesh>


        </RigidBody>

    )
}
