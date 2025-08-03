import React from 'react'
import MassTable from './components/MassTable'
import { getMass } from '@/actions/getPrismaData'

export default async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const massData = await getMass()
    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="categories" className='font-semibold text-lg text-[#998264]'>Danh Sách Khối Lượng</label>
            </div>
            {children}
            <MassTable massData={massData} />
        </div>
    )
}

