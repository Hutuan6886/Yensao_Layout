"use client"
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'

import useWindowSize from '@/hooks/useWindowSize'
import { MainNavType } from '@/types/types'
import { cn } from '@/lib/utils'

import { FaChevronDown } from 'react-icons/fa'
import Link from 'next/link'

interface MainNavProps {
    dataNav: MainNavType[]
    className?: string
}

const MainNav: React.FC<MainNavProps> = ({ dataNav, className }) => {

    //todo: state dropdown
    const [activeDropdown, setActiveDropdown] = useState<number | undefined>(undefined)
    const [isActiveDropdown, setIsActiveDropdown] = useState<boolean>(false)

    //todo: state clientWidth
    const [clientWidth, setClientWidth] = useState<number>(0)

    //todo: width screen
    const clientScreenWidth = useWindowSize()
    useEffect(() => {
        if (clientScreenWidth) {
            setClientWidth(clientScreenWidth)
        }
    }, [clientScreenWidth])

    //todo: handle open dropdown for mobile screen
    const handleClickNavForMobile = (i: number) => {
        if (!isActiveDropdown) {
            setActiveDropdown(i)
        } else {
            setActiveDropdown(undefined)
        }
        setIsActiveDropdown(!isActiveDropdown)
    }

    return (
        <div className={cn("w-full h-auto", className)}>
            <div className='flex flex-row items-center justify-center gap-x-10'>
                {
                    dataNav.map((navItem: MainNavType, i: number) => (
                        <Fragment key={i}>
                            <div className='relative
                                            flex flex-row items-center justify-center gap-x-10 
                                            group'
                                onMouseEnter={() => setActiveDropdown(i)}
                                onMouseLeave={() => setActiveDropdown(undefined)}
                            >
                                <Link href={navItem.href} className='flex flex-row items-center justify-start gap-2 group'>
                                    <p className={`${clientWidth > 769 && clientWidth < 904 ? "text-[0.9rem] tracking-0" : "text-[1.05rem] tracking-[.06rem]"}  font-semibold 
                                                    group-hover:text-[#c58c37] transition cursor-pointer`}>{navItem.title}</p>
                                    <div className='w-fit h-fit' onClick={() => handleClickNavForMobile(i)} >
                                        <FaChevronDown size={11} className={`${navItem.subNav?.length !== undefined ? "block" : "hidden"} 
                                                        group-hover:-rotate-180 
                                                        group-hover:text-[#c58c37] duration-300 transition-all`} />
                                    </div>
                                </Link>
                                <span className={`${i === dataNav.length - 1 ? "hidden" : "block"} 
                                                    font-thin text-[#dfd39f]`}
                                >|</span>
                                {/* //todo: Dropdown */}
                                {
                                    activeDropdown === i && navItem.subNav?.length !== undefined && <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 15 }}
                                        className={`w-[200px] h-fit  
                                                    absolute z-10 top-6 left-0
                                                        bg-transparent pt-3`}>
                                        <div className='flex flex-col items-start gap-4 
                                                        bg-white shadow-[-10px_20px_50px_-15px_rgba(0,0,0,0.3)] p-5'>
                                            {
                                                navItem.subNav?.map((subNavItem: MainNavType, i: number) => (
                                                    <Link href={`${navItem.href}${subNavItem.href}`} key={i} className='hover:text-[#c58c37] cursor-pointer transition'>{subNavItem.title}</Link>
                                                ))
                                            }
                                        </div>
                                    </motion.div>
                                }
                            </div>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default MainNav
