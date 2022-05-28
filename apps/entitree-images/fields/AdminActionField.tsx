import { useRecordContext } from "react-admin";

export const AdminActionField = (props: {
  label?: string;
  title?: string;
  record?: {};
  source: string;
}) => {
  const { source, title } = props;
  const record = useRecordContext(props);
  return (
    <span>
      <a
        target="_blank"
        href={`/api/v1/image/recrop/id/${record[source]}`}
        rel="noreferrer"
        title="recrop"
        style={{
          textDecoration: "none",
        }}
      >
        ✂️
      </a>
      |
      <a
        target="_blank"
        href={`/api/v1/image/reprocess/id/${record[source]}`}
        rel="noreferrer"
        style={{
          textDecoration: "none",
        }}
      >
        ↩️
      </a>
    </span>
  );
};
