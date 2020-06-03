import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import SurroundSoundRoundedIcon from '@material-ui/icons/SurroundSoundRounded';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DevicesMenu(props) {
    const { mics, speakers, cameras, jitsiApi } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectedMic, setSelectedMic] = React.useState(mics[0] ? mics[0].label : 'select one');
    const [selectedSpeaker, setSelectedSpeaker] = React.useState(speakers[0] ? speakers[0].label : 'select one')
    const [selectedCamera, setSelectedCamera] = React.useState(cameras[0] ? cameras[0].label : 'select one')
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const getDeviceId = (label, deviceType) => {
        for(let device in props[deviceType]) {
            if(props[deviceType][device].label === label) {
                console.log(props[deviceType][device].deviceId);
                return props[deviceType][device].deviceId;
            }
        }
    }
  
    return (
      <div>
        <span onClick={handleClickOpen}>Settings</span>
        <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Device Manager</DialogTitle>
          <DialogContent >
            <form className={classes.container} style = {{display: 'flex', flexDirection: 'column'}} id = "devicesMenu">
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="demo-dialog-native">Microphone</InputLabel>
                <Select
                  value={selectedMic}
                  onChange={(e) => {setSelectedMic(e.target.value);jitsiApi.setAudioInputDevice(e.target.value,getDeviceId(e.target.value, 'mics'))}}
                  input={<Input id="demo-dialog-native" />}
                >
                  {mics.map(mic => <MenuItem name={mic.deviceId} value={mic.label} id={mic.deviceId}>{mic.label}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label">Speaker</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={selectedSpeaker}
                  onChange={(e) => {setSelectedSpeaker(e.target.value);jitsiApi.setAudioOutputDevice(e.target.value,getDeviceId(e.target.value, 'speakers'))}}
                  input={<Input />}
                >
                  {speakers.map(speaker => <MenuItem name = {speaker.deviceId} value={speaker.label} id={speaker.deviceId}>{speaker.label}</MenuItem>)}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel id="demo-dialog-select-label2">Camera</InputLabel>
                <Select
                  labelId="demo-dialog-select-labele"
                  id="demo-dialog-selecte"
                  value={selectedCamera}
                  onChange={(e) => {setSelectedCamera(e.target.value);jitsiApi.setVideoInputDevice(e.target.value,getDeviceId(e.target.value, 'cameras'))}}
                  input={<Input />}
                >
                  {cameras.map(camera => <MenuItem name = {camera.deviceId} value={camera.label} id={camera.deviceId}>{camera.label}</MenuItem>)}
                </Select>
              </FormControl>
            </form>
            <div style = {{display: 'flex', flexDirection: 'row', marginTop: '10px', marginLeft: '7px'}}>
                <Typography className={classes.pos}>
                    Play a test sound 
                </Typography>
                <SurroundSoundRoundedIcon style ={{marginLeft: '8px'}} onClick={() => {
                    const jarjar = new Audio('/gonnadie.wav');
                    console.log(jarjar);
                    jarjar.play();
                }}/>
                <audio id="jarjar" src="./gonnadie.wav"></audio>
            </div>
            
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }