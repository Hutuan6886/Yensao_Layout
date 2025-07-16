'use client'
import React from 'react'
import Image from 'next/image'

import { DescriptionType } from '@/types/types'

interface ProductViewDescProps {
    productDescriptionList: DescriptionType[]
}

const ProductViewDesc: React.FC<ProductViewDescProps> = ({ productDescriptionList }) => {
    return (
        <div className='w-[80%] m-auto flex flex-col gap-8'>
            {productDescriptionList.map((descriptionItem: DescriptionType) => (
                <div key={descriptionItem.id} className='flex flex-col gap-5'>
                    <h5 className='text-lg text-[#661a1a] font-semibold'>{descriptionItem.title}</h5>
                    <div className='w-[95%] m-auto flex flex-col gap-5'>
                        {descriptionItem.imgUrl && <Image src={descriptionItem.imgUrl} alt={descriptionItem.imgUrl} width={0} height={0} sizes='100vw' className='w-auto m-auto h-auto' />}
                        <p style={{ whiteSpace: 'pre-line' }}>{descriptionItem.content}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductViewDesc
