import {
  FilterList,
  FilterListItem,
  useListFilterContext,
  useGetList,
} from "react-admin";
import { Card, CardContent } from "@mui/material";
import CategoryIcon from "@mui/icons-material/LocalOffer";
import {
  WD_COUNTRY,
  WD_LOCATED_IN_THE_ADMINISTRATIVE_TERRITORIAL_ENTITY,
} from "@entitree/helper";

export const HotelFilterSidebar = () => {
  const { filterValues } = useListFilterContext();
  const country = filterValues[WD_COUNTRY];
  const { data, isLoading, error } = useGetList("firstAdmLevel", {
    filter: {
      [WD_COUNTRY]: country,
    },
    pagination: {
      perPage: 50,
      page: 1,
    },
    meta: {
      staleTime: 10 ^ 10,
      enabled: !!country,
    },
  });
  return (
    <Card sx={{ order: -1, mr: 2, mt: 9, width: 380 }}>
      <CardContent>
        <FilterList
          label="Region"
          icon={<CategoryIcon />}
        >
          {country &&
            data?.map((item) => (
              <FilterListItem
                key={item.item.value}
                label={item.item.label}
                value={{
                  [WD_LOCATED_IN_THE_ADMINISTRATIVE_TERRITORIAL_ENTITY]:
                    item.item.value,
                }}
              />
            ))}
        </FilterList>
      </CardContent>
    </Card>
  );
};
