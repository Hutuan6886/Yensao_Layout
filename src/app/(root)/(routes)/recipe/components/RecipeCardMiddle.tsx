import React from 'react'

interface RecipeCardMiddleProps {
    title: string
}
const RecipeCardMiddle: React.FC<RecipeCardMiddleProps> = ({ title }) => {
    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-4'>
            <div className='w-px h-14 bg-[#661a1a]'></div>
            <div className='size-20 flex flex-col flex-wrap items-center justify-center
                                border-2 rounded-full text-xs font-semibold
                                border-[#661a1a] text-[#661a1a]'>
                {title}
            </div>
            <div className='w-px h-14 bg-[#661a1a]'></div>
        </div>
    )
}

export default RecipeCardMiddle
