import { useEffect, useState } from "react";
import "./ToggleSwitch.css";

const AdvancedToggleSwitch = ({ onToggle, graph }) => {
  const [toggled, setToggled] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (graph.getNumberOfComponents() === 1) {
      if (disabled) {
        setDisabled(false);
      }
    } else {
      if (!disabled) {
        setDisabled(true);
      }
      if (toggled) {
        setToggled(!toggled);
        onToggle(!toggled);
      }
    }
  }, [graph]);

  const handleToggle = () => {
    if (!disabled) {
      setToggled(!toggled);
      onToggle(!toggled);
    }
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

export default AdvancedToggleSwitch;