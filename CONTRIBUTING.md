# Contribuer

Les contributions sont les bienvenues ! Voici comment participer.

## Configurer votre environnement

1. Forkez et clonez le dépôt
2. Installez les dépendances :

   ```sh
   just install
   ```

3. Lancez le serveur de développement local :

   ```sh
   just dev
   ```

## Effectuer des modifications

1. Créez une branche à partir de `main`
2. Effectuez vos modifications dans le répertoire `site/`
3. Lancez les linters avant de commiter :

   ```sh
   just lint
   ```

4. Ouvrez une pull request vers `main`

## Style de code

Ce projet utilise des linters automatisés pour assurer la qualité du code :

- **HTML** — [HTMLHint](https://htmlhint.com/) (config : `.htmlhintrc`)
- **CSS** — [Stylelint](https://stylelint.io/) avec `stylelint-config-standard` (config : `.stylelintrc.json`)
- **JavaScript** — [ESLint](https://eslint.org/) (config : `eslint.config.js`)
- **Markdown** — [markdownlint](https://github.com/DavidAnson/markdownlint) (config : `.markdownlint-cli2.jsonc`)

Tous les linters sont exécutés automatiquement en CI sur les pull requests. Lancez `just lint` en local pour détecter les problèmes en amont.

## Mettre à jour les favicons

Si vous modifiez `site/favicon.svg`, regénérez toutes les variantes :

```sh
just generate-favicons
```

## Mettre à jour l'URL de la Gem

L'URL de la Gem est définie dans `gem.json` et référencée dans `site/index.html` et `README.md`. Pour mettre à jour l'ID de la Gem :

```sh
just update-gem <nouvel-id>
```

Cette commande remplace l'ancienne URL par la nouvelle dans tous les fichiers concernés.

Pour vérifier que l'URL est cohérente et accessible :

```sh
just check-gem
```

Cette vérification est aussi exécutée automatiquement en CI.

## Des questions ?

Ouvrez une [issue](https://github.com/rlespinasse/le-petit-coloriste/issues) sur GitHub.
