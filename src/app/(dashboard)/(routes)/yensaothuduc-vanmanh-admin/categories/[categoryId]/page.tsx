import React from 'react'
import { getCategoryById } from '@/actions/getPrismaData';
import CategoryForm from './components/CategoryForm'

const CategoryItemPage = async ({ params }: { params: { categoryId: string } }) => {
    const category = await getCategoryById(params.categoryId);

    return (
        <>
            <div className='w-full h-full flex flex-col gap-8'>
                <div className=' flex flex-row justify-between items-center'>
                    <label htmlFor="categories" className='font-semibold text-lg text-[#998264]'>{category ? "Cập Nhật Tên Danh Mục Sản Phẩm" : "Tạo Mới Tên Danh Mục Sản Phẩm"}</label>
                </div>
                <CategoryForm category={category} />
            </div>

        </>
    )
}

export default CategoryItemPage
