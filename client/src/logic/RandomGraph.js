import Graph from "./Graph"

const makeRandomGraph = () => {
    const graph = new Graph();
    const vertexNames = ['1', '2', '3', '4', '5'];
    for (let i = 0; i < vertexNames.length; ++i) {
        graph.addVertexRandomPosition(vertexNames[i]);
    }
    for (let i = 0; i < vertexNames.length; ++i) {
        for (let j = i; j < vertexNames.length; ++j) {
            if (Math.random() < 0.5) {
                graph.addEdge(vertexNames[i], vertexNames[j]);
            }
        }
    }
    return graph;
}

export default makeRandomGraph;