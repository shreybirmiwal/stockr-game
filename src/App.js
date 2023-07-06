import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom" 

import Game from './Pages/Game';
import Predictions from './Pages/Predictions';
import Account from './Pages/Account';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Routes>
              
              <Route exact path="/" element={<Game/>}/>
              <Route path="/predictions" element={<Predictions/>}/>
              <Route path="/account" element={<Account/>}/>

            </Routes>
          </Router>
        
      </AuthContextProvider>
    </div>
  );
};

export default App;
