import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRef } from 'react'

function App() {
  const [count, setCount] = useState(0)
  let port = undefined;
  let x = document.getElementById("myAudio"); 
  let audioRef = useRef();

  const connect = async () => {
    port = await navigator.serial.requestPort();

    await port.open({baudRate: 9600})

    console.log(port.getInfo())

    const textDecoder = new TextDecoder();

    while (port.readable) {
      const reader = port.readable.getReader();
      try {
        while (true) {
          const { value, done } = await reader.read();

          if (value) {
            // |reader| has been canceled.
            console.log(textDecoder.decode(value))
            audioRef.current.play();
            
            break;
          }
          // Do something with |value|...
        }
      } catch (error) {
        // Handle |error|...
        console.error(error)
      } finally {
        reader.releaseLock();
      }
    }
  }

  const disconnect = async () => {
    if(port) {
      await port.close();
    }
  }

  return (
    <>
      <button onClick={connect}>Connect</button>
      <button onClick={disconnect}>Disconnect</button>
      <audio id="myAudio" ref={audioRef}>
        <source src="horse.mp3" type="audio/mpeg"/>
      </audio>
    </>
  )
}

export default App
