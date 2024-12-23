'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useParams, useRouter } from 'next/navigation'

import { formatterCurrencyInput } from '@/lib/utils'
import { CategoryType, MassType, PriceType, ProductsType } from '@/types/types'

import UploadImageProductList from './UploadImageProductList'
import CategoriesOptionsInput from './CategoriesOptionsInput'
import NotionListForm from './NotionListForm'
import NotionListTable from './NotionListTable'
import DescriptionListForm from './DescriptionListForm'
import DescriptionListTable from './DescriptionListTable'

import TextInput from '@/components/Input/TextInput'
import ImageProductList from './ImageProductList'
import PriceAndMassOption from './PriceAndMassOption'

interface ProductFormProps {
    categoriesData: CategoryType[]
    massData: MassType[]
    productData: ProductsType | null
}

const ProductForm: React.FC<ProductFormProps> = ({ productData, categoriesData, massData }) => {
    const { productId } = useParams()
    const router = useRouter()
    const { register, setValue, handleSubmit, watch,
        // control 
    } = useForm<ProductsType>({
        defaultValues: productData
            ? {
                title: productData.title,
                categoryId: productData.categoryId,
                image: productData.image,
                price: productData.price.map((item: PriceType) => (
                    {
                        mass: item.mass,
                        regularPrice: formatterCurrencyInput.format(item.regularPrice as number),
                        discountPrice: formatterCurrencyInput.format(item.discountPrice as number)
                    }
                )),
                notion: productData.notion,
                desc: productData.desc,
            }
            : {
                title: "",
                categoryId: undefined,
                image: [],
                price: [],
                notion: [],
                desc: [],
            }
    })

    // //todo: Create mutiple form
    // const { fields: fieldsNotion, remove: removeNotion } = useFieldArray({
    //     control,
    //     name: 'notion'
    // })
    // const { fields: fieldsDescription, remove: removeDescription } = useFieldArray({
    //     control,
    //     name: 'desc'
    // })

    const submitProductsForm = async (data: ProductsType) => {
        try {
            if (productData?.id !== productId) {
                //todo: POST DATA
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (res.ok) {
                    const productCreated = await res.json()
                    console.log("Create product successfully!", productCreated);
                } else {
                    console.log("Create product fail!");
                }
            } else {
                //todo: Update DATA
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${productId}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (res.ok) {
                    const productUpdated = await res.json()
                    console.log("Update product successfully!", productUpdated);
                } else {
                    console.log("Update product fail!");
                }
            }
        } catch (error) {
            console.error("CREATED_UPDATED_PRODUCT", error);
        } finally {
            router.push(`/yensaothuduc-vanmanh-admin/products`)
        }
    }

    console.log("watch", watch());

    return (
        <form className=' flex flex-col gap-8' onSubmit={handleSubmit(submitProductsForm)}>
            <div className='flex flex-col gap-4'>
                <label htmlFor="" className='font-semibold'>HÌNH ẢNH SẢN PHẨM</label>
                <UploadImageProductList name='image' setValue={setValue} watch={watch} />
                <ImageProductList name='image' setValue={setValue} imageList={watch('image') || []} />
            </div>
            <div className='flex flex-col gap-4'>
                <label htmlFor="" className='font-semibold'>THÔNG TIN CƠ BẢN</label>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='col-span-1 flex flex-col gap-3'>
                        <TextInput label='Tên sản phẩm' name='title' register={register} />
                    </div>
                    <div className='col-span-1 flex flex-col gap-3'>
                        <CategoriesOptionsInput name='categoryId' register={register} data={categoriesData} />

                    </div>
                </div>
                <PriceAndMassOption name='price' register={register} setValue={setValue} watch={watch} massData={massData} />
            </div>
            <div className='flex flex-col gap-4'>
                <label htmlFor="" className='font-semibold'>GHI CHÚ</label>
                <div className='grid grid-cols-2 gap-2'>
                    <div className='col-span-1'>
                        <NotionListForm name='notion' setValue={setValue} notionIndex={watch('notion')?.length} />
                    </div>
                    <div className='col-span-1'>
                        <NotionListTable name='notion' setValue={setValue} notionList={watch('notion') || []} />
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <label htmlFor="" className='font-semibold'>MÔ TẢ</label>
                <DescriptionListForm name='desc' setValue={setValue} descriptionIndex={watch('desc')?.length} />
                <DescriptionListTable name='desc' setValue={setValue} descriptionList={watch('desc') || []} />
            </div>
            <button type='submit' className='w-full h-auto text-white bg-[#998264] rounded-[0.375rem] p-2'>Xác Nhận</button>
        </form>
    )
}

export default ProductForm
