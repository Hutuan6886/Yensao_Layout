import { useEffect, useState } from "react"

const useMounted = (): boolean | null => {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        if (!mounted) setMounted(true)
    }, [])
    if (!mounted) {
        return null
    }
    return mounted
}

export default useMounted