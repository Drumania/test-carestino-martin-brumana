import { useState } from "react";

export default function Block({
  boxSize,
  defaultColor,
  isDragging,
  setIsDragging,
}) {
  const [active, setActive] = useState(false);
  const [color, setColor] = useState(null);

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setIsDragging(true);
      if (!active) {
        setColor(defaultColor);
        setActive(true);
      }
    }
  };

  const handleMouseEnter = () => {
    if (isDragging && !active) {
      setColor(defaultColor);
      setActive(true);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      style={{
        backgroundColor: active ? color : "#ccc",
        width: boxSize,
      }}
    />
  );
}
