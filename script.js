/* ==========================================================================
   SANDRA CAEIRO PIRES — PORTFOLIO
   Interactions: typing loop, scroll reveal, nav, scroll progress
   ========================================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 1. Terminal typing loop (hero) ---------- */
  var phrases = [
    "limpiando datasets...",
    "construyendo ETLs...",
    "programando en Java...",
    "diseñando dashboards...",
    "automatizando flujos..."
  ];

  function typeLoop() {
    var el = document.getElementById("typedText");
    if (!el) return;

    if (prefersReducedMotion) {
      el.textContent = phrases[0];
      return;
    }

    var phraseIndex = 0;
    var charIndex = 0;
    var deleting = false;
    var typeSpeed = 55;
    var deleteSpeed = 28;
    var pauseEnd = 1400;
    var pauseStart = 300;

    function tick() {
      var current = phrases[phraseIndex];

      if (!deleting) {
        charIndex++;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, pauseEnd);
          return;
        }
        setTimeout(tick, typeSpeed);
      } else {
        charIndex--;
        el.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, pauseStart);
          return;
        }
        setTimeout(tick, deleteSpeed);
      }
    }
    tick();
  }

  /* ---------- 2. Scroll reveal ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    items.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- 3. Scroll progress bar ---------- */
  function initScrollBar() {
    var bar = document.getElementById("scrollBar");
    if (!bar) return;

    function update() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + "%";
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  }

  /* ---------- 4. Mobile nav toggle ---------- */
  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var mobileNav = document.getElementById("navLinksMobile");
    if (!toggle || !mobileNav) return;

    toggle.addEventListener("click", function () {
      var isOpen = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 5. Close other open project tickets when one opens ---------- */
  function initProjectAccordion() {
    var details = document.querySelectorAll(".ticket-project");
    details.forEach(function (d) {
      d.addEventListener("toggle", function () {
        if (d.open) {
          details.forEach(function (other) {
            if (other !== d) other.open = false;
          });
        }
      });
    });
  }

  /* ---------- 6. Copy email on click (in addition to mailto) ---------- */
  function initEmailCopy() {
    var link = document.getElementById("emailLink");
    if (!link || !navigator.clipboard) return;

    link.addEventListener("click", function () {
      navigator.clipboard.writeText("sandracapi03@gmail.com").catch(function () {
        /* silent fail: mailto still works as default action */
      });
    });
  }

  /* ---------- init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    typeLoop();
    initReveal();
    initScrollBar();
    initNavToggle();
    initProjectAccordion();
    initEmailCopy();
  });
})();
