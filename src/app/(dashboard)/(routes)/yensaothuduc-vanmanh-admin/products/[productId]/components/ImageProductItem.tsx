'use client'
import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { motion } from "framer-motion"
import { IoClose } from 'react-icons/io5'

interface ImageProductItemProps {
    imgUrl: string
    imageIndex: number
    handleDragStart: (imageIndex: number) => void
    onDragEnd: () => void
    onDeleteImage: () => void
    className?: string
}
const ImageProductItem: React.FC<ImageProductItemProps> = ({ imgUrl, imageIndex, handleDragStart, onDragEnd, onDeleteImage, className }) => {

    return (
        <motion.div className={cn(`relative w-fit h-fit rounded-[0.375rem] overflow-hidden cursor-grab active:cursor-grabbing`, className)}
            layout
            draggable
            onDragStart={() => handleDragStart(imageIndex)}
            onDragEnd={onDragEnd}
        >
            <Image src={imgUrl} alt='image-product' width={0} height={0} sizes='100vw' className='size-40 rounded-[0.375rem]' />
            <button type='button' className='absolute top-1 right-1 hover:scale-125 transition'
                onClick={onDeleteImage}
            >
                <IoClose size={18} />
            </button>
        </motion.div>
    )
}

export default ImageProductItem
