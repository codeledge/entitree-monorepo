import { ActionStatusTypeEmoji } from "../lib/consts";
import { getEmojiByLikelihood } from "../lib/faceDetectionExpression";
import { useRecordContext } from "react-admin";

export const ActionTypeField = (props: {
  label?: string;
  title?: string;
  record?: {};
  source: string;
}) => {
  const { source, title } = props;
  const record = useRecordContext(props);
  return (
    <span title={record[source]}>{ActionStatusTypeEmoji[record[source]]}</span>
  );
};
