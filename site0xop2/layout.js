/* Header et footer communs, injectes sur chaque page.
   data-page sur body determine le lien actif dans la nav.
   Le nom du restaurant est charge depuis infos.json. */

function renderHeader() {
  const page = document.body.dataset.page || '';
  const lienActif = (id) => (page === id ? ' aria-current="page"' : '');

  return `
<header class="site-header" id="site-header">
  <div class="container header-inner">
    <a class="brand" href="index.html">
      <strong id="header-nom">Le Br\u00fblot</strong>
      <span id="header-sous-titre">Cuisine de brasserie \u2013 Cossonay, Vaud</span>
    </a>
    <nav>
      <a href="index.html"${lienActif('accueil')}>Accueil</a>
      <a href="menu-page.html"${lienActif('menu')}>La carte</a>
      <a href="menus-semaine.html"${lienActif('menus-semaine')}>Menus de la semaine</a>
      <a href="ambiance-page.html"${lienActif('ambiance')}>Ambiance</a>
      <a href="infos.html"${lienActif('infos')}>Infos pratiques</a>
      <a class="btn" href="tel:+41218611541">R\u00e9server</a>
    </nav>
  </div>
</header>
  `.trim();
}

function renderFooter() {
  return `
<footer class="site-footer" id="site-footer">
  <div class="container footer-inner">
    <div class="footer-col">
      <strong id="footer-nom">Le Br\u00fblot</strong>
      <span id="footer-activite">Cuisine de brasserie \u2013 Cossonay, Vaud</span>
    </div>
    <div class="footer-col">
      <a id="mobile-call-lien" class="btn" href="tel:+41218611541">
        R\u00e9server : <span id="mobile-call-texte">021 861 15 41</span>
      </a>
    </div>
    <div class="footer-col" id="social-links">
      <!-- R\u00e9seaux sociaux charg\u00e9s depuis infos.json -->
    </div>
    <div class="footer-bottom">
      <span id="footer-copyright">\u00a9 2026 Le Br\u00fblot \u2013 Tous droits r\u00e9serv\u00e9s</span>
    </div>
  </div>
</footer>
  `.trim();
}

async function chargerInfosLayout() {
  try {
    const reponse = await fetch('infos.json');
    const data = await reponse.json();
    const r = data.restaurant;
    const annee = new Date().getFullYear();

    const headerNom = document.getElementById('header-nom');
    const headerSousTitre = document.getElementById('header-sous-titre');
    if (headerNom) headerNom.textContent = r.nom;
    if (headerSousTitre) headerSousTitre.textContent = r.sous_titre;

    const mobileLien = document.getElementById('mobile-call-lien');
    const mobileTexte = document.getElementById('mobile-call-texte');
    if (mobileLien) mobileLien.href = 'tel:' + r.telephone_lien;
    if (mobileTexte) mobileTexte.textContent = r.telephone_affiche;

    const footerNom = document.getElementById('footer-nom');
    const footerActivite = document.getElementById('footer-activite');
    const footerCopyright = document.getElementById('footer-copyright');
    if (footerNom) footerNom.textContent = r.nom;
    if (footerActivite) footerActivite.textContent = r.sous_titre;
    if (footerCopyright) footerCopyright.textContent = `\u00a9 ${annee} ${r.nom} \u2013 Tous droits r\u00e9serv\u00e9s`;

    const socialMount = document.getElementById('social-links');
    if (socialMount) {
      let html = '';
      if (r.facebook) {
        html += `<a class="social-link" href="${r.facebook}" target="_blank" rel="noopener">Facebook</a>`;
      }
      if (r.instagram) {
        html += `<a class="social-link" href="${r.instagram}" target="_blank" rel="noopener">Instagram</a>`;
      }
      if (!html) {
        html = '<span class="social-placeholder">\u00c0 suivre</span>';
      }
      socialMount.innerHTML = html;
    }
  } catch (e) {
    console.warn('infos.json non charg\u00e9 pour le header/footer :', e);
    const headerMount = document.getElementById('header-nom');
    if (headerMount) headerMount.textContent = 'Le Br\u00fblot';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const headerMount = document.getElementById('site-header-mount');
  const footerMount = document.getElementById('site-footer-mount');
  if (headerMount) headerMount.outerHTML = renderHeader();
  if (footerMount) footerMount.outerHTML = renderFooter();
  chargerInfosLayout();
});