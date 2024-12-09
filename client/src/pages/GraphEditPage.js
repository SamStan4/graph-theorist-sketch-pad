import React, { useState, useEffect, useRef } from 'react';
import makeRandomGraph from './../logic/RandomGraph.js';
import Navbar from "./../componets/Navbar.js"
import GraphCanvas from './../componets/GraphCanvas.js';

const GraphEditPage = () => {
  const [graph, setGraph] = useState(makeRandomGraph());
  const [showBridges, setShowBridges] = useState(false);
  const [showMST, setShowMST] = useState(false);
  const [applyPhysics, setApplyPhysics] = useState(true);
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

  const toggleShowBridges = () => {
    setShowBridges(!showBridges);
  }

  const toggleShowMST = () => {
    setShowMST(!showMST);
  }

  const toggleApplyPhysics = () => {
    setApplyPhysics(!applyPhysics);
  }

  const deleteVertex = (vertex) => {
    const graphCpy = graph.clone();
    graphCpy.deleteVertex(vertex);
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
    graphCpy.addVertex(vertexName);
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
          flex:1
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
    </div>
  )
}

export default GraphEditPage;