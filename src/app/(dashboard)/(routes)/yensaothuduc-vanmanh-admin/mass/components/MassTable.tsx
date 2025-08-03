'use client'
import React, { MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useRouter } from 'next/navigation'

import { closeDeleteMassModal, openDeleteMassModal } from '@/lib/features/massSlice/massSlice'
import { MassType } from '@/types/types'
import { RootState } from '@/lib/store'
import { deleteMass } from '@/actions/deleteFunc'

import DeleteModal from '@/components/Modals/DeleteModal'

import { IoCloseOutline } from 'react-icons/io5'
import { MdOutlineDragIndicator } from 'react-icons/md'

interface MassTableProps {
    massData: MassType[]
}

const MassTable: React.FC<MassTableProps> = ({ massData }) => {
    const router = useRouter()
    const params = useParams()
    const dispatch = useDispatch()
    const { massState, isOpen } = useSelector((state: RootState) => state.mass.massModal)

    const handleUpdate = (e: MouseEvent<HTMLTableRowElement>) => {
        e.stopPropagation()
        router.push(`/yensaothuduc-vanmanh-admin/mass/${e.currentTarget.id}`)
    }
    const handleDelete = () => {
        deleteMass(massState.id).then(() => {
            router.refresh()
            dispatch(closeDeleteMassModal())
        })
    }
    const handleClose = () => dispatch(closeDeleteMassModal())

    if (massData.length < 1) return null
    return (
        <>
            <table className='border-separate border-spacing-y-3'>
                <thead>
                    <tr>
                        <th></th>
                        <th className='p-3'>Giá trị</th>
                        <th className='p-3'>Thời gian tạo</th>
                        <th className='p-3'>Thời gian cập nhật</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        massData.length !== 0 ? massData.map((mass: MassType) => (
                            <tr key={mass.id} id={mass.id} className={`text-sm text-center cursor-pointer ${params.massId === mass.id ? "bg-[#e4e4e4]" : ""}`}
                                onClick={handleUpdate}
                            >
                                <td className='border-b border-t py-2'>
                                    <div className='flex flex-row items-center justify-center'>
                                        <MdOutlineDragIndicator size={17} />
                                    </div>
                                </td>
                                <td className='border-b border-t py-2'>{mass.value}g</td>
                                <td className='border-b border-t py-2'>{mass.createAt?.toDateString()}</td>
                                <td className='border-b border-t py-2'>{mass.updateAt?.toDateString()}</td>
                                <td className='border-b border-t py-2'>
                                    <button className='w-fit h-fit cursor-pointer group'
                                        onClick={(e: MouseEvent) => {
                                            e.stopPropagation();
                                            dispatch(openDeleteMassModal(mass))
                                        }}
                                    ><IoCloseOutline className='group-hover:scale-125 transition' size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))
                            :
                            <tr>
                                <td colSpan={5} className='italic text-center text-xs tracking-wide'>Chưa có dữ liệu !</td>
                            </tr>
                    }
                </tbody>
            </table>
            <DeleteModal title={`Bạn Muốn Xoá Danh Mục ${massState.value} ?`} desc={`Danh mục ${massState.value} sẽ bị xoá vĩnh viễn`} isOpen={isOpen}
                onSubmit={handleDelete}
                onClose={handleClose} />
        </>
    )
}

export default MassTable
