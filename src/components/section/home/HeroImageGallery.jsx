"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { Vertex, Fragment } from "@/shaders/main_shader/Home_Hero_Shaders";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useAppContext } from "@/context/AppContext";
gsap.registerPlugin(ScrollTrigger);

const imgData = [
  `/images/home/hero_imgs/img1.webp`,
  `/images/home/hero_imgs/img2.webp`,
  `/images/home/hero_imgs/img3.webp`,
  `/images/home/hero_imgs/img4.webp`,
  `/images/home/hero_imgs/img5.webp`,
  `/images/home/hero_imgs/img6.webp`,
  `/images/home/hero_imgs/img7.webp`,
  `/images/home/hero_imgs/img8.webp`,
  `/images/home/hero_imgs/img9.webp`,
];

const HomeImageGallery = () => {
  const groupRef = useRef();

  const [radius, setRadius] = useState(1.5)
    const [SCALE, setSCALE] = useState(1.5)

  useEffect(()=>{
    if(window.innerWidth < 1024){
      setSCALE(1.0)
      setRadius(0.9)
    }
    else{
      setSCALE(1.5)
      setRadius(1.5)
    }
  },[])


  const isIntro = useRef(true); // new

  const scrollData = useRef({
    target: 0,
    current: 0,
  });

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ".mainContHero",
      start: "top top",
      end: "bottom bottom",
      scrub: true,

      onUpdate: (self) => {
        if (isIntro.current) return; // ❌ block during intro

        // 🎯 get velocity (+ up / - down)
        let velocity = self.getVelocity();

        // normalize
        velocity *= 0.0005;

        // clamp (-0.5 → +0.5)
        velocity = THREE.MathUtils.clamp(velocity, -0.5, 0.5);

        scrollData.current.target = velocity;

        // 🔁 rotation (same trigger)
        if (groupRef.current) {
          groupRef.current.rotation.y = self.progress * Math.PI * 2;
        }
      },
    });

    return () => st.kill();
  }, []);

  // 🎯 smooth + auto return to 0
  useFrame(() => {
    const s = scrollData.current;

    s.current = THREE.MathUtils.lerp(s.current, s.target, 0.08);

    // decay (IMPORTANT for going back to 0)
    s.target *= 0.9;
  });

  // Intro-Animation
  useEffect(() => {
    if (!groupRef.current) return;

    const g = groupRef.current;

    // ✅ explicitly set start values
    gsap.set(g.position, { y: -10 });
    gsap.set(g.rotation, { y: Math.PI * 4 });

    // ✅ animate to final values
    const tl = gsap.timeline({
           delay:3,
      onComplete: () => {
        isIntro.current = false; // ✅ hand control to scroll NEW
      },
    });

    // 🔥 Velocity burst (shader distortion)
    tl.fromTo(
      scrollData.current,
      { current: 0 },
      {
        current: 0.5,
        duration: 0.4,
        ease: "power4.out",
      },
      "a1",
    ).to(
      scrollData.current,
      {

   
        current: 0,
        duration: 2,
        ease: "expo.out",
      },
      "a1+=0.4",
    );

    tl.to(
      g.position,
      {
        y: 0.5,
        duration: 2,
        ease: "power3.out",
      },
      "a1",
    );

    tl.to(
      g.rotation,
      {
        y: 0,
        duration: 2,
        ease: "power3.out",
      },
      "a1",
    );

    // TRACK OUT
    const TO = gsap.timeline({
      scrollTrigger: {
        trigger: ".mainContHero",
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    TO.to(g.position, {
      y: 7,
      ease: "none",
    });
  }, []);

  return (
    <group ref={groupRef} rotation={[0.4, 0, 0]}>
      {imgData.map((src, i) => {
        const angle = (i / imgData.length) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        return (
          <ImagePlane
            key={i}
            index={i}
            url={src}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
            scroll={scrollData}
            SCALE={SCALE}
          />
        );
      })}
    </group>
  );
};

function ImagePlane({ url, position, rotation, scroll, index, SCALE }) {
  const texture = useTexture(url);
  const meshRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uPlaneResolution: { value: new THREE.Vector2(1.5, 1) }, // same as geometry
      uImageResolution: {
        value: new THREE.Vector2(
          texture.image?.width || 1,
          texture.image?.height || 1,
        ),
      },
      uScroll: { value: 0 }, // 🔥 IMPORTANT
    }),
    [texture],
  );

  // 🎯 update shader uniform every frame
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uScroll.value = scroll.current.current;
    }
  });

  const {SetSelectedImg } = useAppContext();

  const handleEnter = (index) => {
    const uurl = imgData[index];
    SetSelectedImg(uurl);
  };



  return (
    <mesh
      scale={SCALE}
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();

        if (e.intersections[0].object !== e.object) return;

        handleEnter(index);
      }}
      onPointerEnter={(e) => {
        e.stopPropagation();

        if (e.intersections[0].object !== e.object) return;

        gsap.to(e.object.position, {
          y: 0.3,
          duration: 0.4,
          ease: "power2.out",
        });
      }}
      onPointerLeave={(e) => {
        gsap.to(e.object.position, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      }}
    >
      <planeGeometry args={[1.5, 1, 40, 40]} />
      <shaderMaterial
        side={THREE.DoubleSide}
        uniforms={uniforms}
        vertexShader={Vertex}
        fragmentShader={Fragment}
      />
    </mesh>
  );
}

export default HomeImageGallery;
