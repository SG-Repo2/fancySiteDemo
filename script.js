window.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (!prefersReducedMotion && window.Lenis) {
    const lenis = new Lenis({
      duration: 1.12,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.15
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (event) => {
        const target = document.querySelector(anchor.getAttribute("href"));

        if (!target) {
          return;
        }

        event.preventDefault();
        lenis.scrollTo(target, { offset: -8 });
      });
    });
  }

  if (!window.gsap || !window.ScrollTrigger) {
    return;
  }

  if (prefersReducedMotion) {
    gsap.set(
      [
        ".site-header",
        ".hero__eyebrow",
        ".hero-title__line span",
        ".hero__copy",
        ".hero__button",
        ".hero__systems",
        ".system-card",
        ".system-rail",
        ".system-node",
        ".training__media",
        ".training__content",
        ".feature-card",
        ".stat",
        ".final-cta__inner"
      ],
      { clearProps: "all" }
    );
    return;
  }

  const heroIntro = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroIntro
    .from(".site-header", {
      y: -18,
      autoAlpha: 0,
      duration: 0.58
    }, 0.08)
    .from(".hero__eyebrow", {
      y: 22,
      autoAlpha: 0,
      duration: 0.54
    }, 0.24)
    .from(
      ".hero-title__line span",
      {
        yPercent: 108,
        autoAlpha: 0,
        duration: 0.88,
        stagger: 0.08
      },
      0.42
    )
    .from(
      ".hero__copy",
      {
        y: 34,
        autoAlpha: 0,
        duration: 0.58
      },
      1.02
    )
    .from(
      ".hero__button",
      {
        y: 22,
        autoAlpha: 0,
        duration: 0.52
      },
      1.24
    )
    .from(
      ".hero__systems",
      {
        x: 42,
        autoAlpha: 0,
        duration: 0.62
      },
      0.82
    )
    .from(
      ".system-card",
      {
        x: 28,
        y: 10,
        autoAlpha: 0,
        duration: 0.5,
        stagger: 0.12
      },
      0.98
    )
    .from(
      ".system-rail",
      {
        scaleY: 0,
        autoAlpha: 0,
        duration: 0.58
      },
      0.94
    )
    .from(
      ".system-node",
      {
        scale: 0,
        autoAlpha: 0,
        duration: 0.36,
        stagger: 0.08
      },
      1.1
    )
    .fromTo(
      ".system-card__meter span",
      {
        scaleX: 0
      },
      {
        scaleX: 1,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out"
      },
      1.16
    )
    .from(
      ".hero__visual",
      {
        x: 90,
        y: 26,
        rotate: -2,
        autoAlpha: 0,
        duration: 0.9
      },
      1.05
    )
    .add(() => {
      gsap.to(".hero__visual", {
        y: -10,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".site-brand__mark", {
        scale: 1.08,
        duration: 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      gsap.to(".system-card", {
        y: -7,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.22
      });

      gsap.to(".system-node", {
        scale: 1.32,
        autoAlpha: 0.48,
        duration: 1.35,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.18
      });

      gsap.to(".site-header__status span", {
        scale: 1.25,
        autoAlpha: 0.58,
        duration: 1.1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, 2.06);

  gsap.to(".hero__background", {
    yPercent: 10,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".hero__content", {
    yPercent: -18,
    autoAlpha: 0.28,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".pump-cutaway", {
    yPercent: -13,
    xPercent: 4,
    rotate: 1.5,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".hero__systems", {
    yPercent: -26,
    xPercent: 4,
    autoAlpha: 0.22,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  const trainingTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".training",
      start: "top 72%",
      once: true
    },
    defaults: {
      duration: 0.9,
      ease: "power3.out"
    }
  });

  trainingTimeline
    .from(".training__media", {
      x: -82,
      autoAlpha: 0
    })
    .from(
      ".training__content",
      {
        x: 72,
        autoAlpha: 0
      },
      "-=0.68"
    )
    .from(
      ".feature-card",
      {
        y: 42,
        autoAlpha: 0,
        stagger: 0.13,
        duration: 0.62
      },
      "-=0.38"
    );

  gsap.from(".stat", {
    y: 42,
    autoAlpha: 0,
    duration: 0.78,
    ease: "power3.out",
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".stats-band",
      start: "top 72%",
      once: true
    }
  });

  document.querySelectorAll(".stat__number").forEach((number) => {
    const target = Number(number.dataset.count);
    const counter = { value: 0 };

    gsap.to(counter, {
      value: target,
      duration: 1.7,
      ease: "power2.out",
      snap: { value: 1 },
      scrollTrigger: {
        trigger: number,
        start: "top 84%",
        once: true
      },
      onUpdate: () => {
        number.textContent = Math.round(counter.value).toLocaleString("en-US");
      }
    });
  });

  gsap.from(".final-cta__inner", {
    y: 42,
    autoAlpha: 0,
    duration: 0.84,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".final-cta",
      start: "top 76%",
      once: true
    }
  });
});
