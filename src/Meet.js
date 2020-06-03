
/* eslint-disable */
import React, {useState, useEffect, Fragment} from 'react';
import { IconButton, Menu, MenuItem, ClickAwayListener, Popper, Grow, MenuList, Paper } from '@material-ui/core';
import { ChatBubble, PanTool, MicRounded, 
    VideoCallRounded, MicOffRounded, VideocamOffRounded, 
    PeopleRounded, ScreenShareRounded, StopScreenShareRounded, CallEndRounded,
    ViewComfyRounded, PersonRounded, MoreVertRounded  } from '@material-ui/icons';
import DevicesMenu from './DevicesMenu';

const inputStyle = {
    width:'30%',
    lineHeight: 2.5,
    borderRadius: '4px',
    border: '1px solid green',
    padding: '5px',
    backgroundColor:'#dcf4d1',
    marginLeft: '10px'
}

const buttonStyle = {
    backgroundColor: 'deepskyblue',
    lineHeight: 2.5,
    fontSize: 'medium',
    borderRadius: '4px',
    width: '30%',
    marginTop: '30px'
}

const divStyle = {
    display: 'flex',
    margin: '10%',
    marginLeft: '30%',
    width: '50%',
    flexDirection: 'column',
    alignItems: 'center'
}

const inputDiv = {
    width: '100%',
    display: 'flex',
    margin: '10px',
    alignItems: 'center',
    flex: 1
}

const buttonDiv = {
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'flex-end'
}

const meetStyle = {
    // position: 'fixed'
}

const toolbarStyleWhenYouSee = {
    position: 'relative',
    bottom: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    opacity: '1'
}

const toolbarStyleWhenYouDontSee = {
    ...toolbarStyleWhenYouSee,
    opacity: 0,
    transition: 'opacity 1s ease-in-out'
}

