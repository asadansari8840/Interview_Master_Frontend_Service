import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import contactContext from '../context/contactContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ContactModal = ({ open, setOpen, handleOpen, handleClose, contact }) => {
    const [updateObject, setUpdateObject] = useState({});
    const context = useContext(contactContext);
    const { updateContact } = context;
    const onChangeHandler = e => setUpdateObject({ ...updateObject, [e.target.name]: e.target.value })

    const formSubmitHandler = (e) => {
        e.preventDefault();
        updateContact(updateObject,contact.key);
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
                    <form onSubmit={formSubmitHandler}>
                        <TextField
                            onChange={onChangeHandler}
                            name='contactName'
                            style={{ "margin": "10px 0" }}
                            required
                            fullWidth
                            id="standard-required"
                            label="Contact Name"
                            variant="standard"
                            defaultValue={contact.contact}
                        />
                        <TextField
                            onChange={onChangeHandler}
                            name='spoc'
                            style={{ "margin": "10px 0" }}
                            required
                            fullWidth
                            id="standard-required"
                            label="SPOC"
                            variant="standard"
                            defaultValue={contact.spoc}
                        />
                        <TextField
                            onChange={onChangeHandler}
                            name='mobileNo'
                            style={{ "margin": "10px 0" }}
                            required
                            fullWidth
                            id="standard-required"
                            label="Telephone"
                            variant="standard"
                            defaultValue={contact.telephone}
                        />
                        <TextField
                            onChange={onChangeHandler}
                            name='email'
                            style={{ "margin": "10px 0" }}
                            required
                            fullWidth
                            id="standard-required"
                            label="Email"
                            variant="standard"
                            defaultValue={contact.email}
                        />
                        <Button onClick={formSubmitHandler} fullWidth variant="contained" style={{ "marginTop": "20px" }}>Update Contact</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default ContactModal;