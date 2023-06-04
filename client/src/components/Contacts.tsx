import { useContext } from "react"
import { ContactsContext } from "../contexts/ContactsProvider"
import { MenuItem } from "@mui/material";

export const Contacts = () => {
  const { contacts } = useContext(ContactsContext);

  return (
    <>
      {contacts.map((contact) => (
        <MenuItem
          key={contact.id}
          sx={{
            borderBottom: '1px solid lightgrey',
            padding: '10px 20px',
            backgroundColor: '#FFFFFF',
            ":hover": {
              backgroundColor: '#0091ff',
              color: 'white'
            },
            ":last-of-type": {
              borderBottom: 'none'
            }
          }}
        >
          {contact.name}
        </MenuItem>
      ))}
    </>
  )
}
