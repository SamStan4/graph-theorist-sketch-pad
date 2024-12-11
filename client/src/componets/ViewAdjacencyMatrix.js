const ViewAdjacenceMatrix = ({ onClickView }) => {
    return (
      <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
      >
        <button
          onClick={() => onClickView(true)}
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
          View Adjacence Matrix
        </button>
      </div>
    );
  }
  
  export default ViewAdjacenceMatrix;