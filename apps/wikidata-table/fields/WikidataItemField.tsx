import { Labeled, useRecordContext } from "react-admin";

export const WikidataItemField = (props: { record?: any; source: string }) => {
  // const { source } = props;
  const record = useRecordContext(props);
  console.log("records", props.source, record[props.source]);
  return (
    record[props.source] && (
      <span>
        <a href={record[props.source].value} target="_blank" rel="noreferrer">
          {record[props.source].label}
        </a>
      </span>
    )
  );
};
