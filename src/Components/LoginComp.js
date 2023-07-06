import React from 'react'
import GoogleButton from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useState } from 'react';

function LoginComp() {
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
        <div className='bg-gray-100 p-20 flex flex-row'>
            <form className='max-w-[400px] w-full mx-autop-4 align-middle items-center'>
                <h2 className='text-4xl font-bold text-center py-6'>Sign in/Sign up</h2>
                <div className='mt-5 ml-3'>
                    <GoogleButton onClick={handleGoogleSignIn} />
                </div>
            </form>
        </div>

    </div>

  )
}

export default LoginComp