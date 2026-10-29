import { Box, type BoxProps } from '@chakra-ui/react'

export function PageContainer(props: BoxProps) {
  return (
    <Box
      w="100%"
      maxW="72rem"
      mx="auto"
      px={{ base: 4, md: 6 }}
      {...props}
    />
  )
}
