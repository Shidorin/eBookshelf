import React from "react";
import './BookList.css'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2B2D42",
        color: "#bcbedc",
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
        var tab = [

            <TableContainer sx={{
                width: '40%',
                maxWidth: '70%',
                backgroundColor: "#2B2D42",
                position: "absolute",
                top: "7%",
                transform: 'translate(70%)',
                px: "20px",
                pb: "20px",
                color: '#bcbedc',
            }} >
                <Table sx={{ minWidth: 700 }} >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">#</StyledTableCell>
                            <StyledTableCell align="center">Title</StyledTableCell>
                            <StyledTableCell align="center">Status</StyledTableCell>
                            <StyledTableCell align="center">Score</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book, index) => (
                            <StyledTableRow key={book.id}>
                                <StyledTableCell align="center">
                                    {/* <Link to={'/book/' + book.id + '/' + book.title}>
                                        {book.id}
                                     </Link>*/}
                                    {++index}
                                </StyledTableCell>
                                <StyledTableCell align="center" component={Link} to={'/book/' + book.id + '/' + book.title} >
                                    {book.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">{book["users.book-user.status"]}</StyledTableCell>
                                <StyledTableCell align="center">{book["users.book-user.score"]}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        ]
        return tab
    }



    render() {
        //const {isLoaded} = this.state
        //if (!isLoaded) return <div><h1>error fetching data</h1></div>
        return (
            this.generate(this.state.books)
        )
    }
}
export default BookList