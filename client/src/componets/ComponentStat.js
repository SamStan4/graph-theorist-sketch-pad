import { useEffect, useState } from "react";

const ComponentStat = ({ graph }) => {
  const [numComponents, setNumComponents] = useState(graph.getNumComponents());

  useEffect(() => {
    setNumComponents(graph.getNumComponents());
  }, [graph]); // will this 

  return (
    <div
    >
      <p
        style={{
          textAlign: "center",
          margin: "3px"
        }}
      >Number of components: {numComponents}</p>
    </div>
  );
};

export default ComponentStat;