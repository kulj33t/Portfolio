import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const TechStack: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const width = mountRef.current?.clientWidth || window.innerWidth;
    const height = mountRef.current?.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    const bounds = {
      minX: -width / 200, 
      maxX: width / 200,
      minY: -height / 200,
      maxY: height / 200,
    };

    const logos = [
      { texture: '/icons/github.png' },
      { texture: '/icons/linkedin.png' },
      { texture: '/icons/email.png' },
    ];

    type MovingMesh = {
      mesh: THREE.Mesh;
      velocity: THREE.Vector2;
      radius: number;
    };

    const movingMeshes: MovingMesh[] = [];

    logos.forEach((logo) => {
      const loader = new THREE.TextureLoader();
      loader.load(logo.texture, (texture) => {
        const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
        const geometry = new THREE.PlaneGeometry(1.5, 1.5);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          THREE.MathUtils.lerp(bounds.minX + 0.75, bounds.maxX - 0.75, Math.random()),
          THREE.MathUtils.lerp(bounds.minY + 0.75, bounds.maxY - 0.75, Math.random()),
          0
        );
        scene.add(mesh);
        // Decrease speed by reducing velocity range
        const velocity = new THREE.Vector2(
          (Math.random() * 0.01) - 0.005,
          (Math.random() * 0.01) - 0.005
        );
        movingMeshes.push({ mesh, velocity, radius: 0.75 });
      });
    });

    camera.position.z = 5;

    function checkCollision(a: MovingMesh, b: MovingMesh) {
      const dx = a.mesh.position.x - b.mesh.position.x;
      const dy = a.mesh.position.y - b.mesh.position.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return dist < a.radius + b.radius;
    }

    function resolveCollision(a: MovingMesh, b: MovingMesh) {
      const normal = new THREE.Vector2(
        b.mesh.position.x - a.mesh.position.x,
        b.mesh.position.y - a.mesh.position.y
      );
      const dist = normal.length();
      if (dist === 0) {
        normal.set(Math.random() * 0.01, Math.random() * 0.01);
      }
      normal.normalize();
      const overlap = a.radius + b.radius - dist;
      if (overlap > 0) {
        const correction = normal.clone().multiplyScalar(overlap / 2);
        a.mesh.position.x -= correction.x;
        a.mesh.position.y -= correction.y;
        b.mesh.position.x += correction.x;
        b.mesh.position.y += correction.y;
        const relativeVelocity = b.velocity.clone().sub(a.velocity);
        const speed = relativeVelocity.dot(normal);
        if (speed > 0) {
          const impulse = normal.multiplyScalar(speed);
          a.velocity.add(impulse);
          b.velocity.sub(impulse);
        }
      }
    }

    const animate = () => {
      requestAnimationFrame(animate);

      movingMeshes.forEach(({ mesh, velocity, radius }) => {
        mesh.position.x += velocity.x;
        mesh.position.y += velocity.y;

        if (mesh.position.x - radius < bounds.minX) {
          mesh.position.x = bounds.minX + radius;
          velocity.x = -velocity.x;
        } else if (mesh.position.x + radius > bounds.maxX) {
          mesh.position.x = bounds.maxX - radius;
          velocity.x = -velocity.x;
        }
        if (mesh.position.y - radius < bounds.minY) {
          mesh.position.y = bounds.minY + radius;
          velocity.y = -velocity.y;
        } else if (mesh.position.y + radius > bounds.maxY) {
          mesh.position.y = bounds.maxY - radius;
          velocity.y = -velocity.y;
        }

        mesh.rotation.set(0, 0, 0);
      });

      for (let i = 0; i < movingMeshes.length; i++) {
        for (let j = i + 1; j < movingMeshes.length; j++) {
          const a = movingMeshes[i];
          const b = movingMeshes[j];
          if (checkCollision(a, b)) {
            resolveCollision(a, b);
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = '';
      }
    };
  }, []);

  return <div style={{ width: '100%', height: '100%' }} ref={mountRef}></div>;
};

export default TechStack;
