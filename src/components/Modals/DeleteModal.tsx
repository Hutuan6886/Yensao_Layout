'use client'
import React, { MouseEvent, useRef } from 'react'

interface DeleteModalProps {
    title: string
    desc?: string
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    isLoading?: boolean
}
const DeleteModal: React.FC<DeleteModalProps> = ({ title, desc, isOpen, onClose, onSubmit, isLoading }) => {
    const contentModal = useRef<HTMLDivElement>(null)

    function clickOutToClose(e: MouseEvent<HTMLDivElement>) {
        if (!contentModal.current?.contains(e.target as Node)) {
            onClose()
        }
    }
    return (
        <>
            {
                isOpen && <div className='fixed top-0 left-0 w-full h-screen flex items-center bg-[#0000003d]'
                    onClick={(e: MouseEvent<HTMLDivElement>) => clickOutToClose(e)}
                >
                    <div ref={contentModal} className='w-full sm:w-[80%] md:w-[40%] m-auto h-auto flex flex-col gap-3 
                                    bg-white rounded-[0.5rem] p-5'>
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-lg font-semibold'>{title}</h3>
                            <p className='text-sm pl-2'>{desc}</p>
                        </div>
                        <div className='w-full flex flex-row items-center justify-end gap-2'>
                            <button disabled={isLoading} className='bg-[#353333] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#4D4848] transition' onClick={onClose}>Huỷ</button>
                            <button disabled={isLoading} className='bg-[#6ab187] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#7AC098] transition' onClick={onSubmit}>Đồng Ý</button>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default DeleteModal
