/* eslint-disable */
import React, {useState, useRef} from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { MicRounded, SyncAltRounded, ArrowRightAltRounded } from '@material-ui/icons';
import { IconButton } from '@material-ui/core'

const text2Speech = {
    display: 'flex',
    alignItems: 'center',
    margin: '100px',
    marginTop: '100px'
}

const speech2Text = {
    display: 'flex',
    alignItems: 'center',
    margin: '20px',
    justifyContent: 'flex-end',
    flexDirection: 'row-reverse'
}

const TextNSpeech = () => {
    
    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const colors = ['blue', 'green', 'black'];
    const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
    const SpeechRecognition = window.webkitSpeechRecognition
    const SpeechGrammarList = window.webkitSpeechGrammarList
    const SpeechRecognitionEvent = window.webkitSpeechRecognitionEvent
    const recognition = new SpeechRecognition();
    const speechRecognitionList = new SpeechGrammarList();
    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    // recognition.onstart = (e) => {
    //     console.log("speech started",e);
    // }
    recognition.onspeechend = (e) => {
        console.log("speech ended", e);
        recognition.stop();
        setIsRecording(false);
    }
    recognition.onresult = (e) => {
        console.log("Nuvvu vaagindi:",e);
        // console.log(e.results[0][0].transcript);
        textAreaRef.current.value = e.results[0][0].transcript


    }
    recognition.onnomatch = (e) => {
        console.log("No Match!", e);
    }
    recognition.onerror = (e) => {
        console.log("Deep shit", e);
      }

    const textAreaRef = useRef();
    const [t2S, set2S] = useState(true);
    const [isRecording, setIsRecording] = useState(false);

    function listen() {
        // if(t2S) {
        //     const text = textAreaRef.current.value;
        //     if(text) {
        //         const msg = new SpeechSynthesisUtterance(text);
        //         msg.voice = voices[5];
        //         synth.speak(msg); 
        //     }
        // }
        if(isRecording) {
            // recognition.stop();
            // recognition.onspeechend = (e) => {
            //     console.log("Thank you!",e)
            // }
            // setIsRecording(false);
        }
        else {
            recognition.start();
            recognition.onstart = (e) => {
                console.log("Please speak loudly",e);
            }
            setIsRecording(true);
        }
        
    }

    function speak() {
        const msg = new SpeechSynthesisUtterance(textAreaRef.current.value);
        msg.voice = voices[5];
        synth.speak(msg); 
    }

    function flipText2Speech() {
        set2S(!t2S);
        textAreaRef.current.value = '';
    }

    return (
        <div>
            <div style = {t2S ? text2Speech : speech2Text}>
                <IconButton onClick = {listen}><MicRounded/></IconButton>
                <IconButton color="primary" ><ArrowRightAltRounded style={{margin: "20px"}}/></IconButton>  
                <TextareaAutosize ref = {textAreaRef} style ={{width: "500px"}} aria-label="minimum height" rowsMin={10} placeholder="Minimum 3 rows" />
                <IconButton color="primary" ><ArrowRightAltRounded style={{margin: "20px"}}/></IconButton>
                <IconButton onClick = {speak} ><MicRounded/></IconButton>    
            </div>
            
        </div>
    )
}

export default TextNSpeech;