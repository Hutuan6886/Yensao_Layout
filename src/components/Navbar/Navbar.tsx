"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

import useWindowSize from '@/hooks/useWindowSize'
import { CategoryType, MainNavType } from '@/types/types'

import NavbarModal from '@/components/Modals/NavbarModal'

import MainNav from './MainNav'
import Image from 'next/image'

const Navbar = () => {
    //todo: categories Nav
    const [mainNav, setMainNav] = useState<MainNavType[]>([
        {
            title: "Khuyến Mãi", href: "/promotion"
        },
        {
            title: "Công Thức", href: "/recipe"
        },
        {
            title: "Liên Hệ", href: "/contact"
        }, {
            title: "Về Chúng Tôi", href: "/about"
        },
    ])

    //todo: state scroll
    const [imageHeight, setImageHeight] = useState<number>(1000)
    const [isFixedNav, setIsFixedNav] = useState<boolean>(false)

    //todo: state width screen
    const clientScreenWidth = useWindowSize()
    const [clientWidth, setClientWidth] = useState<number>(0)

    //todo: state open modal navbar
    const [isOpenNavbarModal, setIsOpenNavbarModal] = useState<boolean>(false)

    const navbarMobileRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        //todo: GET categories data from db, chuyển Categories thành MainNavType với product href:"/yen-sao/id", sử dụng id của categories route này để truy suất các products có trong trong Categories
        async function getCategoriesNav() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
                    credentials: "include",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (res.ok) {
                    const data: CategoryType[] = await res.json()
                    const categoryList: MainNavType[] = data.map((dataItem: CategoryType) => ({
                        title: dataItem.name,
                        href: `/${dataItem.id}`
                    }))
                    //todo: Format data MainNav
                    const formattedMainNav: MainNavType[] = [
                        {
                            title: "Sản Phẩm", href: "/categories", subNav: categoryList
                        },
                        {
                            title: "Khuyến Mãi", href: "/promotion"
                        },
                        {
                            title: "Công Thức", href: "/recipe"
                        },
                        {
                            title: "Liên Hệ", href: "/contact"
                        }, {
                            title: "Về Chúng Tôi", href: "/about"
                        },
                    ]
                    setMainNav(formattedMainNav)
                } else {
                    console.log("get categories nav fail!");
                }
            } catch (error) {
                console.log("Internal Error", error);
            }
        }
        getCategoriesNav()
    }, [])

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
        //todo: handle scroll
        window.addEventListener("scroll", scrollNav)

        return () => window.removeEventListener("scroll", scrollNav)
    })

    useEffect(() => {
        //todo: handle click out to close modal
        const clickOutToClose = (e: MouseEvent) => {
            if (!navbarMobileRef.current?.contains(e.target as Node)) {
                setIsOpenNavbarModal(false)
            }
        }
        document.addEventListener("mousedown", (e) => clickOutToClose(e))

        return () => {
            document.removeEventListener("mousedown", (e) => clickOutToClose(e))
        }
    })

    return (
        <nav className='w-full h-fit'>
            <div className='flex flex-col items-center
                             bg-white'>
                <Link href='/'>
                    <Image ref={imageRef} src='/images/logo-without-bg.png' alt='logo-without-bg'
                        className={`${clientWidth < 769 ? "hidden" : "block"} md:size-40 lg:size-52 cursor-pointer`} width={0} height={0} sizes='100vw' />
                </Link>
                <div ref={navbarMobileRef} className={`${isFixedNav || clientWidth < 769 ? "fixed z-20 top-0 left-0 w-full h-auto" : "static"}`}>
                    <div className='flex flex-row items-center justify-center md:justify-between
                                    relative w-full h-full bg-white px-4 transition-all duration-500'>
                        <Link href="/">
                            <Image src='/images/logo-without-bg.png' alt='logo-without-bg'
                                className={`${isFixedNav || clientWidth < 769 ? "block " : "hidden"} size-16 cursor-pointer`} width={0} height={0} sizes='100vw' /></Link>
                        {
                            clientWidth < 769
                                ? <button className={`absolute top-1/2 -translate-y-1/2 right-3 size-8
                                                    flex flex-col justify-center ${isOpenNavbarModal ? "gap-0" : "gap-2"} cursor-pointer`}
                                    onClick={() => setIsOpenNavbarModal(!isOpenNavbarModal)}
                                >
                                    <hr className={`w-full h-[1px] border-0 bg-black transition-all
                                                    ${isOpenNavbarModal ? "rotate-45" : ""}`} />
                                    <hr className={`w-full h-[1px] border-0 bg-black transition-all
                                                    ${isOpenNavbarModal ? "-rotate-45" : ""}`} />
                                </button>
                                : <MainNav dataNav={mainNav} className={`${clientWidth < 769 ? "hidden" : "block"}`} />
                        }
                    </div>
                    {
                        isOpenNavbarModal && <NavbarModal dataNav={mainNav} onClose={() => setIsOpenNavbarModal(false)} />
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar
