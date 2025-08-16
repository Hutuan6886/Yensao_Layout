'use client'
import React, { ChangeEvent, useRef } from 'react'
import { uploadImage } from '@/actions/cloudflareFunc'
import { LuImagePlus } from 'react-icons/lu'

interface DescriptionUploadImageProps {
    setImgUrl: (imgUrl: string) => void
}
const DescriptionUploadImage = ({ setImgUrl }: DescriptionUploadImageProps) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleClickOpenUpload = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    // const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    //     e.preventDefault()
    //     if (!e.target.files?.[0]) return
    //     const formData = new FormData()
    //     formData.append('file', e.target.files?.[0])
    //     await uploadImage(formData).then(async (imageName: string) => {
    //         await getUploadedImageUrl(imageName).then((imgUrl: string) => {
    //             setImgUrl(imgUrl)
    //         })
    //     })
    // }
    const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (!e.target.files?.[0]) return

        const formData = new FormData()
        formData.append('file', e.target.files[0])

        try {
            // Hàm uploadImage trả về trực tiếp public URL
            const imageUrl = await uploadImage(formData)
            // Set public URL trực tiếp
            setImgUrl(imageUrl)
        } catch (error) {
            console.error('Upload image error: ', error)
        }
    }

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor='title' className='text-sm text-zinc-500'>Tải lên hình ảnh</label>
            <div className='w-full flex flex-row items-center justify-start gap-5 
                                bg-white border-2 border-dashed border-sky-500 rounded-[0.375rem] p-3 cursor-pointer'
                onClick={handleClickOpenUpload}
            >
                <LuImagePlus size={25} className='text-sky-500' />
                <p className='text-zinc-600 text-sm'>Nhấn hoặc kéo thả hình ảnh tải lên tại đây !</p>
            </div>
            <input ref={inputRef} type="file" accept="image/png, image/jpeg, image/webp" className='hidden' onChange={handleUploadImage} />
        </div>
    )
}

export default DescriptionUploadImage
