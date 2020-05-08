import React, {useState, useEffect} from 'react';

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

export default function Meet(props) {
    
    let [jitsiState, setJitsiState] = useState(false);
    let [roomName, setRoomName] = useState('');
    let [displayName, setDisplayName] = useState('Fellow Jitser');
  
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomName,
      height: '35em',
      parentNode: '',
      userInfo: {
          displayName
      }
    };

    useEffect(() => {
        // Update the document title using the browser API
          if(jitsiState && roomName) {
            // const script = document.createElement("script");
            // script.src = "https://meet.jit.si/external_api.js";
            // script.async = false;
            // script.onload = () => {
    
              console.log("************************\n" + document.getElementById(props.divId));
              const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
              setJitsiState(true);
              options.parentNode = document.getElementById(props.divId);
              // setJitsiParentNode(document.getElementById('meet'));
              console.log(window.JitsiMeetExternalAPI);
              new JitsiMeetExternalAPI(domain, options);
    
            // };
    
            // document.body.appendChild(script);
          }
        //   else {
        //     console.log("Second mount!");
        //     const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
        //     new JitsiMeetExternalAPI(domain, options);
        //   }
        
      }, [jitsiState,options,props.divId,roomName]);

    return (
        <div>
           {!jitsiState && 
                <div style={{height: '35em'}}>
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
           }
        </div>
        
    )
}