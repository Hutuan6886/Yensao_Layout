'use client'
import React, { useState } from 'react'
import Image from 'next/image'

import { ProductsType } from '@/types/types'
import { formatter } from '@/libs/utils'
import ButtonPoster from '../ui/ButtonPoster'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'
import DiscountPrice from '../ui/DiscountPrice'

interface ProductsItemProps {
    dataProduct: ProductsType
}
const ProductsItem: React.FC<ProductsItemProps> = ({ dataProduct }) => {
    const [posterIndex, setPosterIndex] = useState<number>(0)

    const previousImageClick = () => {
        if (posterIndex === 0) {
            setPosterIndex(dataProduct.imgUrl.length - 1)
        } else {
            setPosterIndex(posterIndex - 1)
        }
    }
    const nextImageClick = () => {
        if (posterIndex === dataProduct.imgUrl.length - 1) {
            setPosterIndex(0)
        } else {
            setPosterIndex(posterIndex + 1)
        }
    }

    const clickProduct = () => {
        console.log("click product", dataProduct.id);
    }
    return (
        <div className='w-full md:w-[90%] h-auto m-auto'>
            <div className='flex flex-col gap-3 md:gap-5'>
                <div className='flex flex-col items-center gap-2 md:gap-4 cursor-pointer'
                    onClick={clickProduct}
                >
                    <div className='relative w-full h-full flex flex-row items-center justify-start overflow-hidden'>
                        {
                            dataProduct.imgUrl.map((imgUrl: string, i: number) => (
                                <Image
                                    style={{
                                        translate: `${-posterIndex * 100}%`,
                                    }}
                                    key={i} src={imgUrl} alt={imgUrl} width={0} height={0} sizes='100vw' className='min-w-full h-auto hover:scale-110 transition-all duration-500' />
                            ))
                        }
                        <button type='button' className='absolute top-1/2 left-0 -translate-y-1/2'
                            onClick={previousImageClick}
                        ><FaCaretLeft className='text-[#c58c37] opacity-40 hover:scale-125 hover:opacity-50 transition-all duration-300' size={40} /></button>
                        <button type='button' className='absolute top-1/2 right-0 -translate-y-1/2'
                            onClick={nextImageClick}
                        ><FaCaretRight className='text-[#c58c37] opacity-40 hover:scale-125 hover:opacity-50 transition-all duration-300' size={40} /></button>
                    </div>
                    <h3 className='text-sm md:text-base text-[#c58c37] text-center font-semibold'>{dataProduct.title}</h3>
                </div>
                <div className='flex flex-col items-center gap-2 md:gap-4'>
                    <div className='flex flex-col items-center gap-1'>
                        <p className='text-lg md:text-xl tracking-[0.1rem] font-bold text-black'>{formatter.format(dataProduct.regularPrice)}</p>
                        <DiscountPrice price={2000000} />
                    </div>
                    <ButtonPoster className="text-sm md:text-base text-[#c58c37] border-[#c58c37] hover:text-white transition duration-300">Mua ngay</ButtonPoster>
                </div>
            </div>
        </div>
    )
}

export default ProductsItem
