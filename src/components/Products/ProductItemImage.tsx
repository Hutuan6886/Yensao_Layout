'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { ImageType } from '@/types/types'

import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import useSlidingImage from '@/hooks/useSlidingImage'

interface ProductItemImageProps {
    productId: string
    images: ImageType[]
}

const ProductItemImage: React.FC<ProductItemImageProps> = ({ productId, images }) => {
    const { indexImg, previousContentClick, nextContentClick } = useSlidingImage<ImageType>(images, 0)

    return (
        <div className='flex flex-col items-center gap-2 md:gap-4 cursor-pointer'>
            <div className='relative w-full h-full flex flex-row items-center justify-start overflow-hidden'>
                {
                    images.map((image: ImageType) => (
                        <Link href={`/product/${productId}`} key={image.id} className='min-w-full h-full'>
                            <Image unoptimized
                                style={{
                                    translate: `${-indexImg * 100}%`,
                                }}
                                src={image.src} alt={image.src} width={0} height={0} sizes='100vw' className='w-full h-full hover:scale-110 transition-all duration-500' />
                        </Link>
                    ))
                }
                <button type='button' className='absolute top-1/2 left-0 -translate-y-1/2'
                    onClick={previousContentClick}
                ><FaCaretLeft className='text-[#998264] opacity-50 hover:scale-125 hover:opacity-90 transition-all duration-300' size={40} /></button>
                <button type='button' className='absolute top-1/2 right-0 -translate-y-1/2'
                    onClick={nextContentClick}
                ><FaCaretRight className='text-[#998264] opacity-50 hover:scale-125 hover:opacity-90 transition-all duration-300' size={40} /></button>
            </div>
        </div>
    )
}

export default ProductItemImage
