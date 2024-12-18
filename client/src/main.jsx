import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import "./index.css";
import router from "./routers";
import { Container } from "@mui/material";
import "./firebase/config";

createRoot(document.getElementById("root")).render(
  <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: "50px" }}>
    <RouterProvider router={router} />
  </Container>
);
