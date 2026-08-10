window.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const page = document.querySelector(".hydrou-page");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);

  if (!page) {
    root.classList.remove("hydrou-is-loading");
    return;
  }

  const select = (selector) => page.querySelector(selector);
  const selectAll = (selector) => page.querySelectorAll(selector);

  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------- Lenis */
  let lenis = null;
  if (!reduce && window.Lenis && hasGSAP) {
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.15,
    });

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  if (lenis) {
    selectAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const id = link.getAttribute("href");
        if (!id || id.length < 2) return;

        const target = select(id);
        if (!target) return;

        event.preventDefault();
        lenis.scrollTo(target, { offset: 0 });
      });
    });
  }

  /* -------------------------------------------------- small interactions */
  const testimonials = [
    {
      quote:
        '"The instructor was well prepared and passionate. I\'ve already recommended the course to colleagues."',
      cite: "- Western Heights Water",
    },
    {
      quote:
        '"The practical examples helped our maintenance team connect classroom concepts to the equipment they service every day."',
      cite: "- Industrial Water Utility",
    },
    {
      quote:
        '"Hydro University gave our newer technicians a common language for reliability-centered maintenance."',
      cite: "- Regional Operations Manager",
    },
  ];

  const quoteEl = select(".testimonial-card__quote");
  const citeEl = select(".testimonial-card__cite");
  const prevBtn = select("[data-testimonial-prev]");
  const nextBtn = select("[data-testimonial-next]");
  let testimonialIndex = 0;

  const renderTestimonial = () => {
    if (!quoteEl || !citeEl) return;
    const current = testimonials[testimonialIndex];
    quoteEl.textContent = current.quote;
    citeEl.textContent = current.cite;
  };

  if (quoteEl && citeEl && prevBtn && nextBtn) {
    quoteEl.closest("blockquote")?.setAttribute("aria-live", "polite");
    prevBtn.addEventListener("click", () => {
      testimonialIndex = (testimonialIndex - 1 + testimonials.length) % testimonials.length;
      renderTestimonial();
    });
    nextBtn.addEventListener("click", () => {
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      renderTestimonial();
    });
  }

  /* ----------------------------------------- no-GSAP / reduced-motion exits */
  if (!hasGSAP || reduce) {
    root.classList.remove("hydrou-is-loading");
    return;
  }

  /* ----------------------------------------------------- full motion path */
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(
      selectAll(".collage-tile"),
      { y: 28, scale: 0.96, autoAlpha: 0, duration: 0.7, stagger: 0.07 },
      0.08
    )
    .from(select(".hero__lockup"), { y: 20, autoAlpha: 0, duration: 0.65 }, 0.38)
    .from(
      selectAll(".quicklinks a"),
      { y: 12, autoAlpha: 0, duration: 0.45, stagger: 0.06 },
      0.62
    );

  root.classList.remove("hydrou-is-loading");

  gsap.to(select(".hero__ribbon--one"), {
    yPercent: 13,
    ease: "none",
    scrollTrigger: { trigger: select(".hero"), start: "top top", end: "bottom top", scrub: true },
  });

  gsap.to(select(".hero__ribbon--two"), {
    yPercent: -10,
    ease: "none",
    scrollTrigger: { trigger: select(".hero"), start: "top top", end: "bottom top", scrub: true },
  });

  gsap.to(select(".hero__ribbon--three"), {
    yPercent: -18,
    ease: "none",
    scrollTrigger: { trigger: select(".hero"), start: "top top", end: "bottom top", scrub: true },
  });

  gsap.from(selectAll(".intro-title .line > span"), {
    yPercent: 112,
    duration: 0.85,
    stagger: 0.08,
    ease: "power3.out",
    scrollTrigger: { trigger: select(".intro"), start: "top 72%", once: true },
  });

  gsap.from(selectAll(".training-panel"), {
    y: 42,
    autoAlpha: 0,
    duration: 0.72,
    stagger: 0.14,
    ease: "power3.out",
    scrollTrigger: { trigger: select(".training__inner"), start: "top 78%", once: true },
  });

  gsap.from(selectAll(".course-card"), {
    y: 34,
    autoAlpha: 0,
    duration: 0.62,
    stagger: 0.1,
    ease: "power3.out",
    scrollTrigger: { trigger: select(".course-grid"), start: "top 82%", once: true },
  });

  gsap.from(select(".split-panel--webinars .split-panel__inner"), {
    x: -48,
    autoAlpha: 0,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: select(".split"), start: "top 72%", once: true },
  });

  gsap.from(select(".split-panel--experts .split-panel__inner"), {
    x: 48,
    autoAlpha: 0,
    duration: 0.75,
    ease: "power3.out",
    scrollTrigger: { trigger: select(".split"), start: "top 72%", once: true },
  });

  gsap.from(selectAll(".why-card, .why-media"), {
    y: (index) => [-24, 22, 38][index] || 0,
    autoAlpha: 0,
    duration: 0.78,
    stagger: 0.12,
    ease: "power3.out",
    scrollTrigger: { trigger: select(".why"), start: "top 74%", once: true },
  });

  gsap.from(selectAll(".learn-bubble"), {
    x: (index) => [38, -46, 30][index] || 0,
    y: (index) => [18, 30, 22][index] || 0,
    scale: 0.96,
    autoAlpha: 0,
    duration: 0.72,
    stagger: 0.16,
    ease: "power3.out",
    scrollTrigger: { trigger: select(".why-card--green"), start: "top 78%", once: true },
  });

  selectAll("[data-reveal]").forEach((el) => {
    gsap.from(el, {
      y: 34,
      autoAlpha: 0,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 84%", once: true },
    });
  });

  window.addEventListener("load", () => ScrollTrigger.refresh());
});
