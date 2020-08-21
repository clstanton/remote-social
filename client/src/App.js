import React from 'react';
import Navigation from './components/Nav';
import About from './components/About';
import Library from './components/Library';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.scss';

function App() {
  return (
    <Router>
        <Navigation />
        <main>
          <About />
        </main>
    </Router>
  );
}


export default App;
