import Node from './Node/Node';
import './AlgoVisualizer.css';
import React, {Component} from 'react';
import { dijkstra, backtrackShortestPath } from '../algos/dijkstra';
import { MAX_COL, MAX_ROW } from '../constants';

const createNode = (col, row) => {
    return {
        col,
        row,
        start: false,
        end: false,
        isStartToggle: false,
        isEndToggle: false,
        dikjstra_distance: Infinity,
        isWall: false,
        isWallToggle: false,
        isOpen: false,
        prevNode: null,
    };
};

export default class AlgoVisualizer extends Component {

    //React Constructor 
    constructor() {
        super();
        this.state = {
          grid: [],
          startRow: null,
          startCol: null,
          endRow: null,
          endCol: null,
        };
        this.visualizeDijkstra = this.visualizeDijkstra.bind(this);
        this.wallsBtn = this.wallsBtn.bind(this);
        // this.wallsOff = this.wallsOff.bind(this);
        this.startBtn = this.startBtn.bind(this);
        this.endBtn = this.endBtn.bind(this);
        this.visualizeWall = this.visualizeWall.bind(this);
        this.visualizeStart = this.visualizeStart.bind(this);
        this.visualizeEnd = this.visualizeEnd.bind(this);
        this.resetBtn = this.resetBtn.bind(this);
    }

