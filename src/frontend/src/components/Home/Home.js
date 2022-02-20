import React from "react";
import './Home.css'

function Home() {



    return (
        <div className='homepage'>
            <h5>Welcome {localStorage.getItem('username')}</h5>

        </div>
    )

}
export default Home