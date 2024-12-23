'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import { MassType, PriceType } from '@/types/types'
import CheckboxLabel from '@/components/Checkbox/CheckboxLabel'
import CurrencyInput from '@/components/Input/CurrencyInput'

interface PriceAndMassOptionProps<T extends FieldValues> {
    name: Path<T>
    setValue: UseFormSetValue<T>
    register: UseFormRegister<T>
    watch: UseFormWatch<T>

    massData: MassType[]
}

const PriceAndMassOption = <T extends FieldValues>({ name, setValue, watch, register, massData }: PriceAndMassOptionProps<T>) => {
    const [selectedValue, setSelectedValue] = useState<string[]>([])

    useEffect(() => {
        setSelectedValue(watch(name).map((item: PriceType) => (item.mass)))
    }, [watch, name])

    const handleSelectedCheckbox = (e: ChangeEvent<HTMLInputElement>, i: number): void => {
        if (selectedValue.includes(e.target.value)) {
            setSelectedValue(selectedValue.filter((item) => item !== e.target.value))
            setValue(`${name}.${i}` as Path<T>, undefined as PathValue<T, Path<T>>)
        }
        else {
            setSelectedValue(existing => [...existing, e.target.value])
            setValue(`${name}.${i}.mass` as Path<T>, e.target.value as PathValue<T, Path<T>>)
        }
    }

    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-2">
                {massData.map((mass: MassType, i: number) => (
                    <div key={i} className='flex flex-row items-center justify-start gap-8'>
                        <CheckboxLabel label={mass.value} value={mass.id} name='' checked={selectedValue.includes(mass.id)} onChange={(e: ChangeEvent<HTMLInputElement>) => handleSelectedCheckbox(e, i)} />
                        {
                            selectedValue.includes(mass.id) &&
                            <>
                                <CurrencyInput label='Giá sản phẩm (VND)' name={`${name}.${i}.regularPrice` as Path<T>} register={register} setValue={setValue} />
                                <CurrencyInput label='Giảm giá ưu đãi (VND)' name={`${name}.${i}.discountPrice` as Path<T>} register={register} setValue={setValue} />
                            </>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PriceAndMassOption
