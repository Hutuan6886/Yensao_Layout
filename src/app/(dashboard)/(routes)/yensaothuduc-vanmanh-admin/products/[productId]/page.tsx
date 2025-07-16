import React from 'react'
import { getCategories, getMass, getProductById } from '@/actions/getPrismaData'
import { CategoryType, MassType, ProductType } from '@/types/types'
import ProductForm from './components/ProductForm'


const page = async ({ params }: { params: { productId: string } }) => {
    const [massData, categoriesData, productData]: [MassType[], CategoryType[], ProductType | null] = await Promise.all([
        getMass(), getCategories(), getProductById(params.productId)
    ])

    return (
        <ProductForm productId={params.productId} productData={productData} categoriesData={categoriesData} massData={massData} />
    )
}

export default page
