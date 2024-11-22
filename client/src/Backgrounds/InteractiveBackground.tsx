import React, { useRef, useEffect } from "react"
import p5 from "p5";
import "./InteractiveBackground.css"

const InteractiveBackground : React.FC = () => {
    const cavasReference = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const sketch : Function = (p : p5) => {
            const nodes : Object[] = [];
            const numNodes : Number = 20;
            const nodeRadius : Number = 15;
            const thickness : Number = 2;
            const edgeDistance : Number = 150;

            const getRandomNodeColor : Function = () : p5.Color => {
                return p.color(p.random(255), p.random(255), p.random(255));
            }

            const createNode : Function = () => {

            }
        }
    }, []);
    return (
        <div ref={cavasReference}/>
    );
}

export default InteractiveBackground;