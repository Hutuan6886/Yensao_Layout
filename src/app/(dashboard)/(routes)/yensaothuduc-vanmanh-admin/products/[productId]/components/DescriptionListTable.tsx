'use client'
import React from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { DescriptionType } from '@/types/types'
import { AiFillEdit } from 'react-icons/ai'
import { IoClose } from 'react-icons/io5'
import { updateDescription } from '@/lib/features/productSlice/productSlice'
import { RootState } from '@/lib/store'

type DescriptionListTableProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>

    descriptionList: DescriptionType[]
}
const DescriptionListTable = <T extends FieldValues>({ name, setValue, descriptionList }: DescriptionListTableProps<T>) => {
    const dispatch = useDispatch()
    const { editDescription } = useSelector((state: RootState) => state.product)
    const handleEditDescription = (data: DescriptionType, index: number) => dispatch(updateDescription({ data, index }))
    const handleDeleteDescription = (id?: string) => setValue(name, descriptionList.filter((item: DescriptionType) => item.id !== id) as PathValue<T, Path<T>>)
    if (descriptionList.length < 1) {
        return null
    }
    return (
        <div className='w-[95%] m-auto
                         flex flex-col gap-5'>
            {
                descriptionList.map((description: DescriptionType, i: number) => (
                    <div key={description.id} className={`flex flex-col gap-1
                                                        ${editDescription.data.id === description.id ? "opacity-50" : "opacity-100"}`}>
                        <div className='flex flex-row items-center justify-between'>
                            <label htmlFor="" className='font-semibold'>{description.title}</label>
                            <div className='flex flex-row items-center justify-start gap-2'>
                                <button type='button' className='hover:scale-110 transition'
                                    onClick={() => handleEditDescription(description, i)}
                                >
                                    <AiFillEdit />
                                </button>
                                <button type='button' className='hover:scale-110 transition'
                                    onClick={() => handleDeleteDescription(description.id)}
                                >
                                    <IoClose />
                                </button>
                            </div>
                        </div>
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
