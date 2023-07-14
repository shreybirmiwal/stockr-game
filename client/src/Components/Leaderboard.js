import React from 'react'
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import firebase from 'firebase/app';

function Leaderboard({ data }) {

    const [listPeople, setListPeople] = useState([])

    useEffect(() => {
        formatData(data)
    }, []);

    const formatData = (data) => {
       // console.log(data)
        var tempAr = []

        for (const key in data) {
            if (key !== 'id' && key !== 'actual') {
              // Perform operations with 'item' here
              const item = data[key];
              var userName = findUserName(key)
              item.unshift(userName);
              item.unshift(key)
              tempAr.push(item)
            }
          }
        setListPeople(tempAr)
        console.log(tempAr);
    } 

    const findUserName = async (userUID) => {
        try {
            const user = await firebase.auth().getUser(userUID);
            const displayName = user.displayName;
            console.log(displayName);
            return displayName

          } catch (error) {
            console.log('Error retrieving user display name:', error);
          }

        return userUID
    }

  return (
    <div className='overflow-scroll h-42'>


        <div className='bg-gray-800 text-white mt-1 p-5 grid grid-cols-3'>
            <h1> Shrey Birmiwal </h1>
            <h1> 79.00% </h1>
        </div>


    </div>

    )
}

export default Leaderboard