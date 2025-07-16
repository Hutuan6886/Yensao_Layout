'use client'
import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { formatterCurrency } from '@/lib/utils'
import { closeDeleteProductModal, openDeleteProductModal } from '@/lib/features/productSlice/productSlice'
import { RootState } from '@/lib/store'
import { deleteProduct } from '@/actions/deleteFunc'
import { MassType, PriceType, ProductType } from '@/types/types'

import DeleteModal from '@/components/Modals/DeleteModal'

import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineDragIndicator } from 'react-icons/md'


interface ProductsTableProps {
    products: ProductType[]
    mass: MassType[]
}

const ProductsTable = ({ products, mass }: ProductsTableProps) => {
    const router = useRouter()
    const { isOpen, productState } = useSelector((state: RootState) => state.product.productModal)
    const dispatch = useDispatch()
    return (
        <>
            <table className='border-separate border-spacing-y-3'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='p-3'>Danh mục</th>
                        <th className='p-3'>Tiêu đề</th>
                        <th className='p-3'>Hình ảnh</th>
                        <th className='p-3'>Phân loại</th>
                        <th className='p-3'>Giá</th>
                        <th className='p-3'>Thời gian tạo</th>
                        <th className='p-3'>Thời gian cập nhật</th>
                        <th className='p-3'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length !== 0 ? products.map((product: ProductType, i: number) => (
                            <tr key={i} className=' text-sm text-center cursor-pointer hover:bg-zinc-200 transition'
                                onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/products/${product.id}`)}
                            >
                                <td className='border-b border-t py-2'>
                                    <div className='flex flex-row items-center justify-center'>
                                        <MdOutlineDragIndicator size={17} />
                                    </div>
                                </td>
                                <td className='border-b border-t py-2'>{product.Category.name}</td>
                                <td className='border-b border-t py-2'>{product.title}</td>
                                <td className='border-b border-t py-2'>
                                    <Image src={product.image[0].src} alt='product-img' width={0} height={0} sizes='100vw' className='size-16 m-auto rounded-[0.375rem]' />
                                </td>
                                <td className='border-b border-t py-2'>
                                    {product.price.map((priceItem: PriceType, i: number) => (
                                        <p key={i} className='py-0.5'>{mass.find((item: MassType) => item.id === priceItem.massId)?.value}g</p>
                                    ))}
                                </td>
                                <td className='border-b border-t py-2'>
                                    {product.price.map((priceItem: PriceType, i: number) => (
                                        priceItem.regularPrice !== 0 && <div key={i} className='flex flex-row items-center justify-start gap-5'>
                                            <p className='py-0.5'>{formatterCurrency.format(priceItem.regularPrice)}</p>
                                            - <p className='text-rose-900 py-0.5'>{priceItem.discountPrice && formatterCurrency.format(priceItem.discountPrice)}</p>
                                        </div>
                                    ))}
                                </td>
                                <td className='border-b border-t py-2'>{product.createAt?.toDateString()}</td>
                                <td className='border-b border-t py-2'>{product.updateAt?.toDateString()}</td>
                                <td className='border-b border-t py-2'>
                                    <div className='w-fit h-fit cursor-pointer group'
                                        onClick={(e: MouseEvent) => {
                                            e.stopPropagation();
                                            dispatch(openDeleteProductModal(product))
                                        }}
                                    ><IoCloseOutline className='group-hover:scale-125 transition' size={20} />
                                    </div>
                                </td>
                            </tr>
                        ))
                            :
                            <tr>
                                <td colSpan={9} className='italic text-center text-xs tracking-wide'>Chưa có dữ liệu !</td>
                            </tr>
                    }
                </tbody>
            </table>
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

export default ProductsTable
