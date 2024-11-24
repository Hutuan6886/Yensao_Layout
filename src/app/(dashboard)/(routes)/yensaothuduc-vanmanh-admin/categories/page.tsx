import React from 'react'
import Link from 'next/link'
import CategoriesTable from './components/CategoriesTable'
import prismadb from '@/lib/prismadb'

const page = async () => {
    //todo: get all categories from prisma
    const allCategories = await prismadb.category.findMany()

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="categories" className='font-semibold text-lg'>Danh Sách Danh Mục Sản Phẩm</label>
                <Link href='/yensaothuduc-vanmanh-admin/categories/new' ><button className='border border-[#353333] rounded-[0.5rem] px-4 py-2 hover:border-[#6ab187] hover:bg-[#6ab187] hover:text-white transition'>Tạo mới danh mục</button></Link>
            </div>
            <CategoriesTable categoriesData={allCategories} />
        </div >
    )
}

export default page
