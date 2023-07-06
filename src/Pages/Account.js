import React from 'react'
import GoogleButton from 'react-google-button'
import { UserAuth } from '../context/AuthContext'
import Sidebar from '../Components/Sidebar'

function Account() {
    const {googleSignIn, user, logOut} = UserAuth()
    
    const handleGoogleSignIn = async () => {
        try{
            await googleSignIn()
        } catch ( error ){
            console.log(error)
        }
    }
    const handleSignOut = async () => {
        try {
          await logOut()
        } catch (error) {
          console.log(error)
        }
    }

    return (
    <div>
        <div className="flex flex-row">

            <div className="w-2/12 h-96">
            <Sidebar/>
            </div>


            <div className="w-7/12 mt-5 -ml-12">
                {user?.displayName ? (
                    <button onClick={handleSignOut}>Logout</button>
                ) : (
                    <div>
                        <GoogleButton onClick={handleGoogleSignIn}/>
                    </div>
                )}
            </div>

        </div>
    </div>
    )
}

export default Account