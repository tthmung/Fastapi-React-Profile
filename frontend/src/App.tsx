import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './Home/Home';
import Admin from './Admin/Admin';
import PageNotFound from './404';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/admin' element={<Admin />}>
          <Route path=":collection" element={<Admin />}>
            <Route path=":id" element={<Admin />} />
            <Route path="new/:type" element={<Admin />} />
          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </Router>
  );
}

export default App;
