import Graph from "./Graph.js";

/**
 * 
 * @returns new graph
 */
const makeSampleGraph = () => {
    const graph = new Graph;
    graph.addNode("1", 500, 500);
    graph.addNode("2", 250, 500);
    graph.addNode("3", 500, 250);
    graph.addEdge("1", "2");
    graph.addEdge("1", "3");
    return graph;
}

export default makeSampleGraph;