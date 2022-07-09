import React, { Children, ReactElement } from "react";
import { Box, Card, CardContent, IconButton, useTheme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

import {
  RecordContextProvider,
  useCreatePath,
  useListContext,
  useResourceContext,
  useTranslate,
} from "react-admin";

import EditIcon from "@mui/icons-material/Edit";
import { Column } from "../lib/data/types";
import { getCommonsUrlByFile } from "@entitree/helper";

export const DesktopGrid = ({ header }: { header: Column[] }) => {
  const translate = useTranslate();
  const { data } = useListContext();
  const createPath = useCreatePath();
  const resource = useResourceContext();
  const theme = useTheme();

  if (!data) {
    return null;
  }

  return (
    <Box
      sx={{
        margin: 1,
        display: "flex",
        flexWrap: "wrap",
        alignItems: "stretch",
        justifyContent: "space-between",
      }}
    >
      {data.map((record) => (
        <RecordContextProvider value={record} key={record.id}>
          <Card
            sx={{
              width: 265,
              display: "flex",
              flexDirection: "column",
              margin: "0.5rem 0",
            }}
          >
            <CardContent
              sx={{
                ...theme.typography.body1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* <AvatarField record={record} size="120" /> */}
                <Box sx={{ minHeight: "100px" }}>
                  {record.P18 && (
                    <img src={getCommonsUrlByFile(record.P18, 150)} alt="img" />
                  )}
                </Box>
                <h2>{`${record.item.label}`}</h2>
              </Box>
              {/* {header.map((col) => {
                return (
                  <div
                    key={col.property}
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <div
                      style={{
                        marginRight: "1em",
                        marginBottom: "0.5em",
                        marginTop: "1em",
                      }}
                    >
                      {col.property}
                    </div>
                    <div
                      style={{
                        whiteSpace: "nowrap",
                        marginBottom: "0.5em",
                        marginTop: "1em",
                      }}
                    >
                      {record[col.property]}
                    </div>
                  </div>
                );
              })} */}
            </CardContent>
          </Card>
        </RecordContextProvider>
      ))}
    </Box>
  );
};
