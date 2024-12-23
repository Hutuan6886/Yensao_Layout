import { CarouselType, ProductsType } from '@/types/types'
import Carousel from '@/components/Carousel/Carousel'
import ContainerWithTitle from '@/components/ui/ContainerWithTitle'
import ProductsList from '@/components/Products/ProductsList'
import Certification from '@/components/Certification/Certification'


const dataCarousel: CarouselType[] = [
    { title: "Yến Sào Thô", desc: "Yến sào Thượng Hạng hay còn gọi là tổ yến cao cấp tiêu chuẩn đặc biệt được thu hoạch từ hệ thống nhà dẫn dụ yến chuyên nghiệp và được Thượng Yến tuyển chọn để lấy những tổ chất lượng cao nhất. Tiếp sau đó, tổ yến sẽ được làm mềm bằng công nghệ phun lạnh và được những người thợ có tay nghề cao nhất tỉ mỉ gắp từng chiếc lông.", imgUrl: "/images/Nest-picture-4.png" },
    {
        title: "Cách chế biến yến chưng táo đỏ hạt sen", desc: "Bí quyết của giấc ngủ sâu - Yến chưng táo đỏ hạt sen - một sự kết hợp hoàn hảo, mang lại hương vị độc đáo và bổ dưỡng, là lựa chọn tuyệt vời cho những ai yêu thích sự mới lạ trong ẩm thực.Trong bài viết hôm nay của Yến Sào Thuận Mỹ, chúng tôi sẽ chia sẻ cách làm món yến chưng táo đỏ hạt sen không chỉ thơm ngon, đẹp mắt mà còn chứa đầy dưỡng chất.Sự kết hợp ...", imgUrl: "/images/yen-sao-carousel-5.webp"
    },
    { title: "Yến Sào Thượng Hạng", desc: "Yến sào Thượng Hạng hay còn gọi là tổ yến cao cấp tiêu chuẩn đặc biệt được thu hoạch từ hệ thống nhà dẫn dụ yến chuyên nghiệp và được Thượng Yến tuyển chọn để lấy những tổ chất lượng cao nhất. Tiếp sau đó, tổ yến sẽ được làm mềm bằng công nghệ phun lạnh và được những người thợ có tay nghề cao nhất tỉ mỉ gắp từng chiếc lông. Tổ yến được tuyển chọn theo tỉ lệ kim cương (100 tổ lấy 1). Sau khi xử lý vẫn giữ được nguyên vẹn 100% hình dáng ban sơ nhưng sạch lông, tỉ lệ hao hụt dưới 10%. Sản phẩm mang tính thẩm mỹ và tiêu chuẩn tuyệt đối, đáp ứng nhu cầu xuất khẩu sang các thị trường, Mỹ, Úc, Đài Loan, Hongkong… ", imgUrl: "/images/Nest-picture-2.png" },
    { title: "Yến Sào Baby", desc: "", imgUrl: "/images/Nest-picture-3.png" },
]

export const dataProducts: ProductsType[] = [
    { id: '1', title: "Tổ Yến Tinh Chế VIP", image: [{ src: "/images/yen-sao-product-1.jpg" }, { src: "/images/yen-sao-product-2.jpg" }, { src: "/images/yen-sao-product-3.jpg" }], desc: [{ title: "", imgUrl: "", content: "" }], categoryId: '1', price: [{ mass: '10g', regularPrice: 1700000, discountPrice: 0 }, { mass: '20g', regularPrice: 1700000, discountPrice: 0 }, { mass: '50g', regularPrice: 1700000, discountPrice: 0 }], notion: [], Category: { id: '1', name: 'Yến Tinh Chế' } },
    { id: '2', title: "Tổ Yến Rút Lông Nguyên Tổ", image: [{ src: "/images/yen-sao-product-4.jpg" }, { src: "/images/yen-sao-product-5.jpg" }, { src: "/images/yen-sao-product-6.jpg" }], desc: [{ title: "", imgUrl: "", content: "" }], categoryId: '1', price: [{ mass: '10g', regularPrice: 1700000, discountPrice: 0 }, { mass: '20g', regularPrice: 1700000, discountPrice: 0 }, { mass: '50g', regularPrice: 1700000, discountPrice: 0 }], notion: [], Category: { id: '2', name: 'Yến Rút Lông' } },
    { id: '3', title: "Tổ Yến Tinh Chế Loại 1", image: [{ src: "/images/yen-sao-product-7.jpg" }, { src: "/images/yen-sao-product-8.jpg" }, { src: "/images/yen-sao-product-2.jpg" }], desc: [{ title: "", imgUrl: "", content: "" }], categoryId: '1', price: [{ mass: '10g', regularPrice: 1700000, discountPrice: 0 }, { mass: '20g', regularPrice: 1700000, discountPrice: 0 }, { mass: '50g', regularPrice: 1700000, discountPrice: 0 }], notion: [], Category: { id: '3', name: 'Yến Tinh Chế' } },
]
const dataCertification: string[] = ["/images/kiem-dinh-yen-sao-vietfarm-1.jpg", "/images/kiem-dinh-yen-sao-vietfarm-2.jpg", "/images/tu-cong-bo-yen-sao-vietfarm-1.jpg", "/images/tu-cong-bo-yen-sao-vietfarm-2.jpg"]
const RootPage = () => {

    return (
        <div className='w-full h-fit'>
            <Carousel dataCarousel={dataCarousel} isAutoSlide={false} autoSlideInterval={7000} />
            <ContainerWithTitle title='SẢN PHẨM KHUYẾN MÃI' desc='hád a sjdhjash  jahsdjh  jhasjkdh j jahsk jdh jhas d hád a sjdhjash'>
                <ProductsList dataProductsList={dataProducts} seeMoreButton={true} className='w-[90%] md:w-[80%] m-auto' />
            </ContainerWithTitle>
            <ContainerWithTitle title='SẢN PHẨM NỔI BẬT' desc='hád a sjdhjash  jahsdjh  jhasjkdh j jahsk jdh jhas d hád'>
                <ProductsList dataProductsList={dataProducts} seeMoreButton={true} className='w-[90%] md:w-[80%] m-auto' />
            </ContainerWithTitle>
            <Certification dataCertification={dataCertification} />
        </div>
    )
}

export default RootPage
