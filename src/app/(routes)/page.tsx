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

const dataProducts: ProductsType[] = [
    { id: '1', title: "Tổ Yến Tinh Chế VIP", imgUrl: ["/images/yen-sao-product-1.jpg", "/images/yen-sao-product-2.jpg", "/images/yen-sao-product-3.jpg"], desc: [{ title: "", imgUrl: "", content: "" }], type: "", mass: [50, 100, 250], regularPrice: 2900000, },
    { id: '2', title: "Tổ Yến Rút Lông Nguyên Tổ", imgUrl: ["/images/yen-sao-product-4.jpg", "/images/yen-sao-product-5.jpg", "/images/yen-sao-product-6.jpg"], desc: [{ title: "", imgUrl: "", content: "" }], type: "", mass: [50, 100, 250], regularPrice: 6200000, },
    { id: '3', title: "Tổ Yến Tinh Chế Loại 1", imgUrl: ["/images/yen-sao-product-7.jpg", "/images/yen-sao-product-8.jpg", "/images/yen-sao-product-2.jpg"], desc: [{ title: "", imgUrl: "", content: "" }], type: "", mass: [50, 100, 250], regularPrice: 2450000, },
    { id: '4', title: "Tổ Yến Tinh Chế Loại 2", imgUrl: ["/images/yen-sao-product-1.jpg", "/images/yen-sao-product-5.jpg", "/images/yen-sao-product-4.jpg"], desc: [{ title: "", imgUrl: "", content: "" }], type: "", mass: [50, 100, 250], regularPrice: 2150000, },
]
const dataCertification: string[] = ["/images/kiem-dinh-yen-sao-vietfarm-1.jpg", "/images/kiem-dinh-yen-sao-vietfarm-2.jpg", "/images/tu-cong-bo-yen-sao-vietfarm-1.jpg", "/images/tu-cong-bo-yen-sao-vietfarm-2.jpg"]
const RootPage = () => {

    return (
        <div className='w-full h-fit'>
            <Carousel dataCarousel={dataCarousel} isAutoSlide={false} autoSlideInterval={7000} />
            <ContainerWithTitle title='SẢN PHẨM KHUYẾN MÃI' desc='hád a sjdhjash  jahsdjh  jhasjkdh j jahsk jdh jhas d hád a sjdhjash  jahsdjh  jhasjkdh j jahsk jdh jhas d hád a sjdhjash  jahsdjh '>
                <ProductsList dataProductsList={dataProducts} />
            </ContainerWithTitle>
            <ContainerWithTitle title='SẢN PHẨM NỔI BẬT' desc='hád a sjdhjash  jahsdjh  jhasjkdh j jahsk jdh jhas d hád a sjdhjash  jahsdjh  jhasjkdh j jahsk jdh jhas d hád a sjdhjash  jahsdjh '>
                <ProductsList dataProductsList={dataProducts} />
            </ContainerWithTitle>
            <Certification dataCertification={dataCertification} />
        </div>
    )
}

export default RootPage
