import React from 'react'
import Image from 'next/image';
// import Background from '../../public/images/2.jpg';
import image1 from '../public/1111.jpg';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Intro() {
    const container = useRef();
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end start']
    })
  
    const y = useTransform(scrollYProgress, [0, 1], ["0vh", "150vh"])
  
    return (
      <div className='h-screen overflow-hidden'>
        <motion.div style={{y}} className='relative h-full'>
          <Image src={image1} fill alt="image" style={{objectFit: "cover"}}/>
        </motion.div>
      </div>
    )
}