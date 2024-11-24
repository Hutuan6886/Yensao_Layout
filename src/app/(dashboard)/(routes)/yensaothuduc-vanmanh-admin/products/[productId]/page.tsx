import React from 'react'
import prismadb from '@/lib/prismadb'
import ProductForm from './components/ProductForm'
import { FcFullTrash } from 'react-icons/fc'

const page = async ({ params }: { params: { productId: string } }) => {
    const productData = await prismadb.product.findFirst({
        where: {
            id: params.productId
        }
    })
    const allCategories = await prismadb.category.findMany()
    const allMass = await prismadb.mass.findMany()
    return (
        <div className='w-full h-fit flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="categories" className='font-semibold text-lg'>{productData ? "Cập Nhật Sản Phẩm" : "Tạo Mới Sản Phẩm"}</label>
                <button className={`w-fit h-fit ${productData ? "visible opacity-80 hover:scale-125 hover:opacity-100" : "invisible"} transition`}
                // onClick={() => dispatch(openDeleteCategoryModal(categoryData))}
                ><FcFullTrash size={35} /></button>
            </div>
            <ProductForm categoriesData={allCategories} massData={allMass} />
        </div>
    )
}

export default page
