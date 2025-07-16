"use client"
import React from 'react'

import dynamic from 'next/dynamic'

import { ProductType } from '@/types/types'

import ProductViewInfoTitle from './ProductViewInfoTitle'
import ProductViewInfoPriceOfMass from './ProductViewInfoPriceOfMass'
import ProductViewInfoNotion from './ProductViewInfoNotion'

const ButtonPoster = dynamic(() => import('@/components/ui/ButtonPoster'))

interface ProductViewInfoProps {
    productData: ProductType
}

const ProductViewInfo: React.FC<ProductViewInfoProps> = ({ productData }) => {
    return (
        <div className='col-span-1 flex flex-col gap-8'>
            <ProductViewInfoTitle name={productData.title} categoryId={productData.Category.id} categoryName={productData.Category.name} />
            <div className='flex flex-col gap-5'>
                <ProductViewInfoPriceOfMass prices={productData.price} />
                <ButtonPoster className="text-sm md:text-base border-[#471011] bg-[#471011] before:bg-[#ffffff15] before:z-0 duration-300">Mua ngay</ButtonPoster>
            </div>
            <ProductViewInfoNotion notion={productData.notion} />
        </div>
    )
}

export default ProductViewInfo

