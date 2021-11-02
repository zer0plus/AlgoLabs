import React, { useState } from 'react';
// import Sidebar from '../components/Sidebar';
import Navbar from '../Navbar';
import AlgoVisualizer from '../AlgoVisualizer/AlgoVisualizer';

const Home = () => {
    const[isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            {/* <Sidebar isOpen={isOpen} toggle={toggleOpen}/> */}

            <Navbar toggle={toggleOpen}/>
            <AlgoVisualizer></AlgoVisualizer>
            {/* <footer style="background-color: crimson; color:springgreen; font-family: serif; text-align: center; font-size: 15px; position:absolute; width: 99.82%;margin-left: -6px; margin-right: -6px;"><h1>THIS IS MY FOOTER</h1></footer> */}

        </>
    )
}

export default Home
