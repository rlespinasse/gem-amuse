#!/usr/bin/env just --justfile

# Installer les outils et les dépendances
install:
    mise install
    npm install

# Servir le site en local avec rechargement automatique
dev:
    npm run dev

# Lancer tous les linters
lint: lint-html lint-css lint-js lint-md

# Linter les fichiers HTML
lint-html:
    npm run lint:html

# Linter les fichiers CSS
lint-css:
    npm run lint:css

# Linter les fichiers JS
lint-js:
    npm run lint:js

# Linter les fichiers Markdown
lint-md:
    npm run lint:md

# Corriger automatiquement les erreurs de lint (CSS, JS, Markdown)
lint-fix:
    npm run lint:fix

# Générer les variantes de favicon depuis le SVG
generate-favicons:
    npm run generate:favicons

# Mettre a jour l'ID de la Gem
update-gem gem_id:
    npm run update:gem -- {{gem_id}}

# Verifier que l'URL de la Gem est accessible et coherente
check-gem:
    npm run check:gem

# Valider une pull request (toutes les vérifications)
ci: lint check-gem
