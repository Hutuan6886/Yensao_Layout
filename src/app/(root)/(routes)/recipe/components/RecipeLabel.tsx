import React from 'react'
interface RecipeLabelProps {
    title: string[];
}
const RecipeLabel: React.FC<RecipeLabelProps> = ({ title }) => {
    return (
        <div className='text-xl font-light
                        text-[#661a1a]'>
            {title.map((str, i: number) => (
                <p key={i}>{str}</p>
            ))}
        </div>
    )
}

export default RecipeLabel
