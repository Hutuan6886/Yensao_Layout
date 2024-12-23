'use client'
import React, { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

import { formatterCurrency } from '@/lib/utils'
import { MassType, PriceType, ProductsType } from '@/types/types'
import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineDragIndicator } from 'react-icons/md'
import DeleteModal from '@/components/Modals/DeleteModal'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { closeDeleteProductModal, openDeleteProductModal } from '@/lib/features/productSlice/productSlice'
import { deleteProduct } from '@/actions/deleteFunc'

interface ProductsTableProps {
    products: ProductsType[]
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
                        <th className='p-3'>Giá khuyến mãi</th>
                        <th className='p-3'>Thời gian tạo</th>
                        <th className='p-3'>Thời gian cập nhật</th>
                        <th className='p-3'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product: ProductsType, i: number) => (
                            <tr key={i} className='text-sm text-center cursor-pointer hover:bg-zinc-200 transition'
                                onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/products/${product.id}`)}
                            >
                                <td className='border-b border-t py-2 cursor-grab'>
                                    <div className='flex flex-row items-center justify-center'>
                                        <MdOutlineDragIndicator size={17} />
                                    </div>
                                </td>
                                <td className='border-b border-t py-2'>{product.Category.name}</td>
                                <td className='border-b border-t py-2'>{product.title}</td>
                                <td className=' flex flex-row justify-center items-center border-b border-t py-2'>
                                    <Image src={product.image[0].src} alt='product-img' width={0} height={0} sizes='100vw' className='size-16 rounded-[0.375rem]' />
                                </td>
                                <td className='border-b border-t py-2'>
                                    {product.price.map((priceItem: PriceType, i: number) => (
                                        <p key={i} className='py-0.5'>{mass.find((item: MassType) => item.id === priceItem.mass)?.value}</p>
                                    ))}
                                </td>
                                <td className='border-b border-t py-2'>
                                    {product.price.map((priceItem: PriceType, i: number) => (
                                        <p key={i} className='py-0.5'>{formatterCurrency.format(priceItem.regularPrice)}</p>
                                    ))}
                                </td>
                                <td className='border-b border-t py-2'>
                                    {product.price.map((priceItem: PriceType, i: number) => (
                                        <p key={i} className='text-rose-900 py-0.5'>{priceItem.discountPrice ? formatterCurrency.format(priceItem.discountPrice) : '-'}</p>
                                    ))}
                                </td >
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
                    }
                </tbody>
            </table>
            <div className='w-full h-auto'>
                {products.length === 0 && <p className='w-full italic text-center text-xs tracking-wide'>Chưa có dữ liệu !</p>}
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

export default ProductsTable
