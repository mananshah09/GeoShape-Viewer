import React, { useState } from "react";
import { Drawer, Button, TextField, Select, MenuItem } from "@mui/material";
import useShapeStore from "../store/shapeStore";

const Sidebar = () => {
  const { shapes, setShapes, addShape } = useShapeStore();
  const [newShape, setNewShape] = useState({
    type: "Rectangle",
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    color: "#000000",
    angle: 0,
    points: [],
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const parsedShapes = parseShapeFile(text);
      setShapes(parsedShapes);
    };
    reader.readAsText(file);
  };
  const parseShapeFile = (text) => {
    const lines = text.trim().split("\n");
    return lines.map((line) => {
      const parts = line.split(",").map((item) => item.trim());
      const type = parts[0];
  
      if (type === "Rectangle" || type === "Triangle") {
        const [, x, y, z, width, height, angle, color] = parts;
        return {
          type,
          x: +x,
          y: +y,
          z: +z,
          width: +width,
          height: +height,
          angle: +angle || 0, // ✅ Store rotation
          color: color.startsWith("#") ? color : `#${color}`,
        };
      } else if (type === "Polygon") {
        const color = parts.pop();
        const angle = +parts.pop() || 0; // ✅ Store rotation
        const z = +parts.pop();
        const points = [];
  
        for (let i = 1; i < parts.length; i += 2) {
          points.push({ x: +parts[i], y: +parts[i + 1] });
        }
  
        return {
          type,
          points,
          z,
          angle,
          color: color.startsWith("#") ? color : `#${color}`,
        };
      }
  
      return null;
    }).filter(Boolean);
  };
  

  const handleAddShape = () => {
    if (newShape.type === "Polygon" && newShape.points.length < 3) {
      alert("A polygon must have at least 3 points.");
      return;
    }

    addShape(newShape);
    setNewShape({ ...newShape, x: newShape.x + 20, y: newShape.y + 20, points: [] }); // Shift new shape slightly
  };

  const handleAddPoint = () => {
    setNewShape({ 
      ...newShape, 
      points: [...newShape.points, { x: newShape.x, y: newShape.y }] 
    });
  };

  const saveAsFile = () => {
    const shapeFileData = shapes
      .map((shape) => {
        if (shape.type === "Polygon") {
          const pointsString = shape.points
            .map((p) => `${Math.round(p.x)},${Math.round(p.y)}`)
            .join(", ");
          return `Polygon, ${pointsString}, 0, ${shape.angle}, ${shape.color.replace("#", "")}`;
        }
        return `${shape.type}, ${Math.round(shape.x)}, ${Math.round(shape.y)}, 0, ${
          shape.width || 100
        }, ${shape.height || 100}, ${shape.angle}, ${shape.color.replace("#", "")}`;
      })
      .join("\n");

    const blob = new Blob([shapeFileData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modified_shapes.shapefile";
    link.click();
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "250px",
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: "250px", boxSizing: "border-box" },
      }}
    >
      {/* Open Shape File */}
      <div style={{ padding: "10px" }}>
        <h3>Open Shape File</h3>
        <Button component="label">
          Open Shape File
          <input type="file" hidden onChange={handleFileUpload} />
        </Button>
      </div>

      {/* Shape Creation Form */}
      <div style={{ padding: "10px" }}>
        <h3>Create Shape</h3>
        <Select
          fullWidth
          value={newShape.type}
          onChange={(e) => setNewShape({ ...newShape, type: e.target.value })}
        >
          <MenuItem value="Rectangle">Rectangle</MenuItem>
          <MenuItem value="Triangle">Triangle</MenuItem>
          <MenuItem value="Polygon">Polygon</MenuItem>
        </Select>
        <TextField
          fullWidth
          type="number"
          label="X Position"
          value={newShape.x}
          onChange={(e) => setNewShape({ ...newShape, x: +e.target.value })}
        />
        <TextField
          fullWidth
          type="number"
          label="Y Position"
          value={newShape.y}
          onChange={(e) => setNewShape({ ...newShape, y: +e.target.value })}
        />
        <TextField
          fullWidth
          type="color"
          label="Color"
          value={newShape.color}
          onChange={(e) => setNewShape({ ...newShape, color: e.target.value })}
        />
        <TextField
          fullWidth
          type="number"
          label="Angle (Rotation)"
          value={newShape.angle}
          onChange={(e) => setNewShape({ ...newShape, angle: +e.target.value })}
        />

        {newShape.type === "Polygon" && (
          <>
            <Button fullWidth onClick={handleAddPoint} style={{ marginTop: "10px" }}>
              Add Polygon Point
            </Button>
            <p>Current Points: {JSON.stringify(newShape.points)}</p>
          </>
        )}

        <Button fullWidth onClick={handleAddShape} style={{ marginTop: "10px" }}>
          Add Shape
        </Button>
      </div>

      <Button fullWidth onClick={saveAsFile} style={{ marginTop: "20px" }}>
        Save As
      </Button>
    </Drawer>
  );
};

export default Sidebar;
