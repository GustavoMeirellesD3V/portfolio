document.getElementById('y').textContent = new Date().getFullYear();

/* destaca a seção visível na navegação lateral */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.rail nav a'));
  var map = {};
  links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });

  var sections = Array.prototype.slice.call(document.querySelectorAll('.flow section'));
  if (!sections.length || !('IntersectionObserver' in window)) return;

  function setActive(id) {
    links.forEach(function (a) { a.classList.toggle('is-active', a === map[id]); });
  }
  setActive(sections[0].id);

  var visible = {};
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
    var best = null, bestVal = 0;
    sections.forEach(function (s) {
      var v = visible[s.id] || 0;
      if (v > bestVal) { bestVal = v; best = s.id; }
    });
    if (best) setActive(best);
  }, { rootMargin: '-15% 0px -45% 0px', threshold: [0, .25, .5, .75, 1] });

  sections.forEach(function (s) { io.observe(s); });
})();

/* rolagem suave */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var t = document.querySelector(a.getAttribute('href'));
    if (!t) return;
    e.preventDefault();
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });
});

/* copiar e-mail */
document.querySelectorAll('.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var el = document.querySelector(btn.dataset.copy);
    if (!el) return;
    var original = btn.textContent;
    function done(msg) { btn.textContent = msg; setTimeout(function () { btn.textContent = original; }, 1700); }
    function select() {
      try {
        var r = document.createRange(); r.selectNodeContents(el);
        var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      } catch (err) {}
    }
    try {
      navigator.clipboard.writeText(el.textContent.trim()).then(
        function () { done('Copiado'); },
        function () { select(); done('Selecionado'); }
      );
    } catch (err) { select(); done('Selecionado'); }
  });
});
