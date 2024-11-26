import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const NodeBackgroundComponent = () => {
    const canvasReference = useRef();

    useEffect(() => {
        const sketch = (p) => {
            const nodeList = []           // the list of nodes in the background
            const numNodes = 50           // the number of nodes in the background
            const nodeRadius = 15;        // the radius of the nodes (size)
            const thickness = 2;          // the thickness of the node boarder and edges
            const edgeDistance = 150;     // the distance at which we create an edge
            const speed = 1;              // the speed the nodes will be going
            const repulsionRadius = 100;  // mouse repulsion radius
            const repulsionForce = 5;     // the strength of mouse repulsion
            const damp = 0.95;            // friction slow down

            const getRandColor = () => {
                return p.color(p.random(255), p.random(255), p.random(255));
            }

            const makeNewNode = (canvasWidth, canvasHeight) => {
                const randX = p.random(-1, 1) * speed;
                const randY = p.random(-1, 1) * speed;                
                return {
                    x       : p.random(nodeRadius, canvasWidth - nodeRadius),
                    y       : p.random(nodeRadius, canvasHeight - nodeRadius),
                    vx0     : randX,
                    vy0     : randY,
                    vx      : randX,
                    vy      : randY,
                    radius  : nodeRadius,
                    color   : getRandColor(),
                }
            }

            p.setup = () => {
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;
                const canvas = p.createCanvas(canvasWidth, canvasHeight);
                canvas.parent(canvasReference.current);

                for (let i = 0; i < numNodes; ++i) {
                    nodeList.push(makeNewNode(canvasWidth, canvasHeight));
                }
            }

            p.draw = () => {
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;

                // baby blue for the background
                p.background(200, 240, 255);

                // collision detection loop
                nodeList.forEach((node) => {
                    // node.vx *= damp;
                    // node.vy *= damp;

                    // node.vx += (node.vx0 - node.vx) * 0.05;
                    // node.vy += (node.vy0 - node.vy) * 0.05;

                    node.x += node.vx;
                    node.y += node.vy;

                    if (node.x - node.radius <= 0 || node.x + node.radius >= canvasWidth) {
                        node.vx *= -1;
                        // node.color = getRandColor();
                    }

                    if (node.y - node.radius <= 0 || node.y + node.radius >= canvasHeight) {
                        node.vy *= -1;
                        // node.color = getRandColor();
                    }

                    // const dx = node.x - p.mouseX;
                    // const dy = node.y - p.mouseY;
                    // const dist = Math.sqrt((dx * dx) + (dy * dy));
                    // if (dist < repulsionRadius) {
                    //     const angle = Math.atan2(dy, dx);
                    //     const force = (repulsionRadius - dist) / repulsionRadius * repulsionForce;
                    //     node.vx += Math.cos(angle) * force;
                    //     node.vy += Math.sin(angle) * force;
                    // }
                });

                // drawing edges loop
                // TODO: use spatial partitioning algorithm to make this faster
                p.stroke(0);
                p.strokeWeight(thickness);
                for (let i = 0; i < nodeList.length; ++i) {
                    for (let j = i + 1; j < nodeList.length; ++j) {
                        const dist = p.dist(nodeList[i].x, nodeList[i].y, nodeList[j].x, nodeList[j].y);
                        if (dist < edgeDistance) {
                            p.line(nodeList[i].x, nodeList[i].y, nodeList[j].x, nodeList[j].y);
                        }
                    }
                }

                // drawing the nodes onto the canvas
                for (let i = 0; i < nodeList.length; ++i) {
                    p.fill(nodeList[i].color);
                    p.stroke(0);
                    p.strokeWeight(thickness);
                    p.ellipse(nodeList[i].x, nodeList[i].y, nodeList[i].radius * 2, nodeList[i].radius * 2);
                }
            }

            const handleResize = () => {
                const newWindowWidth = window.innerWidth;
                const newWindowHeight = window.innerHeight;

                p.resizeCanvas(newWindowWidth, newWindowHeight);

                for (let i = 0; i < nodeList.length; ++i) {
                    nodeList[i].x = p.constrain(nodeList[i].x, nodeList[i].radius, newWindowWidth - nodeList[i].radius - 1);
                    nodeList[i].y = p.constrain(nodeList[i].y, nodeList[i].radius, newWindowHeight - nodeList[i].radius - 1);
                }
            }

            window.addEventListener('resize', handleResize);

            return () => {
                p.remove();
                window.removeEventListener('resize', handleResize);
            }
        }

        const p5Instance = new p5(sketch);

        return () => {
            p5Instance.remove();
        };

    }, []);

    return (
        <div ref={canvasReference}/>
    );
}

export default NodeBackgroundComponent;