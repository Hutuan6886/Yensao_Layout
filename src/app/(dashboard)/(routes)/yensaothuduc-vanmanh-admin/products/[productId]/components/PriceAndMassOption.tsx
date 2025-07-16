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
        const priceObj = watch(name) as Record<string, PriceType>;
        const selectedMassIds = Object.keys(priceObj).filter((massId) => !!priceObj[massId]?.regularPrice);
        setSelectedValue(selectedMassIds);
    }, [watch, name]);

    const handleSelectedCheckbox = (e: ChangeEvent<HTMLInputElement>): void => {
        const massId = e.target.value;
        const isChecked = e.target.checked;

        if (!isChecked) {
            setSelectedValue(selectedValue.filter((id) => id !== massId));
            setValue(`${name}.${massId}` as Path<T>, {} as PathValue<T, Path<T>>);
        } else {
            setSelectedValue([...selectedValue, massId]);
            setValue(`${name}.${massId}.regularPrice` as Path<T>, '' as PathValue<T, Path<T>>);
            setValue(`${name}.${massId}.discountPrice` as Path<T>, '' as PathValue<T, Path<T>>);
        }
    };

    return (
        <div className="w-full">
            <div className="w-full flex flex-col gap-2">
                {massData.map((mass: MassType) => (
                    <div key={mass.id} className="flex flex-row items-center justify-start gap-8">
                        <CheckboxLabel
                            label={`${mass.value}g`}
                            value={mass.id}
                            name=""
                            checked={selectedValue.includes(mass.id)}
                            onChange={handleSelectedCheckbox}
                        />
                        {selectedValue.includes(mass.id) && (
                            <>
                                <CurrencyInput
                                    label="Giá sản phẩm (VND)"
                                    name={`${name}.${mass.id}.regularPrice` as Path<T>}
                                    register={register}
                                    setValue={setValue}
                                />
                                <CurrencyInput
                                    label="Giảm giá ưu đãi (VND)"
                                    name={`${name}.${mass.id}.discountPrice` as Path<T>}
                                    register={register}
                                    setValue={setValue}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PriceAndMassOption
