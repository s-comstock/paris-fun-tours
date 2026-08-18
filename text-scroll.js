window.Webflow ||= [];
window.Webflow.push(() => {
  // Register Plugins 
  gsap.registerPlugin(TextPlugin);
  gsap.registerPlugin(ScrollTrigger);

  // Define Variables 
  const textElements = document.querySelectorAll('[data-animate="split-text-scroll"]');

  // Split word and wrap in span 
  function wrapLinesInMask(chars) {
    chars.forEach(line => {
      const wrapper = document.createElement("span");
      wrapper.classList.add("line-wrapper");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
      line.style.display = "inline-block";
    });
  }

  // Loop through each text object
  textElements.forEach(el => {
    const split = new SplitText(el, {
      type: "lines",
      lineClass: "line",
    });
    el.removeAttribute("aria-label");
    wrapLinesInMask(split.lines);

    // 🎯 Animate each element's line on scroll
    gsap.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      ease: "power2.out",
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true
      }
    });
  });
});
