import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid } from '@mui/material'

export const NewConversationModal = () => {
  return (
    <Dialog open={true} fullWidth>
      <DialogTitle>Create Conversation</DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={2}>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="blabla" />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="blabla" />
          </Grid>
          <Grid item>
            <FormControlLabel control={<Checkbox />} label="blabla" />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
