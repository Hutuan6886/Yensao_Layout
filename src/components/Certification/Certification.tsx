"use client"
import React, { useState } from 'react'
import ContainerWithTitle from '../ui/ContainerWithTitle'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const ImagePopup = dynamic(() => import('@/components/ui/ImagePopup'), {
    //todo: ImagePopup sử dụng useSize Hook => window. undefined => sử dụng dynamic import để handle
    ssr: false
})

interface CertificationProps {
    dataCertification: string[]
}
const Certification: React.FC<CertificationProps> = ({ dataCertification }) => {
    const [ispenCertificationPopup, setIsOpenCertificationPopup] = useState<boolean>()
    const [imageClickIndex, setImageClickIndex] = useState<number>(0)
    return (
        <>
            <ContainerWithTitle title='GIẤY CHỨNG NHẬN' desc='Giấy chứng nhận được Cục An toàn thực phẩm - Bộ Y tế cấp phép'>
                <div className='w-[70%] m-auto flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4 '>
                    {
                        dataCertification.map((imgUrl: string, i: number) => (
                            <Image key={i} src={imgUrl} alt={imgUrl} width={0} height={0} sizes='100vw' className='w-auto h-[150px] lg:h-[230px] xl:h-[300px] shadow-lg cursor-pointer' onClick={() => {
                                setImageClickIndex(i)
                                setIsOpenCertificationPopup(true)
                            }} />
                        ))
                    }
                </div>
            </ContainerWithTitle>
            {ispenCertificationPopup && <ImagePopup dataImage={dataCertification} imageShowIndex={imageClickIndex} onClose={() => setIsOpenCertificationPopup(false)} />}
        </>
    )
}

export default Certification
