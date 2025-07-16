'use client'
import React, { ChangeEvent } from 'react'
import { SearchParamsType } from '@/types/types';
import useSort from '@/hooks/useSort';
type SortType = {
    title: string;
    sortField: string;
    sortOrder: string;
};
interface SortProps {
    searchParams: SearchParamsType
}
const orderList: SortType[] = [{ title: '', sortField: '', sortOrder: '' }, { title: 'Giá: Thấp đến Cao', sortField: 'minPrice', sortOrder: 'asc' }, { title: 'Giá: Cao đến Thấp', sortField: 'minPrice', sortOrder: 'desc' }, { title: 'Tên: A-Z', sortField: 'title', sortOrder: 'asc' }, { title: 'Tên: Z-A', sortField: 'title', sortOrder: 'desc' }]
const Sort: React.FC<SortProps> = ({ searchParams }) => {
    const [updateSortQuery] = useSort()
    return (
        <select className='w-fit ml-auto p-2 
                            bg-white border border-gray-300 rounded-md' defaultValue={`${searchParams.sortField || ''}-${searchParams.sortOrder || ''}`} onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                const [sortField, orderField] = e.target.value.split('-');
                updateSortQuery({ sortField: sortField, sortOrder: orderField });
            }}>
            {orderList.map((order: SortType, index: number) => (
                <option key={index} className='cursor-pointer' value={`${order.sortField}-${order.sortOrder}`}>
                    {order.title || 'Sắp xếp theo'}
                </option>
            ))}
        </select>
    )
}

export default Sort
