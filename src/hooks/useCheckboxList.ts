import { ChangeEvent, useEffect, useState } from "react"
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form"

function useCheckboxList<T extends FieldValues, U extends string | number>(list: U[],
    name: Path<T>,
    setValue: UseFormSetValue<T>
) {
    const [selectedList, setSelectedList] = useState<U[]>(list ?? [])

    useEffect(() => {
        setValue(name, selectedList as PathValue<T, Path<T>>)
    }, [selectedList, setValue, name])

    const toggleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
        const value = typeof e.target.value === 'string' && !isNaN(Number(e.target.value))
            ? Number(e.target.value) as U
            : e.target.value as U

        setSelectedList((prev) => {
            const updatedList = prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]

            return updatedList
        })
    }
    return {
        selectedList,
        toggleCheckbox,
    }
}

export default useCheckboxList
