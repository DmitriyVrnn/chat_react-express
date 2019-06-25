import React from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {useStyles} from "./styles";

const Chat = ({user, logout}) => {
  const classes = useStyles();

  return (
      <Paper className={classes.root}>
          <Typography variant="h5" component="h3">
            {user.name}
            <button onClick={() => logout()}>Выход</button>
          </Typography>
          <Typography variant="h5" component="h3">
            Chat
          </Typography>
          <Typography component="p">
            <div className={classes.borderBottom}>
              {`# Channel`}
            </div>
          </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <h1>Topic Window</h1>
          </div>
          <div className={classes.chatWindow}>
            <h1>Chat Window</h1>
          </div>
        </div>
        <div className={classes.flex}>
          <div className={classes.input}>
            <TextField
                label="Send a chat"
                className={classes.chatBox}
                margin="normal"
            />
          </div>
        </div>
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
        >
          Send
        </Button>
      </Paper>
  )
};

export default Chat;