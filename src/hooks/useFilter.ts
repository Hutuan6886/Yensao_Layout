import { usePathname, useRouter, useSearchParams } from "next/navigation"
import usePagination from "./usePagination";

type FilterType = {
    priceMin?: number | string;
    priceMax?: number | string;
    type?: string[];
    mass?: string[];
}
const useFilter = (): [(query: FilterType) => void] => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const sortField: string | null = searchParams.get('sortField');
    const sortOrder: string | null = searchParams.get('sortOrder');
    const firstPage: number = 1;
    const [limit] = usePagination()
    const skip: number = (firstPage - 1) * limit

    const updateFilterQuery = (filterQuery: FilterType) => {
        const params = new URLSearchParams()
        if (filterQuery.priceMin && filterQuery.priceMin !== '0') {
            params.set('priceMin', filterQuery.priceMin.toString())
        } else {
            params.delete('priceMin')
        }
        if (filterQuery.priceMax && filterQuery.priceMax !== '0') {
            params.set('priceMax', filterQuery.priceMax.toString())
        } else {
            params.delete('priceMax')
        }
        if (filterQuery.type && filterQuery.type.length > 0) {
            params.set('type', filterQuery.type.join(','))
        } else {
            params.delete('type')
        }
        if (filterQuery.mass && filterQuery.mass.length > 0) {
            params.set('mass', filterQuery.mass.join(','))
        } else {
            params.delete('mass')
        }
        if (sortField) {
            params.set('sortField', sortField)
        } else {
            params.delete('sortField')
        }
        if (sortOrder) {
            params.set('sortOrder', sortOrder)
        } else {
            params.delete('sortOrder')
        }
        params.delete('page')
        params.delete('limit')
        params.delete('skip')
        params.set('page', firstPage.toString())
        params.set('limit', limit.toString())
        params.set('skip', skip.toString())
        router.push(`${pathName}?${params.toString()}`)
    }
    return [updateFilterQuery]
}

export default useFilter