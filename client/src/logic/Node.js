class Node {
    name; // Given name of the node
    x;    // given x position of the node
    y;    // given y position of the node

    constructor(newName, newX, newY) {
        if (typeof newX != 'number' || typeof newY != 'number') {
            throw new Error("x and y position of node must be numeric");
        }
        this.name = newName;
        this.x = newX;
        this.y = newY;
    }

    toJSON() {
        return {
            name : this.name,
            x : this.x,
            y : this.y
        }
    }
}

export default Node;