import { WDQ_HUMAN, WD_NET_WORTH } from "@entitree/helper";
import { Page } from "../types";

export const billionaire: Page = {
  represents: WDQ_HUMAN,
  category: "politics",
  filter: {
    [WD_NET_WORTH]: "a lot",
  },
  header: [
    // ...humanProps,
  ],
  dataset: [],
};
