import React, { useState, useEffect } from 'react';
import GraphCanvas from "./../componets/GraphCanvas.js";
import makeSampleGraph from "./../logic/Samples.js";

const GraphEditPage = () => {
  const [graph, setGraph] = useState(makeSampleGraph());
  const updateGraph = (updateNodes) => {
    console.log("updating the graph");
  }

  const [viewportSize, setViewportSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      const maxDimension = Math.min(window.innerWidth * 0.6, window.innerHeight * 0.8)
      setViewportSize(maxDimension);
    }

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    }
  }, []);


  return (
    <div style={{ display: "flex", height: "100vh"}}>
      {/* left sidebar goes here */}
      <div
        style={{
          width: "20%",
          backgroundColor: "#f4f4f4",
          padding: "10px",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h2>Graph Tools</h2>
      </div>
      {/* Graph viewport */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div
          style={{
            width: `${viewportSize}px`,
            height: `${viewportSize}px`,
            border: "1px solid #ddd",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
          }}
        >
          <GraphCanvas graph={graph} updateGraph={updateGraph}/>
        </div>
      </div>
      {/* right sidebar here */}
      <div
        style={{
          width: "20%",
          backgroundColor: "#f4f4f4",
          padding: "10px",
          boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h2>Graph Properties</h2>
      </div>
    </div>
  );
}

export default GraphEditPage;