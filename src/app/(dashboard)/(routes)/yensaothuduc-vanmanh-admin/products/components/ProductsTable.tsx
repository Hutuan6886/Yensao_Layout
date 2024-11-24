'use client'
import React from 'react'

const ProductsTable = () => {
    return (
        <>
            <table className='border-separate border-spacing-y-3'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='p-3'>Danh mục</th>
                        <th className='p-3'>Tiêu đề</th>
                        <th className='p-3'>Hình ảnh</th>
                        <th className='p-3'>Giá niêm yết</th>
                        <th className='p-3'>Giá khuyến mãi</th>
                        <th className='p-3'>Thời gian tạo</th>
                        <th className='p-3'>Thời gian cập nhật</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        ProductsData.map((product: CategoryType, i: number) => (
                            <tr key={i} className='text-sm text-center cursor-pointer hover:bg-zinc-200 transition'
                                onClick={() => router.push(`${process.env.NEXT_PUBLIC_BASE_URL}/yensaothuduc-vanmanh-admin/categories/${category.id}`)}
                            >
                                <td className='border-b border-t py-2'>{category.id}</td>
                                <td className='border-b border-t py-2'>{category.name}</td>
                                <td className='border-b border-t py-2'>{category.createAt?.toDateString()}</td>
                                <td className='border-b border-t py-2'>{category.updateAt?.toDateString()}</td>
                                <td className='border-b border-t py-2'>
                                    <div className='flex items-center size-8 bg-rose-900 rounded-[0.5rem] p-2 group'
                                        onClick={(e: MouseEvent) => {
                                            e.stopPropagation();
                                            dispatch(openDeleteCategoryModal(category))
                                        }}
                                    ><FaTrash className='text-white group-hover:scale-110 transition' size={15} />
                                    </div>
                                </td>
                            </tr>
                        ))
                    } */}
                </tbody>
            </table>
            {/* <div className='w-full h-auto'>
                {massData.length === 0 && <p className='w-full italic text-center text-xs tracking-wide'>Chưa có dữ liệu !</p>}
            </div> */}
        </>
    )
}

export default ProductsTable
