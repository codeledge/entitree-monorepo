// export type Software = "react-admin" | "recharts" | "entitree-flex";

export const projects: {
  key: string;
  name: string;
  description: string;
  link: string;
  image?: string;
  software?: string[];
  show?: boolean;
  github?: string;
  logo?: string;
  favicon?: string;
  start: number;
}[] = [
  {
    key: "tables",
    name: "Wikidata tables",
    description: "",
    link: "https://wikidata-table.vercel.app/",
    software: ["react-admin"],
    start: 2022,
    github:
      "https://github.com/codeledge/entitree-monorepo/tree/main/apps/wikidata-table",
  },
  {
    key: "entitree",
    name: "Entitree",
    description: "Tree diagrams for Wikidata",
    link: "https://entitree.com/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Family_tree_of_Elizabeth_II.png/640px-Family_tree_of_Elizabeth_II.png",
    logo: "https://www.entitree.com/logo-transparent.png",
    favicon: "https://www.entitree.com/favicon.png",
    start: 2020,
  },
  {
    key: "charts",
    name: "Wikidata charts",
    description:
      "Wikidata Charts using SPARQL and React to draw line charts of properties or queries",
    link: "https://wikidata-charts.vercel.app/",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikidata_Charts_-_Screenshot_of_employees_of_tech_companies.png",
    software: ["recharts", "react-admin"],
    start: 2021,
    github:
      "https://github.com/codeledge/entitree-monorepo/tree/main/apps/wikidata-charts",
  },
  {
    key: "chordstop",
    name: "Chordstop",
    description:
      "Show chords and edit them. Better alternative to UltimateGuitar.",
    link: "https://chordstop.vercel.app/",
    start: 2022,
    github:
      "https://github.com/codeledge/entitree-monorepo/tree/main/apps/chordstop",
  },
  {
    key: "images",
    name: "Entitree images",
    description: "",
    link: "https://images.entitree.com/",
    software: ["react-admin"],
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Screenshot_from_2022-06-21_23-06-07.png/1024px-Screenshot_from_2022-06-21_23-06-07.png",
    start: 2021,
    github:
      "https://github.com/codeledge/entitree-monorepo/tree/main/apps/entitree-images",
  },
  {
    key: "podcast",
    name: "Podcast Feed Generator",
    description: "Create a podcast feed from a Wikidata query",
    link: "https://podcast.nothispute.com/",
    software: [],
    show: false,
    start: 2022,
    github:
      "https://github.com/codeledge/entitree-monorepo/tree/main/apps/podcast-app",
  },
  {
    key: "streetview",
    name: "StreetView Viewer",
    description: "View and download StreetView images of your area.",
    link: "https://streetview.nothispute.com/",
    show: false,
    start: 2022,
  },
];

export const packages = [
  {
    package: "@entitree/helper",
    npmjs: "https://www.npmjs.com/package/@entitree/helper",
    github:
      "https://github.com/codeledge/entitree-monorepo/tree/main/packages/entitree-helper",
    description:
      "Super awesome helper function for Entitree projects. But anyone can use them",
  },
  {
    package: "ra-data-simple-prisma",
    npmjs: "https://www.npmjs.com/package/ra-data-simple-prisma",
    github:
      "https://github.com/codeledge/ra-data-simple-prisma/tree/main/packages/ra-data-simple-prisma",
    description:
      "Create a fullstack react-admin app adding just one file on the server using the PRISMA typesafe orm!",
  },
];
