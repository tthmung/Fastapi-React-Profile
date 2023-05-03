import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import Admin from './Admin/Admin';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/admin' element={<Admin />}/>
      </Routes>
    </Router>
  );
}

export default App;
