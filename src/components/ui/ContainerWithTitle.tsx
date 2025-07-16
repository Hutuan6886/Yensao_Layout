import { cn } from '@/lib/utils'
import React from 'react'

interface ContainerWithTitleProps {
  title?: string
  desc?: string
  children: React.ReactNode
  className?: string
}
const ContainerWithTitle: React.FC<ContainerWithTitleProps> = ({ title, desc, children, className }) => {
  return (
    <div className={cn('w-full h-auto py-[20px] md:py-[40px]', className)}>
      <div className='w-full flex flex-col items-center gap-[16px] md:gap-[40px]'>
        {
          title && <div className='w-full flex flex-col items-center gap-[16px] md:gap-[20px]'>
            <div className='w-[90%] md:w-[60%] m-auto flex flex-col items-center justify-start gap-1 md:gap-2'>
              <h1 className='text-xl md:text-2xl text-[#661a1a] text-nowrap font-semibold'>{title}</h1>
              <hr className='w-[80px] border-[1.5px] border-[#661a1a]' />
            </div>
            <p className='w-[60%] md:w-[40%] m-auto text-[#7d7d7d] text-[0.7rem] md:text-xs text-center'>{desc}</p>
          </div>
        }
        <div className='w-[95%] m-auto h-fit'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default ContainerWithTitle
