import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

const GraphCanvasg = ({ graph, updateNodePosition }) => {
  const thickness = 2;
  const canvasRef = useRef();
  const [draggingNode, setDraggingNode] = useState(null);

  useEffect(() => {
    const sketch = (p) => {
      let nodes = Array.isArray(graph.nodes) ? [...graph.nodes] : [];
      let draggedNode = null;

      p.setup = () => {
        const canvas = p.createCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        canvas.parent(canvasRef.current);
      };

      const handleResize = () => {
        if (canvasRef.current) {
          p.resizeCanvas(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
        }
      };
      window.addEventListener('resize', handleResize);

      p.draw = () => {
        p.background(255); // White background

        // Draw edges first
        p.stroke(0);
        p.strokeWeight(thickness);
        graph.edges.forEach((edge) => {
          const fromNode = nodes.find((node) => node.id === edge.from);
          const toNode = nodes.find((node) => node.id === edge.to);
          if (fromNode && toNode) {
            p.line(fromNode.x, fromNode.y, toNode.x, toNode.y);
          }
        });

        // Draw nodes (white with black border)
        p.fill(255); // White fill
        p.stroke(0); // Black border
        p.strokeWeight(thickness);
        nodes.forEach((node) => {
          p.ellipse(node.x, node.y, 30, 30);
        });
      };

      p.mousePressed = (event) => {
        event.preventDefault();
        // Check if mouse is over any node
        const foundNode = nodes.find(
          (node) => p.dist(p.mouseX, p.mouseY, node.x, node.y) < 15 // Node radius is 15px
        );
        if (foundNode) {
          draggedNode = foundNode;
          setDraggingNode(draggedNode);
        }
      };

      p.mouseReleased = (event) => {
        event.preventDefault();
        if (draggedNode) {
          // Update the node position in the parent component's state
          updateNodePosition(draggedNode.id, draggedNode.x, draggedNode.y);
          setDraggingNode(null);
        }
        draggedNode = null;
      };

      p.mouseDragged = (event) => {
        event.preventDefault();
        if (draggedNode !== null) {
          const newX = p.constrain(p.mouseX, 10, p.width - 10);
          const newY = p.constrain(p.mouseY, 10, p.height - 10);
          if (draggedNode.x !== newX || draggedNode.y !== newY) {
            draggedNode.x = newX;
            draggedNode.y = newY;
          }
        }
      };

      return () => {
        window.removeEventListener('resize', handleResize);
        p.remove();
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, [graph, updateNodePosition]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        border: '2px solid black',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box',
      }}
    >
      <div
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
};

export default GraphCanvas;
