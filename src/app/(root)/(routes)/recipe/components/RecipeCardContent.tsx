import React from 'react'

interface RecipeCardContentProps {
    content: string[]
}
const RecipeCardContent: React.FC<RecipeCardContentProps> = ({ content }) => {
    return (
        <div className='w-full h-full flex flex-col justify-center gap-5
                        text-left font-semibold'>
            {content.map((item: string, i: number) => (
                <p key={i}>{item}</p>
            ))}
        </div>
    )
}

export default RecipeCardContent
