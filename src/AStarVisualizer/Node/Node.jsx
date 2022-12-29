import React, {useState, useEffect} from 'react';
import './Node.css';

const Node = (props) => {
  const [extraParams, setExtraParams] = useState('');
  const {start, end, isWall, isWallToggle, isStartToggle, isEndToggle, row, col} = props;

  useEffect(() => {
    if (start) {
      setExtraParams('node_start');
    } else if (end) {
      setExtraParams('node_goal');
    } else if (isWall && isWallToggle) {
      setExtraParams('node_wall node_toggle');
    } else if (isWall) {
      setExtraParams('node_wall');
    } else if (isWallToggle) {
      setExtraParams('node_toggle');
    } else if (isStartToggle) {
      setExtraParams('node_toggle');
    } else if (isEndToggle) {
      setExtraParams('node_toggle');
    } else {
      setExtraParams('');
    }
  }, [start, end, isWall, isWallToggle, isStartToggle, isEndToggle]);

  return (
    <div
      id={`node-${row}-${col}`}
      onClick={isStartToggle ? props.visualizeStart : isEndToggle ? props.visualizeEnd : null}
      onMouseDown={isWallToggle ? props.visualizeWall : null}
      className={`node ${extraParams}`}
    >
    </div>
  );
};

export default Node;

// import React, {Component, useState,useEffect} from 'react';
// import './Node.css';

// export default class Node extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {};
//     }

//     render() {
//         const {start, end, isWall, isWallToggle, isStartToggle, isEndToggle, row, col} = this.props;
//         let extraParams = '';
//         if(start){
//             extraParams = 'node_start';
//             return (
//                 <div 
//                 id={`node-${row}-${col}`}
//                 className = {`node ${extraParams}`}
//                 >
                    
//                 </div>
//             );
//         }
//         else if (end){
//             extraParams = 'node_end';
//             return (
//                 <div
//                 id={`node-${row}-${col}`}
//                 className = {`node ${extraParams}`}
//                 >
                    
//                 </div>
//             );
//         }
//         else if (isWall && isWallToggle) {
//             extraParams = 'node_wall node_toggle';
//             return (
//                 <div
//                 id={`node-${row}-${col}`}
//                 onMouseDown = {this.props.visualizeWall}
//                 className = {`node ${extraParams}`}
//                 >
//                 </div>
//             );
//         }
//         else if (isWall) {
//             extraParams = 'node_wall';
//             return (
//                 <div
//                 id={`node-${row}-${col}`}
//                 className = {`node ${extraParams}`}
//                 >
//                 </div>
//             );
//         }
//         else if (isWallToggle){
//             extraParams = 'node_toggle';
//             return (
//                 <div 
//                 id={`node-${row}-${col}`}
//                 onMouseDown = {this.props.visualizeWall} 
//                 className = {`node ${extraParams}`} 
//                 >
//                 </div>
//             );
//         }
//         else if(isStartToggle){
//             extraParams = 'node_toggle';
//             return (
//                 <div 
//                 id={`node-${row}-${col}`}
//                 onClick = {this.props.visualizeStart} 
//                 className = {`node ${extraParams}`} 
//                 >
//                 </div>
//             );
//         }
//         else if (isEndToggle){
//             extraParams = 'node_toggle';
//             return (
//                 <div
//                 id={`node-${row}-${col}`}
//                 onClick = {this.props.visualizeEnd} 
//                 className = {`node ${extraParams}`}
//                 >
//                 </div>
//             );
//         }

//         else {
//             return (
//                 <div 
//                 id={`node-${row}-${col}`}
//                 className = {`node`}
//                 >
                    
//                 </div>
//             );
//         }
//     }
// }