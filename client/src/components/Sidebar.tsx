import { useState } from "react";
import { Button, Dialog, Grid, Tab, Tabs } from "@mui/material"
import { Conversations } from "./Conversations";
import { Contacts } from "./Contacts";
import { NewConversationModal } from "./NewConversationModal";
import { NewContactModal } from "./NewContactModal";

export const Sidebar = ({ id }: { id: string }) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Grid
      container
      flexDirection="column"
      borderRight="2px solid #F5F5F5"
      width="30vw"
      minWidth="300px"
      height="100vh"
      flexWrap="initial"
    >
      <Grid item p={2}>
        <Tabs value={activeTab} onChange={(_, val) => setActiveTab(val)}>
          <Tab value={1} label="Conversations" sx={{ flex: 1 }} />
          <Tab value={2} label="Contacts" sx={{ flex: 1 }} />
        </Tabs>
      </Grid>
      <Grid item overflow="auto" xs={12}>
        {activeTab === 1
          ? <Conversations />
          : <Contacts />
        }
      </Grid>
      <Grid
        container
        flexDirection="column"
        position="sticky"
        bottom={0}
        gap={2}
        padding={2}
        borderTop="2px solid #F5F5F5"
      >
        <Grid item>
          <b>Your ID:</b> {id}
        </Grid>
        <Grid item>
          <Button fullWidth variant="contained" onClick={() => setOpenModal(true)}>
            New {activeTab === 1 ? 'Conversation' : 'Contact'}
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        fullWidth
      >
        {activeTab === 1
          ? <NewConversationModal setOpenModal={setOpenModal} />
          : <NewContactModal setOpenModal={setOpenModal} />
        }
      </Dialog>
    </Grid>
  )
}
