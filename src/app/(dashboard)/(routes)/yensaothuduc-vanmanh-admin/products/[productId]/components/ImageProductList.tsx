'use client'
import React, { useState, DragEvent } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import ImageProductItem from './ImageProductItem'
import ImageProductDrop from './ImageProductDrop'
import { ImageType } from '@/types/types'

type ImageProductListProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>

    imageList: ImageType[]
}

//todo: function for get nearest drop-------------------------------
const getDropIndicators = () => {
    return Array.from(document.querySelectorAll<HTMLElement>('#drop'))
}

const getNearestIndicator = (e: DragEvent<HTMLDivElement>) => {
    //todo: Get all indicators which is a drop element list with id is #drop
    const indicators: HTMLElement[] = getDropIndicators()

    const DISTANCE_OFFSET = 50;

    const elementDrop = indicators.reduce(
        (closest, child) => {
            const box = child.getBoundingClientRect();

            const offset: number = e.clientX - (box.right + DISTANCE_OFFSET);   //* Nếu list đặt dọc thì offset = e.clientY - (box.top + DISTANCE_OFFSET); (box.top hoặc box.bottom)
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        },
        {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
        }
    );
    return elementDrop
}

const clearHighlights = () => {
    const indicators: HTMLElement[] = getDropIndicators();

    indicators.forEach((indicator: HTMLElement) => {
        indicator.style.opacity = "0"
    });
};

//todo:----------------------------------------------

const ImageProductList = <T extends FieldValues>({ name, setValue, imageList }: ImageProductListProps<T>) => {
    const [imageDraggedIndex, setImageDraggedIndex] = useState<number>()
    const [dropIndex, setDropIndex] = useState<number>()

    const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
        clearHighlights()
        const elementDrop = getNearestIndicator(e);

        if (parseInt(elementDrop.element.getAttribute("data-before") as string) + 1 === imageDraggedIndex || parseInt(elementDrop.element.getAttribute("data-before") as string) === imageDraggedIndex) {
            elementDrop.element.style.opacity = "0";
        } else {
            elementDrop.element.style.opacity = "1";
        }
    }

    const handleDragStart = (indexImage: number) => {
        clearHighlights()
        setImageDraggedIndex(indexImage)
    }
    const handleDragEnd = () => {
        clearHighlights()
        setImageDraggedIndex(undefined)
    }

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        highlightIndicator(e)
        const { element } = getNearestIndicator(e);

        //todo: set nearest drop indicator
        setDropIndex(parseInt(element.getAttribute("data-before") as string))
    }

    const handleDrop = () => {
        clearHighlights()
        if (imageDraggedIndex === undefined || dropIndex === undefined) return

        //todo:clone image url data
        const cloneDataImage: ImageType[] = [...imageList]
        //todo: image Dragged in image url data
        const imageToMove: ImageType = cloneDataImage[imageDraggedIndex - 1]

        if (imageDraggedIndex > dropIndex) {
            //todo: Xoá image tại vị trí ban đầu
            cloneDataImage.splice(imageDraggedIndex - 1, 1)
            //todo: thêm image vào vị trí mới
            cloneDataImage.splice(dropIndex, 0, imageToMove)
            //todo: set lại data imgUrl form
            setValue(name, cloneDataImage as PathValue<T, Path<T>>)
        } else {
            //todo: Xoá image tại vị trí ban đầu
            cloneDataImage.splice(imageDraggedIndex - 1, 1)
            //todo: thêm image vào vị trí mới
            cloneDataImage.splice(dropIndex - 1, 0, imageToMove)
            //todo: set lại data imgUrl form
            setValue(name, cloneDataImage as PathValue<T, Path<T>>)
        }
    }

    if (imageList.length < 1) {
        return null
    }

    return (
        <div className={` relative w-full h-auto flex flex-row items-center justify-start`}
            onDragOver={(e: DragEvent<HTMLDivElement>) => handleDragOver(e)}
            onDrop={handleDrop}
        >
            <ImageProductDrop dropIndex={0} />
            {
                imageList.map((img: ImageType, i: number) => (
                    <div key={img.id} className={`relative flex flex-row items-center justify-start`}>
                        <ImageProductItem className={imageDraggedIndex === i + 1 ? "opacity-60" : "opacity-100"}
                            imgUrl={img.src}
                            imageIndex={i + 1}
                            handleDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDeleteImage={() => setValue(name, imageList.filter((item: ImageType) => item.id !== img.id) as PathValue<T, Path<T>>)} />
                        <ImageProductDrop dropIndex={i + 1} />
                    </div>
                ))
            }
        </div>
    )
}

export default ImageProductList
