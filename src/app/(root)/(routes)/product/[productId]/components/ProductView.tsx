'use client'
import React from 'react'
import { ProductType } from '@/types/types'

import ProductViewImage from './ProductViewImage'
import ProductViewInfo from './ProductViewInfo'
import ProductViewDesc from './ProductViewDesc'

import BannerLine from '@/components/ui/BannerLine'
interface ProductViewProps {
    product: ProductType
}
const ProductView: React.FC<ProductViewProps> = ({ product }) => {
    return (
        <div className='w-full h-full flex flex-col gap-14'>
            <div className='grid grid-cols-2 gap-5'>
                <ProductViewImage images={product.image} />
                <ProductViewInfo productData={product} />
            </div>
            <BannerLine />
            <ProductViewDesc productDescriptionList={product.desc} />
        </div >
    )
}

export default ProductView
