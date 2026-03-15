# Le Petit Coloriste

Une [Gem](https://gemini.google.com) Google Gemini (assistant personnalisé) qui transforme de simples descriptions en pages de coloriage prêtes à imprimer pour les jeunes enfants (dès 5 ans). Un compte Google gratuit est nécessaire pour y accéder.

[Essayer la Gem](https://gemini.google.com/gem/b2004aa806f7?usp=sharing)

## Ce que ça fait

Le Petit Coloriste génère des coloriages adaptés aux enfants avec :

- **Traits très épais** pour ne pas dépasser
- **Grands espaces vides** adaptés aux petites mains
- **Aucun gris ni ombre** — du blanc pur à remplir
- **Format A4 paysage** — prêt à imprimer

Les coloriages sont générés par Google Gemini avec le modèle de génération d'image **Nao Banana 2**.

## Premier coloriage

Pour découvrir comment créer votre premier coloriage en 3 étapes, rendez-vous directement sur le site : [lepetitcoloriste.rlespinasse.io](https://lepetitcoloriste.rlespinasse.io/).

## Développement

### Prérequis

- [mise](https://mise.jdx.dev/) — gère les versions de Node.js et just
- [just](https://just.systems/) — exécuteur de commandes (installé via mise)

### Démarrage rapide

```sh
just install   # Installer les outils (via mise) et les dépendances npm
just dev       # Lancer le serveur local avec rechargement automatique
```

### Commandes disponibles

| Commande                 | Description                                         |
| ------------------------ | --------------------------------------------------- |
| `just install`           | Installer les outils et les dépendances npm         |
| `just dev`               | Servir le site en local avec rechargement auto      |
| `just lint`              | Lancer tous les linters (HTML, CSS, JS, Markdown)   |
| `just lint-fix`          | Corriger automatiquement les erreurs de lint        |
| `just lint-html`         | Linter les fichiers HTML uniquement                 |
| `just lint-css`          | Linter les fichiers CSS uniquement                  |
| `just lint-js`           | Linter les fichiers JS uniquement                   |
| `just lint-md`           | Linter les fichiers Markdown uniquement             |
| `just generate-favicons` | Générer les variantes de favicon depuis le SVG      |
| `just update-gem <id>`   | Mettre à jour l'ID de la Gem dans tous les fichiers |
| `just check-gem`         | Vérifier la cohérence et l'accessibilité de la Gem  |
| `just ci`                | Lancer toutes les vérifications CI                  |

### Structure du projet

```text
site/               # Site statique servi par GitHub Pages
  404.html           # Redirection vers index.html
  index.html         # Page d'accueil principale
  app.js             # Gestion des modales et analytics
  style.css          # Styles
  favicon.svg        # Logo SVG (source pour la génération des favicons)
  site.webmanifest   # Manifeste d'application web
  exemples/          # Images d'exemples de coloriages
scripts/             # Scripts de build et maintenance
  generate-favicons.js
  update-gem-url.js  # Mise à jour de l'URL de la Gem
  check-gem-url.js   # Vérification de l'URL de la Gem
gem.json             # Source de vérité pour l'ID et l'URL de la Gem
```

### Pourquoi 404.html ?

Le site est hébergé sur GitHub Pages et utilise une architecture mono-page. GitHub Pages sert `404.html` comme page de secours pour toutes les routes, qui redirige vers `index.html` où se trouve le contenu réel du site.

## Déploiement

Le site est automatiquement déployé sur GitHub Pages après chaque release via le [workflow de déploiement](.github/workflows/deploy.yml). Le répertoire `site/` est publié tel quel.

Les pull requests sont vérifiées par le [workflow CI](.github/workflows/ci.yml), qui lance les linters et vérifie la cohérence et l'accessibilité de l'URL de la Gem.

## Licence

[MIT](LICENSE.md)
