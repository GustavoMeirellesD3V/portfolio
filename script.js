/* =========================================================
   Portfólio — Gustavo Meirelles
   ========================================================= */

/* Ano no rodapé */
(function () {
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();

/* Rolagem suave nos links internos */
(function () {
  var suave = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var alvo = document.querySelector(link.getAttribute('href'));
      if (!alvo) return;
      e.preventDefault();
      alvo.scrollIntoView({ behavior: suave ? 'smooth' : 'auto', block: 'start' });
    });
  });
})();

/* Botão copiar e-mail */
(function () {
  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var origem = document.querySelector(btn.dataset.copy);
      if (!origem) return;
      var texto = origem.textContent.trim();
      var original = btn.textContent;

      function feedback(msg) {
        btn.textContent = msg;
        setTimeout(function () { btn.textContent = original; }, 1800);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(
          function () { feedback('Copiado'); },
          function () { selecionar(origem); feedback('Selecionado'); }
        );
      } else {
        selecionar(origem);
        feedback('Selecionado');
      }
    });
  });

  function selecionar(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
})();
