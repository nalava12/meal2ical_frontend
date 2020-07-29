import React from 'react'
import ReactDOM from 'react-dom'
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'fontsource-roboto';
import DayjsUtils from '@date-io/dayjs';
import 'dayjs/locale/ko'
import { App } from './App';
import dayjs from 'dayjs';
dayjs.locale('ko')

function Index() {
  let theme = createMuiTheme()
  return <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  </>
}

ReactDOM.render(
  <Index />,
  document.getElementById('root'),
)