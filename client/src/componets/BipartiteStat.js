import { useState, useEffect } from "react";

const BipartiteStat = ({ graph }) => {
  const [isBipartite, setIsBipartite] = useState(graph.isBipartite());

  useEffect(() => {
    setIsBipartite(graph.isBipartite());
  }, [graph]);
  
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          margin: "3px"
        }}
      >
        Is biparitie: {isBipartite ? "true" : "false"}
      </p>
    </div>
  );
}

export default BipartiteStat;