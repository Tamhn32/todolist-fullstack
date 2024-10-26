import { List, Card, CardContent, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { useState } from "react";
export default function FolderList({ folders }) {
  const { folderId } = useParams();
  console.log({ folderId });
  const [activeFolderId, setActiveFolderId] = useState(folderId);
  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "#D2B48C",
        height: "100%",
        padding: "10px",
        textAlign: "left",
        overflow: "auto",
      }}
      subheader={
        <Box>
          <Typography sx={{ fontWeight: "bold", color: "white" }}>
            Folders
          </Typography>
        </Box>
      }
    >
      {folders.map(({ id, name }) => {
        return (
          <Link
            key={id}
            to={`folders/${id}`}
            style={{
              textDecoration: "none",
            }}
            onClick={() => setActiveFolderId(id)}
          >
            <Card
              sx={{
                mb: "5px",
                backgroundColor:
                  id === activeFolderId ? "rgb(255 211 140)" : null,
              }}
            >
              <CardContent
                sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
              >
                <Typography sx={{ fontSize: 16, fontWeight: "bold" }}>
                  {" "}
                  {name}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
