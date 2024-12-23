'use client'
import { DescriptionType } from '@/types/types'
import Image from 'next/image'
import React from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { IoClose } from 'react-icons/io5'

type DescriptionListTableProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>

    descriptionList: DescriptionType[]
}
const DescriptionListTable = <T extends FieldValues>({ name, setValue, descriptionList }: DescriptionListTableProps<T>) => {
    if (descriptionList.length < 1) {
        return null
    }
    return (
        <div className='w-[95%] m-auto
                         flex flex-col gap-5'>
            {
                descriptionList.map((description: DescriptionType) => (
                    <div key={description.id} className='relative flex flex-col gap-1'>
                        <button type='button' className='absolute top-1 right-1 hover:scale-110 transition'
                            onClick={() => setValue(name, descriptionList.filter((item: DescriptionType) => item.id !== description.id) as PathValue<T, Path<T>>)}
                        >
                            <IoClose />
                        </button>
                        <label htmlFor="" className='font-semibold'>{description.title}</label>
                        {
                            description.imgUrl && <div className='w-[70%] h-fit m-auto'>
                                <Image src={description.imgUrl} alt='img' width={0} height={0} sizes='100vw' className='w-full h-auto' />
                            </div>
                        }
                        <p style={{ whiteSpace: 'pre-line' }}>{description.content}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default DescriptionListTable
