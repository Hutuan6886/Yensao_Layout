import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const categoryCards = [
    {
        href: "/categories",
        img: "/images/nav-card-1.jpg",
        title: "Sản Phẩm",
        desc: "Tất cả sản phẩm",
        row: "row-span-2",
        col: "col-span-1",
        height: "h-[500px]",
    },
    {
        href: "/promotions",
        img: "/images/nav-card-2.jpg",
        title: "Khuyến Mãi",
        desc: "Khám phá các chương trình khuyến mãi",
        row: "row-span-1",
        col: "col-span-2",
        height: "h-[240px]",
    },
    {
        href: "/recipes",
        img: "/images/nav-card-3.jpg",
        title: "Công Thức",
        desc: "Khám phá cách chế biến",
        row: "row-span-1",
        col: "col-span-1",
        height: "h-[240px]",
    },
    {
        href: "/about",
        img: "/images/nav-card-4.jpg",
        title: "Liên Hệ",
        desc: "Thông tin liên hệ",
        row: "row-span-1",
        col: "col-span-1",
        height: "h-[240px]",
    },
];

const CategoryCard = () => {
    return (
        <div className='w-[75%] h-[500px] m-auto grid grid-cols-3 gap-5 overflow-hidden'>
            {categoryCards.map((card, index) => (
                <Link
                    key={index}
                    href={card.href}
                    className={`${card.col} ${card.row} relative group cursor-pointer ${card.height}`}
                >
                    <div className='relative w-full h-full'>
                        <Image
                            src={card.img}
                            alt={card.title}
                            fill
                            className='object-cover'
                            sizes='(max-width: 768px) 100vw, 33vw'
                        />
                        <div className='absolute bottom-0 left-0 w-full h-[50px] flex items-center gap-3 bg-[#471011] text-white p-3 group-hover:bg-[#661a1a]'>
                            <p className='text-lg'>{card.title}</p>
                            <span>|</span>
                            <p className='text-sm font-semibold'>{card.desc}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CategoryCard;
