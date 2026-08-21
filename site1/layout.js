/* Header et footer communs, injectés sur chaque page.
   data-page sur <body> détermine le lien actif dans la nav.
   Téléphone, réseaux sociaux et nom sont chargés depuis infos.json. */

function renderHeader() {
  const page = document.body.dataset.page || '';
  const lienActif = (id) => (page === id ? ' aria-current="page"' : '');

  return `
  <a class="skip-link" href="#contenu">Aller au contenu principal</a>
  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="index.html" aria-label="Retour à l'accueil">
        <strong id="header-nom">AVRA Mykonos</strong>
        <span id="header-sous-titre">Taverne grecque – Bournens, Vaud</span>
      </a>
      <nav aria-label="Navigation principale">
        <a href="index.html"${lienActif('accueil')}>Accueil</a>
        <a href="index.html#histoire"${lienActif('histoire')}>Notre histoire</a>
        <a href="menu-page.html"${lienActif('menu')}>La carte</a>
        <a href="ambiance-page.html"${lienActif('ambiance')}>Ambiance</a>
        <a href="index.html#localisation"${lienActif('localisation')}>Localisation</a>
        <a href="index.html#contact"${lienActif('contact')}>Contact</a>
      </nav>
    </div>
  </header>`;
}

function renderFooter() {
  return `
  <a class="mobile-call" id="mobile-call-lien" href="tel:" aria-label="Appeler le restaurant">
    <span id="mobile-call-texte">Réserver</span>
  </a>
  <footer class="site-footer">
    <p><strong id="footer-nom">AVRA Mykonos</strong></p>
    <p id="footer-activite">Taverne grecque à Bournens, canton de Vaud, Suisse</p>
    <div class="social-links" id="social-links"></div>
    <p id="footer-copyright">© 2026 AVRA Mykonos – Tous droits réservés</p>
  </footer>`;
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
    if (mobileTexte) mobileTexte.innerHTML = '<span>Réserver : ' + r.telephone_affiche + '</span>';

    const footerNom = document.getElementById('footer-nom');
    const footerActivite = document.getElementById('footer-activite');
    const footerCopyright = document.getElementById('footer-copyright');
    if (footerNom) footerNom.textContent = r.nom;
    if (footerActivite) footerActivite.textContent = r.sous_titre;
    if (footerCopyright) footerCopyright.textContent = `© ${annee} ${r.nom} – Tous droits réservés`;

    const socialMount = document.getElementById('social-links');
    if (socialMount) {
      socialMount.innerHTML = `
        <a href="${r.facebook}" target="_blank" rel="noopener" aria-label="Page Facebook de ${r.nom}, ouverture dans un nouvel onglet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.58v1.9h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z"/></svg>
          Facebook
        </a>
        <a href="${r.instagram}" target="_blank" rel="noopener" aria-label="Page Instagram de ${r.nom}, ouverture dans un nouvel onglet">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.06 1.97.24 2.43.42.53.2.98.48 1.4.9.42.42.7.87.9 1.4.18.46.36 1.26.42 2.43.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.06 1.17-.24 1.97-.42 2.43-.2.53-.48.98-.9 1.4-.42.42-.87.7-1.4.9-.46.18-1.26.36-2.43.42-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.06-1.97-.24-2.43-.42-.53-.2-.98-.48-1.4-.9-.42-.42-.7-.87-.9-1.4-.18-.46-.36-1.26-.42-2.43C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.06-1.17.24-1.97.42-2.43.2-.53.48-.98.9-1.4.42-.42.87-.7 1.4-.9.46-.18 1.26-.36 2.43-.42C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.14 0-3.5.01-4.73.07-.96.05-1.48.2-1.83.34-.46.18-.79.39-1.13.73-.34.34-.55.67-.73 1.13-.14.35-.29.87-.34 1.83C3.18 8.5 3.17 8.86 3.17 12s.01 3.5.07 4.73c.05.96.2 1.48.34 1.83.18.46.39.79.73 1.13.34.34.67.55 1.13.73.35.14.87.29 1.83.34 1.23.06 1.59.07 4.73.07s3.5-.01 4.73-.07c.96-.05 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.73.34-.34.55-.67.73-1.13.14-.35.29-.87.34-1.83.06-1.23.07-1.59.07-4.73s-.01-3.5-.07-4.73c-.05-.96-.2-1.48-.34-1.83-.18-.46-.39-.79-.73-1.13a3.02 3.02 0 0 0-1.13-.73c-.35-.14-.87-.29-1.83-.34C15.5 4.01 15.14 4 12 4zm0 3.4a4.6 4.6 0 1 1 0 9.2 4.6 4.6 0 0 1 0-9.2zm0 1.8a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6zm5.85-3.6a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z"/></svg>
          Instagram
        </a>`;
    }
  } catch (e) {
    console.warn('infos.json non chargé pour le header/footer :', e);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const headerMount = document.getElementById('site-header-mount');
  const footerMount = document.getElementById('site-footer-mount');
  if (headerMount) headerMount.outerHTML = renderHeader();
  if (footerMount) footerMount.outerHTML = renderFooter();
  chargerInfosLayout();
});
