import { Page } from "../types";
import { WD_COUNTRY, WD_INCEPTION } from "@entitree/helper";

export const firstAdmLevel: Page = {
  represents: "Q10864048",
  category: "traveling",
  excludeOld: true,
  header: [{ property: WD_COUNTRY }, { property: WD_INCEPTION }],
};
