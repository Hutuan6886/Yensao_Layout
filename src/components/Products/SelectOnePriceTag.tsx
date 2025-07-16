'use client'
import React, { useState } from 'react'
import { formatterCurrency } from '@/lib/utils'
import { PriceType, ProductType } from '@/types/types'
import CheckboxTag from '../Checkbox/CheckboxTag'
import DiscountPrice from '../ui/DiscountPrice'
import Link from 'next/link'

interface SelectOnePriceTagProps {
    product: ProductType
    prices: PriceType[]
}
const SelectOnePriceTag: React.FC<SelectOnePriceTagProps> = ({ product, prices }) => {
    const [priceOfMassSelected, setPriceOfMassSelected] = useState<PriceType>(prices[0])
    return (
        <>
            <Link href={`/${product.id}`}>
                <h3 className='text-sm md:text-base text-center font-semibold'>{product.title} {priceOfMassSelected.Mass.value}g</h3>
            </Link>
            <div className='flex flex-row items-center justify-center gap-2'>
                {prices.filter((item) => item.regularPrice !== 0).map((price: PriceType) => (
                    <CheckboxTag key={price.Mass.id} label={`${price.Mass.value}g`} value={price.Mass.id} checked={priceOfMassSelected.Mass.id === price.Mass.id ? true : false} onChange={() => setPriceOfMassSelected(price)} />
                ))}
            </div>
            <div className='flex flex-row items-center gap-3'>
                <p className='text-lg md:text-xl tracking-[0.1rem] font-bold text-black'>{formatterCurrency.format(priceOfMassSelected.regularPrice)}</p>
                {priceOfMassSelected.discountPrice ? <DiscountPrice price={Number(priceOfMassSelected.regularPrice) + Number(priceOfMassSelected.discountPrice)} /> : null}
            </div>
        </>
    )
}

export default SelectOnePriceTag
