'use client'
import { RootState } from '@/lib/store';
import cuid from 'cuid';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';
import { FaPlus } from "react-icons/fa6";
import { useSelector } from 'react-redux';

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

    const editNotion = useSelector((state: RootState) => state.product.editNotion)

    console.log('form', { title, content });

    useEffect(() => {
        if (editNotion) {
            //todo: update notionData to form (editNotion.index ứng với giá trị notion lúc click)
            setTitle(editNotion.data.title)
            setContent(editNotion.data.content)
        }
    }, [editNotion])

    const handleTitle = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()
        setTitle(e.target.value)
    }

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        setContent(e.target.value)
    }

    const handleSubmitNotion = () => {
        if (editNotion.data.id) {
            //todo: Update Notion field
        } else {
            //todo: Create Notion field
            setValue(`${name}.${notionIndex}.id` as Path<T>, cuid() as PathValue<T, Path<T>>)
            setValue(`${name}.${notionIndex}.title` as Path<T>, title as PathValue<T, Path<T>>)
            if (selectRef.current?.value) {
                selectRef.current.value = "DEFAULT"
            }
            setTitle('')
            setValue(`${name}.${notionIndex}.content` as Path<T>, content as PathValue<T, Path<T>>)
            if (textareaRef.current?.value) {
                textareaRef.current.value = ''
            }
            setContent('')
        }
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className="col-span-1 flex flex-col gap-1">
                <label htmlFor='title' className='text-sm text-zinc-500'>Tiêu đề</label>
                <select ref={selectRef} defaultValue="DEFAULT" value={title} className="bg-white border border-zinc-700 rounded-[0.375rem] p-2 cursor-pointer"
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleTitle(e)}
                >
                    <option value="DEFAULT" className='text-sm italic'>-- Chọn tiêu đề --</option>
                    {data.map((item, i: number) => (
                        <option key={i} value={item.name}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className='col-span-5 flex flex-col gap-1'>
                <label htmlFor='content' className='text-sm text-zinc-500'>Nội dung</label>
                <textarea value={content} ref={textareaRef} className='border border-zinc-700 rounded-[0.375rem] p-2' rows={3} onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleContent(e)} />
            </div>
            <button type='button' className='w-full flex flex-row items-center justify-center gap-1
                                bg-black text-white rounded-[0.375rem] py-2'
                onClick={handleSubmitNotion}
            >
                {editNotion.data.id
                    ? <><FaPlus />
                        <p>Lưu chỉnh sửa</p></>
                    : <><FaPlus />
                        <p>Thêm ghi chú</p></>}

            </button>
        </div>
    )
}

export default NotionListForm
