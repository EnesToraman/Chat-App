import { useContext, useState } from 'react';
import { Button, Checkbox, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid } from '@mui/material'
import { ContactsContext } from '../contexts/ContactsProvider';
import { ConversationsContext } from '../contexts/ConversationsProvider';


interface ModalProps {
  setOpenModal(open: boolean): void
}

export const NewConversationModal = ({ setOpenModal }: ModalProps) => {
  const { contacts } = useContext(ContactsContext);
  const { createConversation } = useContext(ConversationsContext);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  (selectedIds);

  const handleCreate = () => {
    createConversation(selectedIds)
    setOpenModal(false);
  };

  const handleChange = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((i) => i !== id);
      } else {
        return [...prev, id];
      }
    })
  };

  return (
    <>
      <DialogTitle>Create Conversation</DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={2}>
          {contacts.map((contact) => (
            <Grid item key={contact.id}>
              <FormControlLabel
                control={<Checkbox />}
                label={contact.name}
                onChange={() => handleChange(contact.id)}  
              />
            </Grid>
          ))}
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
