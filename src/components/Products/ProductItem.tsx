'use client'
import React from 'react'

import { ProductType } from '@/types/types'

import ProductItemImage from './ProductItemImage'
import ProductItemContent from './ProductItemContent'

interface ProductItemProps {
    product: ProductType
    typeProductsList?: "promotion" | "best-selling" | "new-arrivals" | "popular"
}
const ProductItem: React.FC<ProductItemProps> = ({ product, typeProductsList }) => {


    if (!product) {
        return null
    }

    return (
        <div className='w-full md:w-[90%] h-auto m-auto'>
            <div className='flex flex-col gap-3 md:gap-5'>
                <ProductItemImage productId={product.id} images={product.image} />
                <ProductItemContent product={product} typeProductsList={typeProductsList} />
            </div>
        </div>
    )
}

export default ProductItem
