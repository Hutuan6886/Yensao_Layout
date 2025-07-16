"use client"
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'

import { CategoryType, MassType, SearchParamsType, SidebarSearchType } from '@/types/types'

import RangeSlider from '@/components/RangeSlider/RangeSlider'
import CheckboxTypeList from './CheckboxTypeList'
import CheckboxMassList from './CheckboxMassList'
import useFilter from '@/hooks/useFilter'

interface SearchBarProps {
    categoriesData: CategoryType[];
    massData: MassType[];
    searchParams?: SearchParamsType
}
const SearchBar: React.FC<SearchBarProps> = ({ categoriesData, massData, searchParams }) => {
    const params = new URLSearchParams(searchParams)
    const [updateFilterQuery] = useFilter()

    const { register, setValue, watch, handleSubmit } = useForm<SidebarSearchType>({
        defaultValues: searchParams ? {
            price: {
                min: parseInt(params.get('priceMin') || "0"),
                max: parseInt(params.get('priceMax') || "0")
            },
            type: params.getAll('type')[0] ? params.getAll('type')[0].split(',').filter(Boolean) : [],
            mass: params.getAll('mass')[0] ? params.getAll('mass')[0].split(',').filter(Boolean) : [],
        } : {
            price: {
                min: 0,
                max: 0
            },
            type: [],
            mass: [],
        }
    })
    const typeList = useMemo(() => watch('type'), [watch])
    const massList = useMemo(() => watch('mass'), [watch])

    const submitSearchbarForm = (data: SidebarSearchType) => {
        updateFilterQuery({
            priceMin: data.price.min,
            priceMax: data.price.max,
            type: data.type,
            mass: data.mass,
        })
    }

    return (
        <form className='w-full h-fit flex flex-col gap-8' onSubmit={handleSubmit(submitSearchbarForm)}>
            <RangeSlider register={register} watch={watch} name='price.max' label='Khoảng giá' min={0} max={10000000} step={500000} />
            <CheckboxTypeList name='type' setValue={setValue} categoriesData={categoriesData} typeList={typeList} />
            <CheckboxMassList name='mass' setValue={setValue} massData={massData} massList={massList} />
            <button type='submit' className='bg-[#471011] text-sm text-white px-4 py-2'>Áp dụng</button>
        </form>
    )
}

export default SearchBar
