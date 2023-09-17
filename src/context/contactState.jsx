import ContactContext from "./contactContext.js";
import { useState } from "react"
import axios from "axios";
import backendService from "../constants/backendService.js";
import { getFileNameByDateTime } from "../utils/formattingUtils.js";
import { toast } from "react-toastify";


const ContactState = (props) => {
    const [contacts, setContact] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    let rows = [];
    //Contact Formatter Function 
    const formatContact = (response) => {
        response.data.contacts.forEach((value, index) => {
            rows.push({
                contact: value?.contactName,
                spoc: value?.spoc,
                telephone: value?.mobileNo,
                email: value?.email,
                createdAt: value?.createdAt.slice(0, 10),
                key: value?._id,
            })
        });
    };

    const downloader = (base64String) => {
        return new Promise((res, rej) => {
            try {
                const anchor_href = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," + base64String;
                const elem = document.createElement('a');
                elem.hidden = true;
                elem.download = getFileNameByDateTime();
                elem.href = anchor_href;
                elem.text = "downloading....";
                document.body.appendChild(elem);
                elem.click();
                elem.remove();
                res(true);
            } catch (error) {
                res(error)
            }
        })
    }

    //For all contacts
    const getAllorSpecificContacts = async (keyword = '') => {
        let link;
        if (keyword !== '' && keyword !== undefined && keyword !== null) {
            link = `${backendService.BACKEND_SERVICE_API_BASE_URL}/api/contacts?contactName=${keyword}`
        } else {
            link = `${backendService.BACKEND_SERVICE_API_BASE_URL}/api/contacts`
        }
        try {
            setLoading(true);
            const response = await axios.get(link);
            formatContact(response);
            setContact(rows);
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong : (", { autoClose: 1500, theme: 'dark', position: 'top-center' });
            setLoading(false);
        }
    }

    //Create a new contact
    const createContact = async (contactObject) => {
        try {
            setLoading(true);
            const config = {
                "headers": {
                    "Content-Type": "application/json",
                }
            }
            const response = await axios.post(`${backendService.BACKEND_SERVICE_API_BASE_URL}/api/contacts`, contactObject, config);
            setIsUpdated((value) => !value);
            toast.success("Contact created successfully !!!", { autoClose: 1500, theme: 'dark', position: 'top-center' });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong : (", { autoClose: 1500, theme: 'dark', position: 'top-center' });
        }
    }

    //update an existing contact with the help of id
    const updateContact = async (updateObject, id) => {
        try {
            const config = { "headers": { "Content-Type": "application/json" } };
            const response = await axios.put(`${backendService.BACKEND_SERVICE_API_BASE_URL}/api/contacts/${id}`, updateObject, config);

            const newContacts = JSON.parse(JSON.stringify(contacts));
            const contact = response.data.contact;

            for (let i = 0; i < newContacts.length; i++) {
                if (newContacts[i]["key"] == contact._id.toString()) {
                    newContacts[i]["contact"] = contact.contactName;
                    newContacts[i]["spoc"] = contact.spoc;
                    newContacts[i]["email"] = contact.email;
                    newContacts[i]["telephone"] = contact.mobileNo;
                    break;
                }
            }
            setContact(newContacts);
            toast.success("Yay ! Contact updated successfully...", { autoClose: 1500, theme: 'dark', position: 'top-center' });
            setIsUpdated((value) => !value);
        } catch (error) {
            toast.error("Something went wrong : (", { autoClose: 1500, theme: 'dark', position: 'top-center' });
            setLoading(false);
        }
    }

    //Delete a contact 
    const deleteContact = async (deleteIds) => {
        try {
            const response = await axios.delete(`${backendService.BACKEND_SERVICE_API_BASE_URL}/api/contacts`, { data: { deleteIds } })
            setIsUpdated((value) => !value);
            toast.warning("Contact deleted succcessfully !", { autoClose: 1500, theme: 'dark', position: 'top-center' });
        } catch (error) {
            toast.error("Something went wrong : (", { autoClose: 1500, theme: 'dark', position: 'top-center' });
            setLoading(false);
        }
    }

    //For Downlaoding the contact file in excel sheet 
    const downloadExcelSheet = async () => {
        try {
            const config = { "headers": { "Content-Type": "application/json" } };
            let link;
            if (backendService.ENVIRONMENT !== 'PRODUCTION') {
                link = `http://localhost:4000/api/dowloadexcelfile`
            } else {
                link = `${backendService.BACKEND_SERVICE_API_BASE_URL}/api/dowloadexcelfile`;
            }
            const response = await axios.post(link, { contacts });
            downloader(response.data).then(() => {
                toast.success("Excel sheet exported successfully...", { autoClose: 1500, theme: 'dark', position: 'top-center' });
            })
        } catch (error) {
            toast.error("Something went wrong : (", { autoClose: 1500, theme: 'dark', position: 'top-center' });
        }
    }



    return (
        <ContactContext.Provider value={{ contacts, getAllorSpecificContacts, loading, rows, createContact, updateContact, deleteContact, setContact, isUpdated, downloadExcelSheet }} >
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;