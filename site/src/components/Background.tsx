import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.04
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        sizeAttenuation
        color="#7df9ff"
        transparent
        opacity={0.55}
        depthWrite={false}
      />
    </points>
  )
}

function Knot() {
  const ref = useRef<THREE.Mesh>(null!)
  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.x = t * 0.12
    ref.current.rotation.y = t * 0.18
  })
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} scale={1.6}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#7df9ff" wireframe transparent opacity={0.35} />
      </mesh>
    </Float>
  )
}

function Parallax() {
  const { camera } = useThree()
  const target = useRef(new THREE.Vector2(0, 0))
  useFrame((state, dt) => {
    const m = state.pointer
    target.current.x += (m.x * 0.6 - target.current.x) * Math.min(1, dt * 2.2)
    target.current.y += (m.y * 0.4 - target.current.y) * Math.min(1, dt * 2.2)
    camera.position.x = target.current.x
    camera.position.y = target.current.y
    camera.lookAt(0, 0, 0)
  })
  return null
}

export function Background() {
  return (
    <div className="bg-canvas" aria-hidden>
      <Canvas
        dpr={[1, 1.6]}
        camera={{ position: [0, 0, 8], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[0, 0, 0, 0] as unknown as [number, number, number]} />
        <fog attach="fog" args={['#070809', 6, 14]} />
        <ambientLight intensity={0.3} />
        <Knot />
        <Particles />
        <Parallax />
      </Canvas>
    </div>
  )
}
