import React from 'react'
interface ContactCardProps {
    content: {
        icon: React.ReactElement
        title: string;
        desc: string;
        href?: string
    }[]
}
const ContactCard: React.FC<ContactCardProps> = ({ content }) => {
    return (
        <div className='w-full h-full flex flex-col justify-center gap-2 p-5
                        bg-[#faf7f3]'>
            {content.map((item, i) => (
                <div key={i} className={`w-full flex flex-row items-center justify-start ${item.href ? 'cursor-pointer' : 'cursor-default'}`}>
                    <div className='p-5 text-[#daacb2]'>{item.icon}</div>
                    <div className='text-left'>
                        <h4 className='text-lg font-semibold'>{item.title}</h4>
                        <a href={item.href} target='_blank' rel='noopener noreferrer' className={`text-[#adadad] ${item.href ? 'hover:underline' : ''} transition`}>{item.desc}</a>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ContactCard
