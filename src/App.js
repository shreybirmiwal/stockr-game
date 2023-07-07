import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 
import { AuthContextProvider } from './context/AuthContext';

import Game from './Pages/Game';
import Predictions from './Pages/Predictions';
import Account from './Pages/Account';
import Home from './Pages/Home';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Routes>

              {/*
                 <Route exact path="/" element={<Home/>}/>
              */}
              <Route path="/" element={<Game/>}/>
              <Route path="/chart-trainer" element={<Game/>}/>

              <Route path="/blitz" element={<Predictions/>}/>
              <Route path="/account" element={<Account/>}/>

            </Routes>
          </Router>
        
      </AuthContextProvider>
    </div>
  );
};

export default App;
