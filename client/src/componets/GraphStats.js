const GraphStats = ({ graph, onShowBridgesToggle, onShowMSTToggle, onApplyPhysicsToggle }) => {
  return (
    <div
      style={{
        width: "20%",
        padding: "10px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        backgroundColor: "#f4f4f4",
        flexDirection: "column"
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          overflow: "auto",
        }}
      >

      </div>
    </div>
  );
}

export default GraphStats;