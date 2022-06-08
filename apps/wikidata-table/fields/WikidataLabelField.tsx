import { getWikipediaArticle } from "@entitree/helper";
import { Popover, Typography } from "@mui/material";
import { useState } from "react";
import { useRecordContext } from "react-admin";

export const WikidataLabelField = (props: { record?: any; source: string }) => {
  // const { source } = props;
  const record = useRecordContext(props);
  console.log(record);
  const [anchorEl, setAnchorEl] = useState<any | null>(null);
  const [article, setArticle] = useState<string>("");
  const handleClick = (event: React.MouseEvent) => {
    if (record.wikipedia) {
      setAnchorEl(event.currentTarget);

      getWikipediaArticle(record.wikipedia, "en").then((article) => {
        setArticle(article.extract);
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <div
        // href={`https://www.wikidata.org/wiki/Q${record.wikipedia}`}
        // target={"_blank"}
        // rel={"noreferrer"}
        // href="javascript:void(0)"
        onClick={handleClick}
      >
        {record.item.label}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>{article}</Typography>
      </Popover>
    </>
  );
};
