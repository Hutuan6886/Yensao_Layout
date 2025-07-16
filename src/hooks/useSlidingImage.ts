import { useEffect, useState } from "react"

const useSlidingContent = <T>(images: T[], imageShowIndex: number, isAutoSlide?: boolean, autoSlideInterval?: number) => {
    const [indexImg, setIndexImg] = useState<number>(imageShowIndex)

    //todo: auto slider
    useEffect(() => {
        if (!isAutoSlide) return
        const slideInterval = setInterval(nextContentClick, autoSlideInterval)

        return () => clearInterval(slideInterval)
    })

    const previousContentClick = () => {
        if (indexImg === 0) {
            setIndexImg(images.length - 1)
        } else {
            setIndexImg(indexImg - 1)
        }
    }
    const nextContentClick = () => {
        if (indexImg === images.length - 1) {
            setIndexImg(0)
        } else {
            setIndexImg(indexImg + 1)
        }
    }

    return { indexImg, setIndexImg, previousContentClick, nextContentClick }
}

export default useSlidingContent