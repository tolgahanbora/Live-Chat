import React, { useEffect, useState } from 'react'

function Chat({socket,room,username}) {

const [message, setMessage ] = useState('')
const [messageList, setMessageList ] = useState([])


useEffect(() =>  {
  socket.on('messageReturn',(data) => {
    setMessageList((prev) =>  [...prev, data])
  })
}, [socket])





const sendMessage = async () => {
 const messageContent = {
  username: username,
  room: room,
  message: message,
  date: new Date()
  }
  await socket.emit('message',messageContent)
  setMessageList((prev) =>  [...prev, messageContent])
  setMessage('')
} 
console.log("messageList", messageList)
  return (
    <div className='flex items-center justify-center h-full bg-[#00acee]'>
      <div className='w-1/3 h-[650px]  bg-[#FCFCFC] relative rounded-xl'>
        <div className='w-full h-16  bg-[#dcdcdc] flex items-center p-3'>
          <div className='w-12 h-12 bg-white rounded-full '> </div>
        </div>
        <div className='w-full h-[400px] overflow-auto-y'>
          {
            // eslint-disable-next-line array-callback-return
            messageList && messageList.map((msg, i) => (
              <div className={`${msg.username === username ? 'flex justify-end' : ""} `}>
              <div className={`${msg.username === username ? 'bg-[#DCDCDC]' : "bg-[#1D9BF0]"} 'w-1/2 h-12  text-black text-sm m-3 rounded-xl rounded-br-none p-3'`}>
       
              <div className='p-3'> {msg.message} </div>
              <div className='w-full flex justify-end text-xs'>{msg.username} {msg.date}</div>
              </div>
              </div>
            ))

          }
         
        </div>
        <div className='absolute bottom-0 left-0 w-full'>
          <input value={message} onChange={e => setMessage(e.target.value)} className='w-3/4 h-12 border rounded-xl border-cyan-900' text="text" placeholder='Message' />
          <button onClick={sendMessage} className='w-1/4 border rounded-xl tracking-wider' >Send</button>
        </div>

      </div>
    </div>
  )
}

export default Chat