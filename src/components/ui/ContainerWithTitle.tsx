import React from 'react'

interface ContainerWithTitleProps {
  title: string
  desc?: string
  children: React.ReactNode
}
const ContainerWithTitle: React.FC<ContainerWithTitleProps> = ({ title, desc, children }) => {
  return (
    <div className='w-full h-auto pt-[40px] md:pt-[80px]'>
      <div className='w-full flex flex-col items-center gap-[16px] md:gap-[40px]'>
        <div className='w-full flex flex-col items-center gap-[16px] md:gap-[20px]'>
          <div className='w-[90%] md:w-[60%] m-auto flex flex-row items-center justify-start gap-4 md:gap-5'>
            <hr className='w-full border-[1.5px] border-[#998264]' />
            <h1 className='text-xl md:text-2xl text-nowrap font-semibold'>{title}</h1>
            <hr className='w-full border-[1.5px] border-[#998264]' />
          </div>
          <p className='w-[60%] md:w-[40%] m-auto text-zinc-600 text-[0.7rem] md:text-xs text-center'>{desc}</p>
        </div>
        {children}
      </div>
    </div>
  )
}

export default ContainerWithTitle
