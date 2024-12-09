import { useState } from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ onToggle }) => {
  const [toggled, setToggled] = useState(false);
  const handleToggle = () => {
    setToggled(!toggled);
    onToggle(!toggled);
  }
  return (
    <button
      className={`toggle-btn ${toggled ? "toggled" : ''}`}
      onClick={handleToggle}
    >
      <div
        className="thumb"
      >
      </div>
    </button>
  );
} 

export default ToggleSwitch;