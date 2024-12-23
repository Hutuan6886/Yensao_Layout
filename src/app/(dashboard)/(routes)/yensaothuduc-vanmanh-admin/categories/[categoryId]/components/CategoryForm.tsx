'use client'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { CategoryType } from '@/types/types'

interface CategoryFormProps {
    categoryData: CategoryType | undefined
}
const CategoryForm: React.FC<CategoryFormProps> = ({ categoryData }) => {
    const router = useRouter()

    const { register, setValue, handleSubmit, resetField } = useForm<CategoryType>()

    useEffect(() => {
        if (categoryData) {
            setValue("name", categoryData.name)
        }
    }, [setValue, categoryData])

    const submitCategoryForm = async (data: CategoryType) => {
        try {
            if (!categoryData) {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
                    credentials: "include",
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (res.ok) {
                    const category = await res.json()
                    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/categories`)
                    router.refresh()
                    console.log("Create category successfully!", category);
                } else {
                    console.log("Create category fail!");
                }
            } else {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories/${categoryData.id}`, {
                    credentials: "include",
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                if (res.ok) {
                    const category = await res.json()
                    router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/categories`)
                    router.refresh()
                    console.log("Update category successfully!", category);
                } else {
                    console.log("Update category fail!");
                }
            }
        } catch (error) {
            console.log("CREATED_CATEGORY", error);
        }
    }
    return (
        <form className='flex flex-row items-center justify-center gap-8' onSubmit={handleSubmit(submitCategoryForm)} >
            <div className='flex flex-row items-center justify-start gap-3'>
                <h3 className='font-semibold'>Tên danh mục</h3>
                <input {...register("name")} type="text" placeholder='Yến sào' className='w-[300px] rounded-[0.5rem] p-2 placeholder:text-sm' />
            </div>
            <div className='flex flex-row items-center justify-center gap-2'>
                <button type='button' className='bg-[#353333] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#4D4848] transition' onClick={() => resetField("name", { defaultValue: categoryData?.name })}>Hoàn Tác</button>
                <button type='submit' className='bg-[#998264] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#a59075] transition'>{categoryData ? "Cập Nhật" : "Tạo Mới"}</button>
            </div>
        </form>
    )
}

export default CategoryForm
