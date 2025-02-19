import React from "react";
import "./colorPicker.css";

function ColorPicker() {
  const [color, setColor] = React.useState("#adadad");
  document.body.style.backgroundColor = color;

  const handleChange = (e) => {
    setColor(e.target.value);
    localStorage.setItem("color", e.target.value);
  };

  React.useEffect(() => {
    const color = localStorage.getItem("color");
    if (color) {
      setColor(color);
    }
  }, []);

  return (
    <div className="color-picker">
      <input type="color" id="color" onChange={handleChange} value={color} />
      <p>Wählte deine Wünsch Farbe für den hintergrund</p>
    </div>
  );
}

export default ColorPicker;
