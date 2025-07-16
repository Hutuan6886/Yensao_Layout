'use client'
import React from 'react'
import Image from 'next/image'

import { CarouselType } from '@/types/types'

import ButtonPoster from '../ui/ButtonPoster'

interface CarouselContentProps {
    carouselData: CarouselType[]
    indexImg: number
    clientWidth: number
}
const CarouselContent: React.FC<CarouselContentProps> = ({ carouselData, indexImg, clientWidth }) => {

    return (
        <div className='flex flex-row items-center justify-start overflow-hidden'>
            {
                carouselData.map((carouselItem: CarouselType, i: number) => (
                    <div key={i} className='relative min-w-full h-[430px] transition-all duration-500'
                        style={{
                            translate: `${-100 * indexImg}%`,
                        }} >
                        <div className='absolute top-0 right-0 
                                        w-full h-full bg-black opacity-50'></div>
                        <Image src={carouselItem.imgUrl} alt={carouselItem.imgUrl}
                            className='w-full h-full' width={0} height={0} sizes="100vw" />
                        <div className={`absolute  ${clientWidth > 769 ? i % 2 === 0 ? "w-[60%] top-[2rem] left-1/4 -translate-x-1" : " w-[40%] top-[2rem] left-1/2 -translate-x-1" : "w-[90%] top-1/4 left-1/2 -translate-x-1/2"}`}>
                            <div className={`flex flex-col gap-8`}>
                                <h3 className='text-xl md:text-2xl lg:text-4xl text-[#ebe2d9] font-bold'>{carouselItem.title}</h3>
                                <p className='text-sm md:text-base text-zinc-200'>{carouselItem.desc}</p>
                                {/* <button className='w-[140px] flex flex-row justify-between border border-zinc-200 group hover:border-[#f0bc80] hover:bg-[#f0bc80] transition duration-150'><p className='text-xs text-zinc-200 px-2 py-1 group-hover:text-white'>+</p><p className='text-xs text-zinc-200 px-2 py-1 group-hover:text-white'
                                                    onClick={() => { router.push('/products') }}
                                                >Xem Thêm</p></button> */}
                                <ButtonPoster className='border-[#998264] bg-[#998264] before:bg-[#ffffff15] hover:bg-transparent'>
                                    KHÁM PHÁ
                                </ButtonPoster>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default CarouselContent
