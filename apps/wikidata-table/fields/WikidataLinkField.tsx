import { useRecordContext } from "react-admin";

export const WikidataLinkField = (props: { record?: any; source: string }) => {
  // const { source } = props;
  const record = useRecordContext(props);
  return (
    <a
      href={`https://www.wikidata.org/wiki/Q${record.wikidataEntity}`}
      target={"_blank"}
      rel={"noreferrer"}
    >
      {record.wikidataLabel}
    </a>
  );
};
