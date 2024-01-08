import React from 'react'
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Decal, useGLTF, useTexture } from '@react-three/drei';

import state from '../store';

const VansShoe = (props) => {
  const { handleHoldDownMouse, handleDragObject, handleOnPointerUp } = props
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/vans_shoe.glb');
  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  //this to change the shoes color
  useFrame((state, delta) => easing.dampC(materials.VansShoeMaterial.color, snap.color, 0.25, delta));

  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString} onPointerUp={(e) => handleOnPointerUp(e)} onPointerDown={e => handleHoldDownMouse(e)} onPointerMove={e => handleDragObject(e)}>
      <mesh
        castShadow
        geometry={nodes.Shoe_VansShoeMaterial_0.geometry}
        material={materials.VansShoeMaterial}
        material-roughness={1}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            // map-anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  )
}

export default VansShoe