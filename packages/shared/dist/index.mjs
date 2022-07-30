// src/projects.ts
var projects = [
  {
    key: "tables",
    name: "Wikidata tables",
    description: "",
    link: "https://wikidata-table.vercel.app/",
    software: ["react-admin"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Wikidata_Table_Screenshot_2022-06-26.png/1024px-Wikidata_Table_Screenshot_2022-06-26.png",
    start: 2022,
    github: "https://github.com/codeledge/entitree-monorepo/tree/main/apps/wikidata-table"
  },
  {
    key: "entitree",
    name: "Entitree",
    description: "Tree diagrams for Wikidata",
    link: "https://entitree.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Family_tree_of_Elizabeth_II.png/640px-Family_tree_of_Elizabeth_II.png",
    logo: "https://www.entitree.com/logo-transparent.png",
    favicon: "https://www.entitree.com/favicon.png",
    start: 2020
  },
  {
    key: "charts",
    name: "Wikidata charts",
    description: "Wikidata Charts using SPARQL and React to draw line charts of properties or queries",
    link: "https://wikidata-charts.vercel.app/chart",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikidata_Charts_-_Screenshot_of_employees_of_tech_companies.png",
    software: ["recharts", "react-admin"],
    start: 2021,
    github: "https://github.com/codeledge/entitree-monorepo/tree/main/apps/wikidata-charts"
  },
  {
    key: "chordstop",
    name: "Chordstop",
    description: "Show chords and edit them. Better alternative to UltimateGuitar.",
    link: "https://chordstop.vercel.app/",
    start: 2022,
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Chordstop_Screenshot_2022-06-26.png/651px-Chordstop_Screenshot_2022-06-26.png",
    github: "https://github.com/codeledge/entitree-monorepo/tree/main/apps/chordstop"
  },
  {
    key: "images",
    name: "Entitree images",
    description: "Users can upload images of people which are then processed into different types of photos, zoomed into the face using GoogleVision and with the background removed. It offers a public API that can be queried using a Wikidata ID.",
    link: "https://images.entitree.com/",
    software: ["react-admin"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Screenshot_from_2022-06-21_23-06-07.png/1024px-Screenshot_from_2022-06-21_23-06-07.png",
    start: 2021,
    github: "https://github.com/codeledge/entitree-monorepo/tree/main/apps/entitree-images"
  },
  {
    key: "podcast",
    name: "Podcast Feed Generator",
    description: "Create a podcast feed from a Wikidata query",
    link: "https://podcast.nothispute.com/",
    software: [],
    show: false,
    start: 2022,
    github: "https://github.com/codeledge/entitree-monorepo/tree/main/apps/podcast-app"
  },
  {
    key: "streetview",
    name: "StreetView Viewer",
    description: "View and download StreetView images of your area.",
    link: "https://streetview.nothispute.com/",
    show: false,
    start: 2022
  },
  {
    key: "openapi",
    show: false,
    name: "OpenAPI Endpoints",
    link: "https://entitree-openapi.vercel.app/",
    description: "Generate OpenAPI endpoints from Wikidata",
    start: 2022
  }
];
var packages = [
  {
    package: "@entitree/helper",
    npmjs: "https://www.npmjs.com/package/@entitree/helper",
    github: "https://github.com/codeledge/entitree-monorepo/tree/main/packages/entitree-helper",
    description: "Super awesome helper function for Entitree projects. But anyone can use them"
  },
  {
    package: "@entitree/shared",
    npmjs: "https://www.npmjs.com/package/@entitree/shared",
    github: "https://github.com/codeledge/entitree-monorepo/tree/main/packages/shared",
    description: "Shared functions for our projects",
    internal: true
  },
  {
    package: "ra-data-simple-prisma",
    npmjs: "https://www.npmjs.com/package/ra-data-simple-prisma",
    github: "https://github.com/codeledge/ra-data-simple-prisma/tree/main/packages/ra-data-simple-prisma",
    description: "Create a fullstack react-admin app adding just one file on the server using the PRISMA typesafe orm!"
  }
];
export {
  packages,
  projects
};
