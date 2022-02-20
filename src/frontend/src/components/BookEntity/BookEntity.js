import { Modal } from './Modal'
import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import './BookEntity.css'
import { BlueButton } from '../../styles/Style'
import { Box, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Image from 'mui-image'
import { MenuItem } from '@material-ui/core';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function BookEntity(props) {

    const [username] = useState(localStorage.getItem('username'))
    const [book, setBook] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [reviews, setReviews] = useState([])
    const [isReviewsLoading, setIsReviewsLoading] = useState(true)
    const [handleNewReview, setHandleNewReview] = useState(false)
    const [reviewTitle, setReviewTitle] = useState('')
    const [reviewBody, setReviewBody] = useState('')
    const [reviewScore, setReviewScore] = useState('')

    const handleOpen = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    /* pulling book data from database */
    useEffect(() => {
        async function fetchData() {
            if (!isLoaded) {
                setIsLoaded(true)
                var url = new URL("http://localhost:8080/bookEntity")
                url += '/' + props.match.params.id + '/' + props.match.params.title
                if (username)
                    url += '/' + username
                //console.log(url)
                await fetch(url, {
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(response => response.json())
                    .then((jsonData) => {
                        console.log(jsonData)
                        setBook(jsonData)
                    })
                    .catch((error) => {
                        console.error(error)
                    })
            }
        }
        fetchData();
    })

    /* pull reviews from database */
    useEffect(() => {
        async function fetchData() {
            var url = new URL("http://localhost:8080/review")
            url += '/' + props.match.params.id
            await fetch(url, {
                credentials: 'include',
                headers: {
                    Authorization: `BEARER ${localStorage.getItem('token')}`
                }
            })
                .then(response => response.json())
                .then((jsonData) => {
                    setReviews(jsonData)
                    setIsReviewsLoading(false)
                })
                .catch((error) => {
                    console.error(error)
                })
        }
        fetchData();
    }, [props.match.params.id])


    const AddReview = () => {
        var json = JSON.stringify({
            title: reviewTitle,
            body: reviewBody,
            username: localStorage.getItem('username'),
            score: reviewScore,
        })
        if (reviewTitle === "" || reviewBody === "" || reviewScore === "") return
        var url = new URL("http://localhost:8080/review")
        url += '/' + props.match.params.id
        fetch(url, {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
            .then(response => response.json())
            .then(data => {
                setHandleNewReview(!handleNewReview)
                return true;
            })
            .catch((error) => {
                console.error('Error: ', error)
                return false
            });
        return false
    }

    const scores = [
        {
            value: '1',
            label: '1',
        },
        {
            value: '2',
            label: '2',
        },
        {
            value: '3',
            label: '3',
        },
        {
            value: '4',
            label: '4',
        },
        {
            value: '5',
            label: '5',
        },
    ];

    if (isReviewsLoading) return <div>loading</div>

    return (
        book.map((book, index) => (
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
                        gridTemplateColumns: 'repeat(6, 1fr)',
                        gap: 3,
                        gridTemplateRows: 'auto',
                        gridTemplateAreas: `
                        "header header header header header header"
                        "sidebar main main main main main"`,
                    }}
                >
                    {/* HEADER */}
                    <Box
                        sx={{
                            gridArea: 'header',
                            backgroundColor: "#2B2D42",
                            color: '#bcbedc',
                            px: 3,
                            py: 1,
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#c9cbe3",
                                fontWeight: "bold"
                            }}
                            component="h1"
                            variant="h4"
                        >
                            {book.title}
                        </Typography>
                    </Box>

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
                        {/* IMAGE */}
                        <Box
                            sx={{
                                width: "200px",
                                height: "300px",
                                //border: "solid",
                                //borderColor: "#bcbedc",
                                display: 'flex',
                                flexDirection: 'column',
                                mt: 1,
                                mb: 3,
                            }}
                        >
                            <Image
                                src="/default.png"
                                width="200px"
                                height="300px"
                                fit="contain"
                                duration={0}
                            />
                        </Box>

                        {/* TMP BUTTON */}
                        <BlueButton
                            sx={{
                                fontWeight: "bold",
                            }}
                            fullWidth
                            onClick={handleOpen}
                        >
                            Add book
                        </BlueButton>

                        <Typography
                            sx={{
                                py: 1,
                                color: "#c9cbe3",
                                fontWeight: "bold"
                            }}
                            component="h1"
                            variant="subtitle1"
                        >
                            Rating:
                        </Typography>
                        <Typography
                            sx={{
                                pb: 1,
                                color: "#bcbedc"
                            }}
                            component="h5"
                            variant="body1"
                        >
                            {book.rating ? book.rating.toFixed(2) : "-"}
                        </Typography>

                        <Typography
                            sx={{
                                pb: 1,
                                color: "#c9cbe3",
                                fontWeight: "bold"
                            }}
                            component="h1"
                            variant="subtitle1"
                        >
                            Release date:
                        </Typography>
                        <Typography
                            sx={{
                                pb: 1,
                                color: "#bcbedc"
                            }}
                            component="h5"
                            variant="subtitle2"
                        >
                            {book.release_date}
                        </Typography>

                        <Typography
                            sx={{
                                pb: 1,
                                color: "#c9cbe3",
                                fontWeight: "bold"
                            }}
                            component="h1"
                            variant="subtitle1"
                        >
                            Genre:
                        </Typography>
                        <Typography
                            sx={{
                                pb: 1,
                                color: "#bcbedc"
                            }}
                            component="h5"
                            variant="subtitle2"
                        >
                            {book.genre}
                        </Typography>
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
                                pr: 2,
                                pb: 3,
                            }}
                    >
                        {/* DESCRIPTION */}
                        <Box>
                            <Typography
                                sx={{
                                    pb: 1,
                                    pl: 2,
                                    color: "#c9cbe3",
                                    fontWeight: "bold"
                                }}
                                component="h1"
                                variant="subtitle1"
                            >
                                Description:
                            </Typography>
                            <Typography
                                sx={{
                                    pb: 1,
                                    pl: 2,
                                    color: "#bcbedc",
                                    fontWeight: "bold"
                                }}
                                component="h1"
                                variant="body2"
                            >
                                {book.description}
                            </Typography>
                        </Box>
                        {/* REVIEWS */}
                        <Box
                            sx={{
                                pl: 2,
                                pt: 2,
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#c9cbe3",
                                    fontWeight: "bold"
                                }}
                                component="h1"
                                variant="subtitle1"
                            >
                                Reviews:
                            </Typography>




                            {/* TMP BUTTON */}
                            < BlueButton
                                sx={{
                                    fontWeight: "bold",
                                    marginY: 2,
                                }}
                                onClick={() => setHandleNewReview(!handleNewReview)}
                            >
                                Add Review
                            </BlueButton>

                            {/* REVIEW MODAL */}
                            {handleNewReview &&
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            flexDirection: 'row',
                                            minWidth: 150
                                        }}
                                    >
                                        <TextField
                                            sx={{
                                                input: {
                                                    color: "#c9cbe3",
                                                }
                                            }}
                                            id="titleTextField"
                                            label="Title"
                                            variant="outlined"
                                            onChange={event => setReviewTitle(event.target.value)}
                                        />

                                        <FormControl sx={{ ml: 5, minWidth: 150 }}>
                                            <InputLabel id="demo-simple-select-label">Score</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={reviewScore}
                                                label="Score"
                                                onChange={event => setReviewScore(event.target.value)}
                                            >
                                                {scores.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>



                                    </Box>
                                    <TextField
                                        sx={{
                                            input: {
                                                color: "#c9cbe3",
                                            },
                                            marginTop: 2,
                                        }}
                                        fullWidth
                                        id="bodyTextField"
                                        label="Body"
                                        multiline
                                        minRows={3}
                                        maxRows={4}
                                        onChange={event => setReviewBody(event.target.value)}
                                        variant="outlined"
                                    />
                                    < BlueButton
                                        sx={{
                                            fontWeight: "bold",
                                            marginY: 2,
                                        }}

                                        onClick={AddReview}
                                    >
                                        Write review
                                    </BlueButton>
                                </Box>

                            }

                            {reviews.map((review, index) => (
                                <Box
                                    sx={{
                                        mt: 2,
                                        borderColor: "#1f1f2b",
                                        border: 2,
                                        paddingX: 1,
                                        paddingBottom: 1,
                                        // backgroundColor: "white",
                                        color: '#bcbedc',
                                    }}
                                >
                                    <h5>{review.title}</h5>
                                    <h7 key={index}>{review.body}</h7>

                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
                {/* MODAL FRAGMENT */}
                < Box className="BUTTON_WRAPPER_STYLES" >

                    <Modal
                        open={showModal}
                        onClose={handleClose}
                        scoreIn={book["users.book-user.score"]}
                        statusIn={book["users.book-user.status"]}
                        titleIn={book.title}
                        bookId={props.match.params.id}
                    >
                    </Modal>
                </Box >
            </Box >
        )
        ))
}
export default withRouter(BookEntity)