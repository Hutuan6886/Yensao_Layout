'use client'
import React, { useRef } from 'react'
import { NotionItemDragDropActiveType, NotionType } from '@/types/types'
import { MdOutlineDragIndicator } from 'react-icons/md'

interface NotionItemTableProps {
    notionData: NotionType

    //todo:Drag props
    index: number
    itemActiveIndex: number | undefined
    handleDragStart: (item: NotionItemDragDropActiveType) => void
    handleDragEnd: () => void
}

const NotionItemTable: React.FC<NotionItemTableProps> = ({ notionData, index, itemActiveIndex, handleDragStart, handleDragEnd }) => {

    const notionItemRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={notionItemRef} className={`flex flex-row items-start justify-start gap-1
                        ${itemActiveIndex === index ? "opacity-30" : "opacity-100"} transition`} draggable={true}
            onDragStart={() => handleDragStart({
                index,
                height: notionItemRef.current?.clientHeight,
                title: notionData.title,
                content: notionData.content
            })}
            onDragEnd={handleDragEnd}
        >
            <div className='flex flex-row items-center justify-start gap-1'>
                <MdOutlineDragIndicator size={17} className='cursor-grab' />
                <h3 className='font-semibold text-nowrap'>{notionData.title}</h3>
            </div>
            {/* //* style={{ whiteSpace: 'pre-line' }} render text with break paragraph */}
            <p style={{ whiteSpace: 'pre-line' }}>{notionData.content}</p>
        </div>
    )
}

export default NotionItemTable
