import { usePathname, useRouter, useSearchParams } from "next/navigation";
import usePagination from "./usePagination";

type SortType = {
    sortField?: string;
    sortOrder?: string;
}
const useSort = () => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const priceMin: string | null = searchParams.get('priceMin');
    const priceMax: string | null = searchParams.get('priceMax');
    const type: string[] = searchParams.getAll('type');
    const mass: string[] = searchParams.getAll('mass');
    const firstPage: number = 1;
    const [limit] = usePagination()
    const skip: number = (firstPage - 1) * limit

    const updateSortQuery = (sortQuery: SortType) => {
        const params = new URLSearchParams()
        if (priceMin) {
            params.set('priceMin', priceMin)
        }
        if (priceMax) {
            params.set('priceMax', priceMax)
        }
        if (type.length > 0) {
            params.set('type', type.join(','))
        }
        if (mass.length > 0) {
            params.set('mass', mass.join(','))
        }
        if (sortQuery.sortField) {
            params.set('sortField', sortQuery.sortField)
        } else {
            params.delete('sortField')
        }
        if (sortQuery.sortOrder) {
            params.set('sortOrder', sortQuery.sortOrder)
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
    return [updateSortQuery]
}
export default useSort;
