import React from "react";
import './Books.css'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import { Button } from "@mui/material";
import { Modal } from '../BookEntity/Modal'
import '../BookEntity/BookEntity.css'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2B2D42",
        color: "#bcbedc ",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        backgroundColor: "#2B2D42",
        color: "#bcbedc",
        borderBottom: "unset",
        textDecoration: "none",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#2B2D42",
        color: "#bcbedc",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: "#bcbedc !important",
    backgroundColor: "#2B2D42 !important",
    '&:hover': {
        backgroundColor: "#3a4461 !important",
        borderColor: '#3a4461 !important',
    },
    borderColor: '#3a4461 !important',

}));

class Books extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            books: [],
            isLoaded: false,
            showModal: false,
            username: localStorage.getItem('username'),
        }
    }

    /* pulling book data from database */
    componentDidMount() {
        var url = new URL("http://localhost:8080/books")
        if (this.state.username)
            url += '/' + this.state.username
        fetch(url, {
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

    openModal() {
        this.setState({
            showModal: !this.state.showModal,
        })
    }

    generate(books) {
        var tab = []

        tab.push(
            <div>
                <Container component="main">
                    <TableContainer sx={{
                        maxWidth: '100%',
                        display: 'flex',
                        backgroundColor: "#2B2D42",
                        color: '#bcbedc',
                        marginTop: 8,
                        alignItems: 'center',
                    }} >
                        <Table sx={{ minWidth: 700 }} >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align="center">Rank</StyledTableCell>
                                    <StyledTableCell align="center">Title</StyledTableCell>
                                    <StyledTableCell align="center">Rating</StyledTableCell>
                                    <StyledTableCell align="center">Your score</StyledTableCell>
                                    <StyledTableCell align="center">Status</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {books.map((book, index) => (
                                    <StyledTableRow key={book.id}>
                                        <StyledTableCell align="center">
                                            {++index}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                            component={Link} to={'/book/' + book.id + '/' + book.title}
                                        >
                                            {book.title}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                        >
                                            {book.rating}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                        >
                                            {book["users.book-user.score"] ? book["users.book-user.score"] : "-"}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            align="center"
                                        >

                                            <ColorButton
                                                variant="outlined"
                                                onClick={this.openModal.bind(this)}
                                                maxWidth
                                            >
                                                {book["users.book-user.status"] ? book["users.book-user.status"] : "-"}
                                            </ColorButton>
                                            <Modal
                                                open={this.state.showModal}
                                                onClose={this.openModal.bind(this)}
                                                scoreIn={book["users.book-user.score"]}
                                                statusIn={book["users.book-user.status"]}
                                                titleIn={book.title}
                                                bookId={book.id}
                                            >
                                            </Modal>

                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>

            </div>

        )

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