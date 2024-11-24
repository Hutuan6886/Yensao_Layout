'use client'
import { MassType } from '@/types/types'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { IoCloseOutline } from 'react-icons/io5'

const MassForm = () => {
    const router = useRouter()
    const { register, handleSubmit, reset, watch } = useForm<MassType>()

    const submitMassForm = async (data: MassType) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/mass`, {
                credentials: 'include',
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                router.refresh()
                reset()
            } else {
                console.log("RES_ERROR_[Create mass fail]");
            }
        } catch (error) {
            console.log("SERVER_ERROR_[Create mass fail]", error);
        }
    }

    return (
        <form className='flex flex-row items-center justify-center gap-8' onSubmit={handleSubmit(submitMassForm)}>
            <div className='relative flex flex-row items-center justify-start gap-3'>
                <h3 className='font-semibold'>Khối lượng</h3>
                <input {...register("value")} type="text" placeholder='50g' className='w-[300px] rounded-[0.5rem] p-2 placeholder:text-sm' />
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
            <div className='flex flex-row items-center justify-center gap-2'>
                <button type='submit' className='bg-[#6ab187] text-white rounded-[0.5rem] px-4 py-2 hover:bg-[#7AC098] transition'>Thêm Mới</button>
            </div>
        </form>
    )
}

export default MassForm
