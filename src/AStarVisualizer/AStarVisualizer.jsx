import React, { useState, useEffect } from 'react';
import { MAX_COL, MAX_ROW } from '../constants';
import Navbar from '../Navbar';
import Node from './Node/Node';
import './AStarVisualizer.css';

const AStarVisualizer = () => {

    // State variables
    const [grid, setGrid] = useState([]);
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [startCol, setStartCol] = useState(null)
    const [startRow, setStartRow] = useState(null)
    const [goalRow, setGoalRow] = useState(null)
    const [goalCol, setGoalCol] = useState(null)

    // Each node's structure
    const createNode = (col, row) => {
        return {
            col,
            row,
            start: false,
            goal: false,
            isStartToggle: false,
            isGoalToggle: false,
            dikjstra_distance: Infinity,
            isWall: false,
            isWallToggle: false,
            isExplored: false,
            prevNode: null,
        };
    };

    const toggleNavOpen = () => {
        setIsNavOpen(!isNavOpen)
    }

    // Initializing grid
    useEffect(() => {
        const grid = [];
        for (let row = 0; row < MAX_ROW; row++) {
            const currentRow = [];
            for (let col = 0; col < MAX_COL; col++) {
                currentRow.push(createNode(col, row));
            }
            grid.push(currentRow);
        }
        setGrid(grid);
    },[])

        // Turns all the nodes clickable to be a start point
        const startBtn = () => {
            let tempGrid = [...grid];
            for (let row = 0; row < 20; row++) {
                for (let col = 0; col < 50; col++) {
                    tempGrid[row][col].isStartToggle = !tempGrid[row][col].isStartToggle;
                    tempGrid[row][col].isGoalToggle = false;
                }
            }
            // console.log("tempGrid: " + JSON.stringify(tempGrid))
            setGrid(tempGrid);        
            //https://stackoverflow.com/questions/29537299/react-how-to-update-state-item1-in-state-using-setstate
        }
    
        // Turns all the nodes clickable to be a goal point
        const goalBtn = () => {
            console.log("Goal");
            let tempGrid = [...grid]
            for (let row = 0; row < MAX_ROW; row++) {
                for (let col = 0; col < MAX_COL; col++) {
                    tempGrid[row][col].isGoalToggle = !tempGrid[row][col].isGoalToggle;
                    tempGrid[row][col].isStartToggle = false;
                }
            }
            // console.log("tempGrid: " + JSON.stringify(tempGrid));
            setGrid(tempGrid);        
        }
    
        const resetBtn = () => {}
        const wallsBtn = () => {}
        const visualizeAStar = () => {}
        const visualizeWall = (currRow, currCol) => {
            console.log("SYS: Wall Selected");
            const tempGrid = [...grid];
            for (let row = 0; row < MAX_ROW; row++) {
                for (let col = 0; col < MAX_COL; col++) {
                    console.log("SYS: Updating Wall Nodes...")
                    tempGrid[row][col].isStartToggle = false;
                    tempGrid[row][col].isGoalToggle = false;
                    tempGrid[row][col].isWallToggle  = true;
                }
            }
            tempGrid[currRow][currCol].isWall = !(tempGrid[currRow][currCol].isWall);
            setGrid(tempGrid)
        }

        const visualizeStart = (currRow, currCol) => {
            console.log("SYS: Start Selected");
            const tempGrid = [grid];
            for (let row = 0; row < MAX_ROW; row++) {
                for (let col = 0; col < MAX_COL; col++) {
                    console.log("SYS: Updating Nodes...")
                    tempGrid[row][col].start = false;
                    tempGrid[row][col].isStartToggle = false;
                    tempGrid[row][col].isGoalToggle = false;
                }
            }
            tempGrid[currRow][currCol].start = true;
            // console.log(tempGrid);
            setStartCol(currCol)
            setStartRow(currRow)
            setGrid(tempGrid)
        }

        const visualizeGoal = (currRow, currCol) => {
            console.log("SYS: Goal Selected");
            const tempGrid = [grid];
            for (let row = 0; row < MAX_ROW; row++) {
                for (let col = 0; col < MAX_COL; col++) {
                    console.log("SYS: Updating Nodes...")
                    tempGrid[row][col].goal = false;
                    tempGrid[row][col].isStartToggle = false;
                    tempGrid[row][col].isGoalToggle = false;
                }
            }
            tempGrid[currRow][currCol].goal = true;
            // console.log(tempGrid);
            setGoalCol(currCol)
            setGoalRow(currRow)
            setGrid(tempGrid)
        }
        // console.log("map::::: " + JSON.stringify(grid))
    // const {sgrid} = this.state;
        
    return (
        <>
            {/* Have to find how to cycle through ALL states like in Dijkstra implementation of react classes and then set it to grid */}
            <Navbar toggle={toggleNavOpen}/>
            <div className="gridContainer">
                <button className = "start_btn" onClick = {() => startBtn()}>Select Start Node</button>
                <button className = "goal_btn" onClick = {() => goalBtn()}>Select Goal Nodes</button>
                <button className = "reset_btn" onClick = {() => resetBtn()}>Reset Nodes</button>
                <button className = "walls_on" onClick = {() => wallsBtn()}>Toggle Walls</button>
                <br/>
                <button className = "a_star_btn" onClick = {() => visualizeAStar()}>Visualize A*!</button>
                {grid.map((row, rowIdx) => {
                    // console.log("grid row:  " + JSON.stringify(row));
                    return ( 
                        <div key = {rowIdx}>
                            {/* The col map() method creates a new array with the results of calling a function for every array element. */}
                            {row.map((node, ndx) => {
                                const {row, col, goal, start, isWall, isWallToggle ,isStartToggle, isGoalToggle} = node;
                                // console.log("node start toggle:  " + isStartToggle);
                                return (
                                    <Node
                                        // Send back key and col as row and col to intercept when a thing is clicked
                                        key = {ndx}
                                        row = {row}
                                        col = {col}
                                        grid = {grid}
                                        start = {start}
                                        goal = {goal}
                                        isWall = {isWall}
                                        isWallToggle = {isWallToggle}
                                        isStartToggle = {isStartToggle}
                                        isGoalToggle = {isGoalToggle}
                                        visualizeWall = {() => visualizeWall(rowIdx, ndx)}
                                        visualizeStart = {() => visualizeStart(rowIdx, ndx)}
                                        visualizeGoal = {() => visualizeGoal(rowIdx, ndx)}
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
    )
}

export default AStarVisualizer