# Lab 4

## Objectifs du TP

Approfondir la maîtrise des pipelines de CI sous GitHub Actions en mettant en pratique les notions avancées :
- Triggers et conditions d'exécution
- Parallélisation des jobs
- Mise en place du cache
- Utilisation de variables et paramètres
- Gestion des artifacts et de leur rétention
- Déploiement multi-environnements

## Pré-requis

- Avoir réalisé le Lab 3 (pipeline de CI fonctionnel)
- Prendre connaissance de la documentation relative à [`workflow_dispatch`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#workflow_dispatch), au [cache](https://docs.github.com/en/actions/writing-workflows/choosing-what-your-workflow-does/caching-dependencies-to-speed-up-workflows) et aux [conditions](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/using-conditions-to-control-job-execution)

## Partie 1 - Triggers

Configurer le pipeline pour qu'il soit déclenché dans les cas suivants :
1. À chaque push sur la branche `main`
2. À chaque Pull Request ciblant la branche `main`
3. Manuellement via `workflow_dispatch`
4. Le pipeline ne doit **pas** être déclenché si les seuls fichiers modifiés sont dans le dossier `docs/`
   - Indice : voir la propriété `paths-ignore` dans la documentation des triggers `push` et `pull_request`

Tester chaque trigger :
- Pousser un commit sur `main` et vérifier que le pipeline se lance
- Créer une Pull Request et vérifier que le pipeline se déclenche
- Lancer manuellement le pipeline depuis l'onglet Actions
- Pousser un commit qui ne modifie qu'un fichier dans `docs/` et vérifier que le pipeline ne se lance **pas**

## Partie 2 - Organisation du pipeline

Le pipeline doit se comporter différemment selon le trigger :

**À chaque commit sur `main` :**
1. L'application est build
2. Le package généré est stocké sous la forme d'un artifact

**À chaque Pull Request :**
1. L'application est build
2. Les analyses statiques (linter et typage statique) et les tests unitaires sont exécutés en parallèle

Mettre en place :
1. Le cache pnpm pour accélérer l'installation des dépendances entre les jobs
2. Les dépendances entre jobs avec `needs` pour que le build s'exécute avant les analyses et les tests
3. Les conditions (`if`) pour différencier le comportement entre un push sur `main` et une Pull Request

## Partie 3 - Variables et rétention des artifacts

1. Définir une variable d'environnement `NODE_VERSION` au niveau du workflow et l'utiliser dans tous les jobs.
2. Configurer la durée de rétention de l'artifact :
   - **1 semaine** si le package est issu de la branche `main`
   - **24h** sinon
   - Indice : utiliser le paramètre `retention-days` de l'action `actions/upload-artifact` et une expression conditionnelle

## Partie 4 - Déploiement et exécution manuelle

1. Ajouter un paramètre au `workflow_dispatch` permettant d'indiquer si l'on souhaite lancer les analyses statiques et les tests (input de type `boolean`, par défaut `true`).
2. Ajouter un second paramètre permettant de choisir l'environnement cible de déploiement : `QA` ou `PROD` (input de type `choice`).
3. Ajouter un job de déploiement qui :
   - Ne s'exécute que lors d'un déclenchement manuel
   - Simule le déploiement avec un simple `echo "Deploying to $ENVIRONMENT"`
   - Utilise la valeur du paramètre d'environnement choisie

## Pour aller plus loin

1. Réaliser l'équivalent de ce pipeline en GitLab CI (`.gitlab-ci.yml`).
   - Utiliser `rules` pour les conditions, `cache` pour le cache, `needs` pour les dépendances entre jobs
   - Utiliser les variables prédéfinies GitLab CI (`CI_COMMIT_BRANCH`, `CI_PIPELINE_SOURCE`, etc.)
   - Configurer un `schedule` et un déclenchement manuel avec des variables personnalisées
2. Comparer les deux implémentations : quelles sont les différences de syntaxe et de fonctionnement entre GitHub Actions et GitLab CI ?
