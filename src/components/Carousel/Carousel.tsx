'use client'
import React from 'react'

import { CarouselType } from '@/types/types'

import useSize from '@/hooks/useSize'
import useSlidingImage from '@/hooks/useSlidingImage'

import CarouselContent from './CarouselContent'

import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const carouselData: CarouselType[] = [
    { title: "Yến Sào Thô", desc: "Yến sào Thượng Hạng hay còn gọi là tổ yến cao cấp tiêu chuẩn đặc biệt được thu hoạch từ hệ thống nhà dẫn dụ yến chuyên nghiệp và được Thượng Yến tuyển chọn để lấy những tổ chất lượng cao nhất. Tiếp sau đó, tổ yến sẽ được làm mềm bằng công nghệ phun lạnh và được những người thợ có tay nghề cao nhất tỉ mỉ gắp từng chiếc lông.", imgUrl: "/images/Nest-picture-4.png" },
    {
        title: "Cách chế biến yến chưng táo đỏ hạt sen", desc: "Bí quyết của giấc ngủ sâu - Yến chưng táo đỏ hạt sen - một sự kết hợp hoàn hảo, mang lại hương vị độc đáo và bổ dưỡng, là lựa chọn tuyệt vời cho những ai yêu thích sự mới lạ trong ẩm thực.Trong bài viết hôm nay của Yến Sào Thuận Mỹ, chúng tôi sẽ chia sẻ cách làm món yến chưng táo đỏ hạt sen không chỉ thơm ngon, đẹp mắt mà còn chứa đầy dưỡng chất.Sự kết hợp ...", imgUrl: "/images/yen-sao-carousel-5.webp"
    },
    { title: "Yến Sào Thượng Hạng", desc: "Yến sào Thượng Hạng hay còn gọi là tổ yến cao cấp tiêu chuẩn đặc biệt được thu hoạch từ hệ thống nhà dẫn dụ yến chuyên nghiệp và được Thượng Yến tuyển chọn để lấy những tổ chất lượng cao nhất. Tiếp sau đó, tổ yến sẽ được làm mềm bằng công nghệ phun lạnh và được những người thợ có tay nghề cao nhất tỉ mỉ gắp từng chiếc lông. Tổ yến được tuyển chọn theo tỉ lệ kim cương (100 tổ lấy 1). Sau khi xử lý vẫn giữ được nguyên vẹn 100% hình dáng ban sơ nhưng sạch lông, tỉ lệ hao hụt dưới 10%. Sản phẩm mang tính thẩm mỹ và tiêu chuẩn tuyệt đối, đáp ứng nhu cầu xuất khẩu sang các thị trường, Mỹ, Úc, Đài Loan, Hongkong… ", imgUrl: "/images/Nest-picture-2.png" },
    { title: "Yến Sào Baby", desc: "", imgUrl: "/images/Nest-picture-3.png" },
]

const Carousel = () => {
    const { indexImg, setIndexImg, previousContentClick, nextContentClick } = useSlidingImage<CarouselType>(carouselData, 0, false, 7000)
    const { clientWidth } = useSize()
    return (
        <div className={`w-full h-fit border`}>
            <div className='relative w-full h-fit'>
                <CarouselContent carouselData={carouselData} indexImg={indexImg} clientWidth={clientWidth} />
                {
                    clientWidth > 769
                        ? <>
                            <button className='absolute top-1/2 left-12 -translate-y-1/2
                                            flex flex-row items-center justify-center
                                           bg-white opacity-60 border size-12 hover:scale-95 hover:text-[#471011] transition-all'
                                onClick={previousContentClick}
                            ><FaAngleLeft /></button>
                            <button className='absolute top-1/2 right-12 -translate-y-1/2 
                                            flex flex-row items-center justify-center
                                           bg-white opacity-60 border size-12 hover:scale-95 hover:text-[#471011] transition-all'
                                onClick={nextContentClick}
                            ><FaAngleRight /></button>
                        </>
                        : <div className='absolute bottom-1 left-1/2 -translate-x-1/2
                                            flex flex-row items-center justify-center gap-2'>
                            {
                                carouselData.map((_, i: number) => (
                                    <div key={i} className={`w-[12px] h-[12px] rounded-[50px] ${indexImg === i ? "bg-[#661a1a] " : "bg-white"}`}
                                        onClick={() => setIndexImg(i)}
                                    ></div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Carousel
