import ApplyPhysics from "./ApplyPhysics.js";
import ComponentStat from "./ComponentStat.js";
import LineSeparator from "./LineSeparator.js";
import ShowBridges from "./ShowBridges.js";
import VertexEdgeCount from "./VertexEdgeCount.js";
import ShowMST from "./ShowMST.js"
import BipartiteStat from "./BipartiteStat.js";
import QuickDrawGraphs from "./DrawGraphs.js";
import ViewAdjacenceMatrix from "./ViewAdjacencyMatrix.js";

const GraphStats = ({ graph, onShowBridgesToggle, onShowMSTToggle, onApplyPhysicsToggle, onShowQuickDrawToggle, onViewAdjacencyMatrix }) => {
  return (
    <div
      style={{
        width: "20%",
        padding: "10px",
        boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        backgroundColor: "#f4f4f4",
        flexDirection: "column",
      }}
    >
        <VertexEdgeCount
          graph={graph}
        />
        <LineSeparator/>
        <ComponentStat
          graph={graph}
        />
        <LineSeparator/>
        <BipartiteStat
          graph={graph}
        />
        <LineSeparator/>
        <ShowBridges
          onToggle={onShowBridgesToggle}
        />
        <LineSeparator/>
        <ShowMST
          onToggle={onShowMSTToggle}
          graph={graph}
        />
        <LineSeparator/>
        <ApplyPhysics
          onToggle={onApplyPhysicsToggle}
        />
        <LineSeparator/>
        <QuickDrawGraphs
          onClickDraw={onShowQuickDrawToggle}
        />
        <LineSeparator/>
        <ViewAdjacenceMatrix
          onClickView={onViewAdjacencyMatrix}
        />
    </div>
  );
}

export default GraphStats;