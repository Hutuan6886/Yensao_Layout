import RecipeCardImage from './RecipeCardImage'
import RecipeCardMiddle from './RecipeCardMiddle'
import RecipeCardContent from './RecipeCardContent'
interface RecipeCardProps {
    recipe: {
        title: string
        imgUrl: string
        alt: string
        content: string[]
    },
    index: number
}
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, index }) => {
    return (
        <div className='w-full h-[200px] flex flex-row items-center justify-between gap-7'>
            <div className='w-[40%] h-full'>
                {index % 2 == 0 ? <RecipeCardImage imgUrl={recipe.imgUrl} alt={recipe.alt} /> : <RecipeCardContent content={recipe.content} />}
            </div>
            <div className='w-[20%] h-full'>
                <RecipeCardMiddle title={recipe.title} />
            </div>
            <div className='w-[40%] h-full'>
                {index % 2 == 0 ? <RecipeCardContent content={recipe.content} /> : <RecipeCardImage imgUrl={recipe.imgUrl} alt={recipe.alt} />}
            </div>
        </div>
    )
}

export default RecipeCard
