'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { closeDeleteProductModal, openDeleteProductModal } from '@/lib/features/productSlice/productSlice'
import { RootState } from '@/lib/store'
import { formatterCurrencyInput } from '@/lib/utils'
import { deleteProduct } from '@/actions/deleteFunc'
import { CategoryType, DescriptionType, ImageType, MassType, NotionType, PriceType, ProductType } from '@/types/types'
import { ProductFormType, ProductPriceObject } from '@/types/form-types'

import UploadImageProductList from './UploadImageProductList'
import CategoriesOptionsInput from './CategoriesOptionsInput'
import NotionListForm from './NotionListForm'
import NotionListTable from './NotionListTable'
import DescriptionListForm from './DescriptionListForm'
import DescriptionListTable from './DescriptionListTable'
import ImageProductList from './ImageProductList'
import PriceAndMassOption from './PriceAndMassOption'

import DeleteModal from '@/components/Modals/DeleteModal'
import TextInput from '@/components/Input/TextInput'

import { FcFullTrash } from 'react-icons/fc'

interface ProductFormProps {
    categoriesData: CategoryType[]
    massData: MassType[]
    productId: string
    productData: ProductType | null
}

const ProductForm: React.FC<ProductFormProps> = ({ productData, categoriesData, productId, massData }) => {
    const router = useRouter()
    const { isOpen, productState } = useSelector((state: RootState) => state.product.productModal)
    const dispatch = useDispatch()
    const { register, getValues, setValue, handleSubmit, watch,
        // control 
    } = useForm<ProductFormType>({
        defaultValues: productData
            ? {
                title: productData.title,
                categoryId: productData.categoryId,
                image: productData.image,
                price: productData.price.reduce((acc: Record<string, ProductPriceObject>, item: PriceType) => {
                    acc[item.massId] = {
                        regularPrice: formatterCurrencyInput.format(item.regularPrice),
                        discountPrice: item.discountPrice
                            ? formatterCurrencyInput.format(item.discountPrice)
                            : '',
                    };
                    return acc;
                }, {} as ProductFormType['price']),
                notion: productData.notion,
                desc: productData.desc,
            }
            : {
                title: "",
                categoryId: undefined,
                image: [],
                price: {},
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

    const submitProductsForm = async (data: ProductFormType) => {
        const formattedImage = data.image.map((item: ImageType) => ({
            src: item.src,
        }))
        const convertedPriceArray = Object.entries(data.price).map(([massId, value]) => ({
            massId,
            regularPrice: Number(value.regularPrice.toString().split(".").join("")),
            discountPrice: value.discountPrice ? Number(value.discountPrice.toString().split(".").join("")) : 0
        })).sort((a, b) => a.regularPrice - b.regularPrice);
        const formattedNotion = data.notion.map((item: NotionType) => ({
            title: item.title,
            content: item.content,
        }))
        const formattedDesc = data.desc.map((item: DescriptionType) => ({
            title: item.title,
            imgUrl: item.imgUrl,
            content: item.content,
        }));
        try {
            if (productData?.id !== productId) {
                //todo: POST DATA
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...data,
                        image: formattedImage,
                        price: convertedPriceArray
                    })
                })
                if (res.ok) {
                    const productCreated = await res.json()
                    router.push(`/yensaothuduc-vanmanh-admin/products`)
                    router.refresh()
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
                    body: JSON.stringify({
                        ...data,
                        image: formattedImage,
                        price: convertedPriceArray,
                        notion: formattedNotion,
                        desc: formattedDesc
                    })
                })
                if (res.ok) {
                    const productUpdated = await res.json()
                    router.push(`/yensaothuduc-vanmanh-admin/products`)
                    router.refresh()
                    console.log("Updated product successfully!", productUpdated);
                } else {
                    console.log("Update product fail!");
                }
            }
        } catch (error) {
            console.error("CREATED_UPDATED_PRODUCT", error);
        }
    }
    return (
        <>
            <div className='w-full h-fit flex flex-col gap-8'>
                <div className=' flex flex-row justify-between items-center'>
                    <label htmlFor="categories" className='font-semibold text-lg text-[#998264]'>{productData ? "Cập Nhật Sản Phẩm" : "Tạo Mới Sản Phẩm"}</label>
                    {
                        productData
                            ? <button className={`w-fit h-fit opacity-80 hover:scale-125 hover:opacity-100 transition`}
                                onClick={() => dispatch(openDeleteProductModal(productData))}
                            ><FcFullTrash size={35} /></button>
                            : null
                    }
                </div>
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
                                <NotionListForm name='notion' getValues={getValues} setValue={setValue} />
                            </div>
                            <div className='col-span-1'>
                                <NotionListTable name='notion' setValue={setValue} notionList={watch('notion') || []} />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <label htmlFor="" className='font-semibold'>MÔ TẢ</label>
                        <DescriptionListForm name='desc' setValue={setValue} getValues={getValues} />
                        <DescriptionListTable name='desc' setValue={setValue} descriptionList={watch('desc') || []} />
                    </div>
                    <button type='submit' className='w-full h-auto text-white bg-[#998264] rounded-[0.375rem] p-2'>Xác Nhận</button>
                </form>
            </div>
            <DeleteModal title={`Bạn Muốn Xoá Sản Phẩm ${productState.title} ?`} desc={`Sản phẩm ${productState.title} sẽ bị xoá vĩnh viễn`} isOpen={isOpen}
                onSubmit={() => {
                    deleteProduct(productState.id).then(() => {
                        router.refresh()
                        dispatch(closeDeleteProductModal())
                    })
                }}
                onClose={() => dispatch(closeDeleteProductModal())} />
        </>
    )
}

export default ProductForm
