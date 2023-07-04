import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 

import Game from './Pages/Game';

const App = () => {
  return (
    <div>
      
      <Router>
        <Routes>
          
          <Route exact path="/" element={<Game/>}/>
          {/* <Route path="/AddJudge" element={<AddJudge/>}/> */ }

        </Routes>
      </Router>
    </div>

  );
};

export default App;
