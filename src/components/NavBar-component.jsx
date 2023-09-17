import React, { useEffect, useState, useContext } from 'react';
import "../styles/Navbar-styles.scss";
import Tooltip from '@mui/material/Tooltip';
import contactContext from '../context/contactContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const NavBar = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const context = useContext(contactContext);
    const { getAllorSpecificContacts, createContact, downloadExcelSheet } = context;
    const [searchString, setSearchString] = useState('');
    useEffect(() => {
        //Debounced Calls to the api !!!
        let timerOut = setTimeout(() => {
            getAllorSpecificContacts(searchString);
        }, 1000);
        return () => clearTimeout(timerOut);
    }, [searchString])
    return (
        <nav>
            <div className="title-section">
                <h1>Contact Manager</h1>
            </div>
            <div className="search-box">
                <Tooltip title="Search">
                    <input onChange={(e) => setSearchString(e.target.value)} value={searchString} type="text" placeholder='Search by contact name' />
                </Tooltip>
            </div>
            <div className="utilities">
                <button onClick={handleOpen}>Add Contact</button>
                <button onClick={downloadExcelSheet}>Export to Excel</button>
            </div>
            <AddContactModal createContact={createContact} open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
        </nav>
    )
}

export default NavBar;



const AddContactModal = ({ open, setOpen, handleOpen, handleClose, createContact }) => {
    const [error, setError] = useState(undefined);
    const [contactObject, setContactObject] = useState({});
    const onChangeHandler = e => {
        if (e.target.value.length === 0) {
            setError(true);
        } else {
            setError(false)
        }
        setContactObject({ ...contactObject, [e.target.name]: e.target.value });
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        createContact(contactObject);
        handleClose();
    }


    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>Create a new contact...</Typography>
                    <form onSubmit={onSubmitHandler}>
                        <TextField
                            error={error}
                            onChange={onChangeHandler}
                            name='contactName'
                            style={{ "margin": "10px 0" }}
                            required
                            fullWidth
                            aria-required
                            id="standard-required"
                            label="Contact Name"
                            variant="standard"
                        />
                        <TextField
                            error={error}
                            onChange={onChangeHandler}
                            name='spoc'
                            style={{ "margin": "10px 0" }}
                            required
                            aria-required
                            fullWidth
                            id="standard-required"
                            label="SPOC"
                            variant="standard"
                        />
                        <TextField
                            error={error}
                            onChange={onChangeHandler}
                            name='mobileNo'
                            style={{ "margin": "10px 0" }}
                            required
                            fullWidth
                            aria-required
                            type='telephone'
                            id="standard-required"
                            label="Telephone"
                            variant="standard"
                        />
                        <TextField
                            error={error}
                            onChange={onChangeHandler}
                            name='email'
                            aria-required
                            style={{ "margin": "10px 0" }}
                            required
                            fullWidth
                            id="standard-required"
                            label="Email"
                            variant="standard"
                        />
                        <Button disabled={error == undefined ? true : error} onClick={onSubmitHandler} fullWidth variant="contained" style={{ "marginTop": "20px" }}>Add Contact</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}