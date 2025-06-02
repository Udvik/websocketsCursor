import useWebSocket from 'react-use-websocket';
import {useEffect,useRef} from 'react';
import throttle from 'lodash.throttle';
import {Cursor} from './components/Cursor.jsx'

const rendorCursors = users => (
  Object.keys(users).map((uuid) => {
    const user = users[uuid];
    return (<Cursor key={uuid} point={[user.state.x,user.state.y]}/> )
  })
)

const rendorUsers = users => {
  return (
    <ul>
      {Object.keys(users).map((uuid) => {
        const user = users[uuid];
        return (<li key={uuid}>{user.username} - {user.state.x}, {user.state.y}</li>)
      })}
    </ul>
  )
}

export function Home({username}){
    const WS_URL = 'ws://localhost:8000'
    const {sendJsonMessage, lastJsonMessage} = useWebSocket(WS_URL,{queryParams:{username}})

    const throttleMs = 50
    const sendJsonMessageThreshold = useRef(throttle(sendJsonMessage,throttleMs))

    useEffect(() => {
      sendJsonMessage({
        x:0,
        y:0
      })
      window.addEventListener('mousemove', (e) => {
        const message = {
          x: e.clientX,
          y: e.clientY
        }
        sendJsonMessageThreshold.current(message)
      })
    },[])

    if(lastJsonMessage) {
      return <> 
      {rendorCursors(lastJsonMessage)}
      {rendorUsers(lastJsonMessage)}
      </>
    }

    return 
  
}
