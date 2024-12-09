const EdgeItem = ({ vertexOne, vertexTwo, onRemoveEdge }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "4px 6px",
        marginBottom: "4px",
        backgroundColor: "#f9f9f9",
        border: "1px solid #ddd",
        borderRadius: "4px",
        fontFamily: "'Roboto', sans-serif",
        width: "calc(100% - 25px)",
        fontSize: "12px"
      }}
    >
      <span>{vertexOne} - {vertexTwo}</span>
      <button
        onClick={() => onRemoveEdge(vertexOne, vertexTwo)}
        style={{
          backgroundColor: "red",
          color: "white",
          border: "none",
          borderRadius: "4px",
          padding: "4px 8px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
}

export default EdgeItem;