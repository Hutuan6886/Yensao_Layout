import React from 'react'
import Link from 'next/link'
import { getMass, getProducts } from '@/actions/getPrismaData';
import { MassType, ProductType, SearchParamsType } from '@/types/types';
import ProductsTable from './components/ProductsTable'

const page = async ({ searchParams }: { searchParams: SearchParamsType }) => {
    const [massData, products]: [MassType[], ProductType[]] = await Promise.all([
        getMass(), getProducts(searchParams, )
    ])

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="products" className='font-semibold text-lg text-[#998264]'>Danh Sách Sản Phẩm</label>
                <Link href='/yensaothuduc-vanmanh-admin/products/new'><button className='border border-[#353333] rounded-[0.5rem] px-4 py-2 hover:border-[#998264] hover:bg-[#998264] hover:text-white transition'>Tạo mới sản phẩm</button></Link>
            </div>
            <ProductsTable products={products} mass={massData} />
        </div>
    )
}

export default page
