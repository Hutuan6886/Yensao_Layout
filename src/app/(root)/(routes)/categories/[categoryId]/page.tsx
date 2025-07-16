import React from 'react'
import { CategoryType, ProductType } from '@/types/types'
import ProductsList from '@/components/Products/ProductsList'
import ContainerWithTitle from '@/components/ui/ContainerWithTitle'
import { getCategoryById, getProductsByCategoryId } from '@/actions/getPrismaData'

const CategoryItemPage = async ({ params }: { params: { categoryId: string } }) => {
    const [category, products]: [CategoryType | null, ProductType[]] = await Promise.all([getCategoryById(params.categoryId), getProductsByCategoryId(params.categoryId)])

    return (
        <ContainerWithTitle title={`Danh Mục ${category?.name}`}>
            <div className='w-[95%] m-auto h-fit '>
                <ProductsList dataProductsList={products} />
            </div>
        </ContainerWithTitle>
    )
}

export default CategoryItemPage

