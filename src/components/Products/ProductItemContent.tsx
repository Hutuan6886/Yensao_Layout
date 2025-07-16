'use client'
import React from 'react'
import ButtonPoster from '@/components/ui/ButtonPoster'
import { PriceType, ProductType } from '@/types/types'
import SelectOnePriceTag from './SelectOnePriceTag'

interface ProductItemContentProps {
    product: ProductType
    typeProductsList?: "promotion" | "best-selling" | "new-arrivals" | "popular"
}
const ProductItemContent: React.FC<ProductItemContentProps> = ({ product, typeProductsList }) => {
    let prices: PriceType[]
    switch (typeProductsList) {
        case "promotion":
            prices = product.price.filter((item) => item.regularPrice !== 0 && item.discountPrice !== 0).sort((a, b) => a.Mass.value - b.Mass.value)
            break;
        default:
            prices = product.price.sort((a, b) => a.Mass.value - b.Mass.value)
            break;
    }

    return (
        <div className='flex flex-col items-center gap-2 md:gap-4'>
            <SelectOnePriceTag prices={prices} product={product} />
            <ButtonPoster className="text-sm md:text-base text-[#471011] border-[#471011] hover:text-white transition duration-300">Mua ngay</ButtonPoster>
        </div>
    )
}

export default ProductItemContent
