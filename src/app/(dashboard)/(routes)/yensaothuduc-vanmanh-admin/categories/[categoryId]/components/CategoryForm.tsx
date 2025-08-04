'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { RootState } from '@/lib/store'
import { closeDeleteCategoryModal } from '@/lib/features/categorySlice/categorySlice'
import { deleteCategory } from '@/actions/deleteFunc'
import { CategoryType } from '@/types/types'
import DeleteModal from '@/components/Modals/DeleteModal'
import { postNewCategory } from '@/actions/postFunc'
import { updateCategory } from '@/actions/putFunc'

interface CategoryFormProps {
    category: CategoryType | null
}
const CategoryForm: React.FC<CategoryFormProps> = ({ category }) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { isOpen, categoryState } = useSelector((state: RootState) => state.category.categoryModal)
    const { register, handleSubmit, resetField } = useForm<CategoryType>({
        defaultValues: {
            name: category ? category.name : ""
        }
    })

    const submitCategoryForm = async (data: CategoryType) => {
        let res: CategoryType
        if (!category) res = await postNewCategory<CategoryType>(data)
        else res = await updateCategory<CategoryType>(category.id, data)
        if (res) {
            router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/categories/new`)
            router.refresh()
        }
    }

    return (
        <>
            <form className='flex flex-row items-center justify-center gap-8' onSubmit={handleSubmit(submitCategoryForm)} >
                <div className='flex flex-row items-center justify-start gap-3'>
                    <h3 className='font-semibold'>Tên danh mục</h3>
                    <input {...register("name")} type="text" placeholder='Yến sào' className='w-[300px] rounded-[0.5rem] p-2 placeholder:text-sm' />
                </div>
                <div className='flex flex-row items-center justify-center gap-2'>
                    <button type='button' className='bg-[#353333] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#4D4848] transition' onClick={() => resetField("name", { defaultValue: category?.name })}>Hoàn Tác</button>
                    <button type='submit' className='bg-[#998264] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#a59075] transition'>{category ? "Cập Nhật" : "Tạo Mới"}</button>
                </div>
            </form>
            <DeleteModal isOpen={isOpen} onClose={() => dispatch(closeDeleteCategoryModal())}
                onSubmit={() => {
                    deleteCategory(categoryState.id).then(() => {
                        router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/categories`)
                        router.refresh()
                        dispatch(closeDeleteCategoryModal())
                    })
                }}
                title={`Bạn Muốn Xoá Danh Mục ${categoryState.name} ?`} desc={`Danh mục ${categoryState.name} sẽ bị xoá vĩnh viễn`} /></>
    )
}

export default CategoryForm
