"use client"
import React, { MouseEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from "framer-motion"
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { IoCloseOutline } from 'react-icons/io5'
import useSize from '@/hooks/useSize'

const fadeInAnimationOpen = {
    invisible: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        opacity: 0,
    }
}

interface ImagePopupProps {
    dataImage: string[]
    imageShowIndex: number
    onClose: () => void
}
const ImagePopup: React.FC<ImagePopupProps> = ({ dataImage, imageShowIndex, onClose }) => {
    //todo: state image slider
    const [posterIndex, setPosterIndex] = useState<number>(imageShowIndex)
    const { clientWidth, clientHeight } = useSize()
    //todo: state zoom image
    const [imageClicked, setImageClicked] = useState<string | null>("") //* image zoom click
    const [position, setPosition] = useState<string>("50% 50%") //* Vị trí zoom click
    const [zoom, setZoom] = useState<number>(1) //* Biến cờ bật zoom hoặc tắt zoom
    const realzoom = zoom === 1 ? "cover" : `${zoom * 100}%`

    const imagePreviousClick = () => {
        if (posterIndex === 0) {
            setPosterIndex(dataImage.length - 1)
        } else {
            setPosterIndex(posterIndex - 1)
        }
    }
    const imageNextClick = () => {
        if (posterIndex === dataImage.length - 1) {
            setPosterIndex(0)
        } else {
            setPosterIndex(posterIndex + 1)
        }
    }

    //todo: Zoom Image
    const zoomInPosition = (e: MouseEvent) => {
        //todo: This will handle the calculation of the area where the image need to zoom in depend
        const zoomer = e.currentTarget.getBoundingClientRect()
        const x = ((e.clientX - zoomer.x) / zoomer.width) * 100
        const y = ((e.clientY - zoomer.y) / zoomer.height) * 100
        setPosition(`${x}% ${y}%`)

    }
    const zoomIn = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setZoom(zoom + 1)       //todo: Zoom to hoặc nhỏ tuỳ thuộc vào giá trị cộng thêm
        setImageClicked(e.currentTarget.getAttribute('src'))
        zoomInPosition(e)
    }
    const zoomOut = (e: MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setZoom(1)
    }
    const handleZoomMove = (e: MouseEvent) => {
        e.preventDefault()
        if (zoom > 1) {
            zoomInPosition(e)
        }
    }
    const handleZoomLeave = (e: MouseEvent) => {
        setZoom(1)
    }

    return (
        <div className='fixed z-20 top-0 left-0 w-full h-full'>
            <div className='relative w-full h-full'>
                <div className='absolute top-0 left-0 
                                w-full h-full bg-black opacity-40'
                    onClick={onClose}
                ></div>
                <motion.div variants={fadeInAnimationOpen} initial="invisible" animate="visible" exit="exit"
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                             ${clientWidth > 666 && clientWidth < 1281 && clientHeight > 359 && clientHeight < 811 ? `w-[30%] h-auto` : 'w-full h-auto md:w-[60%] xl:w-[30%] xl:h-[95%]'} overflow-hidden`}>
                    <div className='w-full h-full relative'>
                        <div className=' absolute z-10 top-2 right-4 w-fit h-fit cursor-pointer hover:scale-90 transition' onClick={onClose}>
                            <IoCloseOutline className='' size={30} />
                        </div>
                        {
                            zoom !== 1 && clientWidth > 1279
                                ? <div style={{
                                    backgroundImage: `url(${imageClicked})`,
                                    backgroundPosition: position,
                                    backgroundSize: realzoom
                                }}
                                    className='w-full h-full cursor-zoom-out'
                                    onClick={zoomOut}
                                    onMouseMove={handleZoomMove}
                                    onMouseLeave={handleZoomLeave}
                                ></div>
                                : <div className={`flex flex-row items-center justify-start overflow-hidden`}>
                                    {
                                        dataImage.map((imgUrl: string, i: number) => (
                                            <Image key={i} src={imgUrl} alt={imgUrl} width={0} height={0} sizes='100vw' className='min-w-full cursor-zoom-in transition-all' style={{
                                                translate: `${-posterIndex * 100}%`,
                                            }}
                                                onClick={zoomIn} />
                                        ))
                                    }
                                </div>
                        }
                        {
                            zoom === 1 && <>
                                <button className='absolute top-0 left-0 w-[10%] h-full group transition-all duration-500'
                                    onClick={imagePreviousClick}
                                >
                                    <div className='relative w-[50%] md:w-full h-full'>
                                        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-10 md:opacity-0 md:group-hover:opacity-20 transition-all duration-500'></div>
                                        <FaChevronLeft className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500' />
                                    </div>
                                </button>
                                <button className='absolute top-0 right-0 w-[10%] h-full group transition-all duration-500'
                                    onClick={imageNextClick}
                                >
                                    <div className='relative w-[50%] translate-x-full md:w-full md:translate-x-0 h-full'>
                                        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-10 md:opacity-0 md:group-hover:opacity-20 transition-all duration-500'></div>
                                        <FaChevronRight className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-500' />
                                    </div>
                                </button></>
                        }
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default ImagePopup
