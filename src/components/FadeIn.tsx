import { Box, type BoxProps } from '@chakra-ui/react'
import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
} & BoxProps

export function FadeIn({ children, delay = 0, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Box
      ref={ref}
      opacity={visible ? 1 : 0}
      transform={visible ? 'none' : 'translateY(1.25rem)'}
      transition={`opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`}
      {...rest}
    >
      {children}
    </Box>
  )
}
