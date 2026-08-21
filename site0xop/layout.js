// layout.js — header/footer dynamiques + bouton sticky, alimentés par infos.json

function svgFacebook() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.86c0-2.51 1.5-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.94 8.44-9.94z"/></svg>';
}
function svgInstagram() {
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.41.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.41 2.22-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.41-.56-.21-.96-.47-1.38-.89-.42-.42-.68-.82-.89-1.38-.17-.42-.36-1.05-.41-2.22C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.24-1.8.41-2.22.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.05-.36 2.22-.41C8.42 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5.01-4.72.07-.96.04-1.48.2-1.82.34-.46.18-.78.39-1.13.73-.34.35-.55.67-.73 1.13-.14.34-.3.86-.34 1.82C3.21 8.5 3.2 8.85 3.2 12s.01 3.5.07 4.72c.04.96.2 1.48.34 1.82.18.46.39.78.73 1.13.35.34.67.55 1.13.73.34.14.86.3 1.82.34 1.22.06 1.57.07 4.72.07s3.5-.01 4.72-.07c.96-.04 1.48-.2 1.82-.34.46-.18.78-.39 1.13-.73.34-.35.55-.67.73-1.13.14-.34.3-.86.34-1.82.06-1.22.07-1.57.07-4.72s-.01-3.5-.07-4.72c-.04-.96-.2-1.48-.34-1.82a3.02 3.02 0 0 0-.73-1.13 3.02 3.02 0 0 0-1.13-.73c-.34-.14-.86-.3-1.82-.34C15.5 4.01 15.15 4 12 4zm0 3.38a4.62 4.62 0 1 1 0 9.24 4.62 4.62 0 0 1 0-9.24zm0 1.8a2.82 2.82 0 1 0 0 5.64 2.82 2.82 0 0 0 0-5.64zm5.88-2.02a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z"/></svg>';
}

const PAGES = [
  { id: 'accueil', label: 'Accueil', href: 'index.html#accueil' },
  { id: 'histoire', label: 'Notre histoire', href: 'index.html#histoire' },
  { id: 'menu', label: 'La carte', href: 'menu-page.html' },
  { id: 'ambiance', label: 'Ambiance', href: 'ambiance-page.html' },
  { id: 'localisation', label: 'Localisation', href: 'index.html#localisation' },
  { id: 'contact', label: 'Contact', href: 'index.html#contact' }
];

function construireHeader(infos, pageActive) {
  const nom = infos.restaurant.nom;
  const sousTitre = infos.restaurant.sous_titre;
  const navItems = PAGES.map(p => {
    const isActive = p.id === pageActive;
    return `<li><a href="${p.href}"${isActive ? ' aria-current="page"' : ''}>${p.label}</a></li>`;
  }).join('');

  return `
    <div class="container">
      <div class="identite">
        <h1>${nom}</h1>
        <p>${sousTitre}</p>
      </div>
      <nav class="site-nav" aria-label="Navigation principale">
        <ul>${navItems}</ul>
      </nav>
    </div>
  `;
}

function construireFooter(infos) {
  const nom = infos.restaurant.nom;
  const sousTitre = infos.restaurant.sous_titre;
  const annee = new Date().getFullYear();
  let reseaux = '';
  if (infos.restaurant.facebook) {
    reseaux += `<a href="${infos.restaurant.facebook}" target="_blank" rel="noopener" aria-label="Page Facebook de ${nom}">${svgFacebook()}</a>`;
  }
  if (infos.restaurant.instagram) {
    reseaux += `<a href="${infos.restaurant.instagram}" target="_blank" rel="noopener" aria-label="Page Instagram de ${nom}">${svgInstagram()}</a>`;
  }
  if (!reseaux) {
    reseaux = '<p class="reseaux-absents">Réseaux sociaux à confirmer avec le restaurant</p>';
  }

  return `
    <div class="container">
      <h2>${nom}</h2>
      <p>${sousTitre}</p>
      <div class="reseaux-sociaux">${reseaux}</div>
      <p class="copyright">&copy; ${annee} ${nom}. Tous droits réservés.</p>
    </div>
  `;
}

function construireAppelSticky(infos) {
  const nom = infos.restaurant.nom;
  return `<a href="${infos.restaurant.telephone_lien}" aria-label="Appeler ${nom} au ${infos.restaurant.telephone_affiche}">📞 Réserver — ${infos.restaurant.telephone_affiche}</a>`;
}

async function initLayout() {
  const pageActive = document.body.getAttribute('data-page') || '';
  const headerMount = document.getElementById('site-header-mount');
  const footerMount = document.getElementById('site-footer-mount');

  try {
    const res = await fetch('infos.json');
    if (!res.ok) throw new Error('Réponse invalide');
    const infos = await res.json();

    if (headerMount) {
      headerMount.innerHTML = construireHeader(infos, pageActive);
    }
    if (footerMount) {
      footerMount.innerHTML = construireFooter(infos);
      const sticky = document.createElement('div');
      sticky.className = 'appel-sticky';
      sticky.innerHTML = construireAppelSticky(infos);
      document.body.appendChild(sticky);
    }

    document.dispatchEvent(new CustomEvent('infosChargees', { detail: infos }));
  } catch (err) {
    const msg = 'Les informations n\'ont pas pu être chargées. Vérifiez que infos.json est bien présent.';
    if (headerMount) headerMount.innerHTML = `<div class="container"><p class="message-erreur">${msg}</p></div>`;
    if (footerMount) footerMount.innerHTML = `<div class="container"><p class="message-erreur">${msg}</p></div>`;
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', initLayout);
