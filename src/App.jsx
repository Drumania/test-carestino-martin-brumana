import { useState, useEffect } from "react";
import Block from "./components/Block";

const COLORS = ["#f44336", "#2196f3", "#4caf50", "#ff9800", "#9c27b0"];

export default function App() {
  const [dimension] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [defaultColor, setDefaultColor] = useState("#4caf50");

  //coordenadas para el menu context
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  //calculo la grilla
  const boxSizeWidth = dimension.width / 100;
  const boxSizeHeight = 20;
  const rows = Math.floor(dimension.height / boxSizeHeight);
  const totalBlocks = rows * 100;

  //init
  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDragging);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
    };
  }, []);

  // menu click derecho
  const handleContextMenu = (e) => {
    e.preventDefault();

    const menuWidth = 150;
    const menuHeight = 50;
    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight;
    }

    setContextMenu({
      visible: true,
      x,
      y,
    });
  };

  const handleSelectColor = (color) => {
    setDefaultColor(color);
    setContextMenu((prev) => ({ ...prev, visible: false }));
  };

  return (
    <div onContextMenu={handleContextMenu}>
      <div
        className="simil-grid"
        style={{
          gridTemplateColumns: `repeat(100, ${boxSizeWidth}px)`,
          gridAutoRows: `${boxSizeHeight}px`,
        }}
      >
        {Array.from({ length: totalBlocks }).map((_, i) => (
          <Block
            key={i}
            defaultColor={defaultColor}
            boxSize={boxSizeWidth}
            isDragging={isDragging}
            setIsDragging={setIsDragging}
          />
        ))}
      </div>

      {/* menu click derecho*/}
      <div
        className={`color-menu ${contextMenu.visible ? "fade-in" : "fade-out"}`}
        style={{
          display: "flex",
          top: contextMenu.y,
          left: contextMenu.x,
          pointerEvents: contextMenu.visible ? "auto" : "none",
          opacity: contextMenu.visible ? 1 : 0,
          transform: contextMenu.visible ? "scale(1)" : "scale(0.95)",
        }}
      >
        {COLORS.map((color) => (
          <div
            key={color}
            onClick={() => handleSelectColor(color)}
            className="items-color-menu"
            style={{
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
}
