'use client'
import React, { ChangeEvent, useRef } from 'react'
import cuid from 'cuid';
import { getUploadedImageUrl, uploadImage } from '@/actions/cloudflareFunc';
import { IoImagesOutline } from "react-icons/io5";
import { FieldValues, Path, PathValue, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { ImageType } from '@/types/types';

type UploadImageProductListProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>
    watch: UseFormWatch<T>
}

const UploadImageProductList = <T extends FieldValues>({ name, setValue, watch }: UploadImageProductListProps<T>) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const handleClickOpenUpload = () => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    const handleUploadImageList = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const fileList = e.target.files as FileList

        //todo: Upload image list
        const promisesUpload: string[] = []
        for (const file of fileList) {
            const formData = new FormData()
            formData.append('file', file)
            promisesUpload.push(await uploadImage(formData))
        }
        await Promise.all(promisesUpload).then(async (fileNameList: string[]) => {
            //todo: Get uploaded image url
            const promisesGetUrl: string[] = []
            for (const fileName of fileNameList) {
                promisesGetUrl.push(await getUploadedImageUrl(fileName))
            }
            await Promise.all(promisesGetUrl).then(async (urlList: string[]) => {
                //todo: create unique id for each imgUrl in order that Framer motion work possible
                const imageList: ImageType[] = urlList.map((url: string) => ({
                    id: cuid(),
                    src: url
                }))
                setValue(name, [...watch(name), ...imageList as PathValue<T, Path<T>>] as PathValue<T, Path<T>>)
            })
        })
    }

    return (
        <div className='flex flex-col gap-1'>
            <label htmlFor='title' className='text-sm text-zinc-500'>Tải lên danh sách hình ảnh</label>
            <div className='w-full flex flex-row items-center justify-start gap-5 
                                bg-white border-2 border-dashed border-sky-500 rounded-[0.375rem] p-3 cursor-pointer'
                onClick={handleClickOpenUpload}
            >
                <IoImagesOutline size={25} className='text-sky-500' />
                <p className='text-zinc-600 text-sm'>Nhấn hoặc kéo thả hình ảnh tải lên tại đây !</p>
            </div>
            <input ref={inputRef} type="file" multiple accept="image/png, image/jpeg, image/webp" className='hidden'
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleUploadImageList(e)}
            />
        </div>
    )
}

export default UploadImageProductList
