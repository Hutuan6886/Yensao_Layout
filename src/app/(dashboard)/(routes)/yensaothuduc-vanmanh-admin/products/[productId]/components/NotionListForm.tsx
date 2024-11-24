'use client'
import React, { ChangeEvent, useRef, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { FaPlus } from "react-icons/fa6";

const data = [{ name: "Quy cách:" }, { name: "Phân loại:" }, { name: "Quy trình sản phẩm:" }]

type NotionListFormProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>

    notionIndex?: number
}

const NotionListForm = <T extends FieldValues>({ name, setValue, notionIndex }: NotionListFormProps<T>) => {
    const [title, setTitle] = useState<string>()
    const [content, setContent] = useState<string>()
    const selectRef = useRef<HTMLSelectElement>(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const handleTitle = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        if (e.target.value) {
            setTitle(e.target.value)
        }
    }

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        if (e.target.value) {
            setContent(e.target.value)
        }
    }

    const handleSubmitNotion = () => {
        setValue(`${name}.${notionIndex}.title` as Path<T>, title as PathValue<T, Path<T>>)
        if (selectRef.current?.value) {
            selectRef.current.value = "DEFAULT"
        }
        setValue(`${name}.${notionIndex}.content` as Path<T>, content as PathValue<T, Path<T>>)
        if (textareaRef.current?.value) {
            textareaRef.current.value = ''
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-6 gap-2'>
                <div className="flex flex-col gap-1">
                    <label htmlFor='title' className='text-sm text-zinc-500'>Tiêu đề</label>
                    <select ref={selectRef} defaultValue="DEFAULT" className="bg-white border border-zinc-700 rounded-[0.375rem] p-2 cursor-pointer"
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => handleTitle(e)}
                    >
                        <option value="DEFAULT" className='text-sm italic'>-- Chọn tiêu đề --</option>
                        {data.map((item, i: number) => (
                            <option key={i} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className='col-span-5'>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor='content' className='text-sm text-zinc-500'>Nội dung</label>
                        <textarea ref={textareaRef} className='border border-zinc-700 rounded-[0.375rem] p-2' onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleContent(e)} />
                    </div>
                </div>
            </div>
            <button type='button' className='w-[30%] m-auto flex flex-row items-center justify-center gap-1
                                bg-black text-white rounded-[0.375rem] py-2'
                onClick={handleSubmitNotion}
            >
                <FaPlus />
                <p>Thêm ghi chú</p>
            </button>
        </div>
    )
}

export default NotionListForm
