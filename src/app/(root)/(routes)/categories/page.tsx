import React from 'react'
import ProductsList from '@/components/Products/ProductsList'
import { dataProducts } from '../page'

import ContainerWithTitle from '@/components/ui/ContainerWithTitle';
import SearchBar from './components/SearchBar';

const CategoriesPage = () => {
    return (
        <ContainerWithTitle title="Sản Phẩm">
            <div className='w-[95%] m-auto h-fit '>
                <div className='grid grid-cols-5 gap-5'>
                    <div className='col-span-1'>
                        <SearchBar />
                    </div>
                    <div className='col-span-4'>
                        <ProductsList dataProductsList={dataProducts} seeMoreButton={false} />
                    </div>
                </div>
            </div>
        </ContainerWithTitle>

    )
}

export default CategoriesPage
