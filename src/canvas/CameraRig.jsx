import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import state from '../store';

const CameraRig = (props) => {

  const { children, rotateValue } = props

  const group = useRef();
  const snap = useSnapshot(state);

  const [scrollValue, setScrollValue] = useState(8)
  // const [rotateValue, setRotateValue] = useState({ x: 0, y: 0 });

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