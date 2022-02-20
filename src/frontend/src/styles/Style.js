import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';

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

const CustomTablePagination = styled(TablePagination)(({ theme }) => ({
    [`&.${TablePagination.spacer}`]: {
        backgroundColor: "#2B2D42",
        color: "#bcbedc",
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

const TerminateButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#f44336 !important'),
    backgroundColor: '#f44336 !important',
    '&:hover': {
        backgroundColor: '#d32f2f',
    },
}));


const BlueButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: '#1a53ff !important',
    borderColor: '#282c34 !important',
    '&:hover': {
        backgroundColor: '#3366ff !important',
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

export {
    StyledTableCell,
    StyledTableRow,
    TerminateButton,
    BlueButton,
    ColorButton,
    CustomTablePagination,
}