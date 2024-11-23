import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const InteractiveBackground = () => {
  const canvasRef = useRef(); // what type is canvas ref here? CHAT GPT

  useEffect(() => {
    const sketch = (p) => {
      const nodes = [];
      const numNodes = 50;
      const nodeRadius = 15; // Radius of each node
      const thickness = 2;
      const edgeDistance = 150; // Distance threshold for drawing edges

      // Function to generate a random RGB color
      const getRandomColor = () => p.color(p.random(255), p.random(255), p.random(255));

      const createNode = (canvasWidth, canvasHeight) => ({
        x: p.random(nodeRadius, canvasWidth - nodeRadius), // Ensure nodes are within canvas bounds
        y: p.random(nodeRadius, canvasHeight - nodeRadius), // Ensure nodes are within canvas bounds
        vx: p.random(-1, 1), // Random velocity
        vy: p.random(-1, 1), // Random velocity
        radius: nodeRadius,
        // Pick a random RGB color
        color: getRandomColor(),
      });

      p.setup = () => {
        // Set initial canvas size
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;
        const canvas = p.createCanvas(canvasWidth, canvasHeight);
        canvas.parent(canvasRef.current);

        // Generate nodes with random positions, velocities, and colors
        for (let i = 0; i < numNodes; i++) {
          nodes.push(createNode(canvasWidth, canvasHeight));
        }
      };

      p.draw = () => {
        // Get current canvas size after potential resizing
        const canvasWidth = window.innerWidth;
        const canvasHeight = window.innerHeight;

        p.background(200, 240, 255); // White background

        // Update positions of nodes
        nodes.forEach((node) => {
          node.x += node.vx;
          node.y += node.vy;

          // Collision detection: Check if node is near the edge, considering its radius
          if (node.x - node.radius <= 0 || node.x + node.radius >= canvasWidth) {
            node.vx *= -1; // Reverse X velocity if hitting left or right wall
            node.color = getRandomColor(); // Change to a new random color on collision
          }
          if (node.y - node.radius <= 0 || node.y + node.radius >= canvasHeight) {
            node.vy *= -1; // Reverse Y velocity if hitting top or bottom wall
            node.color = getRandomColor(); // Change to a new random color on collision
          }
        });

        // Draw edges between nodes that are within a certain distance
        p.stroke(0);
        p.strokeWeight(thickness);
        nodes.forEach((node1, index) => {
          nodes.forEach((node2, jndex) => {
            if (index !== jndex) {
              // Calculate distance between the nodes
              const dist = p.dist(node1.x, node1.y, node2.x, node2.y);

              // Draw an edge if the distance is within the threshold
              if (dist < edgeDistance) {
                p.line(node1.x, node1.y, node2.x, node2.y);
              }
            }
          });
        });

        // Draw nodes with random colors
        nodes.forEach((node) => {
          p.fill(node.color); // Use random color for each node
          p.stroke(0);
          p.strokeWeight(thickness);
          p.ellipse(node.x, node.y, node.radius * 2, node.radius * 2);
        });
      };

      // Handle resizing of the canvas
      const handleResize = () => {
        // Resize the canvas to match the parent container
        p.resizeCanvas(window.innerWidth, window.innerHeight);

        // Reposition nodes within new canvas bounds
        nodes.forEach((node) => {
          node.x = p.constrain(node.x, node.radius, window.innerWidth - node.radius - 1);
          node.y = p.constrain(node.y, node.radius, window.innerHeight - node.radius - 1);
        });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        p.remove();
        window.removeEventListener('resize', handleResize);
      };
    };

    const p5Instance = new p5(sketch);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: -1, width: '100%', height: '100%' }} />;
};

export default InteractiveBackground;