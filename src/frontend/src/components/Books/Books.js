import React from "react";
import './Books.css'
import { Link } from 'react-router-dom'
class Books extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            books: [],
            isLoaded: false,
        }
    }

    /* pulling book data from database */
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

    myfunction(id) {

        console.log("klik" + id)

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
                        
                        
                        <button onClick={() => this.myfunction(book.id)}>klik</button>
                    </div>
                   


                    <div className="row">
                        <h5>Title: {book.title}</h5>
                    </div>
                    <div className="row">
                        <h5>Description: {book.description}</h5>
                    </div>
                    <div className="row">
                        <h5>Release date: {book.release_date}</h5>
                    </div>
                    <div className="row">
                        <h5>Relation id: {book.relation_id}</h5>
                    </div>
                    <div className="row">
                        <h5>Author id: {book.author_id}</h5>
                    </div>
                    <div className="row">
                        <h5>Genre: {book.genre}</h5>
                    </div>
                    <br />
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
export default Books