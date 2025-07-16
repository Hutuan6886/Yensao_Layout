"use client"
import { formatterCurrency } from '@/lib/utils'
import React from 'react'

interface DiscountPriceProps {
    price: number
}
const DiscountPrice: React.FC<DiscountPriceProps> = ({ price }) => {
    return (
        <div className='relative w-fit h-fit'>
            <hr className='w-full border-1
                            absolute top-1/2 left-0 rotate-[-7deg]
                            border-1 border-zinc-500'/>
            <p className='text-xs md:text-base text-zinc-500'>{formatterCurrency.format(price)}</p>
        </div>
    )
}

export default DiscountPrice
