import Vertex from "./Vertex.js";

/**
 * Class for representing a graph.
 */
export default class Graph {
    /**
     * @type {Map<string, Vertex>} A map of vertex names to vertex objects.
     */
    vertices;
    /**
     * @type {Map<string, Set<string>>} A map of vertex names to sets of connected vertices (edges).
     */
    edges;
    /**
     * @type {Set<string>} A set of vertex names that have loops (edges to themselves).
     */
    loops;

    /**
     * Initializes the graph.
     */
    constructor() {
        this.vertices = new Map();
        this.edges = new Map();
        this.loops = new Set();
    }

    /**
     * Clone method for helping with state management.
     * @returns { Graph } A copy of the graph.
     */
    clone() {
        const clonedGraph = new Graph();
        clonedGraph.vertices = new Map(this.vertices);
        clonedGraph.edges = new Map(
            [...this.edges].map(([key, value]) => [key, new Set(value)])
        );
        clonedGraph.loops = new Set(this.loops);
        return clonedGraph;
    }

    /**
     * Adds a node to the graph in a random position.
     * @param { string } name 
     */
    addVertexRandomPosition(name) {
        if (this.vertices.has(name)) {
            throw new Error(`graph already has vertex with name ${name}`);
        }
        const randX = Math.floor(Math.random() * 101);
        const randY = Math.floor(Math.random() * 101);
        const newVertex = new Vertex(name, randX, randY);
        this.vertices.set(name, newVertex);
        this.edges.set(name, new Set());
    }

    /**
     * Adds an edge to the graph.
     * @param { Vertex | string } vertexOne 
     * @param { Vertex | string } vertexTwo 
     */
    addEdge(vertexOne, vertexTwo) {
        const nodeOneName = typeof vertexOne === 'string' ? vertexOne : vertexOne.vertexName;
        const nodeTwoName = typeof vertexTwo === 'string' ? vertexTwo : vertexTwo.vertexName;
        if (!this.vertices.has(nodeOneName) || !this.vertices.has(nodeTwoName)) {
            throw new Error(`one or both vertices does not exist`);
        }
        if (nodeOneName === nodeTwoName) {
            this.loops.add(nodeOneName);
        } else {
            this.edges.get(nodeOneName).add(nodeTwoName);
            this.edges.get(nodeTwoName).add(nodeOneName);
        }
    }

    /**
     * Removes a vertex from the graph.
     * @param { Vertex | string } vertexName 
     */
    removeVertex(vertex) {
        const vertexName = typeof vertex === "string" ? vertex : vertex.vertexName;
        if (this.vertices.has(vertexName)) {
            this.edges.get(vertexName).forEach((neighbor) => {
                this.edges.get(neighbor).delete(vertexName);
            });
            this.loops.delete(vertexName);
            this.edges.delete(vertexName);
            this.vertices.delete(vertexName);
        }
    }

    /**
     * Deletes an edge from the graph
     * @param { Vertex | string } vertexOne 
     * @param { Vertex | string } vertexTwo 
     */
    removeEdge(vertexOne, vertexTwo) {
        const nodeOneName = typeof vertexOne === 'string' ? vertexOne : vertexOne.vertexName;
        const nodeTwoName = typeof vertexTwo === 'string' ? vertexTwo : vertexTwo.vertexName;
        if (!this.vertices.has(nodeOneName) || !this.vertices.has(nodeTwoName)) {
            throw new Error(`one or both vertices does not exist`);
        }
        if (nodeOneName === nodeTwoName) {
            this.loops.delete(nodeOneName);
        } else {
            this.edges.get(nodeOneName).delete(nodeTwoName);
            this.edges.get(nodeTwoName).delete(nodeOneName);
        }
    }
    
    /**
     * Gets the degree of a vertex :)
     * @param { Vertex | string } vertex 
     * @returns { number } represenging the degree of the vertex
     */
    getVertexDegree(vertex) {
        const vertexName = typeof vertex === "string" ? vertex : vertex.vertexName;
        if (!this.vertices.has(vertexName)) {
            throw new Error(`vertex with name ${vertexName} does not exist`);
        }
        return this.edges.get(vertexName).size + (this.loops.has(vertexName) ? 1 : 0);
    }

    /**
     * Gets all edges in the graph. Represents the vertices with their names.
     * @returns {Array<string[]>}
     */
    getAllEdgeNames() {
        const edgeSet = new Set();
        // Get all regular edges first
        for (const [vertexName, neighbors] of this.edges.entries()) {
            for (const neighborName of neighbors) {
                if (vertexName < neighborName) {
                    edgeSet.add([vertexName, neighborName].join('±'));
                }
            }
        }
        for (const vertexName of this.loops) {
            edgeSet.add([vertexName, vertexName].join('±'));
        }
        return Array.from(edgeSet).map(edge => edge.split('±'));
    }

    /**
     * Gets the name of every vertex in the graph.
     * @returns { string[] }
     */
    getAllVertexNames() {
        return Array.from(this.vertices.keys()); 
    }

