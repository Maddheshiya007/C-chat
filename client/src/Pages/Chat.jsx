import React, { useState, useEffect } from 'react'
import Contacts from '../Components/Contacts'
import './Chat.css'
import CurrentChat from '../Components/CurrentChat'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { ApiGetContacts } from '../Utils/ApiRoutes';

const Chat = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([])
  const [currentChat, setCurrentChat] = useState(undefined)
  const [currentUser, setCurrentUser] = useState(undefined)


  function currentChatHandler(contact) {
    setCurrentChat(contact)

  }


  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login')
    }
    else {
      setCurrentUser(JSON.parse(user))
    }
  }
    , [])

  useEffect(() => {

    const getContacts = async () => {
      if (currentUser) {
        const res = await axios.get(`${ApiGetContacts}/${currentUser._id}`)
        setContacts(res.data.users)
      }
    }
    getContacts()
  }, [currentUser,currentChat])

  return (
    <div className='chat'>
      <div className="chat-container">
        <h2>C-chat</h2>
        <div className="msg-box">
          <Contacts contacts={contacts}
            currentChatHandler={currentChatHandler}
          />
          <CurrentChat currentChat={currentChat} />
        </div>
      </div>
    </div>
  )
}

export default Chat
