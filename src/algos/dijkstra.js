
    // Main Implementation of Dijkstra's Algorithm
export function dijkstra(grid, start, end) {
    // the main grid passed here could just be 1d with all the node ojbects in order as they store row and col property anyway
    const nodes_1d_arr = [];
    const dijkstra_nodes = [];
    start.dikjstra_distance = 0;
 
    // Adding all nodes which are set to closed
    for (const row of grid) {
        for (const node of row) {
            nodes_1d_arr.push(node);
        }
    }

    while (!!nodes_1d_arr.length) {
        sortNodes(nodes_1d_arr);
        const closestNode = nodes_1d_arr.shift();

        if (closestNode.isWall) {
            continue;
        }

        if (closestNode.dikjstra_distance === Infinity) {
            return dijkstra_nodes;
        }
        closestNode.isOpen = true;
        dijkstra_nodes.push(closestNode);
        if (closestNode === end) {
            console.log("dtra done")
            return dijkstra_nodes;
        }

        const closestNeighbors = findNeighbor(closestNode, grid);
        
        // Setting distances of available neighboring closed nodes
        for (const node of closestNeighbors) {
            node.dikjstra_distance = closestNode.dikjstra_distance + 1;
            node.prevNode = closestNode;
        }
    }
}

// Sorts all the nodes by the shortest dijkstra distance from the current point
function sortNodes (nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.dikjstra_distance - nodeB.dikjstra_distance);
}

// Returns all the closed neighboring nodes from the current node
function findNeighbor(closestNode, grid) {
    const neighbors = [];
    const {col, row} = closestNode;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isOpen);
}

// Function which backtracks and stores the shortest path from start to end node after Dijkstra is done exploring for the end node
export function backtrackShortestPath(end) {
    console.log("iinside backtrck");
    console.log(end);

    const nodesInShortestPathOrder = [];
    let currentNode = end;
    while (currentNode !== null) {
        console.log("iinside backtrck");
        console.log(currentNode.prevNode);
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.prevNode;
    }
    return nodesInShortestPathOrder;
}