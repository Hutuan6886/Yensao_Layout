'use client'
import { NotionItemDragDropActiveType } from '@/types/types'
import React, { useState, DragEvent } from 'react'
import { MdOutlineDragIndicator } from 'react-icons/md'

interface TableDropProps {
    index: number
    itemActive: NotionItemDragDropActiveType | undefined
    handleDrop: (index: number) => void
}

const TableDrop: React.FC<TableDropProps> = ({ index, itemActive, handleDrop }) => {
    const [isShowDrop, setIsShowDrop] = useState<boolean>(false)

    if (!itemActive) return null
    console.log("itemActive", itemActive.height);

    return (
        <div className={`w-full
                        ${!isShowDrop ? "opacity-0 size-0" : `opacity-100 h-[${itemActive.height}px]`} transition-all
                        ${itemActive.index === index || itemActive.index - 1 === index ? "hidden" : "block"}`}
            onDragEnter={() => setIsShowDrop(true)}
            onDragExit={() => setIsShowDrop(false)}
            onDragOver={(e: DragEvent<HTMLDivElement>) => e.preventDefault()}
            onDrop={(e: DragEvent<HTMLDivElement>) => {
                e.preventDefault()
                handleDrop(index)
                setIsShowDrop(false)
            }}>
            <div className={`flex flex-row items-start justify-start gap-1 
                            border rounded-[0.375rem]`}>
                <div className='flex flex-row items-center justify-start gap-1'>
                    <MdOutlineDragIndicator size={17} className='cursor-grab' />
                    <h3 className='font-semibold text-nowrap'>{itemActive.title}</h3>
                </div>
                {/* //* style={{ whiteSpace: 'pre-line' }} render text with break paragraph */}
                <p style={{ whiteSpace: 'pre-line' }}>{itemActive.content}</p>
            </div>
        </div >
    )
}

export default TableDrop
