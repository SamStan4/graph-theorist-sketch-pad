import ToggleSwitch from "./SmallComponents/ToggleSwitch"

const ApplyPhysics = ({ onToggle }) => {
  return (
    <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
    }}
  >
      <p
        style={{
          margin: "0px"
        }}
      >
        Apply Physics?
      </p>
      <ToggleSwitch onToggle={onToggle}/>
    </div>
  );
}

export default ApplyPhysics;