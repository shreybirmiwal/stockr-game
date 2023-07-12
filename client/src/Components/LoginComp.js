import React from 'react'
import GoogleButton from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useState } from 'react';

function LoginComp({message}) {
    const { googleSignIn, user, logOut } = UserAuth();
    const [newUsername, setNewUsername] = useState('');

    const handleGoogleSignIn = async () => {
        try {
          await googleSignIn();
        } catch (error) {
          console.log(error);
        }
    };
    

    return (
      <div>
          <div className='bg-gray-100 p-20 flex flex-row justify-center items-center'>
              <form className='max-w-[400px] w-full mx-auto p-4'>
                  <h2 className='text-4xl font-bold text-center py-6'>{message}</h2>
                  <div className='mt-5 flex justify-center'>
                      <GoogleButton onClick={handleGoogleSignIn} />
                  </div>
              </form>
          </div>
      </div>
  )
}

export default LoginComp