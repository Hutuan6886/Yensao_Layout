"use client"
import React, { useRef } from 'react'
import Link from 'next/link'
import { MainNavType } from '@/types/types'

import useSize from '@/hooks/useSize'

import NavbarModal from '@/components/Modals/NavbarModal'

import MainNav from './MainNav'
import Image from 'next/image'
import useScrollNav from './services/useScrollNav'
import useMobileClickOutside from './services/useMobileClickOutside'

interface NavbarProps {
    mainNav: MainNavType[]
}
const Navbar: React.FC<NavbarProps> = ({ mainNav }) => {
    //todo: DOM ref
    const navbarMobileRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    const { clientWidth } = useSize()
    //todo: Navbar animation when scrolling window
    const [isFixedNav] = useScrollNav(imageRef, clientWidth)
    // todo: Navbar Mobile click outside
    const [isOpenNavbarModal, setIsOpenNavbarModal] = useMobileClickOutside(navbarMobileRef)


    return (
        <nav className='w-full h-fit'>
            <div className='flex flex-col items-center
                             bg-white'>
                <Link href='/'>
                    <Image ref={imageRef} src='/images/logo-bg-white.jpg' alt='logo-without-bg'
                        className={`${clientWidth < 769 ? "hidden" : "block"} md:size-40 lg:size-52 cursor-pointer`} width={0} height={0} sizes='100vw' />
                </Link>
                <div ref={navbarMobileRef} className={`${isFixedNav || clientWidth < 769 ? "fixed z-20 top-0 left-0 w-full h-auto" : "static"}`}>
                    <div className='flex flex-row items-center justify-center md:justify-between
                                    relative w-full h-full bg-white px-4 transition-all duration-500'>
                        <Link href="/">
                            <Image src='/images/logo-bg-white.jpg' alt='logo-without-bg'
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
