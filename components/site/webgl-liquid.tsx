"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei"
import * as THREE from "three"

function LiquidMesh() {
  const mesh = useRef<THREE.Mesh>(null)
  const [target] = useState(() => new THREE.Vector3(0, 0, 0))
  const { mouse, viewport } = useThree()

  useFrame((state, delta) => {
    if (mesh.current) {
      // Map mouse coordinates to 3D space
      target.x = (mouse.x * viewport.width) / 2
      target.y = (mouse.y * viewport.height) / 2

      // Smoothly move mesh towards cursor
      mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, target.x * 0.1, 0.05)
      mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, target.y * 0.1, 0.05)
      
      // Gentle rotation
      mesh.current.rotation.x += delta * 0.1
      mesh.current.rotation.y += delta * 0.15
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={mesh} scale={viewport.width > 10 ? 4 : 2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#000000"
          envMapIntensity={1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
        />
      </mesh>
    </Float>
  )
}

export function WebglLiquid() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(true)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile initially and on resize
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    
    const el = containerRef.current
    if (!el) return
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        rootMargin: "200px", // Pre-mount slightly before scrolling back into view
        threshold: 0.01,
      }
    )

    observer.observe(el)
    return () => {
      window.removeEventListener("resize", checkMobile)
      observer.unobserve(el)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-difference hidden md:block">
      {!isMobile && isInView && (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#444444" />
          <Environment preset="city" />
          <LiquidMesh />
        </Canvas>
      )}
    </div>
  )
}
