"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { ImageType } from '@/types/types'
import useToggle from '@/hooks/useToggle'

const ImagePopup = dynamic(() => import('@/components/ui/ImagePopup'), {
    //todo: ImagePopup sử dụng useSize Hook => window. undefined => sử dụng dynamic import để handle
    ssr: false
})

const certificationImages: ImageType[] = [{ id: "1", src: "/images/kiem-dinh-yen-sao-vietfarm-1.jpg" }, { id: '2', src: "/images/kiem-dinh-yen-sao-vietfarm-2.jpg" }, { id: '3', src: "/images/tu-cong-bo-yen-sao-vietfarm-1.jpg" }, { id: '4', src: "/images/tu-cong-bo-yen-sao-vietfarm-2.jpg" }]

const Certification = () => {
    const { isOpen, setIsOpen } = useToggle()
    const [imageClickIndex, setImageClickIndex] = useState<number>(0)
    return (
        <>
            <div className='w-[70%] m-auto flex flex-row flex-wrap md:flex-nowrap items-center justify-center gap-2 md:gap-4 '>
                {
                    certificationImages.map((image: ImageType, i: number) => (
                        <Image key={image.id} src={image.src} alt={image.src} width={0} height={0} sizes='100vw' className='w-auto h-[150px] lg:h-[230px] xl:h-[300px] shadow-lg cursor-pointer' onClick={() => {
                            setImageClickIndex(i)
                            setIsOpen(true)
                        }} />
                    ))
                }
            </div>
            {isOpen && <ImagePopup images={certificationImages} imageShowIndex={imageClickIndex} onClose={() => setIsOpen(false)} />}
        </>
    )
}

export default Certification
