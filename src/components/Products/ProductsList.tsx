"use client"
import React from 'react'

import { cn } from '@/lib/utils'
import { ProductsType } from '@/types/types'

import ProductsItem from './ProductsItem'
import Pagination from '@/components/Pagination/Pagination'
import SeemoreButton from '@/components/SeemoreButton/SeemoreButton'


interface ProductsListProps {
    dataProductsList: ProductsType[]
    seeMoreButton: boolean
    className?: string
}
const ProductsList: React.FC<ProductsListProps> = ({ dataProductsList, seeMoreButton, className }) => {

    return (
        <div className={cn('w-full h-auto flex flex-col items-center gap-[30px]', className)}>
            <div className='w-full m-auto grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4'>
                {dataProductsList.map((product: ProductsType, i: number) => (
                    <div key={i} className='col-span-1'>
                        <ProductsItem dataProduct={product} />
                    </div>
                ))}
            </div>
            {
                seeMoreButton
                    ? <SeemoreButton />
                    : <Pagination />
            }
        </div>
    )
}

export default ProductsList
