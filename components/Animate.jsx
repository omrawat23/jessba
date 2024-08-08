import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Animate = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    
    const textContainer = document.createElement('div');
    textContainer.style.position = 'relative';
    textContainer.style.textAlign = 'left';
    container.appendChild(textContainer);

    const animateText = document.createElement('h1');
    animateText.textContent = 'Animate';
    animateText.style.fontSize = '12vw';
    animateText.style.fontFamily = 'Arial, sans-serif';
    animateText.style.color = '#f0ede6';
    animateText.style.fontWeight = 'bold';
    animateText.style.margin = '0';
    animateText.style.lineHeight = '1';
    textContainer.appendChild(animateText);

    const anythingText = document.createElement('h1');
    anythingText.textContent = 'anything';
    anythingText.style.fontSize = '12vw';
    anythingText.style.fontFamily = 'Arial, sans-serif';
    anythingText.style.color = '#f0ede6';
    anythingText.style.fontWeight = 'bold';
    anythingText.style.margin = '0';
    anythingText.style.lineHeight = '1';
    anythingText.style.position = 'relative';
    anythingText.style.left = '15%';
    textContainer.appendChild(anythingText);

    const tl = gsap.timeline({
      repeat: 0, // Run only once
      onComplete: () => {
        console.log('Animation complete, scrolling down');
        // Scroll down by a certain amount
        window.scrollBy({ top: window.innerHeight, left: 0, behavior: 'smooth' });
      }
    });
    
    tl.from([animateText, anythingText], {
      duration: 1,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out"
    });

    tl.to([animateText, anythingText], {
      duration: 0.5,
      scale: 1.05,
      rotation: 1,
      color: '#ffa07a',
      stagger: 0.1,
      ease: "power2.out"
    }, "+=0.5");

    return () => {
      tl.kill();
      container.removeChild(textContainer);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        background: '#191919',
        height: '100vh', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        overflow: 'hidden'
      }}
    />
  );
};

export default Animate;
