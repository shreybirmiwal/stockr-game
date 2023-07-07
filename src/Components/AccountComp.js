import React from 'react'
import GoogleButton from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useState } from 'react';

function AccountComp() {
    const { googleSignIn, user, logOut } = UserAuth();
    const [newUsername, setNewUsername] = useState('');

    const handleSignOut = async () => {
        try {
          await logOut();
        } catch (error) {
          console.log(error);
        }
    };
    

    return (
        <div>
            <div className='bg-gray-100 p-20 flex flex-row'>
                <form className='max-w-[400px] w-full mx-autop-4 align-middle items-center text-center'>

                    <h2 className='text-4xl font-bold  py-6'>Account</h2>

                    <div className='mt-5 ml-3'>
                        <p>{user.displayName}</p>
                        <p>{user.email}</p>
                    </div>

                </form>
                
            </div>
            <button
            onClick={handleSignOut}
            className="bg-gradient-to-r from-pink-300 to-blue-300  p-5 w-full"
            >
            Logout
            </button>

        </div>
    )
}

export default AccountComp