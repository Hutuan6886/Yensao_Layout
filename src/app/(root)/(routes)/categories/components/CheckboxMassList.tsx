'use client'
import React from 'react'
import { FieldValues, Path, UseFormSetValue } from 'react-hook-form'

import { MassType } from '@/types/types'
import useCheckboxList from '@/hooks/useCheckboxList'

import CheckboxTag from '@/components/Checkbox/CheckboxTag'

type CheckboxMassListProps<T extends FieldValues> = {
    massData: MassType[];
    massList: string[];
    name: Path<T>
    setValue: UseFormSetValue<T>
}
const CheckboxMassList = <T extends FieldValues>({ massData, massList, name, setValue }: CheckboxMassListProps<T>) => {
    const {
        selectedList,
        toggleCheckbox
    } = useCheckboxList(massList, name, setValue)

    return (
        <div className='flex flex-col gap-4'>
            <label htmlFor="mass" className='font-semibold'>Khối lượng</label>
            <div className='flex flex-row flex-wrap items-center justify-start gap-3'>
                {
                    massData.map((mass) => (
                        <CheckboxTag key={mass.id} label={`${mass.value}g`} value={mass.id} checked={selectedList.includes(mass.id) ? true : false} onChange={toggleCheckbox} />
                    ))
                }
            </div>
        </div>
    )
}

export default CheckboxMassList
