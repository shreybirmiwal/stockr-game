import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

const Sidebar = () => {
  return (
    <div className="bg-gray-800 w-64 h-screen flex flex-col">
      <div className="flex-grow">
        <div className="text-white text-2xl font-semibold p-5">
          <a href="/" className="hover:text-gray-300">Stockr</a>
        </div>
        <nav>
          <ul className="text-white p-2 ml-3 text-xl">
            <li>
              <a href="/chart-trainer" className="block py-2 hover:text-gray-300">
                Chart Trainer
              </a>
            </li>
            <li>
              <a href="/blitz" className="block py-2 hover:text-gray-300">
                Blitz Predictions
              </a>
            </li>
            <li>
              <a href="/account" className="block py-2 hover:text-gray-300">
                Account
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-5">
  <a href="https://twitter.com/stockr_game" target="_blank" rel="noopener noreferrer">
    <FontAwesomeIcon
      icon={faTwitter}
      className="text-gray-300 hover:text-blue-400 transition-colors duration-200 text-3xl"
    />
  </a>
</div>

    </div>
  );
};

export default Sidebar;
