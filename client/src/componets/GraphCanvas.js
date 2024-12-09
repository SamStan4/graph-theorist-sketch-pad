import React, { useRef, useEffect, useState } from 'react';
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
  const loopOffset = 10;
  const loopDiameter = 25;

  useEffect(() => {
    const vertexList = graph.getVertexList();
    const loopingEdgeVertexList = graph.getLoopingEdgeVertexList();
    const nonLoopingEdgeVertexList = graph.getNonLoopEdgeVertexList();
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
        for (let i = 0; i < loopingEdgeVertexList.length; ++i) {
          const xPos = (loopingEdgeVertexList[i].getXConversion(sideLength)) + loopOffset;
          const yPos = (loopingEdgeVertexList[i].getYConversion(sideLength)) - loopOffset;
          p.ellipse(
            xPos,
            yPos,
            loopDiameter,
            loopDiameter
          );
        }

        // Drawing regular edges
        p.strokeWeight(thickness);
        for (let i = 0; i < nonLoopingEdgeVertexList.length; ++i) {
          const vOneXPos = nonLoopingEdgeVertexList[i][0].getXConversion(p.width);
          const vOneYPos = nonLoopingEdgeVertexList[i][0].getYConversion(p.height);
          const vTwoXPos = nonLoopingEdgeVertexList[i][1].getXConversion(p.width);
          const vTwoYPos = nonLoopingEdgeVertexList[i][1].getYConversion(p.height);
          p.line(vOneXPos, vOneYPos, vTwoXPos, vTwoYPos);
        }

        if (showBridges) {
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
          const newX = p.constrain(p.mouseX, vertexRadius, sideLength - vertexRadius);
          const newY = p.constrain(p.mouseY, vertexRadius, sideLength - vertexRadius);
          draggedVertex.setXScale(newX, p.width);
          draggedVertex.setYScale(newY, p.height);
        }
        graph.printVertices();
      }
    }
    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [graph, sideLength]);

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