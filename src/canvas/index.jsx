import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei';
import React, { useState } from 'react'
import { useLoader } from 'react-three-fiber';
import CameraRig from './CameraRig';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import VansShoe from './VansShoe';
import Backdrop from './Backdrop';

const CanvasModel = () => {
  // const obj = useLoader(OBJLoader, '/supastarOBJ.obj');
  const [rotateValue, setRotateValue] = useState({ x: 0, y: 0 });

  let lastMouseX = 0;
  let lastMouseY = 0;

  const handleDragObject = (event) => {
    console.log("handleDragObject", event)
    lastMouseX = event.clientX;
    lastMouseX = event.clientY;
    const deltaX = event.clientX - lastMouseX;
    const deltaY = event.clientY - lastMouseY;
    setRotateValue({
      x: deltaX,
      y: deltaY,
    });
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
  }

  return (
    <Canvas
      id="scene"
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in"
    >
      <ambientLight intensity={0.5} />
      <Environment preset="city" />

      <Backdrop />
      <CameraRig rotateValue={rotateValue}>
        <Center>
          <VansShoe handleDragObject={handleDragObject} />
        </Center>
        {/* <primitive object={obj}/> */}
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel