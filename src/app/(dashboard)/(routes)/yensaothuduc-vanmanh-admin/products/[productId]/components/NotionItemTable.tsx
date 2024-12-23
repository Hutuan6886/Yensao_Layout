'use client'
import React, { useRef } from 'react'
import { NotionItemDragDropActiveType, NotionType } from '@/types/types'
import { MdOutlineDragIndicator } from 'react-icons/md'
import { IoClose } from 'react-icons/io5'
import { motion } from 'framer-motion'

interface NotionItemTableProps {
    notionData: NotionType

    //todo:Drag props
    index: number
    itemActiveIndex: number | undefined
    handleDragStart: (item: NotionItemDragDropActiveType) => void
    handleDragEnd: () => void
    onDeleteNotion: () => void
}

const NotionItemTable: React.FC<NotionItemTableProps> = ({ notionData, index, itemActiveIndex, handleDragStart, handleDragEnd, onDeleteNotion }) => {

    const notionItemRef = useRef<HTMLDivElement>(null)

    return (
        <div ref={notionItemRef} className={`flex flex-row items-start justify-between gap-1
                        ${itemActiveIndex === index ? "opacity-30" : "opacity-100"} transition`} draggable={true}
            onDragStart={() => handleDragStart({
                index,
                height: notionItemRef.current?.clientHeight,
                title: notionData.title,
                content: notionData.content
            })}
            onDragEnd={handleDragEnd}
        >
            <motion.div layout className='flex flex-row items-start justify-start gap-2'>
                <div className='flex flex-row items-center justify-start gap-1'>
                    <MdOutlineDragIndicator size={17} className='cursor-grab' />
                    <h3 className='font-semibold text-nowrap'>{notionData.title}</h3>
                </div>
                {/* //* style={{ whiteSpace: 'pre-line' }} render text with break paragraph */}
                <p style={{ whiteSpace: 'pre-line' }}>{notionData.content}</p>
            </motion.div>
            <button type='button' className='hover:scale-110 transition'
                onClick={onDeleteNotion}
            >
                <IoClose />
            </button>
        </div>
    )
}

export default NotionItemTable
