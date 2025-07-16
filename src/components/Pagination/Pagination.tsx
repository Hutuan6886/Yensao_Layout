'use client'
import React from 'react'
import usePagination from '@/hooks/usePagination'
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa'

interface PaginationProps {
    totalProducts: number
}
const Pagination: React.FC<PaginationProps> = ({ totalProducts }) => {
    const [currentPage, limit, goToPage, prevPage, nextPage] = usePagination()
    return (
        <div className='w-full h-fit'>
            <div className='flex flex-row items-center justify-center gap-3'>
                {
                    currentPage !== 1
                        ? <button className='size-7 flex flex-row items-center justify-center 
                    border border-[#998264] bg-[#998264] group hover:bg-white transition'
                            onClick={() => prevPage()}>
                            <FaCaretLeft className='text-white group-hover:text-[#998264] transition' />
                        </button>
                        : null
                }
                {
                    Array.from({ length: Math.ceil(totalProducts / limit) }).map((_, i: number) => (
                        <button key={i} className={`${currentPage === i + 1 ? "border-[#998264] text-[#998264]" : "border-zinc-300  text-zinc-300 hover:bg-[#998264] hover:border-0 hover:text-white"} border text-sm size-7 transition`}
                            onClick={() => goToPage(i + 1)}>{i + 1}</button>
                    ))
                }
                {currentPage !== Math.ceil(totalProducts / limit)
                    ? <button className='size-7 flex flex-row items-center justify-center 
                                border border-[#998264] bg-[#998264] group hover:bg-white transition'
                        onClick={() => nextPage()}><FaCaretRight className='text-white group-hover:text-[#998264] transition' /></button>
                    : null}
            </div>

        </div>
    )
}

export default Pagination
