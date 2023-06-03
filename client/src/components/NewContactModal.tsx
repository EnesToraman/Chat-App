import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'

export const NewContactModal = () => {
  return (
    <Dialog open={true} fullWidth>
      <DialogTitle >Create Contact</DialogTitle>
      <DialogContent>
        <Grid container flexDirection="column" gap={4} paddingTop={1}>
          <Grid item>
            <TextField label="ID" fullWidth/>
          </Grid>
          <Grid item>
            <TextField label="Name" fullWidth/>
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
