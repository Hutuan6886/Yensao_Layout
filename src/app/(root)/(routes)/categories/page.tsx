import React from 'react'
import { CategoryType, MassType, ProductType, SearchParamsType } from '@/types/types';

import ProductsList from '@/components/Products/ProductsList'

import ContainerWithTitle from '@/components/ui/ContainerWithTitle';
import SearchBar from './components/SearchBar';
import { getCategories, getMass, getProducts } from '@/actions/getPrismaData';
import Sort from './components/Sort';

const CategoriesPage = async ({ searchParams }: { searchParams: SearchParamsType }) => {
    const [massData, categoriesData]: [MassType[], CategoryType[]] = await Promise.all([
        getMass(), getCategories()
    ])
    const productsData: ProductType[] = await getProducts(searchParams);
    const totalProducts: number = await getProducts({ ...searchParams, limit: undefined }).then(products => products.length);

    return (
        <ContainerWithTitle title="Tất Cả Sản Phẩm">
            <div className='grid grid-cols-5 gap-5'>
                <div className='col-span-1'>
                    <SearchBar categoriesData={categoriesData} massData={massData} searchParams={searchParams} />
                </div>
                <div className='col-span-4 flex flex-col gap-5'>
                    <Sort searchParams={searchParams} />
                    <ProductsList dataProductsList={productsData} totalProducts={totalProducts} />
                </div>
            </div>
        </ContainerWithTitle>

    )
}

export default CategoriesPage

