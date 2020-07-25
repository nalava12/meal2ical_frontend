import React from 'react'
import ReactDOM from 'react-dom'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '30px'
  }
})

function App() {
  const classes = useStyles();
  let [isOpen, setOpen] = React.useState(false);
  let [includeAllergy, setIncludeAllergy] = React.useState(false);

  return (<>
    <CssBaseline />
    <Container>
    <Typography variant="h4" className={classes.title}>사용자화</Typography>
      <FormControlLabel
        control={<Checkbox checked={includeAllergy} onClick={() => setIncludeAllergy(!includeAllergy)} />}
        label="알레르기 정보 포함"
      />
      <TextField></TextField>
    </Container>
  </>)
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)