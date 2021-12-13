import { Modal } from './Modal'
import React from "react";
import { withRouter } from "react-router";
import './BookEntity.css'
class BookEntity extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            username: localStorage.getItem('username'),
            isLoaded: false,
            book: [],
            showModal: false,
        }
    }

    /* pulling book data from database */
    componentDidMount() {
        var url = new URL("http://localhost:8080/bookEntity")
        url += '/' + this.props.match.params.id + '/' + this.props.match.params.title
        if (this.state.username)
            url += '/' + this.state.username
        //console.log(url)
        fetch(url, {
            credentials: 'include',
        })
            .then(response => response.json())
            .then((jsonData) => {
                console.log(jsonData)
                this.setState({
                    book: jsonData,
                    isLoaded: true,
                })
            })
            .catch((error) => {
                console.error(error)
            })


    }

    openModel() {
        this.setState({
            showModal: !this.state.showModal,
        })
    }


    generate() {
        var tab = []
        for (const [index, book] of this.state.book.entries()) {
            tab.push(
                <>
                    <div className="OTHER_CONTENT_STYLES" key={index}>
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
                            <h5>Your score: {book["users.book-user.score"]}</h5>
                        </div>
                        <div className="row">
                            <h5>Your status: {book["users.book-user.status"]}</h5>
                        </div>
                        <div className="row">
                            <h5>Genre: {book.genre}</h5>
                        </div>
                        <div className="row">
                            <button type="button" onClick={this.openModel.bind(this)}>Add book</button>
                        </div>
                    </div>

                    {/* MODAL FRAGMENT */}
                    < div className="BUTTON_WRAPPER_STYLES" >

                        <Modal open={this.state.showModal} onClose={this.openModel.bind(this)} scoreIn={book["users.book-user.score"]} statusIn={book["users.book-user.status"]} titleIn={book.title}  > </Modal>
                    </div >
                </>
            )
        }
        return tab
    }

    render() {
        return (
            <div>
                {this.generate()}
            </div>
        )

    }
}
export default withRouter(BookEntity)