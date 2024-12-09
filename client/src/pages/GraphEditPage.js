import React, { useState, useEffect } from 'react';
import makeRandomGraph from './../logic/RandomGraph.js';
import Navbar from "./../componets/Navbar.js"
import GraphCanvas from './../componets/GraphCanvas.js';
import GraphProperties from "./../componets/GraphProperties.js"
import GraphStats from "./../componets/GraphStats.js"

const GraphEditPage = () => {
  const [graph, setGraph] = useState(makeRandomGraph());
  const [showBridges, setShowBridges] = useState(false);
  const [showMST, setShowMST] = useState(false);
  const [applyPhysics, setApplyPhysics] = useState(false);
  const [viewportSize, setViewportSize] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      const maxDimension = Math.min(window.innerWidth * 0.6, window.innerHeight * 0.8);
      setViewportSize(maxDimension); 
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    }
  }, []);

  const toggleShowBridges = (state) => {
    setShowBridges(state);
  }

  const toggleShowMST = (state) => {
    setShowMST(state);
  }

  const toggleApplyPhysics = (state) => {
    setApplyPhysics(state);
  }

  const deleteVertex = (vertex) => {
    const graphCpy = graph.clone();
    graphCpy.removeVertex(vertex);
    setGraph(graphCpy);
  }

  const deleteEdge = (vertexOne, vertexTwo) => {
    const graphCpy = graph.clone();
    graphCpy.removeEdge(vertexOne, vertexTwo);
    setGraph(graphCpy);
  }

  const addVertex = (vertexName) => {
    if (graph.hasVertex(vertexName)) {
      alert(`vertex with name ${vertexName} already exists`);
      return;
    } else if (vertexName.length > 15) {
      alert(`vertex names are a max of 15 characters`);
      return;
    }
    const graphCpy = graph.clone();
    graphCpy.addVertexRandomPosition(vertexName);
    setGraph(graphCpy);
  }

  const addEdge = (vertexOneName, vertexTwoName) => {
    if (!graph.hasVertex(vertexOneName) || !graph.hasVertex(vertexTwoName)) {
      if (!graph.hasVertex(vertexOneName) && !graph.hasVertex(vertexTwoName)) {
        alert(`${vertexOneName} and ${vertexTwoName} do not exist`);
      } else if (!graph.hasVertex(vertexOneName)) {
        alert(`${vertexOneName} does not exist`);
      } else {
        alert(`${vertexTwoName} does not exist`);
      }
      return;
    }
    const graphCpy = graph.clone();
    graphCpy.addEdge(vertexOneName, vertexTwoName);
    setGraph(graphCpy);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#FFFFFF"
      }}
    >
      <Navbar/>
      {/* MAIN CONTENT */}
      <div
        style={{
          display:"flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flex:1
        }}
      >
        <GraphProperties
          graph={graph}
          onRemoveVertex={deleteVertex}
          onRemoveEdge={deleteEdge}
          onAddVertex={addVertex}
          onAddEdge={addEdge}
        />
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <GraphCanvas
            graph={graph}
            showBridges={showBridges}
            showMST={showMST}
            applyPhysics={applyPhysics}
            sideLength={viewportSize}
          />
        </div>
        <GraphStats
          graph={graph}
          onShowBridgesToggle={toggleShowBridges}
          onShowMSTToggle={toggleShowMST}
          onApplyPhysicsToggle={toggleApplyPhysics}
        />
      </div>
    </div>
  );
}

export default GraphEditPage;