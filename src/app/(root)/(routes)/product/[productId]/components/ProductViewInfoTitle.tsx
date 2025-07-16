'use client'
import React from 'react'
import Link from 'next/link'

interface ProductViewInfoTitleProps {
  name: string
  categoryId: string
  categoryName: string
}

const ProductViewInfoTitle: React.FC<ProductViewInfoTitleProps> = ({ name, categoryId, categoryName }) => {
  return (
    <div className='flex flex-col gap-3'>
      <h3 className='text-4xl text-[#661a1a] font-extrabold'>{name}</h3>
      <hr className='h-1 border-black' />
      <div className='flex flex-row gap-2 text-sm text-stone-500'>
        <p>Danh mục</p><Link href={`/categories/${categoryId}`} className='text-[#661a1a] font-semibold cursor-pointer hover:text-[#471011]'>{categoryName}</Link>
      </div>
      <hr className='h-1 border-black' />
    </div>
  )
}

export default ProductViewInfoTitle
