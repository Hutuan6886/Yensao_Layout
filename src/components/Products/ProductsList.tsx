'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { ProductType } from '@/types/types'
import ProductItem from './ProductItem'
import Pagination from '@/components/Pagination/Pagination'
import SeemoreButton from '@/components/SeemoreButton/SeemoreButton'
import { useRouter } from 'next/navigation'
import useMounted from '@/hooks/useMounted'


interface ProductsListProps {
    dataProductsList: ProductType[]
    totalProducts?: number
    typeProductsList?: "promotion" | "best-selling" | "new-arrivals" | "popular",
    seeMoreButton?: {
        href: string
    }
    className?: string
}
const ProductsList: React.FC<ProductsListProps> = ({ dataProductsList, typeProductsList, totalProducts, seeMoreButton, className }) => {
    const mounted = useMounted()

    const router = useRouter()
    if (!dataProductsList || dataProductsList.length < 1) {
        return null
    }
    console.log('dataProductsList', dataProductsList)
    if (!mounted) {
        return null
    }
    return (
        <div className={cn('w-full h-auto flex flex-col items-center gap-[30px]', className)}>
            <div className='w-full m-auto grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 '>
                {dataProductsList.map((product: ProductType) => (
                    <div key={product.id} className='col-span-1'>
                        <ProductItem product={product} typeProductsList={typeProductsList} />
                    </div>
                ))}
            </div>
            {totalProducts ? <Pagination totalProducts={totalProducts} /> : null}
            {seeMoreButton ? <SeemoreButton label='Xem thêm' onClick={() => router.push(seeMoreButton.href)} /> : null}
        </div>
    )
}

export default ProductsList
