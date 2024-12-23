import React from 'react'
import Link from 'next/link'
import ProductsTable from './components/ProductsTable'
import prismadb from '@/lib/prismadb';
import { ProductsType } from '@/types/types';

const page = async () => {
    const products: ProductsType[] = await prismadb.product.findMany({
        include: {
            Category: true,
            image: true,
            price: true,
            notion: true,
            desc: true,
        },
    });

    const allMass = await prismadb.mass.findMany()

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="products" className='font-semibold text-lg text-[#998264]'>Danh Sách Sản Phẩm</label>
                <Link href='/yensaothuduc-vanmanh-admin/products/new'><button className='border border-[#353333] rounded-[0.5rem] px-4 py-2 hover:border-[#998264] hover:bg-[#998264] hover:text-white transition'>Tạo mới sản phẩm</button></Link>
            </div>
            <ProductsTable products={products} mass={allMass} />
        </div>
    )
}

export default page
