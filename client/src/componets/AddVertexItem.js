import { useState } from "react";

const AddVertexItem = ({ onAddVertex }) => {
  const [newVertexName, setnewVertexName] = useState("");

  const handleAddVertex = () => {
    const name = newVertexName.trim();
    if (name) {
      onAddVertex(name);
      setnewVertexName("");
    } else {
      alert("enter a vertex name");
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
        value={newVertexName}
        onChange={(e) => setnewVertexName(e.target.value)}
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
        onClick={handleAddVertex}
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

export default AddVertexItem;