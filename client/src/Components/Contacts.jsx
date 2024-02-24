import React, { useEffect } from 'react'
import './Contacts.css'

const Contacts = ({ contacts, currentChatHandler }) => {

  return (
    <div className='contacts'>
      <h2>Contacts</h2>
      <div className='contact-list'>
        {contacts.map(contact => (
          <div key={contact._id} className='contact'
            onClick={() => {
              currentChatHandler(contact);
            }}
          >
            <div className='img'>
              <img src={contact.avatar?.secure_url} alt="" />
            </div>
            <p>{contact.username}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Contacts
