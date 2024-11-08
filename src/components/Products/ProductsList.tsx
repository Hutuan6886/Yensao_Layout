"use client"
import { ProductsType } from '@/types/types'
import React, { useRef, useState } from 'react'
import ProductsItem from './ProductsItem'
import { FaAngleRight, FaChevronRight } from 'react-icons/fa'


interface ProductsListProps {
    dataProductsList: ProductsType[]
}
const ProductsList: React.FC<ProductsListProps> = ({ dataProductsList }) => {
    const [isHoverIconSeeMore, setIsHoverIconSeeMore] = useState<boolean>(false)
    const iconSeeMore = useRef<HTMLSpanElement>(null)
    return (
        <div className='w-full h-auto flex flex-col items-center gap-[20px]'>
            <div className='w-[90%] m-auto grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 sm:gap-4'>
                {dataProductsList.map((product: ProductsType, i: number) => (
                    <div key={i} className='col-span-1'>
                        <ProductsItem dataProduct={product} />
                    </div>
                ))}
            </div>
            <button className='relative w-fit m-auto flex flex-col gap-1 
                            text-zinc-500 italic
                            group'
                onMouseEnter={() => setIsHoverIconSeeMore(true)}
                onMouseLeave={() => setIsHoverIconSeeMore(false)}
            >
                <div className='flex flex-row items-center justify-center gap-2 
                                italic text-nowrap
                                group-hover:not-italic transition ease-in-out duration-300'>
                    Xem thêm
                    <div style={{
                        width: isHoverIconSeeMore ? iconSeeMore.current?.offsetWidth || 0 : 0,
                        opacity: isHoverIconSeeMore ? 1 : 0,
                        translate: isHoverIconSeeMore ? "0" : "-10px",
                        transition: '.2s ease-out'
                    }}>
                        <span ref={iconSeeMore}><FaChevronRight size={8} /></span>
                    </div>
                </div>
                <hr className=' w-0 h-0
                                before:contents-[""] before:absolute before:bottom-0 before:left-0 before:w-[0%] before:border before:border-transparent before:transition-all before:ease-in-out before:duration-300
                                group-hover:before:w-[100%] group-hover:before:border-[#998264] '/>

            </button>
        </div>
    )
}

export default ProductsList
