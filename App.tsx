import React from 'react';
import ReactDOM from 'react-dom';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Container from '@material-ui/core/Container';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { TimePicker } from '@material-ui/pickers';
import { urlBuilder, Option } from './helper';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';

const useStyles = makeStyles({
  title: {
    fontWeight: 'bold',
    paddingTop: '20px',
    paddingBottom: '30px'
  }
})

export function App() {
  const classes = useStyles();
  let timeDefault = [7, 0, 8, 0, 12, 30, 13, 30, 17, 30, 18, 30];
  let [includeAllergy, setIncludeAllergy] = React.useState(false);

  let [customTimeEnabled, setCustomTimeEnabled] = React.useState(false);
  let [customTimeModal, setCustomTimeModal] = React.useState(false);

  let [customTimeMonEnabled, setCustomTimeMonEnabled] = React.useState(false);
  let [customTimeTueEnabled, setCustomTimeTueEnabled] = React.useState(false);
  let [customTimeWedEnabled, setCustomTimeWedEnabled] = React.useState(false);
  let [customTimeThuEnabled, setCustomTimeThuEnabled] = React.useState(false);
  let [customTimeFriEnabled, setCustomTimeFriEnabled] = React.useState(false);

  let [customTimeMon, setCustomTimeMon] = React.useState(timeDefault);
  let [customTimeTue, setCustomTimeTue] = React.useState(timeDefault);
  let [customTimeWed, setCustomTimeWed] = React.useState(timeDefault);
  let [customTimeThu, setCustomTimeThu] = React.useState(timeDefault);
  let [customTimeFri, setCustomTimeFri] = React.useState(timeDefault);

  let [includeBreakfast, setIncludeBreakfast] = React.useState(true);
  let [includeLunch, setIncludeLunch] = React.useState(true);
  let [includeDinner, setIncludeDinner] = React.useState(true);

  let [isCopied, setIsCopied] = React.useState(false);

  let today = new Date();

  function optionBuilder() {
    let timeDefaultStr = timeDefault.toString()
    let option: Option = {};
    if (customTimeEnabled) {
      let customTimeEnabledArr = [customTimeMonEnabled, customTimeTueEnabled, customTimeWedEnabled, customTimeThuEnabled, customTimeFriEnabled];
      [customTimeMon, customTimeTue, customTimeWed, customTimeThu, customTimeFri].forEach((customTime, ind) => {
        if (customTime.toString() != timeDefaultStr && customTimeEnabledArr[ind]) {
          if (!option.time) {
            option.time = {};
          }
          option.time[ind + 1] = {};
          if (customTime[0] != timeDefault[0] ||
            customTime[1] != timeDefault[1] ||
            customTime[2] != timeDefault[2] ||
            customTime[3] != timeDefault[3]) {
            option.time[ind + 1].breakfast = [customTime[0], customTime[1], customTime[2], customTime[3]];
          }
          if (customTime[4] != timeDefault[4] ||
            customTime[5] != timeDefault[5] ||
            customTime[6] != timeDefault[6] ||
            customTime[7] != timeDefault[7]) {
            option.time[ind + 1].lunch = [customTime[4], customTime[5], customTime[6], customTime[7]];
          }
          if (customTime[8] != timeDefault[8] ||
            customTime[9] != timeDefault[9] ||
            customTime[10] != timeDefault[10] ||
            customTime[11] != timeDefault[11]) {
            option.time[ind + 1].dinner = [customTime[8], customTime[9], customTime[10], customTime[11]];
          }
        }
      })
    }
    option.includeAllergy = includeAllergy;
    if (!(includeBreakfast && includeLunch && includeDinner)) {
      option.includeTypes = {}
      if (!includeBreakfast) {
        option.includeTypes.breakfast = false;
      }
      if (!includeLunch) {
        option.includeTypes.lunch = false;
      }
      if (!includeDinner) {
        option.includeTypes.dinner = false;
      }
    }
    return option;
  }

  return (<>
    <Container>
      <Typography variant="h4" className={classes.title}>설정</Typography>
      <FormControlLabel
        control={<Checkbox checked={includeAllergy} onClick={() => setIncludeAllergy(!includeAllergy)} />}
        label="알레르기 정보 포함"
      />
      <br />
      <FormControlLabel
        control={<Checkbox checked={customTimeEnabled} onClick={() => setCustomTimeEnabled(!customTimeEnabled)} />}
        label="급식 시작, 종료 시간 설정"
      />
      <Button variant="contained" color="primary" disabled={!customTimeEnabled} onClick={() => setCustomTimeModal(true)}>
        설정
      </Button>
      <br />
      <Typography variant="overline">포함되는 급식 종류</Typography>
      <br />
      <FormControlLabel
        control={<Checkbox checked={includeBreakfast} onClick={() => setIncludeBreakfast(!includeBreakfast)} />}
        label="조식"
      />
      <FormControlLabel
        control={<Checkbox checked={includeLunch} onClick={() => setIncludeLunch(!includeLunch)} />}
        label="중식"
      />
      <FormControlLabel
        control={<Checkbox checked={includeDinner} onClick={() => setIncludeDinner(!includeDinner)} />}
        label="석식"
      />
      <TextField
        style={{
          marginTop: '10px'
        }}
        variant="outlined"
        label="URL"
        InputProps={{
          readOnly: true,
          endAdornment: <InputAdornment position="end">
            <Tooltip title={isCopied ? "복사됨!" : "복사하기"} arrow placement="top" onClose={() => setIsCopied(false)}>
              <IconButton onClick={() => {
                setIsCopied(copy(urlBuilder(optionBuilder())))
              }}>
                <FileCopyIcon />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        }}
        fullWidth={true}
        value={urlBuilder(optionBuilder())}
      />
    </Container>
    <Dialog onClose={() => setCustomTimeModal(false)} open={customTimeModal}>
      <DialogTitle>급식 시작, 종료 시간 설정</DialogTitle>
      <DialogContent>
        {[
          { customTimeEnabled: customTimeMonEnabled, setCustomTimeEnabled: setCustomTimeMonEnabled, customTime: customTimeMon, setCustomTime: setCustomTimeMon, day: '월요일' },
          { customTimeEnabled: customTimeTueEnabled, setCustomTimeEnabled: setCustomTimeTueEnabled, customTime: customTimeTue, setCustomTime: setCustomTimeTue, day: '화요일' },
          { customTimeEnabled: customTimeWedEnabled, setCustomTimeEnabled: setCustomTimeWedEnabled, customTime: customTimeWed, setCustomTime: setCustomTimeWed, day: '수요일' },
          { customTimeEnabled: customTimeThuEnabled, setCustomTimeEnabled: setCustomTimeThuEnabled, customTime: customTimeThu, setCustomTime: setCustomTimeThu, day: '목요일' },
          { customTimeEnabled: customTimeFriEnabled, setCustomTimeEnabled: setCustomTimeFriEnabled, customTime: customTimeFri, setCustomTime: setCustomTimeFri, day: '금요일' }
        ].map(({ customTimeEnabled, setCustomTimeEnabled, customTime, setCustomTime, day }, ind) => <div key={ind}>
          <FormControlLabel
            control={<Checkbox checked={customTimeEnabled} onClick={() => setCustomTimeEnabled(!customTimeEnabled)} />}
            label={day}
          />
          {customTimeEnabled && <div>
            <Grid container justify="space-between">
              <Grid item>
                <Typography style={{ padding: '5px' }}>조식</Typography>
              </Grid>
              <Grid item xs={4}>
                <TimePicker
                  value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), customTime[0], customTime[1])}
                  onChange={date => {
                    let tmp = [...customTime];
                    tmp[0] = date.hour();
                    tmp[1] = date.minute();
                    setCustomTime(tmp);
                  }}
                  format="A hh:mm"
                />
              </Grid>
              <Grid item>
                ~
              </Grid>
              <Grid item xs={4}>
                <TimePicker
                  value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), customTime[2], customTime[3])}
                  onChange={date => {
                    let tmp = [...customTime];
                    tmp[2] = date.hour();
                    tmp[3] = date.minute();
                    setCustomTime(tmp);
                  }}
                  format="A hh:mm"
                />
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item>
                <Typography style={{ padding: '5px' }}>중식</Typography>
              </Grid>
              <Grid item xs={4}>
                <TimePicker
                  value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), customTime[4], customTime[5])}
                  onChange={date => {
                    let tmp = [...customTime];
                    tmp[4] = date.hour();
                    tmp[5] = date.minute();
                    setCustomTime(tmp);
                  }}
                  format="A hh:mm"
                />
              </Grid>
              <Grid item>
                ~
              </Grid>
              <Grid item xs={4}>
                <TimePicker
                  value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), customTime[6], customTime[7])}
                  onChange={date => {
                    let tmp = [...customTime];
                    tmp[6] = date.hour();
                    tmp[7] = date.minute();
                    setCustomTime(tmp);
                  }}
                  format="A hh:mm"
                />
              </Grid>
            </Grid>
            <Grid container justify="space-between">
              <Grid item>
                <Typography style={{ padding: '5px' }}>석식</Typography>
              </Grid>
              <Grid item xs={4}>
                <TimePicker
                  value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), customTime[8], customTime[9])}
                  onChange={date => {
                    let tmp = [...customTime];
                    tmp[8] = date.hour();
                    tmp[9] = date.minute();
                    setCustomTime(tmp);
                  }}
                  format="A hh:mm"
                />
              </Grid>
              <Grid item>
                ~
              </Grid>
              <Grid item xs={4}>
                <TimePicker
                  value={new Date(today.getFullYear(), today.getMonth(), today.getDate(), customTime[10], customTime[11])}
                  onChange={date => {
                    let tmp = [...customTime];
                    tmp[10] = date.hour();
                    tmp[11] = date.minute();
                    setCustomTime(tmp);
                  }}
                  format="A hh:mm"
                />
              </Grid>
            </Grid>
          </div>}
        </div>)}
      </DialogContent>
    </Dialog>
  </>)
}

ReactDOM.render(
  <App />,
  document.getElementById('root'),
)