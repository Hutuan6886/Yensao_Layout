'use client'
import React, { Fragment, useState } from 'react'
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form'
import { NotionItemDragDropActiveType, NotionType } from '@/types/types'
import NotionItemTable from './NotionItemTable'
import TableDrop from '@/components/ui/TableDrop'

type NotionListTableProps<T extends FieldValues> = {
    name: Path<T>
    setValue: UseFormSetValue<T>
    notionList: NotionType[]
}

const NotionListTable = <T extends FieldValues>({ name, setValue, notionList }: NotionListTableProps<T>) => {
    const [itemActive, setItemActive] = useState<NotionItemDragDropActiveType | undefined>(undefined)

    const handleDragStart = (item: NotionItemDragDropActiveType) => {
        setItemActive(item)
    }

    const handleDragEnd = () => {
        setItemActive(undefined)
    }

    const handleDrop = (index: number) => {
        //todo: Thực hiện thay đổi vị trí trong mảng imageListData
        if (itemActive === undefined) return

        //todo: Clone data
        const cloneNotionListData: NotionType[] = [...notionList]

        //todo: image di chuyển
        const itemToMove = cloneNotionListData[itemActive.index - 1]
        /* 
        cloneNotionListData: Item Item Item
                               0    1    2
        */
        /* ItemActive = 1 tương ứng với CloneNotionListData[0] */
        /* 
        Drop Item Drop Item Drop Item Drop
        0    1     1    2     2    3     3
        */
        if (itemActive.index > index) {
            //todo: Xoá image tại vị trí ban đầu
            cloneNotionListData.splice(itemActive.index - 1, 1)
            //todo: thêm image vào vị trí mới
            cloneNotionListData.splice(index, 0, itemToMove)
            //todo: set lại data imgUrl form
            setValue(name, cloneNotionListData as PathValue<T, Path<T>>)
        } else {
            //todo: Xoá image tại vị trí ban đầu
            cloneNotionListData.splice(itemActive.index - 1, 1)
            //todo: thêm image vào vị trí mới
            cloneNotionListData.splice(index - 1, 0, itemToMove)
            //todo: set lại data imgUrl form
            setValue(name, cloneNotionListData as PathValue<T, Path<T>>)
        }
    }

    return (
        <div className='w-full flex flex-col gap-2'>
            <TableDrop index={0} itemActive={itemActive} handleDrop={handleDrop} />
            {
                notionList?.map((notion: NotionType, i: number) => (
                    <Fragment key={i}>
                        <NotionItemTable notionData={notion} index={i + 1} itemActiveIndex={itemActive?.index} handleDragStart={handleDragStart} handleDragEnd={handleDragEnd} />
                        <TableDrop index={i + 1} itemActive={itemActive} handleDrop={handleDrop} />
                    </Fragment>
                ))
            }
        </div>
    )
}

export default NotionListTable
