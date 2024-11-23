import React, { useRef, useEffect } from "react";
import p5 from "p5";
import backgroundNode from "./backgroundNode";

const InteractiveBackground: React.FC = () => {
    const canvasRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const sketch = (p: p5) => {
            const nodes: backgroundNode[] = [];
            const numNodes = 100;
            const nodeRadius = 15;
            const thickness = 2;
            const edgeDistance = 150;
            const speed = 1;

            const getRandomColor = (): p5.Color =>
                p.color(p.random(255), p.random(255), p.random(255));

            const createNode = (canvasWidth: number, canvasHeight: number): backgroundNode =>
                new backgroundNode(
                    p.random(nodeRadius, canvasWidth - nodeRadius),
                    p.random(nodeRadius, canvasHeight - nodeRadius),
                    p.random(-1 * speed, speed),
                    p.random(-1 * speed, speed),
                    nodeRadius,
                    getRandomColor()
                );

            p.setup = () => {
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;
                const canvas = p.createCanvas(canvasWidth, canvasHeight);

                if (canvasRef.current) {
                    canvas.parent(canvasRef.current);
                }

                for (let i = 0; i < numNodes; i++) {
                    nodes.push(createNode(canvasWidth, canvasHeight));
                }
            };

            p.draw = () => {
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;

                p.background(200, 240, 255);

                for (let i = 0; i < nodes.length; ++i) {
                    nodes[i].x += nodes[i].xVelocity;
                    nodes[i].y += nodes[i].yVelocity;

                    if (nodes[i].x - nodes[i].radius <= 0 || nodes[i].x + nodes[i].radius >= canvasWidth) {
                        nodes[i].xVelocity *= -1;
                        nodes[i].color = getRandomColor();
                    }

                    if (nodes[i].y - nodes[i].radius <= 0 || nodes[i].y + nodes[i].radius >= canvasHeight) {
                        nodes[i].yVelocity *= -1;
                        nodes[i].color = getRandomColor();
                    }
                }

                p.stroke(0);
                p.strokeWeight(thickness);
                for (let i = 0; i < nodes.length; ++i) {
                    for (let j = 1; j < nodes.length; ++j) {
                        if (p.dist(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y) < edgeDistance) {
                            p.line(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
                        }
                    }
                }

                for (let i = 0; i < nodes.length; ++i) {
                    p.fill(nodes[i].color);
                    p.stroke(0);
                    p.strokeWeight(thickness);
                    p.ellipse(nodes[i].x, nodes[i].y, nodes[i].radius * 2, nodes[i].radius * 2);
                }
            };

            const handleResize = () => {
                const canvasWidth = window.innerWidth;
                const canvasHeight = window.innerHeight;

                p.resizeCanvas(canvasWidth, canvasHeight);

                for (let i : number = 0; i < nodes.length; ++i) {
                    nodes[i].x = p.constrain(nodes[i].x, nodes[i].radius, canvasWidth - nodes[i].radius - 1);
                    nodes[i].y = p.constrain(nodes[i].y, nodes[i].radius, canvasHeight - nodes[i].radius - 1);
                }
            };

            window.addEventListener("resize", handleResize);

            return () => {
                p.remove();
                window.removeEventListener("resize", handleResize);
            };
        };

        const p5Instance = new p5(sketch);

        return () => {
            p5Instance.remove();
        };

    }, []);

    return (
        <div ref={canvasRef} className="background-canvas-style"/>
    );
};

export default InteractiveBackground;