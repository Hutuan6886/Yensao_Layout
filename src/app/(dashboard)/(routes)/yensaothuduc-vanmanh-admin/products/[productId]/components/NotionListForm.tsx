'use client'
import React, { ChangeEvent } from 'react'
import { FieldValues, Path, PathValue, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import cuid from 'cuid';
import useNotionForm from '../services/notion-form';
import { FaPlus } from "react-icons/fa6";
import { NotionType } from '@/types/types';

// const data = [{ name: "Quy cách:" }, { name: "Phân loại:" }, { name: "Quy trình sản phẩm:" }]

type NotionListFormProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>
    getValues: UseFormGetValues<T>
}

const NotionListForm = <T extends FieldValues>({ name, getValues, setValue }: NotionListFormProps<T>) => {
    const { state, dispatch, editNotion, resetEditNotion } = useNotionForm()

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        dispatch({ type: 'SET_TITLE', payload: e.target.value })
    }

    const handleContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault()
        dispatch({ type: 'SET_CONTENT', payload: e.target.value })
    }

    const handleSubmitNotion = () => {
        if (editNotion.data.id) {
            //todo: Update Notion field (update each item)
            setValue(`${name}[${editNotion.index}]` as Path<T>, {
                id: editNotion.data.id,
                title: state.title,
                content: state.content
            } as PathValue<T, Path<T>>, { shouldValidate: true })
            resetEditNotion()
        } else {
            //todo: Create Notion field (create many items)
            const notions: NotionType[] = [...getValues(name), {
                id: cuid(),
                title: state.title,
                content: state.content
            }]
            setValue(name, notions as PathValue<T, Path<T>>, { shouldValidate: true })
        }
        dispatch({ type: 'RESET' })
    }

    return (
        <div className='flex flex-col gap-2'>
            <div className="col-span-1 flex flex-col gap-1">
                <label htmlFor='title' className='text-sm text-zinc-500'>Tiêu đề</label>
                <input value={state.title} type="text" className='border border-zinc-700 rounded-[0.375rem] p-2' onChange={handleTitle} />
            </div>
            <div className='col-span-5 flex flex-col gap-1'>
                <label htmlFor='content' className='text-sm text-zinc-500'>Nội dung</label>
                <textarea value={state.content} className='border border-zinc-700 rounded-[0.375rem] p-2' rows={3} onChange={handleContent} />
            </div>
            <button type='button' className='w-full flex flex-row items-center justify-center gap-1
                                bg-black text-white rounded-[0.375rem] py-2'
                onClick={handleSubmitNotion}
            >
                <FaPlus />
                <p>{`${editNotion.data.id ? "Lưu chỉnh sửa" : "Thêm ghi chú"}`}</p>
            </button>
        </div>
    )
}

export default NotionListForm
