import LineSeparator from "./LineSeparator";
import ComponentStat from "./ComponentStat";

const GraphStats = ({ graph }) => {
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
    </div>
  );
}

export default GraphStats;