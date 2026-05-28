import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const MovingStars = () => {
  const starsRef = useRef();

  useFrame(() => {
    if (starsRef.current) {
      starsRef.current.rotation.x -= 0.0002;
      starsRef.current.rotation.y -= 0.0003;
    }
  });

  return (
    <Stars 
      ref={starsRef} 
      radius={100} 
      depth={50} 
      count={6000} 
      factor={4} 
      saturation={0} 
      fade={true} 
      speed={2} 
    />
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none -z-10 bg-[#030014]">
      {/* Added the dpr prop right here to save battery life! */}
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <MovingStars />
      </Canvas>
    </div>
  );
};

export default Background3D;