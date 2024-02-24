import React, { useState, useEffect } from 'react'
import './CurrentChat.css'



const CurrentChat = ({ currentChat }) => {
  const [msg, setMsg] = useState('')

  useEffect(() => {
    if (currentChat) {
      console.log(currentChat)
    }
  }, [currentChat])


  return (
    <div>
      <div className="current-chat-box">
        {currentChat ? (
          <div className='msg-container'>
            <div className='current-chat'>
              <div className='img'>
                <img src={currentChat.avatar?.secure_url} alt="" />
              </div>
              <h1>{currentChat.username}</h1>
            </div>
            <div className="messag-box">

              <h1>Hi !</h1>
            </div>
            <div className='msg-box2'>
              <input type="text" value={msg} onChange={(e) => {
                setMsg(e.target.value)
              }} placeholder="Type a message" />
              <button className='send-btn'>Send</button>
            </div>
          </div>
        ) : (
          <div>
            <p className='no-chat-selected'>No chat selected</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrentChat
