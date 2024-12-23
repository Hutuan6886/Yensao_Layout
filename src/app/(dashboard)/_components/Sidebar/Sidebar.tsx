'use client'
import React, { Ref } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiCategory } from 'react-icons/bi'
import { FaRegListAlt } from 'react-icons/fa'
import { FcBiomass } from 'react-icons/fc'
import { SideBarDashboard } from '@/types/types'

const Sidebar = () => {
    const pathname = usePathname()
    const SidebarData: SideBarDashboard[] = [
        { title: "Danh Sách Danh Mục", icon: <BiCategory />, href: "/yensaothuduc-vanmanh-admin/categories", isActive: pathname === "/yensaothuduc-vanmanh-admin/categories" },
        { title: "Danh Sách Khối Lượng", icon: <FcBiomass />, href: "/yensaothuduc-vanmanh-admin/mass", isActive: pathname === "/yensaothuduc-vanmanh-admin/mass" },
        { title: "Danh Sách Sản Phẩm", icon: <FaRegListAlt />, href: "/yensaothuduc-vanmanh-admin/products", isActive: pathname === "/yensaothuduc-vanmanh-admin/products" }]
    return (
        <div className='relative w-full h-full'>
            <div className='absolute top-1/2 left-2 -translate-y-1/2 w-full h-[98%] bg-white shadow-lg rounded-[0.9rem] p-5'>
                <div className='relative w-full h-full'>
                    <div className='flex flex-col items-center gap-8'>
                        <Link href='/yensaothuduc-vanmanh-admin'><label htmlFor="dashboard" className='text-3xl font-semibold cursor-pointer'>DASHBOARD</label></Link>
                        <hr className='w-[90%] m-auto h-2' />
                        <div className='w-full flex flex-col text-center gap-3'>
                            {
                                SidebarData.map((navData: SideBarDashboard, i: number) => (
                                    <Link key={i} href={navData.href} className={`w-full flex flex-row items-center justify-start gap-2 rounded-[0.5rem] p-2 ${navData.isActive ? "bg-zinc-100" : "hover:bg-zinc-100"} transition`}>
                                        {navData.icon}
                                        {navData.title}
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                    <Link href='/' className='absolute bottom-0 left-0 w-full text-center hover:italic hover:underline hover:underline-offset-4'>Quay lại cửa hàng</Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
