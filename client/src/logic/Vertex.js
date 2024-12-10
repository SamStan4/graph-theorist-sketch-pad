/**
 * This is a class for a vertex.
 * It will have properties that make drawing much easier.
 */
export default class Vertex {
    vertexName; // Name of the vertex
    xScale;     // 0.0-1.0 x position
    yScale;     // 0.0-1.0 y position
    /**
     * Constructor.
     * @param { string } newVertexName 
     * @param { number } newXScale 
     * @param { number } newYScale 
     */
    constructor(newVertexName, newXScale, newYScale) {
        if (typeof newVertexName !== "string") {
            throw new TypeError("Vertex name must be a string.");
        }
        if (typeof newXScale !== "number" || typeof newYScale !== "number") {
            throw new TypeError("Scale values must be numbers.");
        }
        if (newXScale > 100 || newXScale < 0 || newYScale > 100 || newYScale < 0) {
            throw new Error(`Scale values must be between 0 and 100. was given ${newXScale} ${newYScale}`);
        }
        this.vertexName = newVertexName;
        this.xScale = newXScale / 100;
        this.yScale = newYScale / 100;
    }
    /**
     * Converts the x scale into an actual useful value for display in UI
     * This needs to be fast.
     * @param { number } windowWidth 
     * @returns convertex x into pixles
     */
    getXConversion(windowWidth) {
        return this.xScale * windowWidth;
    }
    /**
     * Converts the y scale into an actual useful value for display in UI.
     * This needs to be fast.
     * @param { number } windowHeight 
     * @returns converted y into pixles
     */
    getYConversion(windowHeight) {
        return this.yScale * windowHeight;
    }
    /**
     * Sets the x scale
     * @param { number } windowXPosition 
     * @param { number } windowWidth 
     */
    setXScale(windowXPosition, windowWidth) {
        let newXScale = windowXPosition / windowWidth;
        if (newXScale <= 0) {
            newXScale = 0.0001;
        } else if (newXScale >= 1) {
            newXScale = 0.9999;
        }
        this.xScale = newXScale;
    }
    /**
     * Sets the y scale
     * @param { number } windowYPosition 
     * @param { number } windowHeight 
     */
    setYScale(windowYPosition, windowHeight) {
        let newYScale = windowYPosition / windowHeight;
        if (newYScale <= 0) {
            newYScale = 0.0001;
        } else if (newYScale >= 1) {
            newYScale = 0.9999;
        }
        this.yScale = newYScale;
    }
    /**
     * converts the vertex to a json
     * @returns JSON
     */
    toJSON() {
        return {
            vertexName : this.vertexName,
            xScale : this.xScale,
            yScale : this.yScale
        }
    }
    /**
     * prints the vertex to the console;
     */
    printVertex() {
        console.log(`Name: ${this.vertexName} xScale: ${this.xScale} yScale: ${this.yScale}`);
    }
}