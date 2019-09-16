import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { SearchPage } from './SearchPage';
import './App.css';
import { LibraryPage } from './LibraryPage';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Bandit</h1>
          <ul>
            <li><Link to="bc-search">BC Search</Link></li>
            <li><Link to="library">Library</Link></li>
          </ul>
        </header>
        <div className="App-content">
          <Route path="/bc-search" component={SearchPage} />
          <Route path="/library" component={LibraryPage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
