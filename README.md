# ec🌎trajet

<b>ecotrajet</b> est un projet visant à aider les utilisateurs à comparer l'empreinte carbone de différents moyens de transport pour un trajet donné. Conçu pour sensibiliser et encourager des choix plus écoresponsables, il fournit des calculs précis basés sur des données fiables.

Ce projet est construit avec [Next.js](https://nextjs.org) et a été initialisé avec [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Le style a été construit avec la librairie [Tailwind](<(https://tailwindcss.com/)>)

<br>

## 👀 Aperçu

<br>

## 🚀 Installation et exécution

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

<br>

## 🏗️ Structure du projet

```
├── api
│   ├── getCity
│   │   └── route.ts      # route pour le geocoding
│   └── ...               # autres routes
├── components
│   ├── UI
│   │    ├── Navbar.tsx      # navigation
│   │    ├── Footer.tsx      # pied de page
│   │    └── ...             # autres composants réutilisables
│   ├── CitiesSelector.tsx      # composant "sélecteur des villes"
│   └── ...             # autres composants
├── a-propos
│   ├── index.tsx       # page "À propos"
├── calculs-et-source
│   ├── index.tsx       # page expliquant les calculs et les sources
├── index.tsx       # page d'accueil
├── globals.css     # styles globaux
├── utils
│   ├── Context
│       ├── index.tsx      # context
│   ├── Types
│       ├── index.tsx      # typage global
│   ├── calculateHaversineDistance.ts # méthode de Haversine
│   └── ...
└── public
│    ├── logo.png   # logo
│    └── ...            # images et fichiers statiques
└── ...                 # autres fichiers
```

<br>

## 🧩 Améliorations prévues

- ~Ajout d'une map pour visualiser les points du trajet.~
- Ajout d'un tracé sur la map pour visualiser le trajet.
- ~Ajout de filtres supplémentaires pour le covoiturage par exemple.~
- ~Comparer l'empreinte carbone du voyage calculé avec le bilan annuel pour obtenir un ratio.~

<br>

## 📂 Sources des données

Les émissions de CO2 sont calculées à partir de données fournies par :

- [Base Empreinte®](https://prod-basecarbonesolo.ademe-dri.fr/documentation/UPLOAD_DOC_FR/index.htm?sommaire.htm)
- [Open Route Service](https://giscience.github.io/openrouteservice/)
- Rapports environnementaux, articles et études spécialisées.

<br>

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le dépôt.

2. Créez une nouvelle branche pour votre fonctionnalité ou correction de bug :

`git checkout -b feature/nom-de-la-fonctionnalite`

3. Faites vos modifications et ajoutez un commit :

`git commit -m "Ajout d'une nouvelle fonctionnalité"`

4. Poussez vos modifications sur votre fork :

`git push origin feature/nom-de-la-fonctionnalite`

5. Créez une Pull Request vers la branche principale du projet.

<br><br>

Merci d'utiliser <b>ecotrajet</b> ! Si vous avez des suggestions ou des retours, n'hésitez pas à ouvrir une issue ou à me contacter.

<br><br>
<b>✍️ Mandy Trl - GitHub</b>
