import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./appRouter";

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(appRouter, {
  title: "Chordstop API",
  description: "Chordstop API documentation",
  version: "0.0.1",
  baseUrl: "/api",
  docsUrl: "https://github.com/codeledge",
  tags: ["chords"],
});
