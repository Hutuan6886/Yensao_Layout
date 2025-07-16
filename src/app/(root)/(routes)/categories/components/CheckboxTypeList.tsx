'use client'
import React from 'react'
import { FieldValues, Path, UseFormSetValue } from 'react-hook-form'

import useCheckboxList from '@/hooks/useCheckboxList'

import CheckboxLabel from '@/components/Checkbox/CheckboxLabel'
import { CategoryType } from '@/types/types'

type CheckboxTypeListProps<T extends FieldValues> = {
    categoriesData: CategoryType[]
    name: Path<T>
    setValue: UseFormSetValue<T>
    typeList: string[]
}

const CheckboxTypeList = <T extends FieldValues>({ categoriesData, typeList, name, setValue }: CheckboxTypeListProps<T>) => {
    const {
        selectedList,
        toggleCheckbox
    } = useCheckboxList(typeList, name, setValue)

    return (
        <div className='flex flex-col gap-4'>
            <label htmlFor="type" className='font-semibold'>Loại yến sào</label>
            <div className='flex flex-col gap-2'>
                {
                    categoriesData.map((type: CategoryType) => (
                        <CheckboxLabel key={type.id} name='type' label={type.name} value={type.id} checked={selectedList.includes(type.id) ? true : false} onChange={toggleCheckbox} />
                    ))
                }
            </div>
        </div>
    )
}

export default CheckboxTypeList
