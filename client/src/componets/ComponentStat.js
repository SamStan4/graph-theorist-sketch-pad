import { useEffect, useState } from "react";

const ComponentStat = ({ graph }) => {
  const [numComponents, setNumComponents] = useState(graph.getNumberOfComponents());

  useEffect(() => {
    setNumComponents(graph.getNumberOfComponents());
  }, [graph]);

  return (
    <div>
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