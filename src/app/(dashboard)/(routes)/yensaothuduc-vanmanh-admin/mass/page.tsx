import React from 'react'
import { getMass } from '@/actions/getPrismaData'
import MassForm from './components/MassForm'
import MassTable from './components/MassTable'

const page = async () => {
    const massData = await getMass()

    return (
        <div className='w-full h-full flex flex-col gap-8'>
            <div className=' flex flex-row justify-between items-center'>
                <label htmlFor="categories" className='font-semibold text-lg text-[#998264]'>Danh Sách Khối Lượng</label>
            </div>
            <MassForm />
            <MassTable massData={massData} />
        </div>
    )
}

export default page
