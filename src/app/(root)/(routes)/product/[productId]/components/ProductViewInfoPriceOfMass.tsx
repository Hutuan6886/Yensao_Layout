'use client'
import React, { ChangeEvent, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { formatterCurrency } from '@/lib/utils'
import { PriceType } from '@/types/types'

const CheckboxTag = dynamic(() => import('@/components/Checkbox/CheckboxTag'))
const DiscountPrice = dynamic(() => import('@/components/ui/DiscountPrice'))

interface ProductViewInfoPriceOfMassProps {
    prices: PriceType[]
}

const ProductViewInfoPriceOfMass: React.FC<ProductViewInfoPriceOfMassProps> = ({ prices }) => {
    const [priceOfMassSelected, setPriceOfMassSelected] = useState<PriceType | undefined>()
    const arrayPrice = useMemo(() => prices.filter((priceItem: PriceType) => priceItem.regularPrice !== 0).sort((a, b) => a.Mass.value - b.Mass.value), [prices])
    return (
        <>
            {priceOfMassSelected
                ? <div className='flex flex-row gap-3'>
                    {priceOfMassSelected.discountPrice && priceOfMassSelected.discountPrice !== 0
                        ? <div className='flex flex-row items-start justify-start gap-3'>
                            <p className='text-4xl font-semibold'>{formatterCurrency.format(priceOfMassSelected.regularPrice - priceOfMassSelected.discountPrice)}</p>
                            <DiscountPrice price={priceOfMassSelected.regularPrice} />
                        </div>
                        : <p className='text-4xl font-semibold'>{formatterCurrency.format(priceOfMassSelected.regularPrice)}</p>}
                </div>
                : <p className='text-4xl font-semibold'>{formatterCurrency.format(arrayPrice[0].regularPrice)} - {formatterCurrency.format(arrayPrice[arrayPrice.length - 1].regularPrice)}</p>
            }
            <div className='flex flex-row items-center justify-start gap-5'>
                {arrayPrice.map((priceItem: PriceType) => (
                    priceItem.Mass.value !== 0 && <CheckboxTag key={priceItem.id} label={`${priceItem.Mass.value}g`} value={priceItem.Mass.id} checked={priceOfMassSelected?.Mass.id === priceItem.Mass.id} onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.value === priceOfMassSelected?.Mass.id) {
                            setPriceOfMassSelected(undefined)
                        } else {
                            setPriceOfMassSelected(priceItem)
                        }
                    }} />
                ))}
            </div>
        </>
    )
}

export default ProductViewInfoPriceOfMass
