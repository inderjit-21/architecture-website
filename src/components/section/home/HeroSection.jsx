"use client";
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const { SelectedImg } = useAppContext();
  const [current, setCurrent] = useState(null);
  const [prev, setPrev] = useState(null);
  const nameArr = [
    ["D", "R", "O", "P"],
    ["S", "T", "U", "D", "I", "O"],
  ];

  const imgRef = useRef();

  useEffect(() => {
    if (!SelectedImg) return;

    // store previous
    setPrev(current);

    // update current
    setCurrent(SelectedImg);
  }, [SelectedImg]);

  useEffect(() => {
    if (!imgRef.current) return;

    // fade in animation
    gsap.fromTo(
      imgRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: "power2.out" },
    );
  }, [current]);

  // intro
  useEffect(() => {
    const HomeIntroTL = gsap.timeline();

    HomeIntroTL.to(".companytextlableCont", {
      opacity: 1,
    });

    const mm = gsap.matchMedia();

    HomeIntroTL.from(".companytextlable", {
      yPercent: 100,
      duration: 1,
      stagger: {
        each: 0.07,
        from: "start",
        ease: "power3.inOut",
      },
      ease: "power3.inOut",
    });

    HomeIntroTL.from(".companytextlableCont", {
      bottom: "50%",
      left:"50%",
      translateX:"-50%",
      translateY:"",
      scale:0.5,
      duration: 1,
      ease: "power3.inOut",
    });

    return () => mm.revert();
  }, []);

  return (
    <div className="mainContHero w-full h-[300vh] relative bg-[#efe6e1] z-[-2]">
      <div className="stickyCont w-full h-[100svh] sticky top-0 left-0 overflow-hidden">
        {/* Company-Title */}
        <div className="companytextlableCont absolute bottom-0  opacity-0 text-[#4d3526] px-10 max-sm:px-5 flex max-sm:flex-col  tracking-tighter left-0 scale-[1]  w-fit h-fit  MainFont ">
          <div className="w-fit h-fit flex">
            {nameArr[0].map((item, index) => {
              return (
                <div
                  key={index}
                  className="w-fit h-fit text-[10vw] leading-[10vw] max-lg:text-[15vw] max-lg:leading-[15vw] max-sm:text-[25vw] max-sm:leading-[18vw]  overflow-hidden flex justify-center items-center"
                >
                  <h1 className={`companytextlable flex`}>{item}</h1>
                </div>
              );
            })}
          </div>
          <div className="w-fit h-fit flex">
            {nameArr[1].map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-fit h-fit text-[10vw] leading-[10vw] max-lg:text-[15vw] max-lg:leading-[15vw] max-sm:text-[25vw] max-sm:leading-[18vw] overflow-hidden flex justify-center items-center max-sm:ml-0 ${index === 0 && "ml-10"} `}
                >
                  <h1 className={`companytextlable flex`}>{item}</h1>
                </div>
              );
            })}
          </div>
        </div>

        {/* Display-Img-Container */}
        <div className=" absolute bottom-2 right-2 w-1/4 aspect-3/2 max-lg:hidden">
          {/* Previous Image */}
          {prev && (
            <img
              src={prev}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}

          {/* Current Image */}
          {current && (
            <img
              ref={imgRef}
              src={current}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
