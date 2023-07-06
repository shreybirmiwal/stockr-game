import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-64 h-screen">
      <div className="text-white text-2xl font-semibold p-5">
        <a href='/' className='hover:text-gray-300'> Stockr </a>
      </div>
      <nav>
        <ul className="text-white p-2 ml-3 text-xl">
          <li>
            <a
              href='/chart-trainer'
              className="block py-2 hover:text-gray-300"

            >
              Chart Trainer
            </a>
          </li>
           
          <li>
            <a
              href='/blitz'
              className="block py-2 hover:text-gray-300"

            >
              Blitz Predictions
            </a>
          </li>
          
          <li>
            <a
              href="/account"
              className="block py-2 hover:text-gray-300"
            >
              Account
            </a>
          </li>

        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
