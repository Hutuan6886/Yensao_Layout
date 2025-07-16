import React from 'react'
import Link from 'next/link'
import { getCategories } from '@/actions/getPrismaData'
import { CategoryType } from '@/types/types'
import CategoriesTable from './components/CategoriesTable'

const page = async () => {
    //todo: get all categories from prisma
    const allCategories: CategoryType[] = await getCategories()

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="categories" className='font-semibold text-lg text-[#998264]'>Danh Sách Danh Mục Sản Phẩm</label>
                <Link href='/yensaothuduc-vanmanh-admin/categories/new' ><button className='border border-[#353333] rounded-[0.5rem] px-4 py-2 hover:border-[#998264] hover:bg-[#998264] hover:text-white transition'>Tạo mới danh mục</button></Link>
            </div>
            <CategoriesTable categoriesData={allCategories} />
        </div >
    )
}

export default page
