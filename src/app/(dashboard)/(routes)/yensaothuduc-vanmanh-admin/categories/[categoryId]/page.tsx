'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import { deleteCategory } from '@/actions/deleteFunc';
import { RootState } from '@/lib/store';
import { closeDeleteCategoryModal, openDeleteCategoryModal } from '@/lib/features/categorySlice/categorySlice';
import { CategoryType } from '@/types/types';

import DeleteModal from '@/components/Modals/DeleteModal';
import CategoryForm from './components/CategoryForm'

import { FcFullTrash } from 'react-icons/fc';
import { useRouter } from 'next/navigation';

const CategoryItemPage = ({ params }: { params: { categoryId: string } }) => {
    const [categoryData, setCategoryData] = useState<CategoryType>({
        id: '',
        name: ''
    })

    const { isOpen, categoryState } = useSelector((state: RootState) => state.category.categoryModal)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        async function getCategoryData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${params.categoryId}`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                })
                if (res.ok) {
                    const data: CategoryType = await res.json()
                    setCategoryData(data)
                } else {
                    console.log("GET CATEGORY DATA FAIL");
                }
            } catch (error) {
                console.log("Internal Error", error);
            }
        }
        getCategoryData()
    }, [params])

    return (
        <>
            <div className='w-full h-full flex flex-col gap-8'>
                <div className=' flex flex-row justify-between items-center'>
                    <label htmlFor="categories" className='font-semibold text-lg text-[#998264]'>{categoryData ? "Cập Nhật Tên Danh Mục Sản Phẩm" : "Tạo Mới Tên Danh Mục Sản Phẩm"}</label>
                    <button className={`w-fit h-fit ${categoryData ? "visible opacity-80 hover:scale-125 hover:opacity-100" : "invisible"} transition`}
                        onClick={() => dispatch(openDeleteCategoryModal(categoryData))}
                    ><FcFullTrash size={35} /></button>
                </div>
                <CategoryForm categoryData={categoryData} />
            </div>
            <DeleteModal isOpen={isOpen} onClose={() => dispatch(closeDeleteCategoryModal())}
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

export default CategoryItemPage
