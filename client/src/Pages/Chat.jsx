import React, {useState,useEffect} from 'react'
import Contacts from '../Components/Contacts'
import './Chat.css'
import CurrentChat from '../Components/CurrentChat'
// import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Chat = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({})
  const [currentChat, setCurrentChat] = useState({})

useEffect(() => {
  const user = localStorage.getItem('user');
  if (!user) {
    navigate('/login')
  }
  const getChatData = async () => {
    const response = await fetch('/api/chat')
    const data = await response.json()
    setCurrentChat(data)
  }
  getChatData()
}
, [])

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUserData(data)
    }
    getUserData()
  }, [])

  return (
    <div className='chat'>
      <div className="chat-container">
        <h2>C-chat</h2>
        <div className="msg-box">
        <Contacts Contacts={userData} />
        <CurrentChat CurrentChat={currentChat}/>
        </div>
      </div>
    </div>
  )
}

export default Chat
