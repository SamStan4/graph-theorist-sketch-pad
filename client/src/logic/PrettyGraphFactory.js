import Graph from "./Graph.js";

class PrettyGraphFactory {
    /**
     * Makes the cycle graph on some number of vertices.
     * @param { number } numberOfVertices 
     * @returns { Graph }
     */
    static makeCycleGraph(numberOfVertices) {
        const graph = new Graph();
        const xCenter = 50;
        const yCenter = 50;
        const radius = 40;
        if (numberOfVertices < 3) {
            return graph;
        }
        for (let i = 0; i < numberOfVertices; ++i) {
            const vertexName = i.toString();
            const angle = (2 * Math.PI * i) / numberOfVertices;
            const x = xCenter + radius * Math.cos(angle);
            const y = yCenter + radius * Math.sin(angle); 
            graph.addVertexExactScale(vertexName, x, y);
        }
        for (let i = 0; i < numberOfVertices; ++i) {
            const vertexOneName = i.toString();
            const vertexTwoName = ((i + 1) % numberOfVertices).toString();
            graph.addEdge(vertexOneName, vertexTwoName);
        }
        return graph;
    }

    static makeCompleteGraph(numberOfVertices) {
        const graph = new Graph();
        const xCenter = 50;
        const yCenter = 50;
        const radius = 40;
        for (let i = 0; i < numberOfVertices; ++i) {
            const vertexName = i.toString();
            const angle = (2 * Math.PI * i) / numberOfVertices;
            const x = xCenter + radius * Math.cos(angle);
            const y = yCenter + radius * Math.sin(angle); 
            graph.addVertexExactScale(vertexName, x, y);
        }
        for (let i = 0; i < numberOfVertices; ++i) {
            for (let j = i + 1; j < numberOfVertices; ++j) {
                const vertexOneName = i.toString();
                const vertexTwoName = j.toString();
                graph.addEdge(vertexOneName, vertexTwoName);
            }
        }
        return graph;
    }

    static makeHeartGraph(numberOfVertices) {
        const graph = new Graph();
        if (numberOfVertices < 3) {
            return graph;
        }

        const centerX = 50;
        const centerY = 50;
        const scaleFactor = 0.8;

        const rawCoordinates = [];

        for (let i = 0; i < numberOfVertices; ++i) {
            const t = (2 * Math.PI * i) / numberOfVertices;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y =
                13 * Math.cos(t) -
                5 * Math.cos(2 * t) -
                2 * Math.cos(3 * t) -
                Math.cos(4 * t);
            rawCoordinates.push({ x, y });
        }

        const xValues = rawCoordinates.map(coord => coord.x);
        const yValues = rawCoordinates.map(coord => coord.y);
        const minX = Math.min(...xValues);
        const maxX = Math.max(...xValues);
        const minY = Math.min(...yValues);
        const maxY = Math.max(...yValues);

        for (let i = 0; i < numberOfVertices; ++i) {
            const normalizedX =
                ((rawCoordinates[i].x - minX) / (maxX - minX)) * 100;
            const normalizedY =
                100 - ((rawCoordinates[i].y - minY) / (maxY - minY)) * 100;

            const scaledX = centerX + (normalizedX - centerX) * scaleFactor;
            const scaledY = centerY + (normalizedY - centerY) * scaleFactor;

            const vertexName = i.toString();
            graph.addVertexExactScale(vertexName, scaledX, scaledY);
        }

        for (let i = 0; i < numberOfVertices; ++i) {
            const vertexOneName = i.toString();
            const vertexTwoName = ((i + 1) % numberOfVertices).toString();
            graph.addEdge(vertexOneName, vertexTwoName);
        }

        return graph;
    }

    static makeEmptyGraph() {
        return new Graph();
    }
}

export default PrettyGraphFactory;