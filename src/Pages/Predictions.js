import React from 'react'
import Sidebar from '../Components/Sidebar'
import { UserAuth } from '../context/AuthContext';
import LoginComp from '../Components/LoginComp'
import MarketOpenCountdown from '../Components/MarketOpenCountdown';

function Predictions() {
  const { user } = UserAuth();

  return (
    <div>
      <div className="flex flex-row">
        <div>
          <Sidebar />
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          {user?.displayName ? (
                <div>
                    

                  <MarketOpenCountdown/>


                </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <LoginComp message={"Login to access Blitz"}/>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Predictions