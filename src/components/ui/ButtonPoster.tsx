"use client"
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'

interface ButtonPosterProps {
  children: React.ReactNode
  className?: string
  isShowIcon?: boolean
}
const ButtonPoster: React.FC<ButtonPosterProps> = ({ children, className, isShowIcon }) => {
  const [isHoverButton, setIsHoverButton] = useState<boolean>(false)
  return (
    <button className={cn('relative flex flex-row items-center justify-center gap-2 w-fit h-auto px-5 md:px-8 py-2 border border-white text-white before:contents-[""] before:absolute before:top-0 before:left-0 before:w-[0%] before:h-full before:bg-[#c58c37] before:-z-10 before:transition-all before:duration-500 hover:before:w-[100%]', className)}
      onMouseEnter={() => setIsHoverButton(true)}
      onMouseLeave={() => setIsHoverButton(false)}
    >
      {children}
      {isShowIcon && isHoverButton
        && <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
        >
          <FaChevronRight size={10} />
        </motion.div>}
    </button>
  )
}

export default ButtonPoster
