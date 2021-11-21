import React, {Component} from 'react';
import './Node.css';

export default class Node extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {key, grid, start, end, isWall, isWallToggle, isStartToggle, isEndToggle, visualizeStart, visualizeEnd, row, col} = this.props;
        let extraParams = '';

        

        if(start){
            extraParams = 'node_start';
            return (
                <div 
                id={`node-${row}-${col}`}
                className = {`node ${extraParams}`}
                >
                    
                </div>
            );
        }
        else if (end){
            extraParams = 'node_end';
            return (
                <div
                id={`node-${row}-${col}`}
                className = {`node ${extraParams}`}
                >
                    
                </div>
            );
        }
        else if (isWall && isWallToggle) {
            extraParams = 'node_wall node_toggle';
            return (
                <div
                id={`node-${row}-${col}`}
                onMouseDown = {this.props.visualizeWall}
                className = {`node ${extraParams}`}
                >
                </div>
            );
        }
        else if (isWall) {
            extraParams = 'node_wall';
            return (
                <div
                id={`node-${row}-${col}`}
                className = {`node ${extraParams}`}
                >
                </div>
            );
        }
        else if (isWallToggle){
            extraParams = 'node_toggle';
            return (
                <div 
                id={`node-${row}-${col}`}
                onMouseDown = {this.props.visualizeWall} 
                className = {`node ${extraParams}`} 
                >
                </div>
            );
        }
        else if(isStartToggle){
            extraParams = 'node_toggle';
            return (
                <div 
                id={`node-${row}-${col}`}
                onClick = {this.props.visualizeStart} 
                className = {`node ${extraParams}`} 
                >
                </div>
            );
        }
        else if (isEndToggle){
            extraParams = 'node_toggle';
            return (
                <div
                id={`node-${row}-${col}`}
                onClick = {this.props.visualizeEnd} 
                className = {`node ${extraParams}`}
                >
                </div>
            );
        }

        else {
            return (
                <div 
                id={`node-${row}-${col}`}
                className = {`node`}
                >
                    
                </div>
            );
        }
    }
}

// export const DEFAULT_NODE = {
//     row: 0,
//     col: 0,
// };