import Node from './Node/Node';
import './AlgoVisualizer.css';
import React, {Component} from 'react';
import { dijkstra, backtrackShortestPath } from '../algos/dijkstra';
import { MAX_COL, MAX_ROW } from '../constants';
// import { Navbar } from './Navbar.js';

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
        isOpen: false,
        prevNode: null,
    };
};

export default class AlgoVisualizer extends Component {
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
        this.startBtn = this.startBtn.bind(this);
        this.endBtn = this.endBtn.bind(this);
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

    //Fix Double visualize issue
    resetBtn() {
        const tempGrid = [...this.state.grid];
        // // DEBUG CODE 
        // console.log("DEBUG CODE ");
        // console.log(startCol);
        // console.log(startRow);
        // console.log(endCol);
        // console.log(endRow);

        this.start = false;
        this.end = false;

        // Initializes the grid
        for (let row = 0; row < MAX_ROW; row++) {
            const currentRow = [];
            for (let col = 0; col < MAX_COL; col++) {
                document.getElementById(`node-${row}-${col}`).className ='node';
                tempGrid[row][col].start = false;
                tempGrid[row][col].end = false;
                tempGrid[row][col].isStartToggle = false;
                tempGrid[row][col].isEndToggle = false;
                tempGrid[row][col].dikjstra_distance = Infinity;
                tempGrid[row][col].prevNode = null;
                // currentRow.push(createNode(col, row));
            }
            // tempGrid.push(currentRow);
        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
        // const tempGrid = [];
        // // Initializes the grid
        // for (let row = 0; row < MAX_ROW; row++) {
        //     const currentRow = [];
        //     for (let col = 0; col < MAX_COL; col++) {
        //         currentRow.push(createNode(col, row));
        //     }
        //     tempGrid.push(currentRow);
        // }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

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

        // DEBUG CODE 
        console.log("DEBUG CODE ");
        console.log(startCol);
        console.log(startRow);
        console.log(endCol);
        console.log(endRow);
    }

    visualizeDijkstra() {
        // DEBUG CODE 
        console.log("Dijkstra!");
        const {grid} = this.state;
        const {startRow} = this.state;
        const {startCol} = this.state;
        const {endRow} = this.state;
        const {endCol} = this.state;

        // DEBUG CODE 
        console.log(startCol);
        console.log(startRow);
        console.log(endCol);
        console.log(endRow);

        const start = grid[startRow][startCol];
        const end = grid[endRow][endCol];

        // DEBUG CODE 
        console.log(start);
        console.log(end);

        // Parameters take in the starting and ending nodes's objects 
        const dijkstraNodes = dijkstra(grid, start, end);
        const backtrackedNodes = backtrackShortestPath(end);
        //Animate
        this.colorDijkstra(dijkstraNodes, backtrackedNodes);
    }

    colorDijkstra(dijkstraNodes, backtrackedNodes) {
        console.log("color func");
        for (let i = 0; i <= dijkstraNodes.length; i++){
            if (i === dijkstraNodes.length) {
                setTimeout(() => {
                  this.colorShortest(backtrackedNodes);
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
    
    colorShortest(nodes) {
        for (let i = 0; i < nodes.length; i++) {
            setTimeout(() => {
                const node = nodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                  'node node_shortest_path';
            }, 50 * i);
        }
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

    // Turns all the nodes clickable to be a start point
    startBtn() {
        this.isEndToggle = false;
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
        this.isStartToggle = false;
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
                    <button className = "dijkstra_btn" onClick = {() => this.visualizeDijkstra()}>Visualize Dijkstra!</button>
                    <button className = "start_btn" onClick = {() => this.startBtn()}>Select Start Node</button>
                    <button className = "end_btn" onClick = {() => this.endBtn()}>Select End Node</button>
                    {/* <br/> */}
                    <button className = "reset_btn" onClick = {() => this.resetBtn()}>Reset Nodes</button>
                    {/* The row map() method creates a new array with the results of calling a function for every array element. */}
                    {grid.map((row, rowIdx) => {
                        return ( 
                            <div key = {rowIdx}>
                                {/* The col map() method creates a new array with the results of calling a function for every array element. */}
                                {row.map((node, ndx) => {
                                    const {row, col, end, start, isWall ,isStartToggle, isEndToggle} = node;
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
                                            isStartToggle = {isStartToggle}
                                            isEndToggle = {isEndToggle}
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