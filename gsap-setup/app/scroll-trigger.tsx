"use client"
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";


  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollTrigger);


export default function Home() {
 
  const firstSection = useRef<HTMLElement | null>(null);
 
  useGSAP(() => {
    gsap.from(".heading", {
      opacity: 0,
      x: 30,
      duration: 5,
      scrollTrigger: {
        trigger: ".heading",
        markers: true,
        endTrigger: ".section",
        // start: "top 74%",
        // end: "bottom 25%",
        // toggleAction options are: play, pause, resume, reset, reverse, complete, none
        // toggleAction events are: onEnter, onLeave, onEnterBack, onLeaveBack
        toggleActions: "restart pause reverse play"
      },
    })
  }, {scope: firstSection})



  return (
    <>
      <div className="container">
        <button>Toggle</button>
        <div className="box gradient-blue">selector</div>
        <div className="circle gradient-green">
          Ref
        </div>
      </div>

      <section ref={firstSection} className="section">
        <h2 className="heading">This section is here and loaded </h2>
      </section>

      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus optio, quo corporis vitae blanditiis modi iure odio alias, fugiat reiciendis dolor expedita id debitis rerum atque nobis voluptatum, mollitia tempore! Deserunt doloremque ipsum unde aliquam, id est laudantium quis amet vitae minus maiores aspernatur nobis harum veniam et! Quisquam, excepturi?
      </div>
    </>
  );
}
