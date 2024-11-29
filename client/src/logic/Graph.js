import Node from "./Node.js"

class Graph {
    nodes;
    edges;

    constructor() {
        this.nodes = new Map();
        this.edges = new Map();
    }

    clone() {
        const clonedGraph = new Graph();
        clonedGraph.nodes = new Map(this.nodes);
        clonedGraph.edges = new Map(
            [...this.edges].map(([key, value]) => [key, new Set(value)])
        );
        return clonedGraph;
    }

    addNode(name, x, y) {
        if (this.nodes.has(name)) {
            throw new Error(`ERROR - [Graph.constructor] - node with name ${name} already exsists in the graph`);
        }
        const node = new Node(name, x, y);
        this.nodes.set(name, node);
        this.edges.set(name, new Set());
    }

    removeNode (name) {
        if (!this.nodes.has(name)) {
            return;
        }

        this.edges.get(name).forEach((adjacentNode) => {
            this.edges.get(adjacentNode).delete(name);
        });

        this.nodes.delete(name);
        this.edges.delete(name);
    }

    addEdge(nodeOne, nodeTwo) {
        const nodeOneName = typeof nodeOne === 'string' ? nodeOne : nodeOne.name;
        const nodeTwoName = typeof nodeTwo === 'string' ? nodeTwo : nodeTwo.name;

        if (!this.nodes.has(nodeOneName) || !this.nodes.has(nodeTwoName)) {
            throw new Error(`ERROR - [Graph.addEdge] - one or both nodes do not exist`);
        }

        this.edges.get(nodeOneName).add(nodeTwoName);
        this.edges.get(nodeTwoName).add(nodeOneName);
    }

    removeEdge(nodeOne, nodeTwo) {
        const nodeOneName = typeof nodeOne === 'string' ? nodeOne : nodeOne.name;
        const nodeTwoName = typeof nodeTwo === 'string' ? nodeTwo : nodeTwo.name;

        if (!this.nodes.has(nodeOneName) || !this.nodes.has(nodeTwoName)) {
            throw new Error(`ERROR - [Graph.removeEdge] - one or both nodes do not exist`);
        }

        this.edges.get(nodeOneName).delete(nodeTwoName);
        this.edges.get(nodeTwoName).delete(nodeOneName);
    }

    getNeighbors(node) {
        const nodeName = typeof node === 'string' ? node : node.name;
        
        if (!this.edges.has(nodeName)) {
            throw new Error(`ERROR - [Graph.getNeighbors] - ${nodeName} does not exist`);
        }

        return Array.from(this.edges.get(nodeName));
    }

    getEdgeList() {
        const edgeSet = new Set();
        for (const [nodeName, neighbors] of this.edges.entries()) {
            for (const neighborName of neighbors) {
                if (nodeName < neighborName) {
                    edgeSet.add([nodeName, neighborName].sort().join('±'))
                }
            }
        }
        return Array.from(edgeSet).map(edge => edge.split('±'));
    }

    getNodeList() {
        return Array.from(this.nodes.keys());
    }

    hasNode(node) {
        const nodeName = typeof node === 'string' ? node : node.name;
        return this.nodes.has(nodeName);
    }

    // TODO : implement this
    getNumComponents() {
        const visited = new Set();
        let count = 0;
        for (const node of this.nodes.keys()) {
            if (!visited.has(node)) {
                this.#getNumComponentsHelper(node, visited);
                ++count;
            }
        }
        return count;
    }

    #getNumComponentsHelper(node, visited) {
        const stack = [node];
        while(stack.length > 0) {
            const currentNode = stack.pop();
            if (visited.has(currentNode)) {
                continue;
            }
            visited.add(currentNode);
            for (const neighbor of this.edges.get(currentNode)) {
                if (visited.has(neighbor)) {
                    continue;
                }
                stack.push(neighbor);
            }
        }
    }

    getNodeCount() {
        return this.nodes.size;
    }

    getEdgeCount() {
        let edgeCount = 0;
        for (const neighbors of this.edges.values()) {
            edgeCount += neighbors.size;
        }
        return edgeCount / 2;
    }

    isBipartite() {
        const colorMap = new Map();
   
        const bfs = (start) => {
            const queue = [start];
            colorMap.set(start, 0);
   
            while (queue.length > 0) {
                const curNode = queue.shift();
                const curColor = colorMap.get(curNode);
   
                for (const neighbor of this.edges.get(curNode)) {
                    if (!colorMap.has(neighbor)) {
                        colorMap.set(neighbor, 1 - curColor);
                        queue.push(neighbor);
                    } else if (colorMap.get(neighbor) === curColor) {
                        return false;
                    }
                }
            }
            return true;
        };
   
        for (const nodeName of this.nodes.keys()) {
            if (!colorMap.has(nodeName)) {
                if (!bfs(nodeName)) {
                    return false;
                }
            }
        }
   
        return true;
    }
 

    toJSON() {
        const serializedNodes = Array.from(this.nodes.values()).map(node => node.toJSON());
        const serializedEdges = {};

        for (const [node, neighbors] of this.edges.entries()) {
            serializedEdges[node] = Array.from(neighbors);
        }
        
        return {
            nodes: serializedNodes,
            edges: serializedEdges
        };
    }
}

export default Graph;