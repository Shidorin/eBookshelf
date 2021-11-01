import React from "react";
import './Home.css'

class Home extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div className='homepage'>
                <h5>HOMEPAGE  {localStorage.getItem('username')}</h5>

            </div>
        )
    }
}
export default Home