import { WikidataPages } from "./page";
import HotelIcon from "@mui/icons-material/Hotel";
import SmartphoneIcon from "@mui/icons-material/Smartphone";

export type WikidataPageKey = keyof typeof WikidataPages;

export const muiIcons: { [key in WikidataPageKey]: any } = {
  hotels: <HotelIcon />,
  smartphones: <SmartphoneIcon />,
};
