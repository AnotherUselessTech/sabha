import React, {useState, useEffect} from 'react';

const inputStyle = {
    width:'40%',
    lineHeight: 2.5,
    borderRadius: '4px',
    border: '1px solid green',
    padding: '5px',
    backgroundColor:'#dcf4d1'
}

const buttonStyle = {
    marginLeft: '10px',
    backgroundColor: 'deepskyblue',
    lineHeight: 2.5,
    fontSize: 'medium',
    borderRadius: '4px'
}

export default function Meet(props) {
    
    let [jitsiState, setJitsiState] = useState(false);
    let [roomName, setRoomName] = useState('');
  
    const domain = 'meet.jit.si';
    const options = {
      roomName: roomName,
      height: '35em',
      parentNode: ''
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
        <div style={{height: '35em'}}>
            {!jitsiState && <div style={{padding: '20%'}}>
                    <input style={inputStyle} onChange = {(e)=>{setRoomName(e.target.value)}}></input>
                    <button style={buttonStyle} onClick = {() => {setJitsiState(true)}}>Set Room Name</button>
                </div>}
        </div>
    )
}