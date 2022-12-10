import { Box, Typography } from "@mui/material";
import {
  Create,
  DateInput,
  ImageField,
  ImageInput,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  usePermissions,
} from "react-admin";
import { WikidataSearchResult, searchImage } from "@entitree/helper";
import { useEffect, useRef, useState } from "react";

import { ControlledField } from "../fields/ControlledField";
import { WikidataSearchField } from "../fields/WikidataSearchField";
import queryString from "query-string";

export const ImageCreate = (props) => {
  const [item, setItem] = useState<WikidataSearchResult>();

  let params: Record<string, any> | undefined;
  if (
    props.location &&
    queryString.parse(props.location.search)?.source &&
    typeof queryString.parse(props.location.search)?.source === "string"
  ) {
    let jparse = queryString.parse(props.location.search)?.source;
    params = JSON.parse(jparse as string);
  } // catch (err) {}
  const [sourceUrl, setSourceUrl] = useState();
  const [downloadUrl, setDownloadUrl] = useState("");
  const [recordedDate, setRecordedDate] = useState("");

  useEffect(() => {
    if (params?.sourceUrl?.substr(0, 30) === "https://commons.wikimedia.org/") {
      //https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&titles=
      searchImage(params.sourceUrl.split("/wiki/")[1])
        .then((res) => {
          // console.log(res.query.pages);
          const image = Object.values(res.query.pages)[0];
          setDownloadUrl(image.imageinfo[0].url);
          const creationDate =
            image.imageinfo[0].extmetadata?.DateTimeOriginal?.value;
          if (creationDate) {
            var ts = Date.parse(creationDate);
            var date = new Date(ts).toISOString().split("T")[0];
            console.log(date);
            setRecordedDate(date);
          }
        })
        .catch((error) => console.log(error));
    }
  }, [params?.sourceUrl]);

  const { permissions } = usePermissions();
  if (permissions === "blocked")
    return (
      <Typography>
        You are blocked/not allowed from uploading more pictures
      </Typography>
    );
  const ImageCreateToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton alwaysEnable />
    </Toolbar>
  );
  return (
    <Create {...props}>
      <SimpleForm toolbar={<ImageCreateToolbar />}>
        <Typography variant="h3">Upload a new Image</Typography>

        {params?.wikidataEntity ? (
          <>
            <TextInput
              source="wikidataLabel"
              disabled
              value={item?.label}
            />
            <TextInput
              source="wikidataEntity"
              disabled
              value={item?.id}
            />
          </>
        ) : (
          <>
            <WikidataSearchField
              onSelect={setItem}
              item={item}
            />
            <ControlledField
              source="wikidataLabel"
              disabled
              value={item?.label}
            />
            <ControlledField
              source="wikidataEntity"
              disabled
              value={item?.id}
            />
          </>
        )}
        <ImageInput
          source="image"
          label="Upload image"
          accept="image/*"
          // isRequired={true}
        >
          <ImageField
            source="src"
            title="title"
          />
        </ImageInput>
        <TextInput
          title="Either provide a link to an image file or upload the image above, do need fill out both."
          fullWidth
          source="downloadUrl"
          defaultValue={downloadUrl}
        />

        <TextInput
          fullWidth
          source="sourceUrl"
          // defaultValue={sourceUrl}
          // inputProps={{ value: sourceUrl }}
        />

        <TextInput
          title="comment"
          fullWidth
          source="comment"
        />

        {/* <CheckboxGroupInput
          source="remove"
          choices={checkboxChoices}
          // optionText={<checkboxChoicesField />}
        /> */}

        <DateInput
          label="Publication date"
          source="recordedDate"
          defaultValue={recordedDate}
          // inputProps={{ value: recordedDate }}
        />
      </SimpleForm>
    </Create>
  );
};
