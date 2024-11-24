'use client'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { CategoryType, MassType, ProductsType } from '@/types/types'

import CategoriesOptionsInput from './CategoriesOptionsInput'
import MassOptionCheckbox from './MassOptionCheckbox'
import NotionListForm from './NotionListForm'
import NotionListTable from './NotionListTable'
import DescriptionListForm from './DescriptionListForm'

import CurrencyInput from '@/components/Input/CurrencyInput'
import TextInput from '@/components/Input/TextInput'
import DescriptionListTable from './DescriptionListTable'

interface ProductFormProps {
    categoriesData: CategoryType[]
    massData: MassType[]
}

const ProductForm: React.FC<ProductFormProps> = ({ categoriesData, massData }) => {
    const { register, setValue, handleSubmit, watch, control } = useForm<ProductsType>({
        defaultValues: {
            title: "",
            imgUrl: [],
            regularPrice: 0,
            discountPrice: 0,
            categoryId: undefined,
            mass: [],
            notion: [],
            desc: [
                {
                    title: "",
                    imgUrl: "",
                    content: ""
                }
            ],
        }
    })

    const { fields: fieldsNotion, remove: removeNotion } = useFieldArray({
        control,
        name: 'notion'
    })
    const { fields: fieldsDescription, remove: removeDescription } = useFieldArray({
        control,
        name: 'desc'
    })

    const submitProductsForm = (data: ProductsType) => {
        console.log("submitProductsForm", data);
    }

    console.log("watch", watch());

    return (
        <form className=' flex flex-col gap-8' onSubmit={handleSubmit(submitProductsForm)}>
            <div>
                IMGURL
            </div>
            <div className='flex flex-col gap-4'>
                <label htmlFor="" className='font-semibold'>THÔNG TIN CƠ BẢN</label>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='col-span-1 flex flex-col gap-3'>
                        <TextInput label='Tên sản phẩm' name='title' register={register} />
                        <CurrencyInput label='Giá sản phẩm (VND)' name='regularPrice' register={register} setValue={setValue} />
                        <CurrencyInput label='Giá khuyến mãi (VND)' name='discountPrice' register={register} setValue={setValue} />
                    </div>
                    <div className='col-span-1 flex flex-col gap-3'>
                        <CategoriesOptionsInput name='categoryId' register={register} data={categoriesData} />
                        <MassOptionCheckbox name='mass' setValue={setValue} watch={watch} massData={massData} label='Khối lượng' />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <label htmlFor="" className='font-semibold'>GHI CHÚ</label>
                <NotionListForm name='notion' setValue={setValue} notionIndex={watch('notion')?.length} />
                <NotionListTable name='notion' setValue={setValue} notionList={watch('notion') || []} />
            </div>
            <div className='flex flex-col gap-4'>
                <label htmlFor="" className='font-semibold'>MÔ TẢ</label>
                <DescriptionListForm name='desc' setValue={setValue} descriptionIndex={watch('desc')?.length} />
                <DescriptionListTable descriptionList={watch('desc') || []} />
            </div>
            <button type='submit' className='w-full h-auto text-white bg-black rounded-[0.375rem] p-2'>Xác Nhận</button>
        </form>
    )
}

export default ProductForm
