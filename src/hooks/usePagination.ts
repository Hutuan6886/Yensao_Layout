import { useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const usePagination = (): [number, number, (page: number) => void, () => void, () => void] => {
    const pathName = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get('page')) || 1
    const limit: number = 6
    const currentSkip: number = (currentPage - 1) * limit
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', currentPage.toString())
        params.set('limit', limit.toString())
        params.set('skip', currentSkip.toString())
        router.push(`${pathName}?${params.toString()}`)
    }, [currentPage, currentSkip, pathName, router, searchParams])
    const goToPage = (nextPage: number) => {
        const nextSkip: number = (nextPage - 1) * limit
        const params = new URLSearchParams(window.location.search)
        params.set('page', nextPage.toString())
        params.set('limit', limit.toString())
        params.set('skip', nextSkip.toString())
        router.push(`${pathName}?${params.toString()}`)
    }
    const prevPage = () => {
        goToPage(currentPage - 1)
    }
    const nextPage = () => {
        goToPage(currentPage + 1)
    }

    return [currentPage, limit, goToPage, prevPage, nextPage]
}

export default usePagination


