import React from 'react';
import MarketOpenCountdown from '../Components/MarketOpenCountdown';
import BlitzChartDraw from '../Components/BlitzChartDraw';
import { useState } from 'react';
import { collection, getDocs, setDoc, doc, query, updateDoc } from "firebase/firestore";
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { useEffect } from 'react';

function BlitzGame() {
  const [docs, setDocs] = useState([]);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'blitz'));
        const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setDocs(documents);
        console.log("DOCS BELOW ")
        console.log(documents)
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData()
    
    fetch('/api/trading_day')
    .then(response => response.json())
    .then(data => {
      console.log(data); // Log the response data
      // Continue with your code
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error
    });

  }, []);



  return (
    <div className="m-10 flex flex-grow flex-col">
    <div className="mb-2">
      <MarketOpenCountdown />
    </div>

    <div className='h-1/2 overflow-scroll'>
      {docs.map((doc) => (
        <BlitzChartDraw
          key={doc.id}
          data={doc}
        />
      ))}
    </div>

  </div>
  );
}

export default BlitzGame;