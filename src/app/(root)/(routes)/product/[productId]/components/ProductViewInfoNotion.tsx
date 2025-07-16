"use client"
import { NotionType } from '@/types/types'
import React from 'react'

interface ProductViewInfoNotionProps {
    notion: NotionType[]
}
const ProductViewInfoNotion: React.FC<ProductViewInfoNotionProps> = ({ notion }) => {

    if (notion.length <= 0) return null
    return (
        <div className='flex flex-col gap-3'>
            <hr className='h-1 border-black' />
            {notion.map((notionItem: NotionType) => (
                <div key={notionItem.id}>
                    <p className='inline font-semibold pr-2'>{notionItem.title}</p>
                    <span style={{ whiteSpace: 'pre-line' }}>{notionItem.content}</span>
                </div>
            ))}
            <hr className='h-1 border-black' />
        </div>
    )
}

export default ProductViewInfoNotion
