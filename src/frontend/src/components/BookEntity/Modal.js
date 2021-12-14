import React from 'react'
import ReactDOM from 'react-dom'
import './Modal.css'
import { Button, Select, FormControl, MenuItem, InputLabel, Box } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';




export const Modal = ({ open, onClose, scoreIn, statusIn, titleIn, bookId }) => {
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [score, setScore] = React.useState(scoreIn ?? " ");
    const [status, setStatus] = React.useState(statusIn ?? " ");
    
    const handleScoreChange = (event) => {
        setScore(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const addNewBookToList = () => {
        var json = JSON.stringify({
            book_id: bookId,
            username: localStorage.getItem('username'),
            date_start: startDate.toISOString().substring(0, 10),
            date_completed: endDate.toISOString().substring(0, 10),
            score: score,
            status: status,
        })
        fetch('http://localhost:8080/bookToList', {
            credentials: 'include',
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: json,
        })
            .then(() => {
                onClose(true)
                document.location.reload();
            })
            .catch((error) => {
                console.error('Error: ', error)
                return false
            });
    }


    if (!open) return null
    return ReactDOM.createPortal(
        <>
            <div className='OVERLAY_STYLES' onClick={onClose} />

            <div className="modal-content" >
                <div className='modal-header'>
                    {titleIn.toUpperCase()}
                </div>
                <Box sx={{ backgroundColor: "#bcbedc" }}>

                    {/* score select component */}
                    <Box sx={{ minWidth: 120, maxWidth: 150, padding: "5px", backgroundColor: "#bcbedc" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Score</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={score}
                                onChange={handleScoreChange}
                                label="Score"
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* status select component */}
                    <Box sx={{ minWidth: 120, maxWidth: 150, padding: "5px", backgroundColor: "#bcbedc" }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={status}
                                onChange={handleStatusChange}
                                label="Status"
                            >
                                <MenuItem value={"Reading"}>Reading</MenuItem>
                                <MenuItem value={"Completed"}>Completed</MenuItem>
                                <MenuItem value={"On-Hold"}>On-Hold</MenuItem>
                                <MenuItem value={"Dropped"}>Dropped</MenuItem>
                                <MenuItem value={"Plan to Read"}>Plan to Read</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    {/* date start select component */}
                    <Box sx={{ minWidth: 120, maxWidth: 150, padding: "5px", backgroundColor: "#bcbedc" }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Start Date"
                                    inputFormat="yyyy/MM/dd"
                                    value={startDate}
                                    onChange={setStartDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>

                        {/* date end select component */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="End Date"
                                    inputFormat="yyyy/MM/dd"
                                    value={endDate}
                                    onChange={setEndDate}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ minWidth: 120, maxWidth: 150, padding: "5px", backgroundColor: "#bcbedc" }}>
                        {startDate > endDate ? <div>error in dates</div> : null}
                        <Button variant="contained" onClick={addNewBookToList}>Add</Button>
                    </Box>
                </Box>
            </div>
        </>,
        document.getElementById("modal-portal")
    )
}