import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import useShapeStore from "../store/shapeStore";

const TopToolbar = () => {
  const { shapes } = useShapeStore();
  const fileName = shapes.length ? "Shape File Loaded" : "Open Shape File";

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{fileName}</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopToolbar;
