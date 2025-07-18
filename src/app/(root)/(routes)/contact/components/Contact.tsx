import React from 'react'
import ContactCard from './ContactCard'
import { contact } from './services/contact-data'

const Contact = () => {
  return (
    <div className={`grid grid-cols-${contact.length} gap-8`}>
      {contact.map((item, i) => (
        <div key={i} className='w-full col-span-1'>
          <ContactCard content={item.content} />
        </div>
      ))}
    </div>
  )
}

export default Contact
