'use client'
import React, { Fragment, useState } from 'react'
import Link from 'next/link'

import { motion } from 'framer-motion'
import { MainNavType } from '@/types/types'
import { FaChevronDown } from 'react-icons/fa'

interface NavbarModalProps {
    dataNav: MainNavType[]
    onClose: () => void
}

const openModalAnimation = {
    invisible: {
        opacity: 0,
        y: -15
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
            type: "spring",
            damping: 25,
            stiffness: 500
        }
    },
    exit: {
        opacity: 0,
        y: -15
    }
}

const NavbarModal: React.FC<NavbarModalProps> = ({ dataNav, onClose }) => {
    const [isActiveSubnav, setIsActiveSubnav] = useState<boolean>(false)
    const [activeSubnav, setActiveSubnav] = useState<number | undefined>(undefined)

    //todo: handle open dropdown for mobile screen
    const handleOpenSubnav = (i: number) => {
        if (!isActiveSubnav) {
            setActiveSubnav(i)

        } else {
            setActiveSubnav(undefined)
        }
        setIsActiveSubnav(!isActiveSubnav)
    }



    return (
        <motion.div
            variants={openModalAnimation} initial='invisible' animate='visible' exit='exit'
            className="w-full h-fit bg-white border-b border-zinc-500 shadow-lg overflow-y-scroll pb-5"
        >
            <div className='w-full h-[45px] bg-[#ECE6D8] border-b border-zinc-300 shadow-md'></div>
            <div className='w-full flex flex-col items-center overflow-y-scroll'>
                {
                    dataNav.map((navItem: MainNavType, i: number) => (
                        <Fragment key={i}>
                            <div className='w-full flex flex-row items-center justify-center gap-3 cursor-pointer py-3'
                                onClick={() => handleOpenSubnav(i)}
                            >
                                <Link href={`${navItem.href}`} className='font-semibold'>{navItem.title}</Link>
                                {
                                    navItem.subNav?.length != undefined
                                    && <FaChevronDown size={10} className={`${activeSubnav === i ? "-rotate-180" : null} transition-all`} />
                                }
                            </div>
                            {
                                navItem.subNav?.length !== undefined && activeSubnav === i
                                && <motion.div variants={openModalAnimation} initial='invisible' animate='visible' exit='exit'
                                    className='w-full h-fit flex flex-col items-center bg-[#eeede7] shadow-inner'>
                                    {
                                        navItem.subNav.map((subNavItem: MainNavType, i: number) => (
                                            <Link key={i} href={`${navItem.href}/${subNavItem.href}`} className='text-sm cursor-pointer py-2'>{subNavItem.title}</Link>
                                        ))
                                    }
                                </motion.div>
                            }
                        </Fragment>
                    ))
                }
            </div>
        </motion.div >
    )
}

export default NavbarModal
