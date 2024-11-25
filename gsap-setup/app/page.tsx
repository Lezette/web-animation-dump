"use client"
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";


  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);


export default function Home() {
  const container = useRef<HTMLDivElement | null>(null);
  const firstSection = useRef<HTMLElement | null>(null);
  const circle = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  const { contextSafe } = useGSAP((context, contextSafe) => {
    // gsap.to(".box", {rotation: "+=360", duration: 3})
    // gsap.to(circle.current, { rotation: "-360", duration: 5, delay: 3 })

    tl.current = gsap.timeline()
      .to(".box", {rotation: "+=360"})
      .to(".circle", { x: 100})

    

    // const clicked = contextSafe!(() => {
    //   gsap.to('.box', { y: 100 })
    // })

    // circle.current?.addEventListener("click", clicked)

    // return () => {
    //   circle.current?.removeEventListener("click", clicked)
    // }
  }, { scope: container })


  const toggleTimeline = contextSafe(() => {
    tl?.current?.reversed(!tl?.current?.reversed())
  })


  return (
    <>
      <div ref={container} className="container">
        <button onClick={toggleTimeline}>Toggle</button>
        <div className="box gradient-blue">selector</div>
        <div className="circle gradient-green" ref={circle}>
          Ref
        </div>
      </div>
    </>
  );
}
