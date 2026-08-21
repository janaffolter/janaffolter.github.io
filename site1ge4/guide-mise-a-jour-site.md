# Guide simple : mettre à jour le site AVRA Mykonos

Ce guide s'adresse au propriétaire du restaurant, sans connaissances techniques. Il explique comment changer les informations les plus courantes, sans jamais toucher au code HTML.

Trois fichiers texte contiennent toutes les informations qui changent souvent :
- `infos.json` — téléphone, adresse, horaires, réseaux sociaux, images de la page d'accueil.
- `menu.json` — les plats de la carte.
- `ambiance.json` — les photos d'ambiance.

Ce sont des fichiers simples, à ouvrir avec le Bloc-notes (Windows), TextEdit (Mac), ou directement dans l'éditeur de fichiers de votre hébergeur web.

## 1. Changer le téléphone, l'adresse, les horaires, les liens ou les images d'accueil

Tout est centralisé dans **`infos.json`**. C'est le fichier le plus important à connaître : une seule modification ici se répercute automatiquement sur toutes les pages du site (bouton d'appel, bouton mobile en bas d'écran, section Contact, footer, carte Google Maps...).

### Changer le numéro de téléphone

```
"telephone_affiche": "+41 78 241 84 74",
"telephone_lien": "+41782418474",
```

Modifiez les deux lignes : `telephone_affiche` est le numéro visible sur le site (avec espaces), `telephone_lien` est la version utilisée pour l'appel automatique (sans espaces, avec le +). Le numéro se met à jour partout : bouton d'appel du haut de page, section Contact, bouton flottant sur mobile.

### Changer l'adresse

```
"adresse": {
  "rue": "Place du Collège 2",
  "npa": "1035",
  "localite": "Bournens",
  "canton": "Vaud",
  "pays": "Suisse"
}
```

Modifiez chaque ligne selon le besoin. L'adresse se met à jour dans la section Localisation et dans la section Contact.

### Changer la carte Google Maps

```
"google_maps_embed": "https://www.google.com/maps?q=Place+du+Coll%C3%A8ge+2,+1035+Bournens,+Vaud,+Suisse&output=embed"
```

Pour obtenir cette adresse : allez sur Google Maps, recherchez votre adresse, cliquez sur "Partager" puis "Intégrer une carte", copiez l'adresse qui commence par `https://www.google.com/maps?q=...&output=embed`.

### Changer les horaires

```
"horaires": [
  { "jours": "Mercredi – Dimanche", "creneaux": ["12:00 – 15:00", "19:00 – 23:30"] },
  { "jours": "Lundi – Mardi", "creneaux": ["Fermé"] }
],
"horaires_note": "Les horaires peuvent varier lors de jours fériés ; appelez-nous pour confirmer votre réservation."
```

Chaque ligne du tableau d'horaires est un bloc `{ "jours": "...", "creneaux": [...] }`. Vous pouvez :
- Changer les heures dans `creneaux` (gardez le format `"12:00 – 15:00"`).
- Ajouter une ligne pour un jour particulier (copiez un bloc, collez-le, séparé par une virgule).
- Écrire `["Fermé"]` pour un jour sans service.

Le tableau affiché sur le site se reconstruit automatiquement à partir de ces données.

### Changer les liens Facebook et Instagram

```
"facebook": "https://www.facebook.com/p/Avra-Mykonos-61555550109667/",
"instagram": "https://www.instagram.com/mykonosavra/"
```

Remplacez simplement l'adresse entre guillemets par le lien de votre nouvelle page. Ce lien apparaît dans le pied de page de toutes les pages du site.

### Changer les images de la page d'accueil

```
"images_accueil": {
  "image_hero": "images/img_0001.jpg",
  "image_vignette_menu": "images/img_0002.jpg",
  "image_vignette_ambiance": "images/img_0001.jpg"
}
```

- `image_hero` : la grande photo de fond en haut de la page d'accueil.
- `image_vignette_menu` : la photo de la vignette qui renvoie vers "La carte".
- `image_vignette_ambiance` : la photo de la vignette qui renvoie vers "Ambiance".

