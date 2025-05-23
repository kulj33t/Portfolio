import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type FireflyProps = {
  position: THREE.Vector3;
  size: number;
  velocity: number;
  angle: number;
};

const Firefly: React.FC<{ firefly: FireflyProps }> = ({ firefly }) => {
  const ref = useRef<THREE.Points>(null);

  useFrame(() => {
    firefly.position.x += firefly.velocity * Math.cos(firefly.angle);
    firefly.position.y += firefly.velocity * Math.sin(firefly.angle);
    firefly.angle += (Math.random() * 20 - 10) * (Math.PI / 180);

    if (ref.current) {
      ref.current.position.copy(firefly.position);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array([0, 0, 0]), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={0x00ff00}
        size={firefly.size}
        transparent
        opacity={1}
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
};

const FireflyField: React.FC = () => {
  const [fireflies, setFireflies] = useState<FireflyProps[]>([]);

  const createFirefly = useCallback(() => {
    const size = Math.random() * 3;
    const position = new THREE.Vector3(
      Math.random() * window.innerWidth - window.innerWidth / 2,
      Math.random() * window.innerHeight - window.innerHeight / 2,
      Math.random() * 200 - 100
    );

    return {
      position,
      size,
      velocity: (size * size) / 4,
      angle: Math.random() * 2 * Math.PI,
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFireflies((prev) => {
        const updated = prev
          .map((f) => {
            const newX = f.position.x + f.velocity * Math.cos(f.angle);
            const newY = f.position.y + f.velocity * Math.sin(f.angle);
            const isOut =
              newX < -window.innerWidth / 2 ||
              newX > window.innerWidth / 2 ||
              newY < -window.innerHeight / 2 ||
              newY > window.innerHeight / 2;

            return isOut ? null : f;
          })
          .filter(Boolean) as FireflyProps[];

        if (updated.length < 200) {
          for (let i = 0; i < 5; i++) updated.push(createFirefly());
        }

        return updated;
      });
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [createFirefly]);

  return (
    <>
      {fireflies.map((f, i) => (
        <Firefly key={i} firefly={f} />
      ))}
    </>
  );
};

const Background: React.FC = () => {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -5 }}>
      <Canvas camera={{ position: [0, 0, 400], fov: 75 }} gl={{ alpha: true }}>
        <primitive attach="background" object={new THREE.Color('#000000')} />
        <ambientLight intensity={0.2} />
        <FireflyField />
      </Canvas>
    </div>
  );
};

export default Background;