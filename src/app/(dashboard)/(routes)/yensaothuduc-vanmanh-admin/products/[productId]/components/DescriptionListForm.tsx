'use client'
import React, { ChangeEvent } from 'react'
import { FieldValues, Path, PathValue, UseFormGetValues, UseFormSetValue } from 'react-hook-form'
import cuid from 'cuid'
import Image from 'next/image'

import DescriptionUploadImage from './DescriptionUploadImage'
import { IoClose } from 'react-icons/io5'
import { FaPlus } from 'react-icons/fa'
import useDescriptionForm from '../services/description-form'
import { DescriptionType } from '@/types/types'

type DescriptionListFormProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>
    getValues: UseFormGetValues<T>
}
const DescriptionListForm = <T extends FieldValues>({ name, setValue, getValues }: DescriptionListFormProps<T>) => {
    const { state, setTitle, setImgUrl, setContent, reset, editDescription, resetEditDescription } = useDescriptionForm()

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)

    const submitDescription = () => {
        if (editDescription.data.id) {
            setValue(`${name}[${editDescription.index}]` as Path<T>, {
                id: editDescription.data.id,
                title: state.title,
                content: state.content
            } as PathValue<T, Path<T>>, { shouldValidate: true })
            resetEditDescription()
        } else {
            const descriptions: DescriptionType[] = [...getValues(name), {
                id: cuid(),
                title: state.title,
                imgUrl: state.imgUrl,
                content: state.content
            }]
            setValue(name, descriptions as PathValue<T, Path<T>>, { shouldValidate: true })
        }
        reset()
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-5 gap-2'>
                <div className='col-span-3 flex flex-col gap-2'>
                    <div className="flex flex-col gap-1">
                        <label htmlFor='title' className='text-sm text-zinc-500'>Tiêu đề</label>
                        <input value={state.title} type="text" className='w-full border border-zinc-700 rounded-[0.375rem] p-2' onChange={handleTitle} />
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='content' className='text-sm text-zinc-500'>Nội dung</label>
                        <textarea value={state.content} className='w-full border border-zinc-500 rounded-[0.375rem] p-2' rows={7} onChange={handleContent} />
                    </div>
                    <button type='button' className='w-full flex flex-row items-center justify-center gap-1
                                bg-black text-white rounded-[0.375rem] py-2'
                        onClick={submitDescription}
                    >
                        <FaPlus />
                        {
                            editDescription.data.id
                                ? 'Cập nhật mô tả'
                                : 'Thêm mới mô tả'
                        }
                    </button>
                </div>
                <div className='col-span-2'>
                    {
                        state.imgUrl
                            ? <div className='relative'>
                                <Image src={state.imgUrl} alt='des_img' width={400} height={400} className='w-full h-auto object-cover rounded-[0.375rem]' />
                                <button className='absolute top-1 right-1'
                                    onClick={() => setImgUrl('')}
                                >
                                    <IoClose size={25} />
                                </button>
                            </div>
                            : <DescriptionUploadImage setImgUrl={setImgUrl} />
                    }
                </div>
            </div>
        </div>
    )
}

export default DescriptionListForm
