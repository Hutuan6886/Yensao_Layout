'use client'
import React from 'react'

interface ImageProductDropProps {
    dropIndex: number
}

const ImageProductDrop: React.FC<ImageProductDropProps> = ({ dropIndex }) => {
    return (
        <div id="drop" data-before={dropIndex}
            className={`relative w-1 h-40 opacity-0 bg-sky-500 rounded-[0.375rem] mx-1 transition`} />
    )
}

export default ImageProductDrop
