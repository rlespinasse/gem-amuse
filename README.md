# Gem'Amuse

Un site qui rassemble plusieurs [Gems](https://gemini.google.com) Google Gemini (assistants personnalisés) créées pour s'amuser et apprendre, pour les enfants et leurs parents. Un compte Google gratuit suffit pour les utiliser.

[Découvrir les Gems](https://rlespinasse.github.io/gem-amuse/)

## Les Gems disponibles

| Gem | Description |
| --- | --- |
| **Le Labo des P'tits Curieux** | Expériences de science simples et sans danger avec des objets de la cuisine |
| **Les Défis Rigolos** | Petits défis physiques de 30 secondes pour bouger et rigoler |
| **Le Petit Détective** | Chasses aux trésors à la maison pour apprendre couleurs, formes et mots |
| **Le Petit Coloriste** | Coloriages prêts à imprimer adaptés aux jeunes enfants (traits épais, grands espaces) |

Les identifiants et URL de chaque Gem sont déclarés dans `gem.json`.

## Premiers pas

Pour découvrir comment utiliser une Gem en 3 étapes, rendez-vous directement sur le site : [rlespinasse.github.io/gem-amuse](https://rlespinasse.github.io/gem-amuse/).

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

| Commande                         | Description                                            |
| -------------------------------- | ------------------------------------------------------ |
| `just install`                   | Installer les outils et les dépendances npm           |
| `just dev`                       | Servir le site en local avec rechargement auto        |
| `just lint`                      | Lancer tous les linters (HTML, CSS, JS, Markdown)     |
| `just lint-fix`                  | Corriger automatiquement les erreurs de lint          |
| `just lint-html`                 | Linter les fichiers HTML uniquement                   |
| `just lint-css`                  | Linter les fichiers CSS uniquement                    |
| `just lint-js`                   | Linter les fichiers JS uniquement                     |
| `just lint-md`                   | Linter les fichiers Markdown uniquement               |
| `just generate-favicons`         | Générer les variantes de favicon depuis le SVG        |
| `just update-gem <old> <new>`    | Remplacer un identifiant de Gem dans tous les fichiers |
| `just check-gem`                 | Vérifier que les URL des Gems sont accessibles        |
| `just ci`                        | Lancer toutes les vérifications CI (lint + check-gem) |

### Structure du projet

```text
site/                    # Site statique servi par GitHub Pages
  index.html             # Page d'accueil (liste des Gems, étapes, FAQ, mentions légales)
  404.html               # Redirection de secours vers la page d'accueil
  app.js                 # Gestion des modales et déclencheurs analytics
  style.css              # Styles
  favicon.svg            # Logo SVG (source pour la génération des favicons)
  gem-coloriste.svg      # Icône de la Gem Petit Coloriste
  gem-defis.svg          # Icône de la Gem Défis Rigolos
  gem-detective.svg      # Icône de la Gem Petit Détective
  gem-labo.svg           # Icône de la Gem Labo des P'tits Curieux
  site.webmanifest       # Manifeste PWA
scripts/                 # Scripts de build et de maintenance
  generate-favicons.js   # Génère les variantes PNG depuis favicon.svg
  update-gem-url.js      # Remplace un identifiant de Gem dans le projet
  check-gem-url.js       # Vérifie l'accessibilité des URL de Gems
gem.json                 # Source de vérité des Gems (nom, identifiant, URL)
```

## Déploiement

Le site est automatiquement déployé sur GitHub Pages à chaque push sur `main` via le [workflow de déploiement](.github/workflows/deploy.yml). Le répertoire `site/` est publié tel quel.

Les pull requests sont vérifiées par le [workflow CI](.github/workflows/ci.yml), qui lance tous les linters et vérifie les URL des Gems.

## Licence

[MIT](LICENSE.md)
