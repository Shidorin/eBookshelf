import React from "react";
import './BookList.css'
class BookList extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            books: [],
            isLoaded: false,
        }
    }

    componentDidMount() {
        fetch('http://localhost:8080/books', {
            credentials: 'include'
        })
            .then(response => response.json())
            .then((jsonData) => {
                this.setState({
                    books: jsonData,
                    isLoaded: true,
                }
                )
            })
            .catch((error) => {
                console.error(error)
            })
    }


    generate(books) {
        var tab = []
        var count = 0
        console.log(books)
        for (const book of books) {
            console.log(count)
            count++
            console.log(book.id)
            tab.push(
                <div>
                    <div className="row">
                        <h5>ID: {book.id}</h5>
                    </div>
                    <div className="row">
                        <h5>Title: {book.title}</h5>
                    </div>
                </div >
            )
        }
        return tab
    }

    render() {
        const { isLoaded } = this.state
        if (!isLoaded) return <div><h1>error fetching data</h1></div>
        //console.log(this.state.books)
        return (
            this.generate(this.state.books)
        )
    }
}
export default BookList