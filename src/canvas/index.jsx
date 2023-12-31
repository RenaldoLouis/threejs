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
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [rotateValue, setRotateValue] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleHoldDownMouse = (e) => {
    setIsDragging(true);
    setStartPosition({ x: e.clientX, y: e.clientY });
  }

  const handleOnPointerUp = () => {
    setIsDragging(false);
  }

  const handleDragObject = (event) => {
    if (!isDragging) {
      return;
    }

    const newX = event.clientX;
    const newY = event.clientY;

    const deltaX = newX - startPosition.x;
    const deltaY = newY - startPosition.y;

    const positionX = (deltaX) / 150;
    const positionY = (deltaY) / 150;
    setRotateValue({
      x: positionX,
      y: positionY,
    });
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
          <VansShoe handleDragObject={handleDragObject} handleHoldDownMouse={handleHoldDownMouse} handleOnPointerUp={handleOnPointerUp} />
        </Center>
        {/* <primitive object={obj}/> */}
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel