"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

import useWindowSize from '@/hooks/useWindowSize'
import { CarouselType } from '@/types/types'

import { FaAngleLeft, FaAngleRight, FaChevronRight } from 'react-icons/fa'


interface CarouselProps {
    dataCarousel: CarouselType[]
    isAutoSlide: boolean
    autoSlideInterval?: number
}
const Carousel: React.FC<CarouselProps> = ({ dataCarousel, isAutoSlide, autoSlideInterval }) => {
    const [indexImg, setIndexImg] = useState<number>(0)
    const [isHoverButton, setIsHoverButton] = useState<boolean>(false)

    //todo: state width screen
    const clientScreenWidth = useWindowSize()
    const [clientWidth, setClientWidth] = useState<number>(0)
    useEffect(() => {
        if (clientScreenWidth) {
            setClientWidth(clientScreenWidth)
        }
    }, [clientScreenWidth])

    const previousClick = () => {
        if (indexImg === 0) {
            setIndexImg(dataCarousel.length - 1)
        } else {
            setIndexImg(indexImg - 1)
        }
    }
    const nextClick = () => {
        if (indexImg === dataCarousel.length - 1) {
            setIndexImg(0)
        } else {
            setIndexImg(indexImg + 1)
        }
    }

    //todo: auto slider
    useEffect(() => {
        if (!isAutoSlide) return
        const slideInterval = setInterval(nextClick, autoSlideInterval)

        return () => clearInterval(slideInterval)
    })

    return (
        <div className={`w-full h-fit border`}>
            <div className='relative w-full h-fit'>
                <div className='flex flex-row items-center justify-start overflow-hidden'>
                    {
                        dataCarousel.map((carouselItem: CarouselType, i: number) => (
                            <div key={i} className='relative min-w-full h-[430px] transition-all duration-500'
                                style={{
                                    translate: `${-100 * indexImg}%`,
                                }} >
                                <div className='absolute top-0 right-0 
                                w-full h-full bg-black opacity-50'></div>
                                <Image src={carouselItem.imgUrl} alt={carouselItem.imgUrl}
                                    className='w-full h-full' width={0} height={0} sizes="100vw" />
                                <div className={`absolute  ${clientWidth > 769 ? i % 2 === 0 ? "w-[60%] top-[2rem] left-1/4 -translate-x-1" : " w-[40%] top-[2rem] left-1/2 -translate-x-1" : "w-[90%] top-1/4 left-1/2 -translate-x-1/2"}`}>
                                    <div className={`flex flex-col gap-3`}>
                                        <h3 className='text-xl md:text-2xl lg:text-4xl text-white font-bold'>{carouselItem.title}</h3>
                                        <p className='text-sm md:text-base text-white'>{carouselItem.desc}</p>
                                        <button className=' relative flex flex-row items-center justify-center gap-2 w-fit h-fit px-6 py-2 border border-white text-white text-sm md:text-base
                                                            before:contents-[""] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-[#c58c37] before:-z-10 before:transition-all before:duration-500
                                                            hover:before:w-full'
                                            onMouseEnter={() => setIsHoverButton(true)}
                                            onMouseLeave={() => setIsHoverButton(false)}
                                        >
                                            Khám Phá
                                            {isHoverButton
                                                && <motion.div
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                >
                                                    <FaChevronRight size={10} />
                                                </motion.div>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {
                    clientWidth > 769
                        ? <>
                            <button className=' absolute top-1/2 left-12 -translate-y-1/2
                                    flex flex-row items-center justify-center
                                   bg-white opacity-60 border size-12 hover:scale-95 hover:text-[#c58c37] transition-all'
                                onClick={previousClick}
                            ><FaAngleLeft /></button>
                            <button className=' absolute top-1/2 right-12 -translate-y-1/2 
                                    flex flex-row items-center justify-center
                                   bg-white opacity-60 border size-12 hover:scale-95 hover:text-[#c58c37] transition-all'
                                onClick={nextClick}
                            ><FaAngleRight /></button>
                        </>
                        : <div className='absolute bottom-1 left-1/2 -translate-x-1/2
                                            flex flex-row items-center justify-center gap-2'>
                            {
                                dataCarousel.map((_, i: number) => (
                                    <div key={i} className={`w-[12px] h-[12px] bg-white border rounded-[50px] ${indexImg === i ? "opacity-70" : "opacity-40"}`}
                                        onClick={() => setIndexImg(i)}
                                    ></div>
                                ))
                            }
                        </div>
                }

            </div>
        </div>
    )
}

export default Carousel
