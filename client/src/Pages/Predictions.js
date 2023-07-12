import React from 'react'
import Sidebar from '../Components/Sidebar'
import { UserAuth } from '../context/AuthContext';
import LoginComp from '../Components/LoginComp'
import BlitzGame from './BlitzGame';

function Predictions() {
  const { user } = UserAuth();

  return (
    <div>
      <div className="flex flex-row">
        <div>
          <Sidebar />
        </div>

          {user?.displayName ? (                    
              <BlitzGame/>
          ) : (
            <div className="flex flex-col items-center justify-center w-full">
              <LoginComp message={"Login to access Blitz"}/>
            </div>
          )}

      </div>
      
    </div>
  );
}

export default Predictions