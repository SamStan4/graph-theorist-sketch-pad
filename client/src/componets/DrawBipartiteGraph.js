import { useState } from "react";

const DrawBipartiteGraph = ({ onDrawClick }) => {
  const [numberVertices, setNumberVertices] = useState("");
  const handleDrawGraph = () => {
    const num = Number(numberVertices);
    if (!Number.isInteger(num) || num < 3) {
      alert("enter an integer greater than two");
      return;
    }
    onDrawClick(num);
  }
  return (
    <div
      style={{
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        width: "98%",
        padding: "5px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "5px"
      }}
    >
      <h3
        style={{
          margin: "0"
        }}
      >Bipartite Graph</h3>
      <span>
        Number of vertices: <input
          type="text"
          value={numberVertices}
          onChange={(e) => setNumberVertices(e.target.value)}
          placeholder="enter here"
          style={{
            padding: "4px 6px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "12px",
            marginRight: "8px",
            width: "calc(100% - 40px)",
            maxWidth: "55px",
          }}
        />
      </span>
      <button
      onClick={handleDrawGraph}
        style={{
          margin: "2px",
          padding: "5px 12px",
          fontSize: "14px",
          color: "#fff",
          backgroundColor: "#007BFF",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#0056b3";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#007BFF";
        }}
      >
        Draw
      </button>
    </div>
  );
}

export default DrawBipartiteGraph;