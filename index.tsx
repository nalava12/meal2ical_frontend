import React from 'react'
import ReactDOM from 'react-dom'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/core/styles/makeStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

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

  return (<>
    <CssBaseline />
    <Container>
      <Typography variant="h4" className={classes.title}>사용자화</Typography>
    </Container>
  </>)
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)