import React from "react";
import './BookList.css'
import { Link } from 'react-router-dom'
class BookList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: this.props.match.params.username,
            books: [],
            isLoaded: false,
        }
    }

    /* pulling book data from database */
    componentDidMount() {
        var json = JSON.stringify({
            username: this.state.username,
        })
        console.log(json)
        fetch('http://localhost:8080/bookList', {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
            .then(response => response.json())
            .then((jsonData) => {
                this.setState({
                    books: jsonData,
                    isLoaded: true,
                })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    generate(books) {
        var tab = []
        for (const book of books) {
            tab.push(
                <div key={book.id}>
                    <div className="row" >
                        <Link to={'/book/' + book.id + '/' + book.title}>
                            <h5>ID: {book.id}</h5>
                        </Link>
                    </div>
                    <div className="row">
                        <h5>Title: {book.title}</h5>
                    </div>
                    <div className="row">
                        <h5>STAN: </h5>
                    </div>
                    <div className="row">
                        <h5>OCENA:</h5>
                    </div>
                </div >
            )
        }
        return tab
    }

    render() {
        //const { isLoaded } = this.state
        //if (!isLoaded) return <div><h1>error fetching data</h1></div>
        return (
            this.generate(this.state.books)
        )
    }
}
export default BookList