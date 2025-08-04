import React from 'react'
import { getCategories } from '@/actions/getPrismaData'
import { CategoryType } from '@/types/types'
import CategoriesTable from './components/CategoriesTable'

const layout = async ({ children }: Readonly<{ children: React.ReactNode }>) => {
    //todo: get all categories from prisma
    const allCategories: CategoryType[] = await getCategories()
    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="categories" className='font-semibold text-lg text-[#998264]'>Danh Sách Danh Mục Sản Phẩm</label>
            </div>
            {children}
            <CategoriesTable categories={allCategories} />
        </div >
    )
}

export default layout
