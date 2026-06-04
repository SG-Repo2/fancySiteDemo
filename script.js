/* =========================================================================
   HYDRO UNIVERSITY — "Read the Machine"
   Lenis + GSAP/ScrollTrigger. Motion is gated; interactions always run.
   ========================================================================= */

function formatStat(el, value) {
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  el.textContent = prefix + Math.round(value).toLocaleString("en-US") + suffix;
}

window.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasGSAP = !!(window.gsap && window.ScrollTrigger);

  if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

  /* ---------------------------------------------------------------- Lenis */
  let lenis = null;
  if (!reduce && window.Lenis && hasGSAP) {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // In-page anchor scrolling (only hijack when Lenis is driving)
  if (lenis) {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const id = a.getAttribute("href");
        if (!id || id.length < 2) return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: 0 });
      });
    });
  }

  /* ---------------------------------------------- always-on interactions */

  // Vibration FFT — hover/focus a peak to read the fault
  (function setupFFT() {
    const fft = document.querySelector(".fft");
    if (!fft) return;
    const readout = fft.querySelector(".fft__readout");
    const peaks = Array.from(fft.querySelectorAll(".fft-peak"));
    const fallback = fft.querySelector(".fft-peak.is-flag") || peaks[0];
    const show = (p) => {
      peaks.forEach((x) => x.classList.toggle("is-on", x === p));
      readout.innerHTML = "<b>" + p.dataset.fault + "</b> — " + p.dataset.detail;
    };
    peaks.forEach((p) => {
      const hit = p.querySelector(".hit");
      if (hit) hit.setAttribute("tabindex", "0");
      p.addEventListener("pointerenter", () => show(p));
      if (hit) hit.addEventListener("focus", () => show(p));
    });
    const svg = fft.querySelector(".fft__svg");
    if (svg) svg.addEventListener("pointerleave", () => show(fallback));
  })();

  // Pump-curve playground — slide flow, watch the operating point + verdict
  (function setupCurve() {
    const range = document.querySelector(".curve__range");
    const hq = document.querySelector(".curve__hq");
    const op = document.querySelector(".curve__op");
    const verdict = document.querySelector(".curve__verdict");
    if (!range || !hq || !op || !verdict) return;
    const L = hq.getTotalLength();
    const update = () => {
      const pt = hq.getPointAtLength((L * Number(range.value)) / 100);
      op.setAttribute("cx", pt.x);
      op.setAttribute("cy", pt.y);
      let msg;
      if (pt.x < 196) {
        msg = '<b data-zone="bad">Low flow</b> — suction recirculation, heat &amp; high radial load. Seals and bearings pay for it.';
      } else if (pt.x > 264) {
        msg = '<b data-zone="warn">High flow</b> — NPSH margin shrinks; cavitation and motor overload become the risk.';
      } else {
        msg = '<b data-zone="ok">Near BEP</b> — minimal radial load, longest seal &amp; bearing life.';
      }
      verdict.innerHTML = msg;
    };
    range.addEventListener("input", update);
    update();
  })();

  // Curriculum role chips (visual filter state)
  document.querySelectorAll(".curric__filters .chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".curric__filters .chip").forEach((c) => c.classList.remove("is-active"));
      chip.classList.add("is-active");
    });
  });

  const lightTree = (instant) => {
    const nodes = Array.from(document.querySelectorAll(".tree__nodes .node"));
    nodes.forEach((n, i) => {
      if (instant) n.classList.add("is-lit");
      else setTimeout(() => n.classList.add("is-lit"), i * 130);
    });
  };

  /* ----------------------------------------- no-GSAP / reduced-motion exits */

  if (!hasGSAP) {
    // Counters can't animate — show the real values so we never render "0".
    document.querySelectorAll(".stat__n").forEach((n) => formatStat(n, Number(n.dataset.count)));
    lightTree(true);
    root.classList.remove("is-loading");
    return;
  }

  // Rail is a scroll *indicator*, not motion — wire it up either way.
  document.querySelectorAll(".rail__dot").forEach((dot) => {
    const section = document.querySelector(dot.getAttribute("href"));
    if (!section) return;
    ScrollTrigger.create({
      trigger: section,
      start: "top 55%",
      end: "bottom 45%",
      onToggle: (self) => dot.classList.toggle("is-active", self.isActive),
    });
  });
  const progress = document.querySelector(".rail__progress b");
  if (progress) {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => progress.style.setProperty("--p", self.progress * 100 + "%"),
    });
  }

  if (reduce) {
    document.querySelectorAll(".stat__n").forEach((n) => formatStat(n, Number(n.dataset.count)));
    lightTree(true);
    root.classList.remove("is-loading");
    return;
  }

  /* ----------------------------------------------------- FULL MOTION PATH */

  // 001 — hero intro (build first, then drop the FOUC guard = flash-free)
  const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
  intro
    .from(".nav", { y: -18, autoAlpha: 0, duration: 0.5 }, 0)
    .from(".hero__copy .chapter", { y: 18, autoAlpha: 0, duration: 0.5 }, 0.15)
    .from(".hero h1 .line > span", { yPercent: 116, duration: 0.85, stagger: 0.08 }, 0.28)
    .from(".hero__lead", { y: 24, autoAlpha: 0, duration: 0.55 }, 0.85)
    .from(".hero__actions", { y: 20, autoAlpha: 0, duration: 0.5 }, 1.02)
    .from(".monitor", { x: 40, autoAlpha: 0, duration: 0.75 }, 0.65);

  // draw the monitor trend as the panel arrives
  const trend = document.querySelector(".trend");
  if (trend) {
    const len = trend.getTotalLength();
    gsap.set(trend, { strokeDasharray: len, strokeDashoffset: len });
    intro.to(trend, { strokeDashoffset: 0, duration: 1.1, ease: "power2.out" }, 0.8);
  }

  root.classList.remove("is-loading");

  // hero ambient (paused when hero leaves the viewport)
  const heroAmbient = gsap
    .timeline({ repeat: -1, yoyo: true, paused: true })
    .to(".trend__head", { attr: { r: 6.5 }, duration: 1.1, ease: "sine.inOut" }, 0)
    .to(".monitor__state", { autoAlpha: 0.55, duration: 1.1, ease: "sine.inOut" }, 0);
  ScrollTrigger.create({
    trigger: ".hero",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? heroAmbient.play() : heroAmbient.pause()),
  });

  // hero parallax
  gsap.to(".hero__bg", {
    yPercent: 12, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });
  gsap.to(".monitor", {
    yPercent: -12, ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
  });

  // 002 — exploded pump (pinned scrub) + synced stepper + part highlight
  const stage = document.querySelector(".machine__stage");
  if (stage) {
    gsap.set(".pump .plabel, .pump .lead", { autoAlpha: 0 });
    const steps = Array.from(document.querySelectorAll(".part-step"));
    const order = ["impeller", "seal", "bearings", "shaft", "casing"];
    const partEls = Array.from(document.querySelectorAll(".pump-part"));

    const explode = gsap.timeline({
      scrollTrigger: {
        trigger: ".machine",
        start: "top top",
        end: "+=150%",
        pin: stage,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const i = Math.min(order.length - 1, Math.floor(self.progress * order.length));
          steps.forEach((s, k) => s.classList.toggle("is-active", k === i));
          partEls.forEach((p) => p.classList.toggle("is-active", p.dataset.part === order[i]));
        },
      },
    });
    explode
      .to(".pump .plabel, .pump .lead", { autoAlpha: 1, duration: 0.25 }, 0)
      .to("[data-part='discharge']", { y: -110 }, 0)
      .to("[data-part='casing']", { x: -70, y: -54 }, 0)
      .to("[data-part='suction']", { x: -120, y: -6 }, 0)
      .to("[data-part='impeller']", { x: -30, y: 150 }, 0)
      .to("[data-part='seal']", { x: 8, y: -150 }, 0)
      .to("[data-part='shaft']", { x: 96 }, 0)
      .to("[data-part='bearings']", { x: 150, y: 14 }, 0)
      .to("[data-part='base']", { y: 84 }, 0);
  }

  // impeller spin (paused off-screen)
  const spin = gsap.to(".imp-vanes", {
    rotation: 360, svgOrigin: "330 300", duration: 16, ease: "none", repeat: -1, paused: true,
  });
  ScrollTrigger.create({
    trigger: ".machine",
    start: "top bottom",
    end: "bottom top",
    onToggle: (self) => (self.isActive ? spin.play() : spin.pause()),
  });

  // 003 — case file
  gsap.from(".case__head", {
    y: 36, autoAlpha: 0, duration: 0.7,
    scrollTrigger: { trigger: ".case", start: "top 78%", once: true },
  });
  gsap.from(".case__card", {
    y: 44, autoAlpha: 0, duration: 0.7, stagger: 0.12,
    scrollTrigger: { trigger: ".case__track", start: "top 80%", once: true },
  });

  // 004 — diagnostics
  gsap.from(".diag__head", {
    y: 36, autoAlpha: 0, duration: 0.7,
    scrollTrigger: { trigger: ".diag", start: "top 78%", once: true },
  });
  gsap.from(".panel", {
    y: 44, autoAlpha: 0, duration: 0.7, stagger: 0.12,
    scrollTrigger: { trigger: ".diag__grid", start: "top 82%", once: true },
  });
  gsap.from(".fft__peaks .fft-peak", {
    autoAlpha: 0, y: 18, duration: 0.5, stagger: 0.08,
    scrollTrigger: { trigger: ".fft", start: "top 76%", once: true },
  });
  const pfCurve = document.querySelector(".pf__curve");
  if (pfCurve) {
    const len = pfCurve.getTotalLength();
    gsap.set(pfCurve, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(pfCurve, {
      strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut",
      scrollTrigger: { trigger: ".pf", start: "top 76%", once: true },
    });
    gsap.from(".pf-pt", {
      autoAlpha: 0, y: 12, duration: 0.45, stagger: 0.12,
      scrollTrigger: { trigger: ".pf", start: "top 68%", once: true },
    });
  }

  // 005 — curriculum tree (links draw, nodes light)
  gsap.from(".curric__head", {
    y: 36, autoAlpha: 0, duration: 0.7,
    scrollTrigger: { trigger: ".curric", start: "top 78%", once: true },
  });
  document.querySelectorAll(".tree__links path").forEach((p) => {
    const len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
  });
  gsap.to(".tree__links path", {
    strokeDashoffset: 0, duration: 1, ease: "power2.inOut", stagger: 0.08,
    scrollTrigger: { trigger: ".tree", start: "top 72%", once: true },
  });
  ScrollTrigger.create({
    trigger: ".tree", start: "top 70%", once: true,
    onEnter: () => lightTree(false),
  });

  // 006 — proof: count-ups (the reduced-motion path above already settles them)
  document.querySelectorAll(".stat__n").forEach((n) => {
    const target = Number(n.dataset.count);
    const obj = { v: 0 };
    gsap.to(obj, {
      v: target, duration: 1.8, ease: "power2.out",
      scrollTrigger: { trigger: n, start: "top 88%", once: true },
      onUpdate: () => formatStat(n, obj.v),
    });
  });
  gsap.from(".stat", {
    y: 40, autoAlpha: 0, duration: 0.7, stagger: 0.1,
    scrollTrigger: { trigger: ".proof__stats", start: "top 82%", once: true },
  });

  // 007 — transfer
  gsap.from(".transfer__media", {
    x: -60, autoAlpha: 0, duration: 0.8,
    scrollTrigger: { trigger: ".transfer", start: "top 76%", once: true },
  });
  gsap.from(".transfer__body > *", {
    y: 34, autoAlpha: 0, duration: 0.7, stagger: 0.08,
    scrollTrigger: { trigger: ".transfer", start: "top 72%", once: true },
  });

  // 008 — enroll
  gsap.from(".enroll__inner > *", {
    y: 40, autoAlpha: 0, duration: 0.75, stagger: 0.1,
    scrollTrigger: { trigger: ".enroll", start: "top 80%", once: true },
  });

  // recompute pinned/scrub geometry once everything (images) has loaded
  window.addEventListener("load", () => ScrollTrigger.refresh());
});
