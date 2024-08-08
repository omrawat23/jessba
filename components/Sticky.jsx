import React, { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cardData = [
  { id: 1, content: 'Card 1' },
  { id: 2, content: 'Card 2' },
  { id: 3, content: 'Card 3' },
  { id: 4, content: 'Card 4' },
  { id: 5, content: 'Card 5' },
];

const Sticky = () => {
  const cardsRef = useRef([]);
  const headerRef = useRef(null);
  const animation = useRef(null);

  const initCards = useCallback(() => {
    if (animation.current) {
      animation.current.clear();
    }
    const cardHeight = cardsRef.current[0]?.offsetHeight || 0;

    cardsRef.current.forEach((card, index) => {
      if (index > 0) {
        // Increment y value of each card by cardHeight
        gsap.set(card, { y: index * cardHeight });
        // Animate each card back to 0 (for stacking)
        animation.current.to(card, { y: 0, duration: index * 0.5, ease: "none" }, 0);
      }
    });
  }, []); // No dependencies because it relies on refs, which are stable

  useEffect(() => {
    animation.current = gsap.timeline();

    initCards();

    const scrollTrigger = ScrollTrigger.create({
      trigger: ".wrapper",
      start: "top top",
      pin: true,
      end: () => `+=${(cardsRef.current.length * (cardsRef.current[0]?.offsetHeight || 0)) + headerRef.current.offsetHeight}`,
      scrub: true,
      animation: animation.current,
      markers: true,
      invalidateOnRefresh: true,
    });

    ScrollTrigger.addEventListener("refreshInit", initCards);

    // Cleanup function
    return () => {
      scrollTrigger.kill();
      ScrollTrigger.removeEventListener("refreshInit", initCards);
    };
  }, [initCards]); // initCards is now stable, so it’s safe to include as a dependency

  return (
    <div className="wrapper">
      <div className="header" ref={headerRef}>
        <h1>Header Content</h1>
      </div>
      <div className="cards">
        {cardData.map((card, index) => (
          <div
            key={card.id}
            className="card"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            {card.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sticky;
