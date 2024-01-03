import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import state from '../store';

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  const [scrollValue, setScrollValue] = useState(8)
  const [rotateValue, setRotateValue] = useState({ x: 0, y: 0 });

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // Function to handle scroll event
    function handleScroll(event) {
      // Detect scroll direction
      let delta = Math.sign(event.deltaY); // Use event.deltaY to determine scroll direction

      // Adjust camera position based on scroll direction
      setScrollValue(scrollValue - delta);
    }

    // Add scroll event listener
    window.addEventListener('wheel', handleScroll);

    //To Rotate Object
    // Variable to track mouse or touch movement
    let lastMouseX = 0;
    let lastMouseY = 0;

    function onMouseDown(event) {
      lastMouseX = event.clientX;
      lastMouseX = event.clientY;
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(event) {
      const deltaX = event.clientX - lastMouseX;
      const deltaY = event.clientY - lastMouseY;
      // rotateObject(delta);
      setRotateValue({
        x: deltaX,
        y: deltaY,
      });
      lastMouseX = event.clientX;
      lastMouseY = event.clientY;
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }

    // // Function to rotate the object based on mouse movement
    // function rotateObject(delta) {
    //   // Adjust rotation speed based on mouse movement
    //   const speed = 0.01;
    //   // object.rotation.y += delta * speed; // Rotate the object on the Y-axis
    //   setRotateValue(rotateValue + delta * speed)
    // }

    // Add mouse down event listener
    window.addEventListener('mousedown', onMouseDown);

    // set the initial position of the model
    let targetPosition = [-0.4, 0, scrollValue];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, scrollValue];
      if (isMobile) targetPosition = [0, 0.2, scrollValue];
    } else {
      if (isMobile) targetPosition = [0, 0, scrollValue]
      else targetPosition = [0, 0, scrollValue];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      // [state.pointer.y / 10, -state.pointer.x / 5, 0],
      [rotateValue.y, rotateValue.x, 0],
      0.25,
      delta
    )
  })


  return <group ref={group}>{children}</group>
}

export default CameraRig