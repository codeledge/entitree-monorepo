import { getCommonsUrlByFile } from "@entitree/helper";
import Image from "next/image";
import React from "react";
import { useRecordContext } from "react-admin";

export const ImageCustomField = (props: {
  label?: string;
  title?: string;
  record?: {};
  source: string;
}) => {
  const { source, title } = props;
  const record = useRecordContext(props);
  if (!record[source]) {
    return;
  }
  return (
    <div>
      <Image
        alt=""
        src={getCommonsUrlByFile(record[source], 200)}
        title={title}
        width={200}
        height={200}
        style={{ backgroundColor: "grey" }}
      />
    </div>
  );
};
