import { Modal } from './Modal'
import React from "react";
import { withRouter } from "react-router";
import './BookEntity.css'
class BookEntity extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            book: [],
            showModal: false,
        }
    }

    /* pulling book data from database */
    componentDidMount() {
        var url = new URL("http://localhost:8080/bookEntity")
        url += '/' + this.props.match.params.id + '/' + this.props.match.params.title
        //url.search = new URLSearchParams(params).toString();
        //console.log(url)
        fetch(url, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then((jsonData) => {
                //console.log(jsonData)
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
        console.log("open  " + this.state.showModal)
    }

    generate() {
        var tab = []
        for (const [index, book] of this.state.book.entries()) {
            tab.push(
                <div key={index}>
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
                    <button onClick={this.openModel.bind(this)}>Add to list</button>



                    <Modal showModal={this.state.showModal} />
                </div>
            )
        }
        return tab
    }

    render() {
        return (

            this.generate()
        )
    }
}
export default withRouter(BookEntity)