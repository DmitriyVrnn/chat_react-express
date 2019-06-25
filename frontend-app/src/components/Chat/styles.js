import {makeStyles} from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'center',
    margin: '50px auto',
    padding: theme.spacing(3, 2),
    width: '50%'
  },
  flex: {
    display: 'flex',
  },
  borderBottom: {
    borderBottom: '1px solid gray',
    paddingBottom: '20px',
  },
  topicsWindow: {
    marginTop: '30px',
    width: '20%',
    height: '300px',
    marginRight: '18px',
  },
  chatWindow: {
    marginTop: '30px',
    width: '80%',
    height: '500px',
    overflowY: 'auto',
    borderLeft: '1px solid gray',
    backgroundColor: 'gray'
  },
  button: {
    width: '15%',
    marginRight: '57px',
    marginLeft: 'auto',
    display: 'flex'
  },
  chatBox: {
    width: '85%',
  },
  input: {
    marginLeft: 'auto',
    marginRight: '0',
    width: '85%',
  }
}));