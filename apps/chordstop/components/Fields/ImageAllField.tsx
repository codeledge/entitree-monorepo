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

  return (
    <div>
      <img
        alt=""
        src={getCommonsUrlByFile(record[source], 200)}
        title={title}
        width={200}
        style={{ backgroundColor: "grey" }}
      />
    </div>
  );
};
