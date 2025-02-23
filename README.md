Shape Viewer 

Overview
Shape Viewer is a browser-based single-page application designed to import, render, and manipulate two-dimensional shapes. The application supports opening shape files, creating new shapes, and rendering them dynamically.

Tech Stack
- React.js - Frontend framework for building the UI
- Fabric.js - Canvas-based rendering and shape manipulation
- Zustand - State management for storing shapes
- Material-UI - UI components for styling and layout
- Node.js & npm - Package management and dependency handling

Features Implemented
- Implemented a top toolbar with a button to open a shape file.
- Designed a left menu with "Open Shape File" and "Create Shape" options.
- Developed a shape viewport to display imported shapes, ensuring it dynamically fills available space.
- Created a custom shape file format (.shapefile) to store shape data.
- Implemented file parsing to read shape properties and allowed users to import shape files via the left menu or top toolbar.
- Rendered rectangles, triangles, and polygons dynamically based on the shape file.
- Applied modern styling, improved layout consistency, and ensured a user-friendly interface.
- Added an option to create new shapes with user-specified type, size, position, color, and rotation.
- Extended shape file format to support rotation, rendering shapes with correct rotation angles.
- Implemented a "Save As" feature to export modified shape files.

How to Use

1. Open a Shape File
- Click "Open Shape File" in the left menu or toolbar.
- Select a .shapefile containing shape data.
- The shapes will be rendered in the viewport.

2. Create a New Shape
- Click "Create Shape" in the left menu.
- Select the shape type (Rectangle, Triangle, Polygon).
- Enter position (x, y), size, color, and rotation.
- Click "Add Shape" to render it in the viewport.

3. Save the Current Shapes
- Click "Save As" in the left menu.
- The modified shape file will be downloaded.

Setup & Installation from GitHub Repository

1. Clone the Repository:
- Open a terminal or command prompt.
- Run the following command to clone the project:
  ```bash
  git clone https://github.com/your-username/shape-viewer.git
  ```
- Navigate to the project directory:
  ```bash
  cd shape-viewer
  ```

2. Install Node.js (if not already installed):
- Download and install Node.js from https://nodejs.org/
- Verify installation by running:
  ```bash
  node -v
  npm -v
  ```

3. Install Dependencies:
- Run the following command to install required dependencies:
  ```bash
  npm install
  ```

4. Start the Application:
- Run:
  ```bash
  npm start
  ```
- The application will start on `http://localhost:3000/`
- Open this URL in a browser to use the Shape Viewer.

Technical Considerations
- Performance: The application is built to handle multiple shapes efficiently.
- Extensibility: The structure supports adding more shape types easily.
- Scalability: Can be extended to support large-scale shape rendering.

Submission Instructions
- The .shapefile format is included for testing.

References
- Official React Documentation (for state management and UI components).
- Fabric.js (for canvas rendering and transformations).
- Material-UI (for styling and layout design).