export default function Meet(props) {
    
    let [jitsiState, setJitsiState] = useState(false);
    let [roomName, setRoomName] = useState('');
    let [displayName, setDisplayName] = useState('Fellow Jitser');
    let [jitsiFrame, setJitsitFrame] = useState();
    let [micEnabled, setMicEnabled] = useState(true);
    let [videoEnabled, setVideoEnabled] = useState(true);
    let [screenShareEnabled, setScreenShareEnabled] = useState(false);
    let [tileViewEnabled, setTileViewEnabled] = useState(false);
    let [mouseMoving, setMouseMoving] = useState(false);
    let [anchorMenu, setAnchorMenu] = useState(null);
    let [menuOpen, setMenuOpen] = useState(false);
    let [fullScreenMenu, setFullScreenMenu] = useState("Full Screen");
    let [allDevices, setAllDevices] = useState({mics:[], cameras: [], speakers: []});

    const anchorRef = React.useRef(null);
    const prevOpen = React.useRef(menuOpen);
  
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomName,
      height: '40em',
      parentNode: '',
      userInfo: {
          displayName
      },
      onload: () => {
        console.log("After load of iframe");
        const iframe = document.getElementById(props.divId).children[0];
        iframe.style["pointer-events"] = "none";
      },
      interfaceConfigOverwrite: {TOOLBAR_BUTTONS: []}
    };

    useEffect(() => {
        // Update the document title using the browser API
          if(jitsiState && roomName && !jitsiFrame) {
              console.log("************************\n" + document.getElementById(props.divId));
              const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
              setJitsiState(true);
              options.parentNode = document.getElementById(props.divId);
              // setJitsiParentNode(document.getElementById('meet'));
              console.log(window.JitsiMeetExternalAPI);
              const jitsi = new JitsiMeetExternalAPI(domain, options);
              jitsi.addEventListener('screenSharingStatusChanged', (e) => {console.log(e);setScreenShareEnabled(!screenShareEnabled)});
              jitsi.executeCommand('toggleFilmStrip');
              jitsi.getAvailableDevices().then(res => {
                  console.log("######################",res);
                  const devices = {
                      mics: res.audioInput,
                      speakers: res.audioOutput,
                      cameras: res.videoInput
                  };
                  setAllDevices(devices);
                });
              setJitsitFrame(jitsi);
          }
        
      }, [jitsiState,options,props.divId,roomName,jitsiFrame]);

      useEffect(() => {
        if(mouseMoving) {
            setTimeout(() => {
                setMouseMoving(false);
            }, 3000);
        }
      });

      useEffect(() => {
        if( (window.innerHeight !== screen.height) && jitsiFrame) {
            // browser is not fullscreen
            document.getElementById(props.divId).children[0].style["height"] = "40em";
            setFullScreenMenu('Full Screen');
        }
      },[window.innerHeight !== screen.height]);

      React.useEffect(() => {
        if (prevOpen.current === true && menuOpen === false) {
          anchorRef.current.focus();
        }
    
        prevOpen.current = menuOpen;
      }, [menuOpen]);

      const handleMenuClick = (event) => {
        setAnchorMenu(event.currentTarget);
      };

      const handleMenuToggle = () => {
        setMenuOpen((prevOpen) => !prevOpen);
      };
    
      const handleMenuClose = () => {
        // setAnchorMenu(null);
        const devicesMenu = document.getElementById("devicesMenu");
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&", devicesMenu);
        if (anchorRef.current && (anchorRef.current.contains(event.target) || devicesMenu)) {
            console.log("doin nuthin")
            return;
          }
          console.log("Closing the shit")
          setMenuOpen(false);
      };

      const handleFullScreen = () => {
        if(fullScreenMenu === 'Full Screen') {
            document.getElementById('meetingParent').webkitRequestFullscreen();
            document.getElementById(props.divId).children[0].style["height"] = "54em";
            setFullScreenMenu('Exit Full Screen');
            setMenuOpen(false);
        }
        else {
            document.webkitExitFullscreen();
        }   
      }

    const toolbarContent = () => {
        return (
            <div style={mouseMoving ? toolbarStyleWhenYouSee : toolbarStyleWhenYouDontSee}>
                        <div style = {{marginLeft: '10px'}}>
                            <IconButton onClick = {() => {jitsiFrame.executeCommand("toggleChat")}}><ChatBubble style={{color: 'white'}}/></IconButton>
                            <IconButton onClick = {() => {jitsiFrame.executeCommand('')}}><PanTool style={{color: 'white'}} /></IconButton>
                        </div>
                        <div>
                            <IconButton onClick = {() => {
                                setMicEnabled(!micEnabled);
                            jitsiFrame.executeCommand('toggleAudio')}}>{micEnabled ? <MicRounded style={{color: 'white'}}/> : <MicOffRounded style={{color: 'white'}}/>}</IconButton>
                            <IconButton onClick = {() => {
                                setVideoEnabled(!videoEnabled);
                            jitsiFrame.executeCommand('toggleVideo')}}>{videoEnabled ? <VideoCallRounded style={{color: 'white'}}/> : <VideocamOffRounded style={{color: 'white'}}/>}</IconButton>
                            <IconButton onClick = {() => {
                                setScreenShareEnabled(!screenShareEnabled);
                            jitsiFrame.executeCommand('toggleShareScreen')}}>{!screenShareEnabled ? <ScreenShareRounded style={{color: 'white'}}/> : <StopScreenShareRounded style={{color: 'white'}}/>}</IconButton>
                            <IconButton onClick = {() => {
                                jitsiFrame.executeCommand('hangup');
                                jitsiFrame.dispose();
                                setJitsiState(false);
                                setJitsitFrame(null);
                            }}><CallEndRounded style={{color: 'red'}}/></IconButton>
                        </div>
                        <div style = {{marginRight: '10px'}}>
                            <IconButton onClick = {() => {
                                setTileViewEnabled(!tileViewEnabled);
                            jitsiFrame.executeCommand('toggleTileView')}}>{tileViewEnabled ? <ViewComfyRounded style={{color: 'white'}}/> : <PersonRounded style={{color: 'white'}}/>}</IconButton>
                            
                            <IconButton><PeopleRounded onClick={() => {jitsiFrame.executeCommand('toggleFilmStrip');}} style={{color: 'white'}}/></IconButton>
                            <Fragment>
                                <IconButton 
                                    ref={anchorRef}
                                    aria-controls={menuOpen ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleMenuToggle}><MoreVertRounded style={{color: 'white'}}/></IconButton>
                                <Popper open={menuOpen} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleMenuClose}>
                                            <MenuList autoFocusItem={menuOpen} id="menu-list-grow">
                                                <MenuItem onClick={handleFullScreen}>{fullScreenMenu}</MenuItem>
                                                <MenuItem onClick={() => {jitsiFrame.executeCommand('muteEveryone');}}>Mute Everyone</MenuItem>
                                                <MenuItem><DevicesMenu {...allDevices} jitsiApi = {jitsiFrame} /></MenuItem>
                                            </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </Fragment>
                        </div>    
                    </div>
        )
    }

    return (
        <div>
           {!jitsiState ?
                <div style={{height: '30em'}}>
                <div style={divStyle}>
                        <div style = {inputDiv}>
                            <span>Room Name</span>
                            <input style={inputStyle} onChange = {(e)=>{setRoomName(e.target.value)}}></input>
                        </div>
                        <div style = {inputDiv}>
                            <span>User Name &nbsp;</span>
                            <input style={inputStyle} onChange = {(e)=>{setDisplayName(e.target.value)}}></input>
                        </div>
                        <div style = {buttonDiv}>
                            <button style={buttonStyle} onClick = {() => {setJitsiState(true)}}>Join Room</button>
                        </div>
                    </div>
                </div>
                :
                <div id="meetingParent" style={{position: 'relative'}}>
                    <div style={meetStyle} id="meet" onMouseMove ={(e) => {
                        setMouseMoving(true)}}/>
                    {toolbarContent()}
                   
                </div>
           }

        </div>
        
    )
}