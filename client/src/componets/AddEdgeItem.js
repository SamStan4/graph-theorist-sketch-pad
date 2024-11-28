import { useState } from "react";

const AddEdgeItem = ({ onAdd }) => {
  const [nodeOneName, setNodeOneName] = useState("");
  const [nodeTwoName, setNodeTwoName] = useState("");

  const handleAddEdge = () => {
    const nodeOne = nodeOneName.trim();
    const nodeTwo = nodeTwoName.trim();
    if (nodeOne && nodeTwo) {
      onAdd(nodeOne, nodeTwo);
      setNodeOneName("");
      setNodeTwoName("");
    } else {
      alert("enter a vertex for both fields");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "4px 6px",
        marginBottom: "4px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontFamily: "'Roboto', sans-serif",
        fontSize: "12px",
        width: "95%",
        boxSizing: "border-box",
        pointerEvents: "auto"
      }}
    >
      <input
        type="text"
        value={nodeOneName}
        onChange={(e) => setNodeOneName(e.target.value)}
        placeholder="vertex"
        style={{
          padding: "4px 6px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "12px",
          marginRight: "8px",
          width: "calc(100% - 40px)",
          maxWidth: "200px",
        }}
      />
      <input
        type="text"
        value={nodeTwoName}
        onChange={(e) => setNodeTwoName(e.target.value)}
        placeholder="vertex"
        style={{
          padding: "4px 6px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "12px",
          marginRight: "8px",
          width: "calc(100% - 40px)",
          maxWidth: "200px",
        }}
      />
      <button
        onClick={handleAddEdge}
        style={{
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        +
      </button>
    </div>
  );
}

export default AddEdgeItem;