import { Center, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Chair from './Chair';
import Mac from "./Mac";

const ChairCanvas = () => {
    return (
        // <Canvas
        //     id="scene 2"
        //     shadows
        //     camera={{
        //         //  position: [0, 0, 0], 
        //         fov: 25
        //     }}
        //     gl={{ preserveDrawingBuffer: true }}
        //     className="w-full max-w-full h-full transition-all ease-in"
        // >
        //     {/* <Suspense fallback={null}> */}
        //     <Stage environment="city" intensity={0.6}>
        //         <Center>
        //             <Chair />
        //         </Center>
        //     </Stage>
        //     <OrbitControls enableZoom={false} autoRotate />
        //     {/* </Suspense> */}
        // </Canvas>
        <Canvas
            camera={{
                position: [0, 0, 55],
                fov: 15
            }}
        >
            <Suspense fallback={null}>
                <Stage environment="city" intensity={0.6}>
                    <Mac />
                    {/* <Chair /> */}
                </Stage>
                <OrbitControls enableZoom={false} autoRotate />
            </Suspense>
        </Canvas>
    );
};

export default ChairCanvas;
