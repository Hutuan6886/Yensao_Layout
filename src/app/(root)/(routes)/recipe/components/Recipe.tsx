import React from 'react'
import RecipeCard from './RecipeCard'
import RecipeLabel from './RecipeLabel'

const recipeContent = {
    title: ['Cách ăn tổ yến đơn giản và bổ dưỡng nhất là phương pháp chưng truyền thống.', 'Quá trình gồm 4 bước: Định lượng - Sơ chế, Ngâm yến - Hấp cách thuỷ'],
    recipeData: [{
        title: 'Định Lượng',
        imgUrl: '/images/recipe-1.jpg',
        alt: 'Hình ảnh bước 1 công thức hấp cách thuỷ',
        content: ['- Mỗi tai yến có thể chia được 5 phần.', '- Táo cắt lát.']
    }, {
        title: 'Ngâm Yến',
        imgUrl: '/images/recipe-2.jpg',
        alt: 'Hình ảnh bước 2 công thức hấp cách thuỷ',
        content: ['- Ngâm yến trong 350ml-400ml nước nhiệt độ thường.', '- Ngâm từ 8-10 phút.']
    }, {
        title: 'Làm Sạch',
        imgUrl: '/images/recipe-3.jpg',
        alt: 'Hình ảnh bước 3 công thức hấp cách thuỷ',
        content: ['- Nhặt sạch lông vụn còn sót', '- Bỏ Yến vào bát chưng.', '- Bỏ táo đã cắt lát, hạt sen, hạt chia, và kỳ tử vào.']
    }, {
        title: 'Hấp Cách Thuỷ',
        imgUrl: '/images/recipe-4.webp',
        alt: 'Hình ảnh bước 4 công thức hấp cách thuỷ',
        content: ['- Hấp cách thuỷ từ 10-15 phút tính từ lúc nước sôi.', '- Thêm đông trùng, và đường phèn sau khi tắt bếp.']
    }]
}
const Recipe = () => {
    return (
        <div className=' flex flex-col gap-8
                        w-[65%] m-auto py-10
                        text-center'>
            <RecipeLabel title={recipeContent.title} />
            <div>
                {recipeContent.recipeData.map((recipe, i) => (
                    <RecipeCard key={i} recipe={recipe} index={i} />
                ))}
            </div>
        </div>
    )
}

export default Recipe
