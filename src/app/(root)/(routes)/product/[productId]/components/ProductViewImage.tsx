"use client"
import { ImageType } from '@/types/types'
import Image from 'next/image'
import { useState } from 'react'

interface ProductViewImageProps {
    images: ImageType[]
}
const ProductViewImage: React.FC<ProductViewImageProps> = ({ images }) => {
    const [imageSelected, setImageSelected] = useState<string>(images[0].src)
    return (
        <div className='col-span-1 w-[80%] m-auto flex flex-col items-start gap-5'>
            <Image src={imageSelected} alt={imageSelected} width={0} height={0} sizes='100vw' className='w-full h-auto' />
            <div className='flex flex-row items-center justify-start gap-3'>
                {images.map((imageItem: ImageType) => (
                    <Image key={imageItem.id} src={imageItem.src} alt={imageItem.src} width={0} height={0} sizes='100vw' className={`size-20 rounded-[50px] p-1 transition cursor-pointer 
                        ${imageSelected === imageItem.src ? 'border border-[#661a1a]' : null}`}
                        onClick={() => setImageSelected(imageItem.src)} />
                ))}
            </div>
        </div>
    )
}

export default ProductViewImage
