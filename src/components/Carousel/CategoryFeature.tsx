import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { BsChevronRight } from 'react-icons/bs'

const categories = [
    {
        href: '/',
        img: '/images/category-feature-1.jpg',
        title: 'Yến Tinh Chế Thượng Hạng',
        desc: 'Đây là loại tổ yến sử dụng 100% tổ yến tinh chế sợi dài được gia công từ phần bụng của tổ thô (hay còn gọi là sơ mướp)',
    },
    {
        href: '/',
        img: '/images/category-feature-3.jpg',
        title: 'Yến Hũ Chưng Sẵn',
        desc: 'Set hũ yến chưng sẵn là một sản phẩm không chỉ bổ dưỡng mà còn mang tính thẩm mỹ cao',
    },
];

const CategoryFeature = () => {
    return (
        <div className='w-[75%] m-auto grid grid-cols-1 md:grid-cols-2 gap-16'>
            {categories.map((category, i: number) => (

                <Link key={i} href={category.href} className='w-full h-[350px] col-span-1 group cursor-pointer'>
                    <Image src={category.img} alt={category.title} width={0} height={0} sizes='100vw' className='w-full h-[250px]' />
                    <div className=' w-full bg-[#fafafa] p-3 flex flex-row flex-nowrap items-center justify-between group-hover:bg-white'>
                        <div className='flex flex-col gap-2'>
                            <p className='text-lg font-semibold'>{category.title}</p>
                            <p className='text-sm text-[#7d7d7d]'>{category.desc}</p>
                        </div>
                        <BsChevronRight size={24} />
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default CategoryFeature
