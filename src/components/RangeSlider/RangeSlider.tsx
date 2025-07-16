'use client'
import React from 'react'
import { FieldValues, Path, UseFormRegister, UseFormWatch } from 'react-hook-form'

import './RangeSlider.css'
import { formatterCurrency } from '@/lib/utils'

type RangeSliderProps<T extends FieldValues> = {
    label?: string

    name: Path<T>
    register: UseFormRegister<T>
    watch: UseFormWatch<T>

    min: number
    max: number
    step: number
}

const RangeSlider = <T extends FieldValues>({ label, name, register, watch, min, max, step }: RangeSliderProps<T>) => {
    return (
        <div className='flex flex-col gap-4'>
            <label htmlFor={name} className='font-semibold'>{label}</label>
            <div className='flex flex-col gap-2'>
                <div style={{ margin: 0 }} className='relative flex items-center'>
                    <input {...register(name)} type="range" min={min} max={max} step={step}
                        id='range-slider'
                        className='appearance-none w-full h-[2px] bg-gray-100 rounded-[0.5rem]'
                    />
                    <div style={{
                        width: `${((watch(name) / max) * 100)}%`
                    }} className='absolute z-0 h-[2px] top-0 left-0 bg-[#661a1a]'></div>
                </div>
                <div className='flex flex-row items-center justify-between'>
                    <p className='text-sm'>{formatterCurrency.format(0)}</p>
                    <p className='text-sm'>{formatterCurrency.format(watch(name))}</p>
                </div>
            </div>
        </div>
    )
}

export default RangeSlider
