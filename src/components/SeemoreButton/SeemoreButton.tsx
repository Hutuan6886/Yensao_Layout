'use client'
import React from 'react'
import useToggle from '@/hooks/useToggle'
import { FaChevronRight } from 'react-icons/fa'

interface SeemoreButtonProps {
    label: string;
    onClick: () => void;
}

const SeemoreButton: React.FC<SeemoreButtonProps> = ({ label, onClick }) => {
    const { isOpen: isHover, setIsOpen: setIsHover } = useToggle()

    return (
        <button
            className='relative w-fit m-auto flex flex-col items-center gap-1 group text-zinc-500 italic'
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            onClick={onClick}
        >
            <div className='flex items-center gap-1 transition-all duration-300'>
                <span className='group-hover:not-italic'>{label}</span>
                <FaChevronRight
                    size={10}
                    className={`transition-all duration-200
                        ${isHover ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                    `}
                />
            </div>

            {/* underline animation */}
            <div className='relative w-full h-[1px] bg-transparent'>
                <div className='absolute bottom-0 left-0 h-[2px] w-0 bg-[#998264] transition-all duration-300 group-hover:w-full'></div>
            </div>
        </button>
    )
}

export default SeemoreButton
