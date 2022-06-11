import {
  WIKIDATA_ICON,
  WIKIDATA_LABELS_EN,
  WIKIDATA_TYPE,
  WIKIDATA_URL,
} from "@entitree/helper";
import Image from "next/image";
import { useRecordContext } from "react-admin";

type ExternalType = {
  prop: string;
  value: string;
  label: string;
  icon: string;
  link: string;
};

export function formatUrl(propId: string, text: string): string {
  const formatter = WIKIDATA_URL[propId];
  if (!formatter) {
    return null;
  }
  return formatter.replace("$1", text);
}

export const ExternalField = (props: { record?: any; source: string }) => {
  // const { source } = props;
  const record = useRecordContext(props);

  let external: ExternalType[] = [
    {
      prop: "w",
      link: "https://www.wikidata.org/wiki/" + record.item.value,
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg",
      label: "Wikidata",
      value: record.item.value,
    },
  ];

  for (let prop in record) {
    if (WIKIDATA_TYPE[prop] === "ExternalId") {
      if (record[prop] || prop in Object.keys(WIKIDATA_URL)) {
        //second condition not working

        external.push({
          prop: prop,
          value: record[prop],
          label: WIKIDATA_LABELS_EN[prop],
          icon: WIKIDATA_ICON[prop],
          link: formatUrl(prop as any, record[prop]),
        });
      }
    }
  }

  return (
    <div>
      {external.map((item: ExternalType) => (
        <Link key={item.prop} item={item} />
      ))}
    </div>
  );
};

const Link = ({ item }: { item: ExternalType }) => {
  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      style={{ marginRight: "1em" }}
    >
      {item.icon ? (
        <Image src={item.icon} width={40} height={40} alt="" />
      ) : (
        <>{item.prop}</>
      )}
    </a>
  );
};
