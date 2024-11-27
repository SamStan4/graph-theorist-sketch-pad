import NodeItem from "./NodeItem.js";

const NodeColumn = ({ graph }) => {
  const temp = (item) => {
    console.log(`removing ${item}`);
  } 
  return (
    <div
      style={{
        width: "50%",
        flex: 1
      }}
    >
      <h3
        style={{
          textAlign: "center"
        }}
      >
        Vertices
      </h3>
      {Array.from(graph.nodes.keys()).map((key) => (
        <NodeItem
          key={key}
          nodeName={key}
          onRemove={temp}
        />
      ))}
    </div>
  );
}

export default NodeColumn;