import React from "react";
import { withRouter } from "react-router";
import './BookEntity.css'
class BookEntity extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
        }
    }

    /* pulling book data from database */
    componentDidMount() {
        //fetch('http://localhost:8080/BookEntity?${}', {
        //    credentials: 'include'
        //})
        //    .then(response => response.json())
        //    .then((jsonData) => {
        //        this.setState({
        //            books: jsonData,
        //            isLoaded: true,
        //        }
        //        )
        //    })
        //    .catch((error) => {
        //        console.error(error)
        //    })
    }


    generate() {
        return(
        <div>
            <h1>BOOK {this.props.match.params.id}</h1>
        </div>
        )
    }

    render() {
        return (

            this.generate()
        )
    }
}
export default withRouter(BookEntity)