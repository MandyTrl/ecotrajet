## Ecotrajet

EcoTrajet est un projet visant à aider les utilisateurs à comparer l'empreinte carbone de différents moyens de transport pour un trajet donné. Conçu pour sensibiliser et encourager des choix plus écoresponsables, il fournit des calculs précis basés sur des données fiables.

Ce projet est construit avec [Next.js](https://nextjs.org) et a été initialisé avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Fonctionnalités principales

Calcul d'empreinte carbone : Comparez les émissions de CO2 pour des trajets en voiture, bus, train ou avion.

Personnalisation : Prenez en compte le type de voiture (thermique vs électrique), le nombre de passagers, et la distance parcourue.

Accessibilité : Interface simple et adaptée aux appareils mobiles, tablettes et ordinateurs.

Sources fiables : Les calculs sont basés sur des données issues d'organismes reconnus et de recherches environnementales.

# Aperçu

# Installation et exécution

Clonez le dépôt :
`git clone https://github.com/MandyTrl/ecotrajet.git`

Accédez au répertoire du projet :
`cd ecotrajet`

Installez les dépendances :

```
npm install
# ou
yarn install
# ou
pnpm install
# ou
bun install
```

Lancez le serveur de développement :

```
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur pour voir l'application.

# Structure du projet

```
├── components
│   ├── Navbar.tsx      # Composant de navigation
│   ├── Footer.tsx      # Pied de page
│   └── ...             # Autres composants réutilisables
├── pages
│   ├── index.tsx       # Page d'accueil
│   ├── calculs-et-sources.tsx  # Page expliquant les calculs et les sources
│   ├── a-propos.tsx    # Page "À propos"
│   └── ...
├── styles
│   ├── globals.css     # Styles globaux
│   └── ...
├── utils
│   └── calculations.ts # Fonctions pour les calculs d'empreinte carbone
└── public
    └── images          # Images et actifs statiques
```

# Améliorations prévues

- Ajout d'une map pour visualiser le trajet
- Ajout de filtres supplémentaires pour le covoiturage
- Calculer la ratio d'empreinte carbone entre le bilan annuel et le voyage calculé

# Sources des données

Les émissions de CO2 sont calculées à partir de données fournies par :

ADEME

Base Carbone

Rapports environnementaux et études spécialisées.

Contribution

Les contributions sont les bienvenues ! Pour contribuer :

Forkez le dépôt.

Créez une nouvelle branche pour votre fonctionnalité ou correction de bug :

`git checkout -b feature/nom-de-la-fonctionnalite`

Faites vos modifications et ajoutez un commit :

`git commit -m "Ajout d'une nouvelle fonctionnalité"`

Poussez vos modifications sur votre fork :

`git push origin feature/nom-de-la-fonctionnalite`

Créez une Pull Request vers la branche principale du projet.

# Licence

Ce projet est sous licence MIT.

# Auteur

Mandy Trl - GitHub

Merci d'utiliser EcoTrajet ! Si vous avez des suggestions ou des retours, n'hésitez pas à ouvrir une issue ou à me contacter.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