Pour changer une image, déposez d'abord votre nouvelle photo dans le dossier `images/` (voir section 4 ci-dessous), puis indiquez son nom ici.

## 2. Ajouter, modifier ou retirer un plat de la carte

Ouvrez `menu.json`. Vous verrez des blocs qui se répètent, comme celui-ci :

```
{
  "nom": "Moussaka",
  "description": "Gratin d'aubergines, viande hachée de bœuf et béchamel...",
  "prix": 21.5,
  "prix_label": null,
  "image": "images/img_0002.jpg",
  "vegetarien": false
}
```

**Pour changer un prix** : remplacez le chiffre après `"prix":` (ex. `21.5` devient `23.0`). Utilisez un point, jamais une virgule.

**Pour changer une description ou un nom** : remplacez le texte entre guillemets, en gardant les guillemets `" "`.

**Pour ajouter un nouveau plat** : copiez un bloc entier (de `{` à `}`), collez-le juste après, séparé par une virgule, et modifiez son contenu.

**Pour retirer un plat** : supprimez tout le bloc, de `{` à `}` inclus, ainsi que la virgule qui le séparait du plat suivant.

**Règle d'or** : chaque `{` doit avoir son `}`, chaque élément d'une liste est séparé par une virgule sauf le dernier. Si vous n'êtes pas sûr, faites une copie du fichier avant de modifier (voir section "Filet de sécurité" plus bas).

## 3. Ajouter ou changer une photo d'ambiance

Ouvrez `ambiance.json`. Chaque photo est un petit bloc :

```
{
  "image": "images/img_0007.jpg",
  "legende": "L'esprit taverne"
}
```

Changez le nom du fichier image ou la légende entre guillemets. Pour ajouter une photo, copiez ce bloc, collez-le, changez le nom d'image et la légende.

## 4. Ajouter une nouvelle photo (fichier image)

1. Prenez ou récupérez votre photo (format JPG de préférence, pas trop lourde — max 1–2 Mo).
2. Renommez-la en suivant le format existant : si la dernière photo est `img_0007.jpg`, la nouvelle sera `img_0008.jpg`.
3. Déposez-la dans le dossier `images/` de votre site (via l'interface de votre hébergeur, souvent un gestionnaire de fichiers en ligne).
4. Référencez ce nouveau nom dans `infos.json`, `menu.json` ou `ambiance.json` selon l'endroit où elle doit apparaître (voir sections ci-dessus).

## Filet de sécurité : ne rien casser

Avant toute modification :
1. Faites une copie du fichier que vous allez modifier (par exemple `infos.json` → `infos-copie-du-21-aout.json`), gardez-la de côté.
2. Modifiez l'original, enregistrez, et vérifiez le site dans le navigateur.
3. Si quelque chose ne s'affiche plus correctement (téléphone manquant, horaires bloqués sur "Chargement…", carte ou galerie qui ne s'affiche pas), c'est presque toujours une virgule ou un guillemet manquant dans le JSON. Remettez la copie de sauvegarde en place, et réessayez plus lentement.

Un outil gratuit en ligne comme [jsonlint.com](https://jsonlint.com) permet de coller le contenu de votre fichier JSON pour vérifier s'il est valide avant de le publier — cela évite 90 % des erreurs.

## Ce qui nécessite de repasser par un développeur (ou par moi)

- Changer les couleurs, polices ou la mise en page générale (dans `styles.css`).
- Ajouter une nouvelle page ou une nouvelle section.
- Modifier la structure du header/footer (`layout.js`).
- Ajouter de nouvelles fonctionnalités (formulaire de réservation, système de commande, etc.).
- Changer le nom du restaurant affiché dans le header et le footer (`nom` et `sous_titre` dans `infos.json` — techniquement modifiable seul, mais impacte aussi le référencement Google, donc à valider avec un professionnel).

## Résumé en une phrase

**Pour le téléphone, l'adresse, les horaires, les réseaux sociaux et les images d'accueil, éditez `infos.json` ; pour les plats, éditez `menu.json` ; pour les photos d'ambiance, éditez `ambiance.json` — le tout avec un simple éditeur de texte, sans jamais toucher au code.**
