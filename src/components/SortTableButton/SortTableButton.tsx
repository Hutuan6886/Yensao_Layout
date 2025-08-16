'use client'
import React from 'react'
import { FaCaretUp } from 'react-icons/fa';
interface SortTableButtonProps {
    title: string
    onClick: () => void;
}
const SortTableButton: React.FC<SortTableButtonProps> = ({ title, onClick }) => {
    return (
        <button className='w-full flex flex-row items-center justify-center gap-2
            shadow-sm rounded-md p-2 text-sm font-semibold text-zinc-600
                            hover:bg-zinc-200 active:bg-zinc-100 transition
                            ' onClick={onClick}>
            {title}
            <FaCaretUp />
        </button>
    )
}

export default SortTableButton
