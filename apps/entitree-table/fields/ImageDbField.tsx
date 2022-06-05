import { GC_BUCKET } from "../config/const";
import { useRecordContext } from "react-admin";
import Image from "next/image";

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
      <Image alt="" src={url} title={title} width={60} height={60} />
    </div>
  );
};
