import React, { useState, useEffect } from "react";
import "./App.css";

interface Color {
  id: number;
  name: string;
  hex_code: string;
  color_code: string;
}

function App() {
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);

  useEffect(() => {
    fetch("https://api.prolook.com/api/colors/prolook")
      .then((response) => response.json())
      .then((data) => setColors(data.colors));
  }, []);

  const handleColorSelect = (color: Color) => {
    setSelectedColor(color);
  };

  return (
    <div className="container">
      <h1 className="header">Colors:</h1>
      <div className="content">
        <div className="color-list">
          {colors.map((color) => (
            <div key={color.id} className="color-item">
              <span>{color.name}</span>
              <button onClick={() => handleColorSelect(color)}>Preview</button>
            </div>
          ))}
        </div>
        {selectedColor && (
          <div className="color-preview">
            <div
              style={{ backgroundColor: `#${selectedColor.hex_code}` }}
              className="color-box"
            >
              <div className="color-info">
                <p>name: {selectedColor.name}</p>
                <p>hex: #{selectedColor.hex_code}</p>
                <p>color code: {selectedColor.color_code}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
