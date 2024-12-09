import AdvancedToggleSwitch from "./SmallComponents/AdvancedToggleSwitch.js";

const ShowMST = ({ onToggle, graph }) => {
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
        Show Spanning Tree?
      </p>
      <AdvancedToggleSwitch
        onToggle={onToggle}
        graph={graph}
      />
    </div>
  )
}

export default ShowMST;