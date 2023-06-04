import { useContext, useState } from 'react'
import { Button, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { ContactsContext } from '../contexts/ContactsContext'

interface Contact {
  id: string,
  name: string
}

interface ModalProps {
  setOpenModal(open: boolean): void
}

export const NewContactModal = ({ setOpenModal }: ModalProps) => {
  const { createContact } = useContext(ContactsContext);
  const [contact, setContact] = useState<Contact>({
    id: '',
    name: ''
  })

  const handleCreate = () => {
    createContact(contact);
    setOpenModal(false)
  }

  return (
    <>
      <DialogTitle>Create Contact</DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={4} paddingTop={1}>
          <Grid item>
            <TextField label="ID" fullWidth value={contact.id} onChange={(e) => setContact((prev) => ({...prev, id: e.target.value}))}/>
          </Grid>
          <Grid item>
            <TextField label="Name" fullWidth value={contact.name} onChange={(e) => setContact((prev) => ({...prev, name: e.target.value}))}/>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogActions>
    </>
  )
}
