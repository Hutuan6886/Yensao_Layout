'use client'
import React from 'react'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'


const numberPage: number[] = [1, 2, 3, 4, 5, 6]
const activePage: number = 1
const Pagination = () => {
    return (
        <div className='w-full h-fit'>
            <div className='flex flex-row items-center justify-center gap-3'>
                {
                    activePage !== 1
                        ? <button className='size-7 flex flex-row items-center justify-center 
                    border border-[#998264] bg-[#998264] rounded-[0.5rem] group hover:bg-white transition'>
                            <FaCaretLeft className='text-white group-hover:text-[#998264] transition' />
                        </button>
                        : null
                }
                {
                    numberPage.map((pageNumber, i: number) => (
                        activePage === pageNumber
                            ? <button key={i} className='border border-[#998264] text-sm text-[#998264] size-7'>{pageNumber}</button>
                            : <button key={i} className='border border-zinc-300 text-sm text-zinc-300 size-7 hover:bg-[#998264] hover:border-0 hover:text-white transition'>{pageNumber}</button>
                    ))
                }
                <button className='size-7 flex flex-row items-center justify-center 
                                border border-[#998264] bg-[#998264] group hover:bg-white transition'><FaCaretRight className='text-white group-hover:text-[#998264] transition' /></button>
            </div>

        </div>
    )
}

export default Pagination
