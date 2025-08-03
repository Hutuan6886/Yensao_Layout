'use client'
import { postNewMass } from '@/actions/postFunc'
import { updateMass } from '@/actions/putFunc'
import { MassType } from '@/types/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'

interface MassFormProps {
    massData: MassType | null
}

const MassForm: React.FC<MassFormProps> = ({ massData }) => {
    const router = useRouter()
    const { register, handleSubmit, reset, watch } = useForm<MassType>({
        defaultValues: {
            value: massData?.value || 0
        }
    })

    const submitMassForm = async (data: MassType) => {
        let mass: MassType
        if (!massData) mass = await postNewMass<MassType>(data)
        else mass = await updateMass<MassType>(massData.id, data)
        if (mass) {
            router.push('/yensaothuduc-vanmanh-admin/mass/new')
            router.refresh()
        }
    }

    return (
        <form className='flex flex-row items-center justify-center gap-8' onSubmit={handleSubmit(submitMassForm)}>
            <div className='flex flex-row items-center justify-start gap-3'>
                <h3 className='font-semibold'>Khối lượng</h3>
                <div className='flex flex-row items-center gap-1'>
                    <div className='relative w-full'>
                        <input {...register("value")} type="number" placeholder='50' className='w-[70px] rounded-[0.5rem] p-2 placeholder:text-sm' />
                        <button type='button' className='absolute top-1/2 -translate-y-1/2 right-2
                                bg-[#353333] rounded-[50px]'
                            onClick={() => reset()}
                        >
                            {
                                watch('value')
                                    ? <IoCloseOutline className='text-white' />
                                    : null
                            }

                        </button>
                    </div>
                    <p className='text-sm text-nowrap'>/gram</p>
                </div>
            </div>
            <div className='flex flex-row items-center justify-center gap-2'>
                <button type='submit' className='bg-[#998264] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#a59075] transition'>
                    {massData ? "Cập Nhật" : "Thêm Mới"}
                </button>
            </div>
        </form>
    )
}

export default MassForm
