import React from 'react'
import Sidebar from '../Components/Sidebar'

function Home() {
  return (
    <div>
        <div className="flex flex-row">

            <div className="w-2/12 h-96">
                <Sidebar/>
            </div>


            <div className="w-7/12 mt-5">
                Home
            </div>

        </div>

    </div>  
    )
}

export default Home