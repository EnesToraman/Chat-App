import { useContext } from "react"
import { Chat } from "./Chat"
import { Sidebar } from "./Sidebar"
import { ConversationsContext } from "../contexts/ConversationsProvider"
import { Grid } from "@mui/material"

export const Dashboard = ({ id }: { id: string }) => {
  const { selectedConversation } = useContext(ConversationsContext);
  return (
    <Grid container>
      <Grid item>
        <Sidebar id={id} />
      </Grid>
      <Grid container item flex={1} position="relative">
        {!!selectedConversation &&  <Chat />}
      </Grid>
    </Grid>
  )
}
