import React from 'react'
import Link from 'next/link'
import ProductsTable from './components/ProductsTable'

const page = () => {
    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="products" className='font-semibold text-lg'>Danh Sách Sản Phẩm</label>
                <Link href='/yensaothuduc-vanmanh-admin/products/new'><button className='border border-[#353333] rounded-[0.5rem] px-4 py-2 hover:border-[#6ab187] hover:bg-[#6ab187] hover:text-white transition'>Tạo mới sản phẩm</button></Link>
            </div>
            <ProductsTable />
        </div>
    )
}

export default page
