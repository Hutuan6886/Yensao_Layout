import React from 'react'
import { dataProducts } from '../../page'
import ProductsList from '@/components/Products/ProductsList'
import ContainerWithTitle from '@/components/ui/ContainerWithTitle'

const CategoryItemPage = ({ params }: { params: { productId: string } }) => {
    return (
        <ContainerWithTitle title="Sản Phẩm">
            <div className='w-[95%] m-auto h-fit '>
                <ProductsList dataProductsList={dataProducts} seeMoreButton={false} />
            </div>
        </ContainerWithTitle>
    )
}

export default CategoryItemPage
