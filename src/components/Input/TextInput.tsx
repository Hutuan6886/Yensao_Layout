'use client'
import React from 'react'
import { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type TextInputProps<T extends FieldValues> = {
    name: Path<T>
    register: UseFormRegister<T>

    label: string
    placeholder?: string
}

const TextInput = <T extends FieldValues>({ name, register, label, placeholder }: TextInputProps<T>) => {
    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor={name} className='text-sm text-zinc-500'>{label}</label>
            <input {...register(name)} type="text" className='w-full border border-zinc-700 rounded-[0.375rem] p-2' placeholder={placeholder} />
        </div>
    )
}

export default TextInput
