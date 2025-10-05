import ContainerWithTitle from '@/components/ui/ContainerWithTitle'
import Image from 'next/image'
import React, { Fragment } from 'react'

const post = {
  title: "Về Chúng Tôi",
  content: ["Công ty chúng tôi chuyên cung cấp các dịch vụ và sản phẩm chất lượng cao, đáp ứng nhu cầu đa dạng của khách hàng. Với đội ngũ nhân viên giàu kinh nghiệm và tận tâm, chúng tôi cam kết mang đến sự hài lòng tối đa cho khách hàng thông qua các giải pháp sáng tạo và hiệu quả. Chúng tôi luôn nỗ lực không ngừng để cải thiện và phát triển, nhằm duy trì vị thế hàng đầu trong ngành và xây dựng mối quan hệ bền vững với khách hàng.", "Sau 4 năm phát triển, thương hiệu của chúng tôi đang dần lớn mạnh và hiện là thương hiệu có doanh thu cao nhất và luôn dẫn đầu trên các nền tảng thương mại điện tử hiện nay.", "Hành trình của chúng tôi bắt đầu từ niềm đam mê và khát vọng tạo ra sự khác biệt. Chúng tôi tin rằng, với sự cam kết và tinh thần đổi mới, chúng tôi có thể vượt qua mọi thách thức và đạt được những thành công lớn hơn trong tương lai. Hãy cùng chúng tôi khám phá và trải nghiệm những giá trị mà chúng tôi mang lại."],
  image: '/images/TEA03224.jpg',
  alt: 'Hình ảnh về thương hiện yến Sào Hữu Tuân'
}

const AboutUsPost = () => {
  return (
    <ContainerWithTitle title={post.title}>
      <div className="flex flex-col gap-4">
        {post.content.map((paragraph, index) => (
        index === 0 ? <Fragment key={0}>
          <p className='text-justify'>{paragraph}</p>
          <Image src={post.image} alt={post.alt} width={1200} height={900} className="w-[40%] h-auto m-auto" />
        </Fragment>
          :
          <p key={index} className='text-justify'>{paragraph}</p>
      ))}
      </div>
    </ContainerWithTitle>
  )
}

export default AboutUsPost
