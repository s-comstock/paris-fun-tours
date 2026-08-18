window.Webflow ||= [];
window.Webflow.push(() => {
  // Register Plugins 
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  // Define Variables 
  const objectElements = document.querySelectorAll('[data="object-scroll"]');

  // Set all objects to opacity 0 before animating 
  gsap.set(objectElements, {
    opacity: 0,
    yPercent: 15
  });

  // Check which elements are initially in viewport and animate them immediately
  objectElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
      gsap.to(el, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }
  });

  // GSAP timeline
  ScrollTrigger.batch(objectElements, {
    start: "top 90%",
    once: true,
    toggleActions: "play none none none",
    onEnter: (batch) => {
      gsap.to(batch, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
      });
    }
  });
});
