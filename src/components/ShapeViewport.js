import React, { useEffect, useRef } from "react";
import { Canvas, Line, Text, Rect, Triangle, Polygon } from "fabric";
import useShapeStore from "../store/shapeStore";

const ShapeViewport = () => {
  const canvasRef = useRef(null);
  const { shapes, updateShapePosition } = useShapeStore();
  const canvasInstance = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Fabric.js canvas
    canvasInstance.current = new Canvas(canvasRef.current, {
      backgroundColor: "#f0f0f0",
      width: window.innerWidth - 250,
      height: window.innerHeight - 60,
    });

    const canvas = canvasInstance.current;

    // Create axes
    const xAxisYPosition = canvas.height - 30;
    const xAxis = new Line([0, xAxisYPosition, canvas.width, xAxisYPosition], {
      stroke: "black",
      strokeWidth: 2,
      selectable: false,
    });

    const yAxis = new Line([40, 0, 40, canvas.height], {
      stroke: "black",
      strokeWidth: 2,
      selectable: false,
    });

    canvas.add(xAxis, yAxis);

    // Add axis labels
    for (let i = 100; i <= canvas.width; i += 100) {
      const xLabel = new Text(i.toString(), {
        left: i,
        top: xAxisYPosition + 5,
        fontSize: 14,
        fill: "black",
        selectable: false,
      });
      canvas.add(xLabel);
    }

    for (let i = 100; i <= canvas.height; i += 100) {
      const yLabel = new Text(i.toString(), {
        left: 10,
        top: canvas.height - i,
        fontSize: 14,
        fill: "black",
        selectable: false,
      });
      canvas.add(yLabel);
    }

    // Render shapes
    shapes.forEach((shapeData, index) => {
        let shape;
      
        if (shapeData.type === "Rectangle") {
          shape = new Rect({
            left: shapeData.x,
            top: canvas.height - shapeData.y,
            width: shapeData.width,
            height: shapeData.height,
            fill: shapeData.color,
            angle: shapeData.angle || 0,
          });
        } else if (shapeData.type === "Triangle") {
          shape = new Triangle({
            left: shapeData.x,
            top: canvas.height - shapeData.y,
            width: shapeData.width,
            height: shapeData.height,
            fill: shapeData.color,
            angle: shapeData.angle || 0,
          });
        } else if (shapeData.type === "Polygon") {
          const adjustedPoints = shapeData.points.map((p) => ({
            x: p.x,
            y: canvas.height - p.y,
          }));
      
          if (adjustedPoints.length >= 3) {
            shape = new Polygon(adjustedPoints, {
              fill: shapeData.color,
              stroke: "black",
              strokeWidth: 2,
              selectable: true,
              angle: shapeData.angle || 0,
            });
      
            shape.set({ selectable: true, evented: true, hasControls: false });
          }
        }
      
        if (shape) {
          shape.set({ selectable: true, evented: true });
          canvas.add(shape);
        }
      });
      
      
      

    return () => {
      canvas.dispose();
    };
  }, [shapes, updateShapePosition]);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default ShapeViewport;
