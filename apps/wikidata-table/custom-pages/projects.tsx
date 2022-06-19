import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export const Projects = () => {
  const projects: {
    name: string;
    description: string;
    link: string;
  }[] = [
    {
      name: "Wikidata tables",
      description: "",
      link: "https://wikidata-table.vercel.app/",
    },
    {
      name: "Entitree",
      description: "Tree diagrams for Wikidata",
      link: "https://entitree.com/",
    },
    {
      name: "Wikidata charts",
      description:
        "Wikidata Charts using SPARQL and React to draw line charts of properties or queries",
      link: "https://wikidata-charts.vercel.app/",
    },
    {
      name: "Chordstop",
      description: "Show chords",
      link: "https://chordstop.vercel.app/",
    },
  ];

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {projects.map((project, index) => (
        <Grid item xs={2} sm={4} md={4} key={index}>
          <Card>
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {project.link.replace("https://", "").replace("/", "")}
              </Typography>
              <Typography variant="h5" component="div">
                {project.name}
              </Typography>
              {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                project
              </Typography> */}
              <Typography variant="body2">{project.description}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                href={project.link}
                target="_blank"
                rel="noreferrer"
              >
                Open website
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};
