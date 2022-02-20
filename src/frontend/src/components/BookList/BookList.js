import React, { useState, useEffect } from "react";
import './BookList.css'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import { StyledTableCell, StyledTableRow } from '../../styles/Style'


function BookList(props) {

    const [username] = useState(props.match.params.username)
    const [books, setBooks] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)


    /* pulling book data from database */
    useEffect(() => {
        async function fetchData() {
            if (!isLoaded) {
                setIsLoaded(true)
                var json = JSON.stringify({
                    username: username,
                })
                //console.log(json)
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
                        setBooks(jsonData)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        }
        fetchData();
    })
    return (
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
                                    {book["users.book-user.status"]}
                                </StyledTableCell>
                                <StyledTableCell
                                    align="center"
                                >
                                    {book["users.book-user.score"]}
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )

}
export default BookList