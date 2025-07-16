import React, { ChangeEvent } from 'react'
import { BsCheck } from 'react-icons/bs'

interface CheckboxTagProps {
    label: string
    value: string
    checked: boolean
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CheckboxTag: React.FC<CheckboxTagProps> = ({ label, value, checked, onChange }) => {
    return (
        <div className='relative'>
            <input type="checkbox" value={value} checked={checked} onChange={onChange}
                className={`absolute top-0 left-0 
                        appearance-none border w-full h-full cursor-pointer ${checked ? "border-[#661a1a]" : "border-black hover:border-zinc-500"} transition`} />
            <p className={`text-sm px-3 py-1 ${checked ? "text-[#661a1a]" : "hover:text-zinc-500"} transition`}>
                {label}
            </p>
            <div className={`before:contents-[] before:absolute before:bottom-0 before:right-0 before:border-l-[10px] before:border-l-[#661a1a] before:border-b-[10px] before:border-b-transparent before:border-t-[10px] before:border-t-transparent before:border-[#661a1a] before:rotate-45 before:translate-x-[1px] before:translate-y-[6px]
                ${checked ? "opacity-100" : "opacity-0"} transition`}></div>
            <BsCheck className={`absolute -bottom-[0.1rem] -right-[0.1rem] text-white 
                                ${checked ? "opacity-100" : "opacity-0"}`} size={13} />
        </div>
    )
}

export default CheckboxTag
