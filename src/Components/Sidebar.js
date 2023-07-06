import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-64 h-screen">
      <div className="text-white text-2xl font-semibold p-5"> stockr</div>
      <nav>
        <ul className="text-white p-2 ml-3 text-xl">
          <li>
            <a
              href='/'
              activeClassName="text-blue-300"
              className="block py-2"
            >
              Home
            </a>
          </li>
           
          <li>
            <a
              href='/predictions'
              activeClassName="text-blue-300"
              className="block py-2"
            >
              Blitz Predictions
            </a>
          </li>
          
          <li>
            <a
              href="/account"
              activeClassName="text-blue-300"
              className="block py-2"
            >
              Account
            </a>
          </li>

          {/*
          <li>
            <a
              exact
              to="/leaderboard"
              activeClassName="text-blue-300"
              className="block py-2"
            >
              Leaderboard 
            </a>
          </li>
          */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
