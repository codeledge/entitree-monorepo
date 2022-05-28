import * as React from "react";

import { Title, useTranslate } from "react-admin";

import Card from "@mui/material/Card";
import Link from "next/link";
// import LinkToRelatedCustomers from "./LinkToRelatedCustomers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/material/styles";

// import segments from "./data";

const Documentation = () => {
  const translate = useTranslate();
  return (
    <Card
      style={{
        marginTop: 16,
      }}
    >
      <Title
        title={translate("resources.documentation.name", { smart_count: 2 })}
      />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>To be written</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Image Info</TableCell>
            <TableCell>
              <a
                target={"_blank"}
                rel={"noreferrer"}
                href={"/api/v1/image/info/wikidata/1322162"}
              >
                /api/v1/image/info/wikidata/1322162
              </a>
            </TableCell>
            <TableCell>Image Info</TableCell>
            <TableCell></TableCell>
          </TableRow>
          {/* {segments.map((segment) => (
            <TableRow key={segment.id}>
              <TableCell>{translate(segment.name)}</TableCell>
              <TableCell>
                <LinkToRelatedCustomers segment={segment.id} />
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </Card>
  );
};

export default Documentation;
