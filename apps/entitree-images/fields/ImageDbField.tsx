import { GC_BUCKET } from "../config/const";
import { Image } from "../models/Image";
/* eslint-disable @next/next/no-img-element */
import { useRecordContext } from "react-admin";

export const ImageDbField = (props: {
  label: string;
  title: string;
  // record: Image;
  source: string;
}) => {
  const { source, title } = props;
  const record = useRecordContext(props);
  const storage_url =
    "https://storage.googleapis.com/" + GC_BUCKET + "/uploads/";
  const url = storage_url + "transparent_face/" + record[source] + ".webp"; //createFilePath("face", record[source], true);
  return (
    <div>
      <img alt="" src={url} title={title} width={60} />
      {/* <img
        src={`https://images.dataprick.com/api/v1/image/headcrop/id/${record[source]}/`}
        width={"60px"}
        alt={""}
      ></img> */}
    </div>
  );
};
