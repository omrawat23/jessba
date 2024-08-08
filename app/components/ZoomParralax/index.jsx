"use client"
   
import styles from './styles.module.scss';
import image1 from '../../../public/40.jpg';
import image2 from '../../../public/41.jpg';
import image3 from '../../../public/42.jpg';
import image4 from '../../../public/35.jpg';
import image5 from '../../../public/26.jpg';


import Image from 'next/image';
import { useScroll, useTransform, motion } from 'framer-motion'; // Remove scrollYProgress import
import { useRef } from 'react';

export default function Zoom() {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

    const pictures = [
        { src: image1, scale: scale4 },
        { src: image2, scale: scale5 },
        { src: image3, scale: scale6 },
        { src: image4, scale: scale8 },
        { src: image5, scale: scale9 },

    ];

    return (
        <div ref={container} className={styles.container}>
            <div className={styles.sticky}>
                {pictures.map(({ src, scale }, index) => (
                    <motion.div key={index} style={{ scale }} className={styles.el}>
                        <div className={styles.imageContainer}>
                            <Image src={src} fill alt="image" placeholder="blur" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
