'use client'
import React, { ChangeEvent, Fragment, useEffect, useState } from 'react'

import CheckboxLabel from '@/components/Checkbox/CheckboxLabel'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'

const productType = [
    { id: '1', title: "Yến thô nguyên tổ" },
    { id: '2', title: "Yến tinh chế" },
    { id: '3', title: "Yến rút lông" },
    { id: '4', title: "Yến thượng hạng" },
    { id: '5', title: "Yến baby" },
    { id: '6', title: "Yến vụn" },
]

type CheckboxTypeListProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>
}

const CheckboxTypeList = <T extends FieldValues>({ name, setValue }: CheckboxTypeListProps<T>) => {
    const [selectedList, setSelectedList] = useState<string[]>([])

    const handleCheckboxSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (selectedList.includes(e.target.value)) {
            setSelectedList(selectedList.filter((item) => item !== e.target.value))
        }
        else {
            setSelectedList(existing => [...existing, e.target.value])
        }
    }

    useEffect(() => {
        setValue(name, selectedList as PathValue<T, Path<T>>)
    }, [name, selectedList, setValue])

    return (
        <div className='flex flex-col gap-4'>
            <label htmlFor="type" className='font-semibold'>Loại yến sào</label>
            <div className='flex flex-col gap-2'>
                {
                    productType.map((type, i: number) => (
                        <Fragment key={i}>
                            <CheckboxLabel name='type' label={type.title} value={type.id} checked={selectedList.includes(type.id) ? true : false} onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckboxSelect(e)} />
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default CheckboxTypeList
