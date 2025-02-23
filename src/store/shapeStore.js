import { create } from "zustand";

const useShapeStore = create((set) => ({
  shapes: [],

  // ✅ Set initial shapes from file
  setShapes: (newShapes) => set({ shapes: newShapes }),

  // ✅ Add a new shape dynamically, including polygons
  addShape: (newShape) => set((state) => ({
    shapes: [...state.shapes, newShape],
  })),

  // ✅ Update shape rotation
  updateShapeRotation: (index, newAngle) =>
    set((state) => {
      const updatedShapes = [...state.shapes];
      if (updatedShapes[index]) {
        updatedShapes[index] = { 
          ...updatedShapes[index], 
          angle: Math.round(newAngle) 
        };
      }
      return { shapes: updatedShapes };
    }),
}));

export default useShapeStore;
