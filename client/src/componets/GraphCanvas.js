import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const GraphCanvas = ({graph, showBridges, showMST, applyPhysics, sideLength}) => {
  const thickness = 2;
  const textThickness = 1;
  const vertexDiameter = 30;
  const vertexRadius = 15;
  const canvasRef = useRef(null);
  const backgroundColor = (255, 255, 255);
  const vertexColor = (255, 255, 255);
  const textColor = (0, 0, 0);
  const bridgeThickness = 2;
  const loopOffset = 0;
  const loopDiameter = 25;

  useEffect(() => {
    const vertexList = graph.getVertexList();
    const loopingEdgeVertexList = graph.getLoopingEdgeVertexList();
    const nonLoopingEdgeVertexList = graph.getNonLoopEdgeVertexList();
    const bridgeEdgeVertexList = graph.getBridgeVertexList();
    const MSTEdgeVertexList = graph.getSpanningTreeEdges();

    let draggedVertex = null;

    const sketch = (p) => {
      p.setup = () => {
        const canvas = p.createCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        canvas.parent(canvasRef.current);
        p.textAlign(p.CENTER, p.CENTER);
      };

      p.draw = () => {
        p.background(backgroundColor);
        p.stroke(0);

        if (applyPhysics) {
          graph.applyPhysics(p.width, p.height, draggedVertex);
        }

        // Drawing the loops
        p.strokeWeight(thickness);
        p.fill(backgroundColor);
        if (!showMST) {
          for (let i = 0; i < loopingEdgeVertexList.length; ++i) {
            const loopVertex = loopingEdgeVertexList[i];
            const xPos = loopVertex.getXConversion(sideLength) + loopOffset;
            const yPos = loopVertex.getYConversion(sideLength) - loopOffset;
            const loopWidth = loopDiameter * 1.7; // Elongate the loop
            const loopHeight = loopDiameter; // Keep the original diameter for height

            // Find the nearest vertex
            let nearestVertex = null;
            let minDistance = Infinity;
            for (let j = 0; j < vertexList.length; ++j) {
              const vertex = vertexList[j];
              if (vertex !== loopVertex) {
                const distance = Math.hypot(
                  vertex.getXConversion(sideLength) - xPos,
                  vertex.getYConversion(sideLength) - yPos
                );
                if (distance < minDistance) {
                  minDistance = distance;
                  nearestVertex = vertex;
                }
              }
            }

            // Calculate the angle away from the nearest vertex
            let angle = 0;
            if (nearestVertex) {
              const nearestX = nearestVertex.getXConversion(sideLength);
              const nearestY = nearestVertex.getYConversion(sideLength);
              angle = Math.atan2(yPos - nearestY, xPos - nearestX) + Math.PI;
            }

            // Calculate the new position based on the angle
            const newXPos = xPos - loopWidth * Math.cos(angle) / 2;
            const newYPos = yPos - loopHeight * Math.sin(angle);

            p.push();
            p.translate(newXPos, newYPos);
            p.rotate(angle);
            p.ellipse(0, 0, loopWidth, loopHeight);
            p.pop();
          }
        }

        // Drawing regular edges
        p.strokeWeight(thickness);
        if (showMST) {
          for (let i = 0; i < MSTEdgeVertexList.length; ++i) {
            const vOneXPos = MSTEdgeVertexList[i][0].getXConversion(p.width);
            const vOneYPos = MSTEdgeVertexList[i][0].getYConversion(p.height);
            const vTwoXPos = MSTEdgeVertexList[i][1].getXConversion(p.width);
            const vTwoYPos = MSTEdgeVertexList[i][1].getYConversion(p.height);
            p.line(vOneXPos, vOneYPos, vTwoXPos, vTwoYPos);
          }
        } else {
          for (let i = 0; i < nonLoopingEdgeVertexList.length; ++i) {
            const vOneXPos = nonLoopingEdgeVertexList[i][0].getXConversion(p.width);
            const vOneYPos = nonLoopingEdgeVertexList[i][0].getYConversion(p.height);
            const vTwoXPos = nonLoopingEdgeVertexList[i][1].getXConversion(p.width);
            const vTwoYPos = nonLoopingEdgeVertexList[i][1].getYConversion(p.height);
            p.line(vOneXPos, vOneYPos, vTwoXPos, vTwoYPos);
          }
        }

        if (showBridges) {
          p.strokeWeight(bridgeThickness);
          p.stroke(255, 0, 0);
          for (let i = 0; i < bridgeEdgeVertexList.length; ++i) {
            const vOneXPos = bridgeEdgeVertexList[i][0].getXConversion(p.width);
            const vOneYPos = bridgeEdgeVertexList[i][0].getYConversion(p.height);
            const vTwoXPos = bridgeEdgeVertexList[i][1].getXConversion(p.width);
            const vTwoYPos = bridgeEdgeVertexList[i][1].getYConversion(p.height);
            p.line(vOneXPos, vOneYPos, vTwoXPos, vTwoYPos);
          }
          p.stroke(0);
        }

        if (showMST) {
        }

        // Drawing the vertices
        for (let i = 0; i < vertexList.length; ++i) {
          const xPos = vertexList[i].getXConversion(p.width);
          const yPos = vertexList[i].getYConversion(p.height);
          p.strokeWeight(thickness);
          p.fill(vertexColor);
          p.ellipse(
            xPos,
            yPos,
            vertexDiameter,
            vertexDiameter
          );
          p.strokeWeight(textThickness);
          p.fill(textColor);
          p.text(vertexList[i].vertexName, xPos, yPos);
        }
      }

      p.mousePressed = () => {
        const foundVertex = vertexList.find((vertex) => {
          const xPos = vertex.getXConversion(p.width);
          const yPos = vertex.getYConversion(p.height);
          return p.dist(p.mouseX, p.mouseY, xPos, yPos) < vertexRadius;
        });
        if (foundVertex) {
          draggedVertex = foundVertex;
        }
      }

      p.mouseReleased = () => {
        if (draggedVertex !== null) {
          draggedVertex = null;
        }
      }

      p.mouseDragged = () => {
        if (draggedVertex !== null && p.width !== 0 && p.height !== 0) {
          const newX = p.constrain(p.mouseX, vertexRadius, p.width - vertexRadius);
          const newY = p.constrain(p.mouseY, vertexRadius, p.height - vertexRadius);
          draggedVertex.setXScale(newX, p.width);
          draggedVertex.setYScale(newY, p.height);
        }
      }
    }
    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [graph, sideLength, showBridges, showMST, applyPhysics, backgroundColor, vertexColor, textColor]);

  return (
    <div
      ref={canvasRef}
      style={{
        width: `${sideLength}px`,
        height: `${sideLength}px`,
        border: "1px solid #ddd",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    />
  )
};

export default GraphCanvas;