import React from "react";
import TopToolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";
import ShapeViewport from "./components/ShapeViewport";
import { Box } from "@mui/material";

const App = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar (Fixed Width) */}
      <Box sx={{ width: "250px", flexShrink: 0 }}>
        <Sidebar />
      </Box>

      {/* Main Content (Expands to Fill Space) */}
      <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <TopToolbar />
        <Box sx={{ flexGrow: 1, overflow: "hidden", position: "relative" }}>
          <ShapeViewport />
        </Box>
      </Box>
    </Box>
  );
};

export default App;
