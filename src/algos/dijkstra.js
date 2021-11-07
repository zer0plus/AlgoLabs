import { MAX_COL, MAX_ROW } from "../constants";

export function dijkstra(grid, start, end) {
    // the main grid passed here could just be 1d with all the 
    // node ojbects in order as they have row, col property anyway
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

function sortNodes (nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.dikjstra_distance - nodeB.dikjstra_distance);
}

function findNeighbor(closestNode, grid) {
    const neighbors = [];
    const {col, row} = closestNode;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isOpen);
}

function neighborFinderRight(row, col) {

    // Check for out of bounds for the given node
    if ((col > MAX_COL) || (row > MAX_ROW) || (col < 0) || (row < 0)){
        return -1; // Invalid Node Return Signal
    }

    // Then check for out of bounds for the node's neighbours 
    if (!( (col + 1) > MAX_COL )){
        return [(col + 1), row];
    }
    // else {
    //     return [-1, -1]; //Neighbor doesn't exist signal
    // }
}

function neighborFinderLeft(row, col) {

    // Check for out of bounds for the given node
    if ((col > MAX_COL) || (row > MAX_ROW) || (col < 0) || (row < 0)){
        return -1; // Invalid Node Return Signal
    }

    // Then check for out of bounds for the node's neighbours 
    if (!( (col - 1) < 0 )){
        return [(col - 1), row];
    }
    // else {
    //     return [-1, -1]; //Neighbor doesn't exist signal
    // }
}

function neighborFinderUp(row, col) {

    // Check for out of bounds for the given node
    if ((col > MAX_COL) || (row > MAX_ROW) || (col < 0) || (row < 0)){
        return -1; // Invalid Node Return Signal
    }

    // Then check for out of bounds for the node's neighbours 
    if (!( (row + 1) > MAX_ROW )){
        return [col, (row + 1)];
    }
    // else {
    //     return [-1, -1]; //Neighbor doesn't exist signal
    // }
}

function neighborFinderDown(row, col) {

    // Check for out of bounds for the given node
    if ((col > MAX_COL) || (row > MAX_ROW) || (col < 0) || (row < 0)){
        return -1; // Invalid Node Return Signal
    }

    // Then check for out of bounds for the node's neighbours 
    if (!( (row - 1) < 0 )){
        return [col, (row - 1)];
    }
    // else {
    //     return [-1, -1]; //Neighbor doesn't exist signal
    // }
}

export function backtrackShortestPath(end) {
    console.log("iinside backtrck");
    console.log(end);
    // const backtrackedArr = [];
    // let curr = end;
    // while (curr !== null) {
    //     backtrackedArr.unshift(curr);
    //     curr = curr.prevNode;
    // }
    // return backtrackedArr;
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