    getAllVertexNamesAndDegree() {
        const vertexNamesAndDegrees = [];
        for (const [vertexName, neighbors] of this.edges.entries()) {
            const degree = neighbors.size + (this.loops.has(vertexName) ? 1 : 0);
            vertexNamesAndDegrees.push({
                name : vertexName,
                deg : degree
            });
        }
        return vertexNamesAndDegrees;
    }

    getAllEdgeNames() {
        const edgeSet = new Set();
        for (const [vertexName, neighbors] of this.edges.entries()) {
            for (const neighborName of neighbors) {
                if (vertexName < neighborName) {
                    edgeSet.add([vertexName, neighborName].join('±'));
                }
            }
        }
        for (const vertexName of this.loops) {
            edgeSet.add([vertexName, vertexName].join('±'));
        }
        return Array.from(edgeSet).map(edge => edge.split('±'));
    }

    /**
     * Gets all non loop edges in the graph. Represents the vertices with their names.
     * @returns {Array<string[]>}
     */
    getAllNonLoopEdgeNames() {
        const edgeSet = new Set();
        for (const [vertexName, neighbors] of this.edges.entries()) {
            for (const neighborName of neighbors) {
                if (vertexName < neighborName) {
                    edgeSet.add([vertexName, neighborName].join('±'));
                }
            }
        }
        return Array.from(edgeSet).map(edge => edge.split('±'));
    }
    
    /**
     * Gets all loop edges in the graph. Represents the vertices with their names.
     * @returns {Array<string[]>}
     */
    getAllLoopEdgeNames() {
        const edgeSet = new Set();
        for (const vertexName of this.loops) {
            edgeSet.add([vertexName, vertexName].join('±'));
        }
        return Array.from(edgeSet).map(edge => edge.split('±'));
    }

    /**
     * Determines if the graph contains a vertex already
     * @param { Vertex | string } vertex 
     * @returns { boolean }
     */
    hasVertex(vertex) {
        const vertexName = typeof vertex === "string" ? vertex : vertex.vertexName;
        return this.vertices.has(vertexName);
    }

    /**
     * Gets a list of vertex objects
     * @returns { Vertex[] }
     */
    getVertexList() {
        return Array.from(this.vertices.values());
    }

    /**
     * Gets all looping vertices
     * @returns { Vertex[] }
     */
    getLoopingEdgeVertexList() {
        const loopingVerticies = [];
        this.loops.forEach(vertexName => {
            loopingVerticies.push(this.vertices.get(vertexName));
        });
        return loopingVerticies;
    }

    getNonLoopEdgeVertexList() {
        const edgeList = []
        for (const [vertexName, neighbors] of this.edges.entries()) {
            for (const neighborName of neighbors) {
                if (vertexName < neighborName) {
                    edgeList.push([this.vertices.get(vertexName), this.vertices.get(neighborName)]);
                }
            }
        }
        return edgeList;
    }

    printVertices() {
        Array.from(this.vertices.values()).forEach(vertex => {
            vertex.printVertex();
        });
    }

    /**
     * Gets all bridges in the graph using tarjan's alg
     * @returns { Vertex[] }
     */
    getBridgeVertexList() {
        const visited = new Set();
        const discoverTime = new Map();
        const lowTime = new Map();
        const parent = new Map();
        const bridges = [];
        let time = 0;
    
        const dfs = (curVertex) => {
            visited.add(curVertex);
            discoverTime.set(curVertex, time);
            lowTime.set(curVertex, time);
            ++time;
    
            for (const nextVertex of this.edges.get(curVertex)) {
                if (!visited.has(nextVertex)) {
                    parent.set(nextVertex, curVertex);
                    dfs(nextVertex);
                    lowTime.set(curVertex, Math.min(lowTime.get(curVertex), lowTime.get(nextVertex)));
                        if (lowTime.get(nextVertex) > discoverTime.get(curVertex)) {
                        bridges.push([this.vertices.get(curVertex), this.vertices.get(nextVertex)]);
                    }
                } else if (nextVertex !== parent.get(curVertex)) {
                    lowTime.set(curVertex, Math.min(lowTime.get(curVertex), discoverTime.get(nextVertex)));
                }
            }
        }

        for (const vertexName of this.vertices.keys()) {
            if (!visited.has(vertexName)) {
                dfs(vertexName);
            }
        }
    
        return bridges;
    }

    /**
     * Gets the number of components in the graph.
     * @returns { number }
     */
    getNumberOfComponents() {
        const visited = new Set();
        let count = 0;
        const dfs = (curVertex) => {
            visited.add(curVertex);
            for (const neighbor of this.edges.get(curVertex)) {
                if (!visited.has(neighbor)) {
                    dfs(neighbor);
                }
            }
        }
        for (const vertexName of this.vertices.keys()) {
            if (!visited.has(vertexName)) {
                dfs(vertexName);
                ++count;
            }
        }
        return count;
    }

    getVertexCount() {
        return this.vertices.size;
    }

