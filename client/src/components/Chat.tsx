import { Button, Grid, TextField, Typography } from "@mui/material"
import { useCallback, useContext, useState } from "react"
import { ConversationsContext } from "../contexts/ConversationsProvider";

export const Chat = () => {
  const { sendMessage, selectedConversation } = useContext(ConversationsContext);
  const [text, setText] = useState<string>('');
  const setLastMessageRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  const handleSend = () => {
    const recipients = selectedConversation.recipients.map((r) => r.id);
    sendMessage(recipients, text);
    setText('')
  }

  const handleEnter = (key: string) => {
    if (key === 'Enter') {
      handleSend();
    }
  }

  return (
    <Grid
      container
      display="flex"
      height={`calc(100vh - 50px)`}
      flexDirection="column-reverse"
      overflow="auto"
    >
      <Grid
        container
        item
        display="flex"
        alignItems="flex-end"
      >
        <Grid
          display="grid"
          container
          item
          overflow="auto"
          p={2}
          height="fit-content"
        >
          {selectedConversation.messages.map((message, index) => (
            <Grid
              ref={(selectedConversation.messages.length - 1) === index ? setLastMessageRef : undefined}
              key={index}
              item
              xs={8}
              display="flex"
              flexDirection="column"
              justifySelf={message.fromMe ? 'flex-end' : 'flex-start'}
              marginBottom={selectedConversation.messages?.[index + 1]?.sender !== message.sender ? 2 : 0.5}
            >
              <Grid item>
                <Typography
                  p={1}
                  borderRadius="10px"
                  sx={{
                    background: message.fromMe ? '#005C4B' : '#007BFF',
                    color: '#FFFFFF',
                    overflowWrap: "anywhere"
                  }}
                >
                  {message.message}
                </Typography>
              </Grid>
              <Grid
                item
                display="flex"
                justifyContent={message.fromMe ? 'flex-end' : 'flex-start'}
              >
                {selectedConversation.messages?.[index + 1]?.sender !== message.sender
                  ? <small>{message.fromMe ? 'You' : message.senderName}</small>
                  : null}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Grid
        container
        item
        position="absolute"
        bottom={0}
        xs={12}
        bgcolor="white"
      >
        <Grid item flex={1} >
          <TextField
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => handleEnter(e.key)}
            fullWidth
            sx={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              'fieldset': {
                borderRadius: 0
              }
            }}
          />
        </Grid>
        <Grid item>
          <Button
            onClick={handleSend}
            variant="contained"
            sx={{ height: '100%', borderRadius: 0 }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}
