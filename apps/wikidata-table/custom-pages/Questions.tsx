import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function SimpleAccordion() {
  const faq = [
    {
      question: "What is the purpose of this tool?",
      answer: "You can use this website to see Wikidata tables.",
    },
    {
      question: "How do I use this tool?",
      answer: "Navigate between the pages and click around",
    },
    {
      question: "Is it open-source, can I contribute",
      answer: (
        <Typography>
          Yes, you can contribute to the code on GitHub
          <a
            href="https://github.com/codeledge/entitree-monorepo/tree/main/apps/wikidata-table"
            target="_blank"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
        </Typography>
      ),
    },
  ];
  return (
    <Box>
      {faq.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{item.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{item.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
