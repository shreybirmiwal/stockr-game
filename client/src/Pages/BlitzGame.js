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
        documents.reverse(); // Reverse the order of the documents
        setDocs(documents);
        //console.log("DOCS BELOW ")
        //console.log(documents);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    

    fetchData()
    

  }, []);



  return (
    <div className="m-10 -mt-2 mb-0 flex flex-grow flex-col overflow-hidden">

    <div class="max-h-screen overflow-y-auto">
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