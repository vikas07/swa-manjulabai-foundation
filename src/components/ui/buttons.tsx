import { Button, type ButtonProps } from '@chakra-ui/react'

const base: ButtonProps = {
  borderRadius: 'sm',
  fontWeight: 'semibold',
  fontSize: 'md',
  px: 5,
  h: '11',
  minH: '11',
  transition: 'all 0.2s ease',
  _hover: { transform: 'translateY(-1px)' },
}

export function GoldButton(props: ButtonProps) {
  return (
    <Button
      {...base}
      bg="linear-gradient(135deg, #E0C15A, #C9A227 45%, #A8841A)"
      color="brand.900"
      boxShadow="0 4px 14px rgba(201, 162, 39, 0.3)"
      _hover={{
        ...base._hover,
        boxShadow: '0 6px 18px rgba(201, 162, 39, 0.45)',
      }}
      {...props}
    />
  )
}

export function OutlineLightButton(props: ButtonProps) {
  return (
    <Button
      {...base}
      variant="outline"
      borderWidth="2px"
      borderColor="whiteAlpha.700"
      color="cream.50"
      bg="transparent"
      _hover={{
        ...base._hover,
        bg: 'whiteAlpha.200',
        borderColor: 'cream.50',
      }}
      {...props}
    />
  )
}

export function OutlineDarkButton(props: ButtonProps) {
  return (
    <Button
      {...base}
      variant="outline"
      borderWidth="2px"
      borderColor="brand.900"
      color="brand.900"
      bg="transparent"
      _hover={{
        ...base._hover,
        bg: 'brand.900',
        color: 'cream.50',
      }}
      {...props}
    />
  )
}
