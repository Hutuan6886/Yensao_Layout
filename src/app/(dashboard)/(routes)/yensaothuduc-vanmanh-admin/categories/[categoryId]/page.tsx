import React from 'react'
import { getCategoryById } from '@/actions/getPrismaData';
import CategoryForm from './components/CategoryForm'

const CategoryItemPage = async ({ params }: { params: { categoryId: string } }) => {
    const category = await getCategoryById(params.categoryId);

    return (
        <CategoryForm category={category} />
    )
}

export default CategoryItemPage
