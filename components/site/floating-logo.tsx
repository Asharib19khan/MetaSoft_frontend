"use client"

import { useRef, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, ContactShadows, useTexture, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

function ExactLogo3D() {
  const group = useRef<THREE.Group>(null)
  const texture = useTexture("/metasoft-icon.png")
  texture.colorSpace = THREE.SRGBColorSpace

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  // We use stacked planes to create a 3D extrusion of the 2D logo
  const layers = 40
  const depth = 0.4

  return (
    <group ref={group}>
      <Float speed={2.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <group scale={1.38}>
          {Array.from({ length: layers }).map((_, i) => {
            // Front and back layers get physical material to catch light
            // Inner layers get basic material so they don't cast shadows on each other and turn black
            const isOuter = i === 0 || i === layers - 1;
            
            return (
              <mesh key={i} position={[0, 0, (i - layers / 2) * (depth / layers)]}>
                <planeGeometry args={[3, 3]} />
                {isOuter ? (
                  <meshPhysicalMaterial 
                    map={texture}
                    transparent={true}
                    alphaTest={0.5}
                    side={THREE.DoubleSide}
                    roughness={0.2}
                    metalness={0.5}
                    clearcoat={1}
                  />
                ) : (
                  <meshBasicMaterial 
                    map={texture}
                    transparent={true}
                    alphaTest={0.5}
                    side={THREE.DoubleSide}
                    toneMapped={false}
                  />
                )}
              </mesh>
            );
          })}
        </group>
      </Float>
    </group>
  )
}

export function FloatingLogo() {
  return (
    <div className="relative w-full max-w-[400px] h-[300px] mx-auto lg:ml-auto lg:mr-0 z-20 cursor-grab active:cursor-grabbing">
      {/* Background glow behind canvas */}
      <div className="absolute inset-0 bg-brand/10 blur-[80px] rounded-full z-0" />

      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} className="z-10 relative">
        <ambientLight intensity={1.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#E9B523" />
        
        <Suspense fallback={null}>
          <ExactLogo3D />
        </Suspense>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.2}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minAzimuthAngle={-0.5}
          maxAzimuthAngle={0.5}
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
