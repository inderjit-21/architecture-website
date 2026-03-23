"use client";
import { Canvas } from "@react-three/fiber";
import HomeImageGallery from "../section/home/HeroImageGallery";

const GlobalCanvas = () => {
  return (
    <div className="w-full h-screen fixed top-0 left-0 pointer-events-auto">
      <Canvas
        className="w-full h-full "
        gl={{ alpha: true }}
        style={{ background: "transparent" }}
      >

        <HomeImageGallery/>

      </Canvas>
    </div>
  );
};

export default GlobalCanvas;
