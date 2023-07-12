import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import Sidebar from '../Components/Sidebar';

import LoginComp from '../Components/LoginComp';
import AccountComp from '../Components/AccountComp';

function Account() {
  const { user } = UserAuth();

  return (
    <div>
      <div className="flex flex-row">
        <div>
          <Sidebar />
        </div>

        <div className="flex flex-col items-center justify-center w-full">
          {user?.displayName ? (
                <div className="flex flex-col items-center justify-center h-96">
                    <AccountComp/>
                </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96">
              <LoginComp message={"Sign in/Sign up"}/>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
}

export default Account;
