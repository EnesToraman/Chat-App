import { useId, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';

interface LoginProps {
  setId(id: string): void,
}

export const Login = (props: LoginProps) => {
  const generatedId = useId();
  const [username, setUsername] = useState<string>('');

  const handleLogin = (): void => {
    props.setId(username || generatedId)
  };

  const handleGeneratedLogin = (): void => {
    props.setId(generatedId);
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Grid
        container
        item
        justifyContent="center"
        xs={8}
        spacing={2}
      >
        <Grid item xs={12}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item>
              <Button variant="contained" onClick={handleLogin}>
                Login
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleGeneratedLogin}
              >
                Create New Username
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
