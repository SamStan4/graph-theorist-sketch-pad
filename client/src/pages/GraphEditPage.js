import React, { useState, useEffect } from 'react';
import GraphCanvas from "./../componets/GraphCanvas.js";
import makeSampleGraph from "./../logic/Samples.js";

const GraphEditPage = () => {
  const [graph, setGraph] = useState(makeSampleGraph());
  const updateNodePosition = (updateNodes) => {
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#FFFFFF"
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          backgroundColor: "#007BFF",
          color: "white",
          padding: "10px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{margin: 0}}
          onClick={() => alert("hello there ;)")}
        >
          Graph Theorist Sketch Pad
        </h1>
      </nav>
      {/* MAIN CONTENT */}
      <div
        style={{
          display:"flex",
          flex:1
        }}
      >
        {/* LEFT SIDEBAR */}
        <div
          style={{
            width:"20%",
            backgroundColor: "#f4f4f4",
            padding: "10px",
            boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)"
          }}
        >
          <h2>Graph Tools</h2>
        </div>
        {/* GRAPH CANVAS VIEWPORT */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: `${viewportSize}px`,
              height: `${viewportSize}px`,
              border: "1px solid #ddd",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <GraphCanvas graph={graph} updateNodePosition={updateNodePosition}/>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div
          style={{
            width: "20%",
            backgroundColor: "#f4f4f4",
            padding: "10px",
            boxShadow: "-2px 0 5px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2>Properties</h2>
        </div>
      </div>
    </div>
  );
}

export default GraphEditPage;