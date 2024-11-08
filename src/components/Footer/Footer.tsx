"use client"
import Image from 'next/image'
import React from 'react'

const Footer = () => {
    return (
        <div className='w-full m-auto h-fit mt-[80px] py-[20px] 
                        text-white bg-[#998264]'>
            <div className='w-[90%] md:w-[70%] m-auto flex flex-col gap-2 lg:gap-0'>
                <div className='flex flex-col md:flex-row md:items-center md:justify-start'>
                    <Image src="/images/logo-white-without-bg.png" alt="/images/logo-white-without-bg.png" width={0} height={0} sizes='100vw' className='size-24 md:size-52' />
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-base font-semibold'>Huu Tuan Nest</h3>
                        <p className='text-xs md:text-sm'>Để đảm bảo chất lượng sản phẩm, dịch vụ khách hàng hoàn hảo. Sản phẩm bảo đảm 100% chất lượng, không dùng bất cứ hóa chất nào trong quá trình làm sạch, đóng gói tổ yến và quan trọng hơn cả là tổ yến luôn đạt được độ khô tối đa.</p>
                    </div>
                </div>
                <div className='grid grid-cols-3 lg:grid-cols-4 gap-2 text-xs md:text-sm'>
                    <div className='hidden lg:block lg:col-span-1'>
                        <p >© 2024 Huutuannest，All Right Reserved </p>
                        <p >ICP hosting, Design by Le Huu Tuan </p>
                    </div>
                    <div className='col-span-2 flex flex-col gap-2'>
                        <div> Footer Navbar</div>
                        <div className='flex flex-col gap-1 lg:gap-2'>
                            <div className='flex flex-row gap-1'>
                                <p className='text-nowrap'>Địa chỉ:</p>
                                <p>523a Đỗ Xuân Hợp, Phước Long B, Thủ Đức, Hồ Chí Minh</p>
                            </div>
                            <div className='flex flex-row gap-1'>
                                <p className='text-nowrap'>SĐT:</p>
                                <p>(+84)-353-898-846</p>
                            </div>
                            <div className='flex flex-row gap-1'>
                                <p className='text-nowrap'>Email:</p>
                                <p>Huutuanle6886@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <div className='flex flex-row items-center justify-center'>
                            <Image src="/images/qrcode_sh.png" alt='/qrcode_sh.png' width={0} height={0} sizes='100vw' className='size-20 lg:size-28 cursor-pointer'
                                onClick={() => { }}
                            />
                            <Image src="/images/qrcode_fb.png" alt='/qrcode_fb.png' width={0} height={0} sizes='100vw' className='size-20 lg:size-28 cursor-pointer'
                                onClick={() => { }}
                            />
                        </div>
                    </div>
                </div>
                <div className='block lg:hidden text-xs text-center'>
                    <p >© 2024 Huutuannest，All Right Reserved </p>
                    <p >ICP hosting, Design by Le Huu Tuan </p>
                </div>
            </div>
        </div>
    )
}

export default Footer
