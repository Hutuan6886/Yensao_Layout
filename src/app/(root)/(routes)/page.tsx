import { ProductType } from '@/types/types'
import prismadb from '@/lib/prismadb'

import Carousel from '@/components/Carousel/Carousel'
import ProductsList from '@/components/Products/ProductsList'
import Certification from '@/components/Certification/Certification'
import CategoryFeature from '@/components/Carousel/CategoryFeature'
import CategoryCard from '@/components/Category/CategoryCard'
import Contact from '@/components/Contact/Contact'

import ContainerWithTitle from '@/components/ui/ContainerWithTitle'

const RootPage = async () => {
    const promotionProductsData: ProductType[] = await prismadb.product.findMany({
        where: {
            price: {
                some: {
                    discountPrice: {
                        not: 0
                    }
                }
            }
        },
        include: {
            Category: true,
            image: true,
            price: {
                include: {
                    Mass: true,
                }
            },
            notion: true,
            desc: true
        },
        orderBy: {
            updateAt: 'asc',
        }, take: 6
    })


    return (
        <div className='w-full h-fit'>
            <Carousel />
            <ContainerWithTitle title='SẢN PHẨM KHUYẾN MÃI' desc='Áp dụng cho toàn bộ sản phẩm bên dưới'>
                <ProductsList dataProductsList={promotionProductsData} seeMoreButton={{ href: "/categories" }} typeProductsList='promotion' className='w-[90%] md:w-[80%] m-auto' />
            </ContainerWithTitle>
            <ContainerWithTitle title='DANH MỤC NỔI BẬT' desc='Sản phẩm dộc quyền của Hữu Tuân Nest' className='bg-[#ebe2d9]'>
                <CategoryFeature />
            </ContainerWithTitle>
            <ContainerWithTitle className='bg-[#fafafa]'>
                <CategoryCard />
            </ContainerWithTitle>
            <ContainerWithTitle title='GIẤY CHỨNG NHẬN' desc='Giấy chứng nhận được Cục An toàn thực phẩm - Bộ Y tế cấp phép' className='bg-[#ebe2d9]'>
                <Certification />
            </ContainerWithTitle>
            <ContainerWithTitle className='bg-[#faf7f3]'>
                <Contact />
            </ContainerWithTitle>
        </div>
    )
}

export default RootPage