    getEdgeCount() {
        let edgeCount = 0;
        for (const neighbors of this.edges.values()) {
            edgeCount += neighbors.size;
        }
        edgeCount /= 2;
        edgeCount += this.loops.size;
        return edgeCount;
    }

    isBipartite() {
        if (this.loops.size > 0) {
            return false;
        }
        const color = new Map();
        const visited = new Set();

        const bfs = (start) => {
            const queue = [start];
            color.set(start, 0);
            while (queue.length > 0) {
                const current = queue.shift();
                visited.add(current);
                for (const neighbor of this.edges.get(current)) {
                    if (!color.has(neighbor)) {
                        color.set(neighbor, 1 - color.get(current));
                        queue.push(neighbor);
                    } else if (color.get(neighbor) === color.get(current)) {
                        return false;
                    }
                }
            }
            return true;
        };

        for (const vertex of this.vertices.keys()) {
            if (!visited.has(vertex)) {
                if (!bfs(vertex)) {
                    return false;
                }
            }
        }

        return true;
    }

    getSpanningTreeEdges() {
        const spanningTreeEdges = [];
        const visited = new Set();

        if (this.vertices.size === 0) {
            return [];
        }
    
        const dfs = (currentVertex) => {
            visited.add(currentVertex);
    
            for (const neighbor of this.edges.get(currentVertex)) {
                if (!visited.has(neighbor)) {
                    spanningTreeEdges.push([this.vertices.get(currentVertex), this.vertices.get(neighbor)]);
                    dfs(neighbor);
                }
            }
        };
    
        const startVertex = this.vertices.keys().next().value;
        dfs(startVertex, null);
    
        return spanningTreeEdges;
    }

    /**
     * Applies a single frame of physics to the graph.
     * @param { number } gridWidth 
     * @param { number } gridHeight 
     * @param { number } draggingVertex 
     * @returns 
     */
    applyPhysics(gridWidth, gridHeight, draggingVertex = null) {
        const k = 50;
        const damping = 0.01;
        const wallForceMultiplier = 10000; // fuck them walls
        const minDistance = Math.min(gridWidth, gridHeight) / 3;

        if (gridHeight === 0 || gridWidth === 0) {
            return;
        }

        const positions = new Map();
        const forces = new Map();

        for (const vertex of this.vertices.values()) {
            positions.set(vertex.vertexName, {
                x : vertex.getXConversion(gridWidth),
                y : vertex.getYConversion(gridHeight)
            });
            forces.set(vertex.vertexName, {
                x : 0,
                y : 0
            });
        }

        for (const [v1, p1] of positions.entries()) {
            for (const [v2, p2] of positions.entries()) {
                if (v1 === v2) {
                    continue;
                }
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt((dx * dx) + (dy * dy));

                if (distance < minDistance) {
                    const adjustmentFactor = (minDistance - distance) / distance;
                    forces.get(v1).x -= (dx * adjustmentFactor * adjustmentFactor);
                    forces.get(v1).y -= (dy * adjustmentFactor * adjustmentFactor);
                    continue;
                }

                const repulsiveForce = k * k / distance;

                forces.get(v1).x -= (dx / distance) * repulsiveForce;
                forces.get(v1).y -= (dy / distance) * repulsiveForce;
            }
        }

        for (const [v1, neighbors] of this.edges.entries()) {
            for (const v2 of neighbors) {
                const p1 = positions.get(v1);
                const p2 = positions.get(v2);
                const dx = p2.x - p1.x;
                const dy = p2.y - p1.y;
                const distance = Math.sqrt((dx * dx) + (dy * dy));
                const attractiveForce = (distance * distance) / k;

                forces.get(v1).x += (dx / distance) * attractiveForce;
                forces.get(v1).y += (dy / distance) * attractiveForce;
                forces.get(v2).x -= (dx / distance) * attractiveForce;
                forces.get(v2).y -= (dy / distance) * attractiveForce;
            }
        }

        for (const [vertexName, position] of positions.entries()) {
            const force = forces.get(vertexName);

            let distance = 0;
            let wallForce = 0;

            distance = Math.max(1, position.x);
            wallForce = wallForceMultiplier / distance
            force.x += wallForce;

            distance = Math.max(1, gridWidth - position.x);
            wallForce = wallForceMultiplier / distance
            force.x -= wallForce;

            distance = Math.max(1, position.y);
            wallForce = wallForceMultiplier / distance;
            force.y += wallForce;

            distance = Math.max(1, gridHeight - position.y);
            wallForce = wallForceMultiplier / distance;
            force.y -= wallForce;
        }

        for (const [vertexName, force] of forces.entries()) {
            const position = positions.get(vertexName);
            position.x += force.x * damping;
            position.y += force.y * damping;
        }

        for (const [vertexName, position] of positions.entries()) {
            if (draggingVertex !== null && draggingVertex.vertexName === vertexName) {
                continue;
            }
            const vertex = this.vertices.get(vertexName);
            vertex.setXScale(position.x, gridWidth);
            vertex.setYScale(position.y, gridHeight);
        }
    }
}