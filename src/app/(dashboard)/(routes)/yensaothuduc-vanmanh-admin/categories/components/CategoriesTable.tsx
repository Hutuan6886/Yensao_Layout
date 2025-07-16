'use client'
import React, { Fragment, MouseEvent, useEffect, useState, DragEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

import { RootState } from '@/lib/store'
import { deleteCategory } from '@/actions/deleteFunc'
import { CategoryType } from '@/types/types'
import { closeDeleteCategoryModal, openDeleteCategoryModal } from '@/lib/features/categorySlice/categorySlice'

import DeleteModal from '@/components/Modals/DeleteModal'

import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineDragIndicator } from 'react-icons/md'

interface CategoriesTableProps {
    categoriesData: CategoryType[]
}

const CategoriesTable: React.FC<CategoriesTableProps> = ({ categoriesData }) => {
    const [isMounted, setIsMounted] = useState<boolean>(false)

    const { isOpen, categoryState } = useSelector((state: RootState) => state.category.categoryModal)
    const dispatch = useDispatch()

    const router = useRouter()

    useEffect(() => {
        if (!isMounted) {
            setIsMounted(true)
        }
    }, [isMounted, setIsMounted])

    if (!isMounted) {
        return null
    }

    return (
        <>
            <table className='border-separate border-spacing-y-3'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='p-3'>Tên danh mục</th>
                        <th className='p-3'>Thời gian tạo</th>
                        <th className='p-3'>Thời gian cập nhật</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        categoriesData.length !== 0 ? categoriesData.map((category: CategoryType, i: number) => (
                            <Fragment key={category.id}>
                                <tr className='text-sm text-center cursor-pointer hover:bg-zinc-200 transition'
                                    onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/categories/${category.id}`)}
                                >
                                    <td className='border-b border-t py-2'>
                                        <div className='flex flex-row items-center justify-center'>
                                            <MdOutlineDragIndicator size={17} />
                                        </div>
                                    </td>
                                    <td className='border-b border-t py-2'>{category.name}</td>
                                    <td className='border-b border-t py-2'>{category.createAt?.toDateString()}</td>
                                    <td className='border-b border-t py-2'>{category.updateAt?.toDateString()}</td>
                                    <td className='border-b border-t py-2'>
                                        <div className='w-fit h-fit cursor-pointer group'
                                            onClick={(e: MouseEvent) => {
                                                e.stopPropagation();
                                                dispatch(openDeleteCategoryModal(category))
                                            }}
                                        ><IoCloseOutline className='group-hover:scale-125 transition' size={20} />
                                        </div>
                                    </td>
                                </tr>
                            </Fragment>
                        ))
                            : <tr>
                                <td colSpan={5} className='italic text-center text-xs tracking-wide'>Chưa có dữ liệu !</td>
                            </tr>
                    }
                </tbody>
            </table>
            < DeleteModal isOpen={isOpen} onClose={() => dispatch(closeDeleteCategoryModal())}
                onSubmit={() => {
                    deleteCategory(categoryState.id).then(() => {
                        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/categories`)
                        router.refresh()
                        dispatch(closeDeleteCategoryModal())
                    })
                }}
                title={`Bạn Muốn Xoá Danh Mục ${categoryState.name} ?`} desc={`Danh mục ${categoryState.name} sẽ bị xoá vĩnh viễn`} />
        </>
    )
}

export default CategoriesTable
