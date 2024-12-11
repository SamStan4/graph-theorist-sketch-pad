import AdjacencyMatrix from "./AdjacencyMatrix";

const ShowAdjacencyMatrix = ({ onCloseModal, graph }) => {
  return (
    <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backdropFilter: "blur(5px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
          minWidth: "300px",
          minWidth: "50vh",
          minHeight: "30vw",
          maxHeight: "80vh",
          maxWidth: "80vw",
          display: "flex",
          flexDirection: "column"
        }}
    >
      <div
        style={{
          backgroundColor: "#f4f4f4",
          borderRadius: "10px",
          padding: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <h1
          style={{
            margin: "5px"
          }}
        >
          Adjacency Matrix
        </h1>
        <button
          onClick={() => onCloseModal(false)}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            borderRadius: "4px",
            padding: "4px 8px",
            cursor: "pointer",
            margin: "5px",
          }}
        >
          X
        </button>
      </div>
      <div
        style={{
          overflowX: "scroll",
          overflowY: "scroll",
          display: "flex",

        }}
      >
        <AdjacencyMatrix
          graph={graph}
        />
      </div>
    </div>
  </div>
  );
}

export default ShowAdjacencyMatrix;