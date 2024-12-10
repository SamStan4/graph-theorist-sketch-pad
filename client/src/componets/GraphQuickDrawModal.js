import DrawCycleGraph from "./DrawCycleGraph.js";
import DrawCompleteGraph from "./DrawCompleteGraph.js"
import DrawHeartGraph from "./DrawHeartGraph.js";

const GraphQuickDrawModal = ({ onCloseModal, onDrawCycle, onDrawComplete, onDrawHeart }) => {
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
          width: "50vh",
          height: "30vw"
        }}
      >
        {/* top bar div */}
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
          >Graph Quick Draw</h1>
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
        {/* main content div */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <DrawCycleGraph
            onDrawClick={(num) => {
              onCloseModal(false);
              onDrawCycle(num);
            }}
          />
          <DrawCompleteGraph
            onDrawClick={(num) => {
              onCloseModal(false);
              onDrawComplete(num);
            }}
          />
          <DrawHeartGraph
            onDrawClick={(num) => {
              onCloseModal(false);
              onDrawHeart(num);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default GraphQuickDrawModal;