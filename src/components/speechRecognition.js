
import store from '@/store';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
if (!SpeechRecognition) {
    console.log('The current browser do not support Speech Recognition')
}

const recognition = new SpeechRecognition()

recognition.lang = 'en-US'
recognition.continuous = true
recognition.interimResults = true

let transcript = ''


// Start Recognition

let startRecognition = function(){
    try{
        recognition.start()
    }catch (e) {
        console.log(e.message)
    }
}

// Stop Recognition

let stopRecognition = function(){
    try{
        recognition.stop()
    }catch (e) {
        console.log(e.message)
    }
}

// OnStart Event
// Triggered when recognition.start() is called.

recognition.onstart = function(){
    console.log("Recognition Started")
}

// OnEnd Event
// Triggered when recognition.stop() is called

recognition.onend = function (){
    console.log("Recognition Ended")
    //startRecognition()
}

// OnResult Event
// Triggers when audio is started

recognition.onresult = (event) => {
    let spResult = event.results[event.resultIndex];
    transcript = event.results[event.results.length - 1][0].transcript;
    if(spResult.isFinal){
        console.log(transcript)
        store.commit('updateUserSpeech', transcript)

    }
}


export {startRecognition}
export {stopRecognition}
