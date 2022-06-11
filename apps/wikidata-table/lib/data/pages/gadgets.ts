import {
  WD_MANUFACTURER,
  WD_MASS,
  WD_PRICE,
  WD_PUBLICATION_DATE,
} from "@entitree/helper";
import { Page } from "../types";

export const drones: Page = {
  represents: "Q484000",
  category: "technology",
  header: [
    { name: "label" },
    { name: WD_PUBLICATION_DATE },
    { property: WD_MASS },
    { property: WD_PRICE },
    { property: WD_MANUFACTURER },
  ],
};
export const gps_tracker: Page = {
  represents: "Q253677",
  img: "gpstracker.jpg",
  category: "technology",
  header: [{ property: "label" }, { property: "P176" }, { property: "P4140" }],
};
