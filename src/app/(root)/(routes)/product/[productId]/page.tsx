import React from 'react'
import { getProductById } from '@/actions/getPrismaData'
import { ProductType } from '@/types/types'
import ProductView from './components/ProductView'
import ContainerWithTitle from '@/components/ui/ContainerWithTitle'

const page = async ({ params }: { params: { productId: string } }) => {
    const product: ProductType | null = await getProductById(params.productId)
    if (!product) {
        return null
    }

    return (
        <ContainerWithTitle>
            <ProductView product={product} />
        </ContainerWithTitle>
    )
}

export default page
