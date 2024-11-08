"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import useWindowSize from '@/hooks/useWindowSize'
import { MainNavType } from '@/types/types'

import MainNav from './MainNav'
import Image from 'next/image'
import NavbarModal from '@/components/Modals/NavbarModal'

const dataNav: MainNavType[] = [
    {
        title: "Sản Phẩm", href: "/product", subNav: [
            { title: "Yến thô nguyên tổ", href: "" },
            { title: "Yến tinh chế", href: "" },
            { title: "Yến rút lông", href: "" },
            { title: "Yến thượng hạng", href: "" },
            { title: "Yến baby", href: "" },
            { title: "Yến vụn", href: "" },
        ]
    },
    {
        title: "Khuyến Mãi", href: "/khuyen-mai"
    },
    {
        title: "Công Thức", href: "/"
    },
    {
        title: "Liên Hệ", href: "/lien-he"
    }, {
        title: "Về Chúng Tôi", href: ""
    },
]

const Navbar = () => {
    //todo: state scroll
    const [imageHeight, setImageHeight] = useState<number>(1000)
    const [isFixedNav, setIsFixedNav] = useState<boolean>(false)

    //todo: state width screen
    const clientScreenWidth = useWindowSize()
    const [clientWidth, setClientWidth] = useState<number>(0)

    //todo: state open modal navbar
    const [isOpenNavbarModal, setIsOpenNavbarModal] = useState<boolean>(false)

    const router = useRouter()
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (imageRef.current) {
            setImageHeight(imageRef.current.clientHeight)
        }
        if (clientScreenWidth) {
            setClientWidth(clientScreenWidth)
        }
    }, [imageRef.current, clientScreenWidth])


    //todo: Window scroll
    const scrollNav = () => {
        if (window.scrollY > imageHeight) {
            setIsFixedNav(true)
        } else {
            setIsFixedNav(false)
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", scrollNav)

        return () => window.removeEventListener("scroll", scrollNav)
    })

    return (
        <div className='w-full h-fit'>
            <div className='flex flex-col items-center
                             bg-white'
                onClick={() => router.push("/")}
            >
                <Image ref={imageRef} src='/images/logo-without-bg.png' alt='logo-without-bg'
                    className={`${clientWidth < 769 ? "hidden" : "block"} md:size-40 lg:size-52 cursor-pointer`} width={0} height={0} sizes='100vw' />
                <div className={`${isFixedNav || clientWidth < 769 ? "fixed z-20 top-0 left-0 w-full h-auto bg-white" : "static"}`}>
                    <div className='flex flex-row items-center justify-center md:justify-between
                                    relative w-full h-full px-4 transition-all duration-500'>
                        <Image src='/images/logo-without-bg.png' alt='logo-without-bg'
                            className={`${isFixedNav || clientWidth < 769 ? "block " : "hidden"} size-16 cursor-pointer`} width={0} height={0} sizes='100vw' />
                        {
                            clientWidth < 769
                                ? <div className={`absolute top-1/2 -translate-y-1/2 right-3 size-8
                                                    flex flex-col justify-center ${isOpenNavbarModal ? "gap-0" : "gap-2"} cursor-pointer`}
                                    onClick={() => setIsOpenNavbarModal(!isOpenNavbarModal)}
                                >
                                    <hr className={`w-full h-[1px] border-0 bg-black transition-all
                                                    ${isOpenNavbarModal ? "rotate-45" : ""}`} />
                                    <hr className={`w-full h-[1px] border-0 bg-black transition-all
                                                    ${isOpenNavbarModal ? "-rotate-45" : ""}`} />
                                </div>
                                : <MainNav dataNav={dataNav} className={`${clientWidth < 769 ? "hidden" : "block"}`} />
                        }
                    </div>
                    {
                        isOpenNavbarModal && <NavbarModal dataNav={dataNav} className='w-full h-full' />
                    }
                </div>
            </div>
        </div>
    )
}

export default Navbar
