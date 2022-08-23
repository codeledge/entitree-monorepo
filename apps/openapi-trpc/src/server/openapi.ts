import { generateOpenApiDocument } from "trpc-openapi";

import { appRouter } from "./router";

// Generate OpenAPI schema document
export const openApiDocument: any = generateOpenApiDocument(appRouter, {
  title: "Entitree API",
  description: "Entitree API documentation",
  version: "1.0.0",
  baseUrl: "/api",
  docsUrl: "https://github.com/codeledge",
  tags: ["wikidata", "indonesia", "apple"],
});
