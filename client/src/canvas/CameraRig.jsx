import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import state from '../store'

const CameraRig = ({ children }) => {
  const group = useRef();
  const snap = useSnapshot(state);

  // set the model rotation based on the mouse position
  // useFrame(({camera}) => {
  //   const {x, y} = snap.mouse;
  //   const {width, height} = snap.viewport;
  //   const xDeg = easing(x, 0, 360, 0, width);
  //   const yDeg = easing(y, 0, 360, 0, height);
  //   group.current.rotation.set(yDeg, xDeg, 0);
  //   camera.lookAt(0, 0, 0);
  // });

  useFrame((state, delta) => {

    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if (snap.intro) {
      if (isBreakpoint) targetPosition = [0, 0, 2];
      if (isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if (isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [0, 0, 2];
    }

    // set the model camera position 
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta

    )

  })





  return <group ref={group}>{children}</group>
}

export default CameraRig