'use client'
import React, { ChangeEvent, useRef } from 'react'
import { FieldValues, Path } from 'react-hook-form'

import { FaCheck } from 'react-icons/fa'


type CheckboxLabelProps<T extends FieldValues> = {
    label: string
    name: Path<T>
    value: string
    checked: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    titleSize?: string
}
const CheckboxLabel = <T extends FieldValues>({ label, name, value, checked, onChange, titleSize }: CheckboxLabelProps<T>) => {
    const checkboxRef = useRef<HTMLInputElement>(null)

    const handleCheckbox = (): void => {
        if (checkboxRef.current) {
            checkboxRef.current.click()
        }
    }

    return (
        <div className='flex flex-row items-center justify-start gap-2'>
            <div className='relative size-4 flex items-center'>
                <input ref={checkboxRef} name={name} type="checkbox" value={value} checked={checked} onChange={onChange}
                    className={`absolute z-10 top-0 left-0 size-4 appearance-none bg-transparent cursor-pointer`} />
                <div className={`relative size-4 border ${checked ? "border-[#661a1a]" : "border-[#353333]"} rounded-[0.3rem] transition`}>
                    <FaCheck className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2 text-[#661a1a]
                                        ${checked ? "opacity-100" : "opacity-0"}`} />
                </div>
            </div>
            <label htmlFor={name} style={{
                fontSize: titleSize
            }} className={`text-sm cursor-pointer ${checked ? "text-[#661a1a]" : "hover:text-zinc-500"}`}
                onClick={handleCheckbox}
            >{label}</label>
        </div>
    )
}

export default CheckboxLabel
