'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa'

type DescriptionListFormProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>

    descriptionIndex?: number
}
const DescriptionListForm = <T extends FieldValues>({ name, setValue, descriptionIndex }: DescriptionListFormProps<T>) => {
    const [title, setTitle] = useState<string>()
    // const [imgUrl, setImgUrl] = useState<string>()
    const [content, setContent] = useState<string>()
    const titleRef = useRef<HTMLInputElement>(null)
    const contentRef = useRef<HTMLTextAreaElement>(null)

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value) {
            setTitle(e.target.value)
        }
    }

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value) {
            setContent(e.target.value)
        }
    }
    const submitDescription = () => {
        setValue(`${name}.${descriptionIndex}.title` as Path<T>, title as PathValue<T, Path<T>>)
        if (titleRef.current?.value) {
            titleRef.current.value = ''
        }
        // setValue(`${name}.${dataDescriptionIndex}.imgUrl`,imgUrl)
        setValue(`${name}.${descriptionIndex}.content` as Path<T>, content as PathValue<T, Path<T>>)
        if (contentRef.current?.value) {
            contentRef.current.value = ''
        }
    }
    return (
        <div className='flex flex-col gap-2'>
            <div className="flex flex-col gap-1">
                <label htmlFor='title' className='text-sm text-zinc-500'>Tiêu đề</label>
                <input ref={titleRef} type="text" className='w-full border border-zinc-700 rounded-[0.375rem] p-2' onChange={(e: ChangeEvent<HTMLInputElement>) => handleTitle(e)} />
            </div>
            <div>
                DESCRIPTION IMG
            </div>
            <div className='col-span-5'>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='content' className='text-sm text-zinc-500'>Nội dung</label>
                    <textarea ref={contentRef} className='w-full border border-zinc-700 rounded-[0.375rem] p-2' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleContent(e)} />
                </div>
            </div>
            <button type='button' className='w-[30%] m-auto flex flex-row items-center justify-center gap-1
                                bg-black text-white rounded-[0.375rem] py-2'
                onClick={submitDescription}
            >
                <FaPlus />
                <p>Thêm mô tả</p>
            </button>
        </div>
    )
}

export default DescriptionListForm
