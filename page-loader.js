window.Webflow ||= [];
window.Webflow.push(() => {
  gsap.registerPlugin(SplitText);

  // Define loader type from body attribute 
  const loaderType = document.body.getAttribute("data-loader");
  const hasVisited = sessionStorage.getItem("pft-has-visited");

  const logo = $('[data-animate="loader-logo"]');
  const loaderComponent = $('[data-animate="loader-component"]');

  const heroTagline = $('[data-animate="hero-tagline"]');
  const heroHeading = $('[data-animate="hero-heading"]');
  const paragraph = $('[data-animate="hero-paragraph"]');

  const pageLoad = gsap.timeline();

  // Helper: wrap lines in masking span
  function wrapLinesInMask(lines) {
    lines.forEach(line => {
      const wrapper = document.createElement("span");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      line.parentNode.insertBefore(wrapper, line);
      wrapper.appendChild(line);
      line.style.display = "inline-block";
    });
  }

  // Animate loader logo (only if not visited)
  if (!hasVisited) {
    pageLoad.to(logo, {
      yPercent: -100,
      ease: "power3.inOut",
      duration: 1.2
    });

    pageLoad.to(loaderComponent, {
      autoAlpha: 0,
      ease: "power3.inOut",
      duration: 1.2
    }, "-=.2");
  } else {
    pageLoad.set(logo, { yPercent: 0 });
    pageLoad.to(loaderComponent, {
      autoAlpha: 0, //change back to yPercent -100
      ease: "power3.inOut",
      duration: 0.6
    });
  }

  // Primary Loader
  if (loaderType === "primary") {

    if (heroTagline.length > 0) {
      let splitTagline = new SplitText(heroTagline.get(0), {
        type: "lines",
        linesClass: "line"
      });
      wrapLinesInMask(splitTagline.lines);
      pageLoad.from(splitTagline.lines, {
        yPercent: 100,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.6");
    }

    if (heroHeading.length > 0) {
      let splitHeading = new SplitText(heroHeading.get(0), {
        type: "lines",
        linesClass: "line"
      });
      wrapLinesInMask(splitHeading.lines);
      pageLoad.from(splitHeading.lines, {
        yPercent: 100,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.6");
    }

    if (paragraph.length > 0) {
      let splitParagraph = new SplitText(paragraph.get(0), {
        type: "lines",
        linesClass: "line"
      });
      wrapLinesInMask(splitParagraph.lines);
      pageLoad.from(splitParagraph.lines, {
        yPercent: 100,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.6");
    }
  }

  // Tour Loader
  if (loaderType === "tour") {

    heroTagline.each(function () {
      let splitTagline = new SplitText(this, {
        type: "lines",
        linesClass: "line"
      });
      wrapLinesInMask(splitTagline.lines);
      pageLoad.from(splitTagline.lines, {
        yPercent: 100,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.6");
    });

    if (heroHeading.length > 0) {
      let splitHeading = new SplitText(heroHeading.get(0), {
        type: "lines",
        linesClass: "line"
      });
      wrapLinesInMask(splitHeading.lines);
      pageLoad.from(splitHeading.lines, {
        yPercent: 100,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1
      }, "-=0.6");
    }
  }

  // Store the visit flag
  sessionStorage.setItem("pft-has-visited", true);
});
