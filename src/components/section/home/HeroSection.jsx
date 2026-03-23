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
  useEffect(()=>{
    const HomeIntroTL = gsap.timeline();

    HomeIntroTL.to('.companytextlableCont',{
      opacity:1
    })
    
    HomeIntroTL.from('.companytextlable',{
      yPercent:100,
      duration:1,
      stagger:{
        each:0.07,
        from:'start',
        ease:'power3.inOut'
      },
      ease:'power3.inOut'
    })
    HomeIntroTL.to('.companytextlableCont',{
      bottom:'0%',
      left:'0%',
      translateX:0,
      translateY:0,
      scale:1,
      duration:1,
      ease:'power3.inOut'
    })
    
  },[])

  return (
    <div className="mainContHero w-full h-[300vh] relative bg-[#efe6e1] z-[-2]">
      <div className="stickyCont w-full h-screen sticky top-0 left-0">
        {/* Company-Title */}
        <div className="companytextlableCont absolute bottom-1/2  opacity-0 text-[#4d3526] px-10 flex tracking-tighter left-1/2 scale-[0.5] translate-y-1/2 -translate-x-1/2 w-fit h-fit MainFont ">
          {
            nameArr[0].map((item,index)=>{
              return(
                <div key={index} className="w-fit h-fit text-[10vw] leading-[10vw] overflow-hidden flex justify-center items-center"><h1 className={`companytextlable flex`}>{item}</h1></div>
              )
            })
          }
          {
            nameArr[1].map((item,index)=>{
              return(
                <div key={index} className={`w-fit h-fit text-[10vw] leading-[10vw] overflow-hidden flex justify-center items-center ${index === 0 && 'ml-10'} `}><h1 className={`companytextlable flex`}>{item}</h1></div>
              )
            })
          }
        </div>

        {/* Display-Img-Container */}
        <div className=" absolute bottom-2 right-2 w-1/4 aspect-3/2">
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
