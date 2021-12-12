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

    bookLoop(books) {
        var tab = []
        for (const book of books) {
            tab.push(
                <tr>
                    <td>
                        <Link to={'/book/' + book.id + '/' + book.title}>
                            <h5>ID: {book.id}</h5>
                        </Link>
                    </td>
                    <td><h5>Title: {book.title}</h5></td>
                    <td><h5>Status: {book["users.book-user.status"]}</h5></td>
                    <td><h5>Score: {book["users.book-user.score"]} </h5></td>
                </tr>

            )
        }
        return tab
    }

    generate(books) {
        var tab = [
            <div>
                <table class="table">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Score</th>
                    </tr>
                    {this.bookLoop(books)}


                </table>
            </div >
        ]
        return tab
    }
    //return (
    //    <div className="App">
    //        {books.map(book => {
    //            console.log(book)
    //            return (
    //                <div key={book.id}>
    //                    <div className="row" >
    //                        <Link to={'/book/' + book.id + '/' + book.title}>
    //                            <h5>ID: {book.id}</h5>
    //                        </Link>
    //                    </div>
    //                    <div className="row">
    //                        <h5>Title: {book.title}</h5>
    //                    </div>
    //                    <div className="row">
    //                        <h5>STAN: </h5>
    //                    </div>
    //                    <div className="row">
    //                        <h5>OCENA:  </h5>
    //                    </div>
    //                </div >
    //            )
    //        })}
    //    </div>
    //)


    render() {
        //const {isLoaded} = this.state
        //if (!isLoaded) return <div><h1>error fetching data</h1></div>
        return (
            this.generate(this.state.books)
        )
    }
}
export default BookList