import React, { useState, useEffect, useCallback } from "react";

const ChromPolyStat = ({ graph }) => {
  // const [chromaticPolynomial, setChromaticPolynomial] = useState("");
  const [chromaticNumber, setChromaticNumber] = useState(0);

  const isValidColor = useCallback((graph, colorMap, currentVertex, color) => {
    const neighbors = graph.getNeighbors(currentVertex.vertexName);
    for (let i = 0; i < neighbors.length; i++) {
      if (colorMap.get(neighbors[i]) === color) {
        return false;
      }
    }
    return true;
  }, []);

  const colorGraph = useCallback((graph, colorMap, currentVertex, numColors) => {
    const vertices = graph.getVertexList();

    if (colorMap.size === vertices.length) {
      return true;
    }

    for (let color = 1; color <= numColors; color++) {
      if (isValidColor(graph, colorMap, currentVertex, color)) {
        colorMap.set(currentVertex.vertexName, color);
        if (colorGraph(graph, colorMap, vertices[vertices.indexOf(currentVertex) + 1], numColors)) {
          return true;
        }
        delete colorMap[currentVertex.vertexName];
      }
    }
    return false;
  }, [isValidColor]);

  useEffect(() => {
    const computeChromaticNumber = (graph) => {
      if(graph.getVertexCount() === 0) {
        return 0;
      }
      const colorMap = new Map();
      let numColors = 1;
      while(!colorGraph(graph, colorMap, graph.getVertexList()[0], numColors)) {
        numColors++;
      }
      return numColors;
    };

    if (graph) {
      setChromaticNumber(computeChromaticNumber(graph));
    }
  }, [graph, colorGraph]);

	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				gap: "10px",
			}}
		>
			<p
				style={{
					margin: "0px",
				}}
			>
				Chromatic Number:
			</p>
			<p>{chromaticNumber}</p>
		</div>
	);
};

export default ChromPolyStat;
