'use client'
import CheckboxLabel from '@/components/Checkbox/CheckboxLabel'
import { MassType } from '@/types/types'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form'

interface MassOptionCheckboxProps<T extends FieldValues> {
    name: Path<T>
    setValue: UseFormSetValue<T>
    watch: UseFormWatch<T>
    label: string
    massData: MassType[]
}
const MassOptionCheckbox = <T extends FieldValues>({ name, setValue, watch, massData, label }: MassOptionCheckboxProps<T>) => {
    const [selectedValue, setSelectedValue] = useState<string[]>(watch(name))

    const handleSelectedCheckbox = (e: ChangeEvent<HTMLInputElement>): void => {
        if (selectedValue.includes(e.target.value)) {
            setSelectedValue(selectedValue.filter((item) => item !== e.target.value))
        }
        else {
            setSelectedValue(existing => [...existing, e.target.value])
        }
    }

    useEffect(() => {
        setValue(name, selectedValue as PathValue<T, Path<T>>)
    }, [name, selectedValue, setValue])
    
    return (
        <div className="w-full">
            <div className="flex flex-col items-start gap-2">
                <label htmlFor={name} className="text-sm text-zinc-500">{label}</label>
                <div className="w-full flex flex-col gap-2">
                    {massData.map((mass: MassType, i: number) => (
                        <CheckboxLabel key={i} name='checkbox' label={mass.value} value={mass.id} onChange={handleSelectedCheckbox} checked={selectedValue.includes(mass.id)} titleSize='16px'/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MassOptionCheckbox
