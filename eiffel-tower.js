/* Register Plugins */
gsap.registerPlugin(ScrollTrigger);

/* Variables */
let platinumTour = $('[data-tier="Platinum"]');
let silverTour = $('[data-tier="Silver"]');
let goldTour = $('[data-tier="Gold"]');
let basicTour = $('[data-tier="Basic"]');
let diamondTour = $('[data-tier="Diamond"]');

let platinumImage = $(".eiffel-tower_base-image.platinum-image");
let silverImage = $(".eiffel-tower_base-image.silver-image");
let goldImage = $(".eiffel-tower_base-image.gold-image");
let basicImage = $(".eiffel-tower_base-image.basic-image");
let diamondImage = $(".eiffel-tower_base-image.diamond-image");

let platinumBadge = $('[data-badge="Platinum"]');
let silverBadge = $('[data-badge="Silver"]');
let goldBadge = $('[data-badge="Gold"]');
let basicBadge = $('[data-badge="Basic"]');
let diamondBadge = $('[data-badge="Diamond"]');

gsap.utils.toArray(".tour_content").forEach((section) => {
  let tier = section.getAttribute("data-tier");
  let image = document.querySelector(`.eiffel-tower_base-image[data-tier='${tier}']`);
  let badge = document.querySelector(`[data-badge='${tier}']`);

  console.log("Matching for tier:", tier, {
    image: !!image,
    badge: !!badge,
  });

  // Animate image overlay
  if (image) {
    gsap.fromTo(
      image, { autoAlpha: 0 },
      {
        autoAlpha: 1,
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }

  // Animate badge visibility + background color
  if (badge) {
    gsap.fromTo(
      badge, {
        backgroundColor: "transparent"
      },
      {
        backgroundColor: "#f9add5",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  }
});

$("[data-badge]").each(function () {
  let tier = $(this).data("badge"); // e.g., "Platinum"
  $(this).wrapInner(`<a href="#${tier}"></a>`);
});
