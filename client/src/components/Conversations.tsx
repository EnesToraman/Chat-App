import { MenuItem } from "@mui/material"
import { useContext } from "react"
import { ConversationsContext } from "../contexts/ConversationsContext"

export const Conversations = () => {
  const { formattedConversations, setSelectedConversationIndex } = useContext(ConversationsContext);

  return (
    <>
      {formattedConversations.map((conversation, index) => (
        <MenuItem
          key={index}
          sx={{
            borderBottom: conversation.selected ? 'none' : '1px solid lightgrey',
            padding: '10px 20px',
            backgroundColor: conversation.selected ? '#007BFF' : '#FFFFFF',
            color: conversation.selected ? '#FFFFFF' : '#000000',
            ":hover": {
              backgroundColor: conversation.selected ? '#007BFF' : '#F5F5F5',
              color: conversation.selected ? '#FFFFFF' : '#000000',
            },
            ":last-of-type": {
              borderBottom: 'none'
            }
          }}
          onClick={() => setSelectedConversationIndex(index)}
        >
          {conversation.recipients.map((r) => r.name).join(", ")}
        </MenuItem>
      ))
      }
    </>

  )
}
