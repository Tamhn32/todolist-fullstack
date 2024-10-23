import { List, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
export default function FolderList({ folders }) {
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
            style={{ textDecoration: "none" }}
          >
            <Card sx={{ mb: "5px" }}>
              <CardContent
                sx={{ "&:last-child": { pb: "10px" }, padding: "10px" }}
              >
                <Typography>{name}</Typography>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </List>
  );
}
