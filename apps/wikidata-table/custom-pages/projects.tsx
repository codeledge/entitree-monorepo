import { projects } from "@entitree/shared";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

export const Projects = () => {
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
              <Typography variant="body2" mb={2}>
                {project.description}
              </Typography>
              {project.image && (
                <img src={project.image} alt={project.name} width="100%" />
              )}
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
