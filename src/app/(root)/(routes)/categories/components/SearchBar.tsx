"use client"
import React from 'react'
import { useForm } from 'react-hook-form'

import { SidebarSearchType } from '@/types/types'

import RangeSlider from '@/components/RangeSlider/RangeSlider'
import CheckboxTypeList from './CheckboxTypeList'
import CheckboxMassList from './CheckboxMassList'

const SearchBar = () => {
    const { register, setValue, watch, handleSubmit } = useForm<SidebarSearchType>({
        defaultValues: {
            price: {
                min: 0,
                max: 0
            },
            type: [],
            mass: [],
        }
    })

    const submitSearchbarForm = (data: SidebarSearchType) => {
        console.log("submitSearchbarForm", data);
    }

    return (
        <form className='w-full h-fit flex flex-col gap-8' onSubmit={handleSubmit(submitSearchbarForm)}>
            <RangeSlider register={register} watch={watch} name='price.max' label='Khoảng giá' min={0} max={10000000} step={500000} />
            <CheckboxTypeList name='type' setValue={setValue} />
            <CheckboxMassList name='mass' setValue={setValue} />
            <button type='submit' className='bg-[#c58c37] text-sm text-white px-4 py-2'>Áp dụng</button>
        </form>
    )
}

export default SearchBar
