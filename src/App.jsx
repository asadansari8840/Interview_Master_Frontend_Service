import { useContext, useEffect, useState } from "react"
import contactContext from "./context/contactContext"
import NavBar from "./components/NavBar-component"
import ContactTable from "./components/ContactTable-component";

const data = [];

const App = () => {
  const context = useContext(contactContext);
  const { getAllorSpecificContacts, contacts, loading, isUpdated, deleteContact } = context;


  useEffect(() => {
    getAllorSpecificContacts();
  }, [isUpdated])

  return (
    <>
      <NavBar />
      {loading && loading == true ? <><h1>Loading.....</h1></>
        : <ContactTable deleteContact={deleteContact} rows={contacts} />}
    </>
  )
}

export default App
