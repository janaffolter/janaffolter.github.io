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
    <strong id="header-nom">Avra Mykonos @ Bournens</strong>
    <span id="header-sous-titre">Taverne grecque \u2013 Bournens, Vaud</span>
    </a>
    <nav>
      <a href="index.html"${lienActif('accueil')}>Accueil</a>
      <a href="menu-page.html"${lienActif('menu')}>La carte</a>
      <a id="menus-semaine-link" href="menus-semaine.html"${lienActif('menus-semaine')}>Menus de la semaine</a>
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
      <strong id="footer-nom">Avra Mykonos @ Bournens</strong>
      <span id="footer-activite">Taverne grecque \u2013 Bournens, Vaud</span>
    </div>
    <div class="footer-col">
      <a id="mobile-call-lien" class="btn" href="tel:+41218882317">
        R\u00e9server : <span id="mobile-call-texte">021 888 23 17</span>
      </a>
    </div>
    <div class="footer-col" id="social-links">
      <!-- R\u00e9seaux sociaux charg\u00e9s depuis infos.json -->
    </div>
    <div class="footer-bottom">
      <span id="footer-copyright">\u00a9 2026 Avra Mykonos @ Bournens \u2013 Tous droits r\u00e9serv\u00e9s</span>
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
        html += `<a class="social-link facebook" href="${r.facebook}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.84 7.94 9.73v-6.88H7.9v-2.85h2.04V9.41c0-2.02 1.2-3.14 3.03-3.14.88 0 1.8.16 1.8.16v1.98h-1.02c-1.01 0-1.32.63-1.32 1.28v1.53h2.24l-.36 2.85h-1.88V21.7C18.56 20.84 22 16.84 22 12z"/></svg>
          Facebook
        </a>`;
      }
      if (r.instagram) {
        html += `<a class="social-link instagram" href="${r.instagram}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5zm4.8-2.3a1.08 1.08 0 1 1-1.08 1.08A1.08 1.08 0 0 1 16.8 5.2zM12 9.5a2.5 2.5 0 1 0 2.5 2.5A2.5 2.5 0 0 0 12 9.5z"/></svg>
          Instagram
        </a>`;
      }
      if (r.tripadvisor) {
        html += `<a class="social-link tripadvisor" href="${r.tripadvisor}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 2c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5zm0 12c3.9 0 7 3.1 7 7H5c0-3.9 3.1-7 7-7z"/></svg>
          Tripadvisor
        </a>`;
      }
      /* if (!html) {
        html = '<span class="social-placeholder">\u00c0 suivre</span>';
      }*/
      socialMount.innerHTML = html;
    }

    // Show/hide the top "Menus de la semaine" link and teaser(s) based on infos.json menu_semaine flag
    if (data.menu_semaine === false) {
      const menuSemaineLink = document.getElementById('menus-semaine-link');
      if (menuSemaineLink) menuSemaineLink.remove();

      // Remove any teaser cards that link to the weekly menus
      document.querySelectorAll('a.teaser[href="menus-semaine.html"]').forEach(el => el.remove());
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