import React from 'react'
import { FaPhone } from 'react-icons/fa'
import { IoGiftOutline, IoPhonePortraitOutline } from 'react-icons/io5'
import { LuStar } from 'react-icons/lu'

const contactItems = [
    {
        icon: <IoPhonePortraitOutline className='size-14 mx-auto border-2 border-black rounded-full p-2' aria-label="Cửa hàng trực tuyến" />,
        title: 'Cửa hàng trực tuyến',
        desc: ['Theo dõi Huu Tuan Nest trên facebook']
    },
    {
        icon: <IoGiftOutline className='size-14 mx-auto border-2 border-black rounded-full p-2' aria-label="Quà tặng đặc biệt" />,
        title: 'Quà tặng đặc biệt',
        desc: [
            'Liên hệ với chúng tôi mua hàng trên facebook,',
            'Bạn có thể nhận được nhiều phần quà bất ngờ.'
        ]
    },
    {
        icon: <LuStar className='size-14 mx-auto border-2 border-black rounded-full p-2' aria-label="Đổi điểm nhận quà" />,
        title: 'Đổi điểm nhận quà',
        desc: [
            'Mỗi hoá đơn trên 1 triệu, bạn nhận được 10 điểm.',
            'Điểm tích luỹ có thể đổi 1 món quà tại cửa hàng.'
        ]
    }
]

const Contact = () => {
    return (
        <div className='w-[75%] m-auto grid grid-cols-4 gap-6'>
            {
                contactItems.map((item, i: number) => (
                    <div key={i} className='col-span-1 flex flex-col gap-3'>
                        {item.icon}
                        <h3 className='text-lg text-center font-semibold'>{item.title}</h3>
                        {
                            item.desc.map((desc, i: number) => (
                                <p key={i} className='text-[#7d7d7d] text-xs text-center'>{desc}</p>
                            ))
                        }
                    </div>
                ))
            }
            <div className='relative col-span-1 flex flex-col gap-3'>
                <div className='relative'>
                    <FaPhone className='size-14 text-[#7d7d7d] mx-auto border-2 border-black rounded-[0.375rem] p-2' />
                    <div className='before:contents-[""] before:absolute before:-bottom-1 before:left-1/2 before:size-2 before:bg-[#faf7f3] before:border-black before:border-l-2 before:border-b-2 before:border-t-transparent before:border-r-transparent before:-rotate-45'></div>
                </div>
                <h3 className='text-lg text-center font-semibold'>Thông tin liên hệ</h3>
                <div className='flex flex-col gap-1'>
                    <p className='text-[#661a1a] text-2xl text-center font-semibold'>0353-898-846</p>
                    <p className='text-[#7d7d7d] text-sm text-center'>Thứ 2 - Chủ nhật</p>
                    <p className='text-[#7d7d7d] text-sm text-center'>8:00 - 18:00</p>
                    <p className='w-[80%] m-auto bg-[#661a1a] text-white text-sm text-center p-2'>Hỗ trợ khách hàng 24/7</p>
                </div>
            </div>
        </div >
    )
}

export default Contact
