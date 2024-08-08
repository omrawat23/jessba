"use client";
import { TextParallaxContentExample } from '../components/Text';
import { useScroll } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import styles from '../app/components/sticky/style.module.scss';
import { projects } from '../app/data';
import Intro from '../components/Intro';
import Description from '../components/Description';
import Image from "next/image";
import Zoom from '@/app/components/ZoomParralax/index';
import Lenis from "lenis";
import Cards from '@/app/components/sticky/index'
import { Example } from "../components/MouseImageTrail";
import Animate from '../components/Animate';
import Carousel from "../components/Carousel";
import ExampleWrapper from '../components/SpringModal';
import Card from '../components/Card';
import { animate, motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
import Sticky from "../components/Sticky";
import Section from "../components/Section";
import Why from "../app/components/scroll/index";
import { VanishList } from '../components/List';
import {SmoothScrollHero} from "../components/Smooth";

export default function Home() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const images = [
    "/1.jpg",
    "/2.jpg",
    "/3.jpg",
    "/4.jpg",
    "/5.jpg",
    "/6.jpg",
    "/7.jpg",
    "/8.jpeg",
  ];

  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);
  const [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;
  
    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }
  
    return () => controls?.stop();
  }, [rerender, xTranslation, duration, width, mustFinish]);
  

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time:any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <>
      <main className="px-4 py-8 sm:px-8 md:px-16 lg:px-24">
        <SmoothScrollHero />
      </main>
      <main ref={container} className={`${styles.main} px-4 py-8 sm:px-8 md:px-16 lg:px-24`}>
        {projects.map((project, i) => {
          const targetScale = 1 - (projects.length - i) * 0.05;
          return (
            <Cards
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
      <div className="py-8 mb-[200px] sm:px-4 md:px-8 lg:px-16">
        <Zoom />
        <main className="relative flex gap-4">
          <motion.div
            className="absolute left-0 flex gap-4"
            style={{ x: xTranslation }}
            ref={ref}
            onHoverStart={() => {
              setMustFinish(true);
              setDuration(SLOW_DURATION);
            }}
            onHoverEnd={() => {
              setMustFinish(true);
              setDuration(FAST_DURATION);
            }}
          >
            {[...images, ...images].map((item, idx) => (
              <Card image={`${item}`} key={idx} />
            ))}
          </motion.div>
        </main>
        <div  className="px-4 sm:px-8 md:px-16 lg:px-24" ><Carousel/></div>
        <ExampleWrapper />
        <div>
          <VanishList />
        </div>
      </div>
    </>
  );
}