    //Func componentDidMount() loads on website boot
    componentDidMount() {
        const grid = [];
        // Initializes the grid
        for (let row = 0; row < MAX_ROW; row++) {
            const currentRow = [];
            for (let col = 0; col < MAX_COL; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        // Sets the current state to the 50 x 20 grid
        this.setState({grid: grid});
    }

    // Button to reset grid to default
    resetBtn() {
        const tempGrid = [...this.state.grid];
        this.start = false;
        this.end = false;

        // Initializes the grid to default state where each node is closed
        for (let row = 0; row < MAX_ROW; row++) {
            for (let col = 0; col < MAX_COL; col++) {
                document.getElementById(`node-${row}-${col}`).className ='node';
                tempGrid[row][col].start = false;
                tempGrid[row][col].end = false;
                tempGrid[row][col].isStartToggle = false;
                tempGrid[row][col].isEndToggle = false;
                tempGrid[row][col].dikjstra_distance = Infinity;
                tempGrid[row][col].prevNode = null;
                tempGrid[row][col].isOpen = false;
                tempGrid[row][col].isWall = false;
                tempGrid[row][col].isWallToggle = false;
            }
        }

        let {startRow} = this.state;
        let {startCol} = this.state;
        let {endRow} = this.state;
        let {endCol} = this.state;
        startRow = null;
        startCol = null;
        endRow = null;
        endCol = null;

        // Sets the current state to the 50 x 20 grid
        this.setState({
            grid: tempGrid,
            startRow: startRow,
            startCol: startCol,
            endRow: endRow,
            endCol: endCol
        });
    }

    // Button to visualize the Dijkstra path finding algorithm for the selected start/end points
    visualizeDijkstra() {
        console.log("visualizeDijkstra()!");
        const {grid} = this.state;
        const {startRow} = this.state;
        const {startCol} = this.state;
        const {endRow} = this.state;
        const {endCol} = this.state;

        if (startRow === null || startCol === null || endCol === null || endRow === null){
            alert("ERROR: Please select a start node and an end node to visualize Dijkstra's algorithm");
            return;
        }

        const start = grid[startRow][startCol];
        const end = grid[endRow][endCol];

        // Parameters take in the starting and ending nodes's objects 
        const dijkstraNodes = dijkstra(grid, start, end);
        const backtrackedNodes = backtrackShortestPath(end);

        //Animate
        this.colorDijkstra(dijkstraNodes, backtrackedNodes);
    }

    // Helper Function to color the Dikjstra search path to the end point
    colorDijkstra(dijkstraNodes, backtrackedNodes) {
        console.log("color func");
        for (let i = 0; i <= dijkstraNodes.length; i++){
            if (i === dijkstraNodes.length) {
                setTimeout(() => {
                  this.colorPath(backtrackedNodes);
                }, 10 * i);
                return;
            }
            
            setTimeout(() => {
                const node = dijkstraNodes[i];
                console.log(node);
                document.getElementById(`node-${node.row}-${node.col}`).className ='node node_open';
            }, 10 * i);
        }
    }
    
    // Helper Function to color the exact shortest path from the start to end point
    colorPath(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            setTimeout(() => {
                const node = nodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                  'node node_shortest_path';
            }, 50 * i);
        }
    }

    // Changes a node's color to black when clicked to be a wall
    visualizeWall(currRow, currCol) {
        console.log("SYS: Wall Selected");
        const tempGrid = [...this.state.grid];
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                console.log("SYS: Updating Wall Nodes...")
                tempGrid[row][col].isStartToggle = false;
                tempGrid[row][col].isEndToggle = false;
                tempGrid[row][col].isWallToggle  = false;
            }
        }
        tempGrid[currRow][currCol].isWall = !(tempGrid[currRow][currCol].isWall);
        this.setState({
            grid: tempGrid
        });
    }

    // Changes a node's color to green when clicked to be an start point.
    visualizeStart(currRow, currCol) {
        console.log("SYS: Start Selected");
        const tempGrid = [...this.state.grid];
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                console.log("SYS: Updating Nodes...")
                tempGrid[row][col].start = false;
                tempGrid[row][col].isStartToggle = false;
                tempGrid[row][col].isEndToggle = false;
            }
        }
        tempGrid[currRow][currCol].start = true;
        console.log(tempGrid);
        this.setState({
            grid: tempGrid,
            startCol: currCol,
            startRow: currRow
        });        
    }

    // Changes a node's color to red when clicked to be an end point.
    visualizeEnd(currRow, currCol) {
        console.log("SYS: End Selected");
        const tempGrid = [...this.state.grid];
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                console.log("SYS: Updating Nodes...")
                tempGrid[row][col].end = false;
                tempGrid[row][col].isStartToggle = false;
                tempGrid[row][col].isEndToggle = false;
            }
        }
        tempGrid[currRow][currCol].end = true;
        console.log(tempGrid);
        this.setState({
            grid: tempGrid,
            endCol: currCol,
            endRow: currRow
        });        
    }

    // Toggle Button to enable creation of walls
    wallsBtn() {
        let tempGrid = [...this.state.grid]; 
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                tempGrid[row][col].isWallToggle = !tempGrid[row][col].isWallToggle;
                tempGrid[row][col].isEndToggle = false;
                tempGrid[row][col].isStartToggle = false;
            }
        }
        this.setState({tempGrid});
    }

    // Turns all the nodes clickable to be a start point
    startBtn() {
        let tempGrid = [...this.state.grid];
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                tempGrid[row][col].isStartToggle = !tempGrid[row][col].isStartToggle;
                tempGrid[row][col].isEndToggle = false;
            }
        }
        this.setState({tempGrid});        
        //https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
    }

    // Turns all the nodes clickable to be an end point
    endBtn() {
        console.log("end");
        let tempGrid = [...this.state.grid]
        for (let row = 0; row < 20; row++) {
            for (let col = 0; col < 50; col++) {
                tempGrid[row][col].isEndToggle = !tempGrid[row][col].isEndToggle;
                tempGrid[row][col].isStartToggle = false;
            }
        }
        this.setState({tempGrid});        
    }

    render() {
        const {grid} = this.state;
        console.log("Rendering...");
        return(
            <> 
                <div className="grid">

                    <button className = "start_btn" onClick = {() => this.startBtn()}>Select Start Node</button>
                    <button className = "end_btn" onClick = {() => this.endBtn()}>Select End Node</button>
                    <button className = "reset_btn" onClick = {() => this.resetBtn()}>Reset Nodes</button>
                    <button className = "walls_on" onClick = {() => this.wallsBtn()}>Toggle Walls</button>
                    {/* <button className = "walls_off" OffClick = {() => this.wallsOff()}>Toggle Walls Off</button> */}
                    <br/>
                    <button className = "dijkstra_btn" onClick = {() => this.visualizeDijkstra()}>Visualize Dijkstra!</button>
                    {/* The row map() method creates a new array with the results of calling a function for every array element. */}
                    {grid.map((row, rowIdx) => {
                        return ( 
                            <div key = {rowIdx}>
                                {/* The col map() method creates a new array with the results of calling a function for every array element. */}
                                {row.map((node, ndx) => {
                                    const {row, col, end, start, isWall, isWallToggle ,isStartToggle, isEndToggle} = node;
                                    console.log("node");
                                    return (
                                        <Node
                                            // Send back key and col as row and col to intercept when a thing is clicked
                                            key = {ndx}
                                            row = {row}
                                            col = {col}
                                            grid = {this.state.grid}
                                            start = {start}
                                            end = {end}
                                            isWall = {isWall}
                                            isWallToggle = {isWallToggle}
                                            isStartToggle = {isStartToggle}
                                            isEndToggle = {isEndToggle}
                                            visualizeWall = {() => this.visualizeWall(rowIdx, ndx)}
                                            visualizeStart = {() => this.visualizeStart(rowIdx, ndx)}
                                            visualizeEnd = {() => this.visualizeEnd(rowIdx, ndx)}
                                        >
                                        </Node>
                                    );
                                }
                                )}
                            </div>
                        )
                    })}
                </div>
            </>
        );
    }
}