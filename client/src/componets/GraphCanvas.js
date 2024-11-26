import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';
import Graph from '../logic/Graph';

const GraphCanvas = ({graph, updateNodePosition}) => {
  const thickness = 2;
  const vertexDiameter = 30;
  const vertexRadius = vertexDiameter / 2;
  const canvasRef = useRef(null);
  const [draggingNode, setDraggingNode] = useState(null);

  useEffect(() => {
    const sketch = (p) => {
      let nodes = Array.from(graph.nodes.values());
      let draggedNode = null;

      p.setup = () => {
        const canvas = p.createCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        canvas.parent(canvasRef.current);
        p.textAlign(p.CENTER, p.CENTER);
      };

      const handleResize = () => {
        if (canvasRef.current) {
          const newWidth = canvasRef.current.offsetWidth;
          const newHeight = canvasRef.current.offsetHeight;
          p.resizeCanvas(newWidth, newHeight);
          graph.nodes.forEach((node) => {
            node.x = p.constrain(node.x, vertexRadius, newWidth - vertexRadius);
            node.y = p.constrain(node.y, vertexRadius, newHeight - vertexRadius);
          });
        }
      };

      window.addEventListener("resize", handleResize);

      p.draw = () => {
        p.background(255);

        // draw edges
        p.stroke(0);
        p.strokeWeight(thickness);
        graph.nodes.forEach((_, nodeName) => {
          graph.getNeighbors(nodeName).forEach((neighbor) => {
            const nodeOne = graph.nodes.get(nodeName);
            const nodeTwo = graph.nodes.get(neighbor);
            if (nodeOne && nodeTwo) {
              p.line(nodeOne.x, nodeOne.y, nodeTwo.x, nodeTwo.y);
            }
          })
        });

        p.stroke(0);
        p.strokeWeight(thickness);
        graph.nodes.forEach((node) => {
          p.fill(255);
          p.ellipse(node.x, node.y, vertexDiameter, vertexDiameter);
          p.fill(0);
          p.text(node.name, node.x, node.y);
        });
      }

      p.mousePressed = (event) => {
        event.preventDefault();
        const foundNode = Array.from(graph.nodes.values()).find(
          (node) => p.dist(p.mouseX, p.mouseY, node.x, node.y) < 15
        );
        if (foundNode) {
          draggedNode = foundNode;
          setDraggingNode(draggedNode);
        }
      }

      p.mouseReleased = (event) => {
        event.preventDefault();
        if (draggedNode) {
          // TODO : update nodeposition
          setDraggingNode(null);
          draggedNode = null;
        }
      }

      p.mouseDragged = (event) => {
        event.preventDefault();
        if (draggedNode != null) {
          const newX = p.constrain(p.mouseX, vertexRadius, p.width - vertexRadius);
          const newY = p.constrain(p.mouseY, vertexRadius, p.height - vertexRadius);
          draggedNode.x = newX;
          draggedNode.y = newY;
        }
      }

      return () => {
        window.removeEventListener("resize", handleResize);
      }
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };

  }, [graph, updateNodePosition]);

  return (
    <div
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%"
      }}
    />
  )
}

export default GraphCanvas;