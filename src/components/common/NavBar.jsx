"use client";
import gsap from "gsap";
import { useRef, useState } from "react";

const NavBar = () => {
  const [menuStatus, SetMenuStatus] = useState(false);
  const changerRef = useRef(null);

  const openRef = useRef(null);
  const closeRef = useRef(null);
  const openMenu = useRef();

  const MenuChangerHandler = () => {
    const isOpen = !menuStatus;

    const tl = gsap.timeline({
      defaults: { ease: "expo.out", duration: 0.5 },
    });

    if (isOpen) {
      tl.to(changerRef.current, {
        x: "95%",
      })
        // subtle overshoot back
        .to(
          changerRef.current,
          {
            x: "92.5%",
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.2",
        )

        .to(
          openRef.current,
          {
            opacity: 0.4,
            duration: 0.4,
            ease: "none",
          },
          "<",
        )

        .to(
          closeRef.current,
          {
            opacity: 1,
            duration: 0.4,
            ease: "none",
          },
          "<",
        )
        .to(openMenu.current, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1,
          ease: "power3.inOut",
          pointerEvents: "auto",
        },0);
    } else {
      tl.to(changerRef.current, {
        x: "-5%",
      })
        .to(
          changerRef.current,
          {
            x: "0%",
            duration: 0.25,
            ease: "power2.out",
          },
          "-=0.2",
        )

        .to(
          openRef.current,
          {
            opacity: 1,
            duration: 0.4,
            ease: "none",
          },
          "<",
        )

        .to(
          closeRef.current,
          {
            opacity: "50%",
            duration: 0.4,
            ease: "none",
          },
          "<",
        )
        .to(openMenu.current, {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 1,
          ease: "power3.inOut",
          pointerEvents: "none",
        },
        0 
      );
    }

    SetMenuStatus(isOpen);
  };

  return (
    <div className="NavBar-MainCont w-full h-fit fixed top-0 py-7 left-0 z-100 flex justify-between items-center max-sm:px-5 px-10">
      <div className=" select-none z-100 text-[#4d3526] mix-blend-difference cursor-pointer Font_Q text-[20px] leading-5 uppercase">
        DS
      </div>

      <div
        onClick={MenuChangerHandler}
        className="MenuCont select-none cursor-pointer Font_Q relative z-100 bg-[#efe6e1] text-[14px] flex border border-[#4d352633] rounded-full p-1"
      >
        <div
          ref={closeRef}
          className="flex px-3 py-1 text-[#4d3526] opacity-50 close"
        >
          Close
        </div>
        <div ref={openRef} className="flex px-3 py-1 text-[#4d3526] open">
          Open
        </div>

        <div
          ref={changerRef}
          className="w-1/2 h-[90%] MenuChanger absolute top-1/2 -translate-y-1/2 left-0.5 flex justify-center items-center rounded-full bg-[#4d3526]"
        >
          <p className=" text-[12px] leading-3 text-white uppercase Font_Q">
            Menu
          </p>
        </div>
      </div>

      <div
        ref={openMenu}
        style={{ clipPath: "inset(0px 0px 100% 0px);" }}
        className=" Open-Menu bg-[#422e22] absolute top-0 left-0 w-full h-svh  z-99 pointer-events-none"
      ></div>
    </div>
  );
};

export default NavBar;
