// src/projects.ts
var projects = [
  {
    key: "tables",
    name: "Wikidata tables",
    description: "",
    link: "https://wikidata-table.vercel.app/",
    software: ["react-admin"]
  },
  {
    key: "entitree",
    name: "Entitree",
    description: "Tree diagrams for Wikidata",
    link: "https://entitree.com/",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Family_tree_of_Elizabeth_II.png/640px-Family_tree_of_Elizabeth_II.png"
  },
  {
    key: "charts",
    name: "Wikidata charts",
    description: "Wikidata Charts using SPARQL and React to draw line charts of properties or queries",
    link: "https://wikidata-charts.vercel.app/",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Wikidata_Charts_-_Screenshot_of_employees_of_tech_companies.png",
    software: ["recharts"]
  },
  {
    key: "chordstop",
    name: "Chordstop",
    description: "Show chords",
    link: "https://chordstop.vercel.app/"
  },
  {
    key: "images",
    name: "Entitree images",
    description: "",
    link: "https://images.entitree.com/",
    software: ["react-admin"],
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Screenshot_from_2022-06-21_23-06-07.png/1024px-Screenshot_from_2022-06-21_23-06-07.png"
  },
  {
    key: "podcast",
    name: "Podcast Feed Generator",
    description: "Create a podcast feed from a Wikidata query",
    link: "https://podcast.nothispute.com/",
    software: []
  }
];
export {
  projects
};
