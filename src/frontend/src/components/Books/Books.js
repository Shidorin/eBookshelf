import React, { useState, useEffect } from "react";
import './Books.css'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import { Modal } from '../BookEntity/Modal'
import '../BookEntity/BookEntity.css'
import { StyledTableCell, StyledTableRow, ColorButton, CustomTablePagination } from '../../styles/Style'
import { Box } from "@mui/system";
import { TextField } from "@mui/material";
import TableFooter from '@mui/material/TableFooter';

function Books(params) {

    const [username] = useState(localStorage.getItem('username'))
    const [books, setBooks] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [titleFilter, setTitleFilter] = useState('')
    const [genreFilter, setGenreFilter] = useState('')


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    /* pulling book data from database */
    useEffect(() => {
        async function fetchData() {
            if (!isLoaded) {
                setIsLoaded(true)
                var url = new URL("http://localhost:8080/books")
                if (username)
                    url += '/' + username
                fetch(url, {
                    credentials: 'include'
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
        <Box
            sx={{
                width: '60%',
                maxWidth: '100%',
                transform: 'translate(30%)',
                mt: 8,
            }}
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(1fr)',
                    gap: 3,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `"sidebar sidebar main main main main"`,
                }}
            >

                {/* SIDEBAR */}
                <Box
                    sx={{
                        gridArea: 'sidebar',
                        backgroundColor: "#2B2D42",
                        color: '#bcbedc',
                        flexDirection: 'column',
                        display: 'flex',
                        paddingTop: 1,
                        paddingX: 2,
                        input: {
                            mt: 1, pt: 1,
                        }
                    }}
                >
                    <TextField
                        sx={{
                            input: {
                                color: "#bcbedc",
                            },
                            mt: 5,
                        }}

                        fullWidth
                        id="titleTextField"
                        label="Title"
                        variant="outlined"
                        InputLabelProps={{ className: "textfield__label" }}
                        onChange={event => setTitleFilter(event.target.value)}
                    />

                    <TextField
                        sx={{
                            input: {
                                color: "#bcbedc",
                            },
                            mt: 5,
                            mb: 3,
                        }}
                        fullWidth
                        id="genreTextField"
                        label="Genre"
                        variant="outlined"
                        InputLabelProps={{ className: "textfield__label" }}
                        onChange={event => setGenreFilter(event.target.value)}
                    />

                </Box>

                {/* MAIN */}
                <Box
                    sx={
                        {
                            gridArea: 'main',
                            backgroundColor: "#2B2D42",
                            color: '#bcbedc',
                            alignItems: 'center',
                            flexDirection: 'column',
                        }}
                >
                    <Container component="main">
                        <TableContainer sx={{
                            maxWidth: '100%',
                            display: 'flex',
                            backgroundColor: "#2B2D42",
                            color: '#bcbedc',
                            // marginTop: 8,
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
                                    {(rowsPerPage > 0
                                        ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : books

                                    ).filter(book => book.title.toLowerCase().includes(titleFilter.toLowerCase()) && book.genre.toLowerCase().includes(genreFilter.toLowerCase())
                                    ).map((book, index) => (
                                        <StyledTableRow
                                            key={book.id}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            count={books.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                        >
                                            <StyledTableCell align="center">
                                                {++index + page * rowsPerPage}
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
                                                {book.rating ? book.rating.toFixed(2) : "-"}
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
                                                    onClick={handleOpen}
                                                    maxWidth
                                                >
                                                    {book["users.book-user.status"] ? book["users.book-user.status"] : "-"}
                                                </ColorButton>
                                                <Modal
                                                    open={showModal}
                                                    onClose={handleClose}
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
                                <TableFooter>
                                    <TableRow>
                                        <CustomTablePagination
                                            sx={{

                                                backgroundColor: "#2B2D42",
                                                color: '#bcbedc',
                                            }}
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={books.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            style={{ borderBottom: "none" }}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Container>
                </Box>
            </Box>
        </Box>

    )

}
export default Books