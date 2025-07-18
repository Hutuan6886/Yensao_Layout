import React from 'react'
import Image from 'next/image'
interface RecipeCardImageProps {
    imgUrl: string
    alt: string
}
const RecipeCardImage: React.FC<RecipeCardImageProps> = ({ imgUrl, alt }) => {
    return (
        <Image src={imgUrl} width={1200} height={200} sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={alt} className='w-full h-full' />
    )
}

export default RecipeCardImage
