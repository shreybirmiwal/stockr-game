import React from 'react'
import GoogleButton from 'react-google-button'
import { UserAuth } from '../context/AuthContext'
import Sidebar from '../Components/Sidebar'

function Account() {
    const {googleSignIn} = UserAuth()
    
    const handleGoogleSignIn = async () => {
        try{
            await googleSignIn()
        } catch ( error ){
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
                <GoogleButton onClick={handleGoogleSignIn}/>
            </div>

        </div>
    </div>
    )
}

export default Account