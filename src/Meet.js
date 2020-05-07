import React, {useState, useEffect} from 'react';

export default function Meet(props) {
    
    let [jitsiState, setJitsiState] = useState(false);
  
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'JitsiMeetWithSaiTeja',
      height: '35em',
      parentNode: ''
    };

    useEffect(() => {
        // Update the document title using the browser API
          if(!jitsiState) {
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
        
      }, [jitsiState, props.divId, options]);

    return (
        <div>
        </div>
    )
}