import LineSeparator from "./LineSeparator";
import ComponentStat from "./ComponentStat";
import VertexEdgeCount from "./VertexEdgeCount";
import BipartiteStat from "./BipartiteStat";
import ShowBridges from "./ShowBridges";

const GraphStats = ({ graph, onShowBridgeToggle }) => {
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
      <ComponentStat
        graph={graph}
      />
      <LineSeparator/>
      <VertexEdgeCount
        graph={graph}
      />
      <LineSeparator/>
      <BipartiteStat
        graph={graph}
      />
      <LineSeparator/>
      <ShowBridges
        onToggle={onShowBridgeToggle}
      />
    </div>
  );
}

export default GraphStats;