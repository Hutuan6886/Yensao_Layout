'use client'
import CheckboxTag from '@/components/Checkbox/CheckboxTag'
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'

const massData = [
    { id: '1', title: "50g" },
    { id: '2', title: "100g" },
    { id: '3', title: "150g" },
    { id: '4', title: "200g" },
    { id: '5', title: "250g" },
    { id: '6', title: "300g" },
]
type CheckboxMassListProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>
}
const CheckboxMassList = <T extends FieldValues>({ name, setValue }: CheckboxMassListProps<T>) => {
    const [selectedMassList, setSelectedMassList] = useState<string[]>([])

    const handleCheckboxTag = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (selectedMassList.includes(e.target.value)) {
            setSelectedMassList((existing) => [...existing.filter((value) => value !== e.target.value)])
        } else {
            setSelectedMassList((existing) => [...existing, e.target.value])
        }
    }

    useEffect(() => {
        setValue(name, selectedMassList as PathValue<T, Path<T>>)
    }, [name, selectedMassList, setValue])

    return (
        <div className='flex flex-col gap-4'>
            <label htmlFor="mass" className='font-semibold'>Khối lượng</label>
            <div className='flex flex-row flex-wrap items-center justify-start gap-3'>
                {
                    massData.map((mass, i: number) => (
                        <Fragment key={i}>
                            <CheckboxTag label={mass.title} value={mass.id} checked={selectedMassList.includes(mass.id) ? true : false} onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxTag(e)} />
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default CheckboxMassList
