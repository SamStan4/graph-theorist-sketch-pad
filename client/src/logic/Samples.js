import Graph from "./Graph.js";

/**
 * 
 * @returns new graph
 */
const makeSampleGraph = () => {
    const graph = new Graph;
    graph.addNode("1", 10, 10);
    graph.addNode("2", 20, 20);
    graph.addEdge("1", "2");
    return graph;
}

export default makeSampleGraph;