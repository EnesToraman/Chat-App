import { useState } from "react";
import { Button, Grid, Tab, Tabs } from "@mui/material"
import { Conversations } from "./Conversations";
import { Contacts } from "./Contacts";
import { NewConversationModal } from "./NewConversationModal";
import { NewContactModal } from "./NewContactModal";

export const Sidebar = ({ id }: {id: string}) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  return (
    <Grid container p={2} gap={2} flexDirection="column" borderRight="1px solid grey" width="30vw" height="100vh" flexWrap="initial">
      <Grid item>
        <Tabs value={activeTab} onChange={(_, val) => setActiveTab(val)}>
          <Tab value={1} label="Conversations" />
          <Tab value={2} label="Contacts" />
        </Tabs>
      </Grid>
      <Grid item overflow="auto" xs={12}>
        {activeTab === 1
          ? <Conversations />
          : <Contacts />
        }
      </Grid>
      <Grid container flexDirection="column" position="sticky" bottom={0} gap={2}>
        <Grid item>
          Your ID: {id}
        </Grid>
        <Grid item>
          <Button fullWidth variant="contained">
            New {activeTab === 1 ? 'Conversation' : 'Contact'}
          </Button>
        </Grid>
      </Grid>
      <NewConversationModal />
      <NewContactModal />
    </Grid>
  )
}
