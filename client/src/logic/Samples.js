import Graph from "./Graph.js";

/**
 * 
 * @returns new graph
 */
const makeSampleGraph = () => {
    const graph = new Graph;
    graph.addNode("1", 100, 100);
    graph.addNode("2", 250, 500);
    graph.addNode("3", 500, 250);
    graph.addNode("4", 600, 600);
    graph.addNode("5", 100, 500)
    graph.addEdge("1", "2");
    graph.addEdge("1", "2");
    graph.addEdge("1", "2");
    graph.addEdge("1", "2");
    graph.addEdge("1", "2");
    graph.addEdge("1", "3");
    graph.addEdge("1", "4");
    return graph;
}

export default makeSampleGraph;