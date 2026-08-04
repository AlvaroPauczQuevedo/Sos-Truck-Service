(function(){
  "use strict";
  /* ---- Rodas do caminhão: respeita "reduzir movimento" (SMIL não obedece a media query) ---- */
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".truck-wheel animateTransform").forEach(function(el){ el.remove(); });
  }

  /* ---- WhatsApp: número central e mensagens por contexto ---- */
  var WA_NUMBER = "5554999005275"; /* (54) 99900-5275 */
  var DEFAULT_MSG = "Olá! Preciso de atendimento para meu caminhão. Vim pelo site.";
  function waHref(msg){ return "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(msg || DEFAULT_MSG); }
  document.querySelectorAll("[data-wa]").forEach(function(a){
    a.setAttribute("href", waHref(a.getAttribute("data-msg")));
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  /* ---- Header compacto ao rolar ---- */
  var topbar = document.getElementById("topbar");
  function onScroll(){ if(topbar){ topbar.classList.toggle("scrolled", window.scrollY > 12); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- Menu mobile ---- */
  var toggle = document.getElementById("menuToggle");
  var menu = document.getElementById("mmenu");
  if (toggle && menu) {
    toggle.addEventListener("click", function(){
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    menu.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Animações de entrada ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add("in"); });
  }

  /* ---- Galeria: abas de categoria ---- */
  var galTabs = document.querySelectorAll(".gal-tab");
  var galItems = document.querySelectorAll(".gal-item");
  if (galTabs.length && galItems.length) {
    galTabs.forEach(function(tab){
      tab.addEventListener("click", function(){
        galTabs.forEach(function(t){ t.classList.remove("active"); });
        tab.classList.add("active");
        var cat = tab.getAttribute("data-cat");
        galItems.forEach(function(item){
          var show = cat === "todos" || item.getAttribute("data-cat") === cat;
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  /* ---- Galeria: lightbox ---- */
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbTitle = lightbox.querySelector("[data-lb-title]");
    var lbTag = lightbox.querySelector("[data-lb-tag]");
    function openLightbox(item){
      lbTitle.textContent = item.getAttribute("data-title") || "";
      lbTag.textContent = item.getAttribute("data-cat-label") || "";
      lightbox.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeLightbox(){
      lightbox.classList.remove("open");
      document.body.style.overflow = "";
    }
    galItems.forEach(function(item){
      item.addEventListener("click", function(){ openLightbox(item); });
    });
    lightbox.addEventListener("click", function(e){
      if (e.target === lightbox || e.target.closest("[data-lb-close]")) { closeLightbox(); }
    });
    document.addEventListener("keydown", function(e){
      if (e.key === "Escape") { closeLightbox(); }
    });
  }

  /* ---- Trabalhe Conosco: monta mensagem e abre WhatsApp ---- */
  var jobForm = document.getElementById("jobForm");
  if (jobForm) {
    jobForm.addEventListener("submit", function(e){
      e.preventDefault();
      var nome = jobForm.querySelector("#jf-nome").value.trim();
      var telefone = jobForm.querySelector("#jf-telefone").value.trim();
      var cidade = jobForm.querySelector("#jf-cidade").value.trim();
      var area = jobForm.querySelector("#jf-area");
      var areaLabel = area.options[area.selectedIndex] ? area.options[area.selectedIndex].text : "";
      var experiencia = jobForm.querySelector("#jf-experiencia").value.trim();

      if (!nome || !telefone || !area.value) {
        jobForm.reportValidity();
        return;
      }

      var msg = "Olá! Quero me candidatar a uma vaga na SOS Truck Service.\n\n" +
        "Nome: " + nome + "\n" +
        "Telefone: " + telefone + "\n" +
        (cidade ? "Cidade: " + cidade + "\n" : "") +
        "Área de interesse: " + areaLabel + "\n" +
        (experiencia ? "Experiência: " + experiencia : "");

      window.open(waHref(msg), "_blank", "noopener");
    });
  }
})();
