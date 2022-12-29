import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import AlgoVisualizer from './AlgoVisualizer/AlgoVisualizer';
// import Navbar from './components/Navbar';
import background from "./views/bg_white_plain.jpg"
// import Home from './Home'
import DijkstraVisualizer from './DijkstraVisualizer/DijkstraVisualizer';
import AStarVisualizer from './AStarVisualizer/AStarVisualizer';

function App() {
  return (
    <div
        style={{ 
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            minHeight: '100vh', 
            width: '100%'
        }}
        className="App"
    >
        <Router >
          <Switch >
            <Route exact path="/dijkstra" component={DijkstraVisualizer} />
            <Route path="/a*" component={AStarVisualizer} />
            <Redirect from="/" to="/dijkstra" />
          </Switch>
        </Router>
    </div>
  );
}

export default App;