import React from 'react'
import dynamic from 'next/dynamic';
import Contact from './components/Contact'
import AboutUsPost from './components/AboutUsPost';
const ContactMap = dynamic(() => import('./components/ContactMap'), {
  ssr: false, // Không render ở server, vô hiệu hóa server-side render, vì leaflet chỉ sử dụng được ở client-side
});

const ContactPage = () => {
    return (
        <div className='w-[90%] m-auto py-10
                        flex flex-col gap-10'>
            <AboutUsPost/>
            <Contact />
            <ContactMap />
        </div>
    )
}

export default ContactPage
