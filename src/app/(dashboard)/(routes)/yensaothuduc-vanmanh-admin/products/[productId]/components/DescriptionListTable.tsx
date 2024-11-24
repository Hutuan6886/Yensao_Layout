'use client'
import { DescriptionType } from '@/types/types'
import Image from 'next/image'
import React from 'react'

interface DescriptionListTableProps {
    descriptionList: DescriptionType[]
}
const DescriptionListTable: React.FC<DescriptionListTableProps> = ({ descriptionList }) => {
    return (
        <div className='w-[95%] h-[500px] m-auto border rounded-[0.375rem] shadow-inner bg-zinc-200 p-2 overflow-x-scroll
                         flex flex-col gap-5'>
            <div className='flex flex-col gap-1'>
                <label htmlFor="" className='font-semibold'>Title Desc</label>
                <div className='w-[50%] m-auto'>
                    <Image src='https://firebasestorage.googleapis.com/v0/b/oauth-real-estate.appspot.com/o/1730109615945home-9-a.webp?alt=media&token=52908600-ab7c-442c-9ecf-76b1b2c93da0' alt='img' width={0} height={0} sizes='100vw' className='w-full h-[200px]' />
                </div>
                <p className=''>Desc content</p>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="" className='font-semibold'>Title Desc</label>
                <div className='w-[50%] m-auto'>
                    <Image src='https://firebasestorage.googleapis.com/v0/b/oauth-real-estate.appspot.com/o/1730109615945home-9-a.webp?alt=media&token=52908600-ab7c-442c-9ecf-76b1b2c93da0' alt='img' width={0} height={0} sizes='100vw' className='w-full h-[200px]' />
                </div>
                <p className=''>Desc content</p>
            </div>
            <div className='flex flex-col gap-1'>
                <label htmlFor="" className='font-semibold'>Title Desc</label>
                <div className='w-[50%] m-auto'>
                    <Image src='https://firebasestorage.googleapis.com/v0/b/oauth-real-estate.appspot.com/o/1730109615945home-9-a.webp?alt=media&token=52908600-ab7c-442c-9ecf-76b1b2c93da0' alt='img' width={0} height={0} sizes='100vw' className='w-full h-[200px]' />
                </div>
                <p className=''>Desc content</p>
            </div>
        </div>
    )
}

export default DescriptionListTable
