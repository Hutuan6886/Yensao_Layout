'use client'
import React, { useRef, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'

const SeemoreButton = () => {
    const [isHoverSeemoreIcon, setIsHoverSeemoreIcon] = useState<boolean>(false)
    const seemoreIcon = useRef<HTMLSpanElement>(null)

    return (
        <button className='relative w-fit m-auto flex flex-col gap-1 
                text-zinc-500 italic
                group'
            onMouseEnter={() => setIsHoverSeemoreIcon(true)}
            onMouseLeave={() => setIsHoverSeemoreIcon(false)}
        >
            <div className='flex flex-row items-center justify-center gap-2 
                    italic text-nowrap
                    group-hover:not-italic transition ease-in-out duration-300'>
                Xem thêm
                <div style={{
                    width: isHoverSeemoreIcon ? seemoreIcon.current?.offsetWidth || 0 : 0,
                    opacity: isHoverSeemoreIcon ? 1 : 0,
                    translate: isHoverSeemoreIcon ? "0" : "-10px",
                    transition: '.2s ease-out'
                }}>
                    <span ref={seemoreIcon}><FaChevronRight size={8} /></span>
                </div>
            </div>
            <hr className=' w-0 h-0
                    before:contents-[""] before:absolute before:bottom-0 before:left-0 before:w-[0%] before:border before:border-transparent before:transition-all before:ease-in-out before:duration-300
                    group-hover:before:w-[100%] group-hover:before:border-[#998264] '/>
        </button>
    )
}

export default SeemoreButton
