import React from 'react'
import './CurrentChat.css'



const CurrentChat = ({ currentChat }) => {

  return (
    <div>
      <div className="current-chat-box">
        {currentChat ? (
          <div className=''>
            <div className='current-chat'>
            <div className='img'>
              <img src={currentChat.avatar?.secure_url} alt="" />
            </div>
            <h1>{currentChat.username}</h1>
            </div>
            <div className="messag-box">
              
                  <h1>Hi</h1>
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
