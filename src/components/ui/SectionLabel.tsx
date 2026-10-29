import { Text, type TextProps } from '@chakra-ui/react'

export function SectionLabel(props: TextProps) {
  return (
    <Text
      fontSize="xs"
      fontWeight="bold"
      letterSpacing="0.14em"
      textTransform="uppercase"
      color="gold.600"
      mb={3}
      {...props}
    />
  )
}
