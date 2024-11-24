'use client'
import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { CategoryType } from '@/types/types'

type CategoriesOptionsInputProps<T extends FieldValues> = {
    name: Path<T>
    register: UseFormRegister<T>
    data: CategoryType[]
    disabled?: boolean
    message?: string
}
const CategoriesOptionsInput = <T extends FieldValues>({ name, register, data, disabled, message }: CategoriesOptionsInputProps<T>) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} className='text-sm text-zinc-500'>Danh Mục Sản Phẩm</label>
            <select {...register(name)} disabled={disabled} defaultValue="DEFAULT" className="bg-white border border-zinc-700 rounded-[0.375rem] p-2 cursor-pointer">
                <option value="DEFAULT" disabled className='text-sm italic'>-- Chọn Danh Mục --</option>
                {data.map((item: CategoryType, i: number) => (
                    <option key={i} value={item.id}>{item.name}</option>
                ))}
            </select>
            <p className="text-xs text-rose-800">{message}</p>
        </div>
    )
}

export default CategoriesOptionsInput
