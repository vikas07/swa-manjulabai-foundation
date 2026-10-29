import { Box, Flex, IconButton, Image, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { org } from '../data/contact'
import { GoldButton } from './ui/buttons'
import { PageContainer } from './ui/Container'
import { RouterLink } from './ui/RouterLink'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/contact', label: 'Contact' },
]

function NavItem({
  to,
  end,
  label,
  onClick,
}: {
  to: string
  end?: boolean
  label: string
  onClick?: () => void
}) {
  return (
    <NavLink to={to} end={end} onClick={onClick} style={{ textDecoration: 'none' }}>
      {({ isActive }) => (
        <Text
          as="span"
          display="block"
          px={{ base: 3, lg: 3 }}
          py={{ base: 2.5, lg: 2 }}
          fontSize={{ base: 'md', lg: 'md' }}
          fontWeight="medium"
          color={isActive ? 'cream.50' : 'whiteAlpha.800'}
          bg={isActive ? 'whiteAlpha.100' : 'transparent'}
          borderRadius="sm"
          _hover={{ color: 'cream.50', bg: 'whiteAlpha.100' }}
        >
          {label}
        </Text>
      )}
    </NavLink>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg="rgba(11, 48, 34, 0.94)"
      backdropFilter="blur(12px)"
      borderBottomWidth="1px"
      borderColor="gold.500/30"
    >
      <PageContainer>
        <Flex h={{ base: '18', md: '20' }} align="center" justify="space-between" gap={4}>
          <RouterLink to="/" onClick={close} display="flex" alignItems="center" gap={3.5} minW={0}>
            <Image
              src="/logo.png"
              alt=""
              boxSize={{ base: '12', md: '14' }}
              borderRadius="full"
              bg="white"
              objectFit="cover"
              boxShadow="0 0 0 2px rgba(201, 162, 39, 0.45)"
              flexShrink={0}
            />
            <Box minW={0}>
              <Text
                fontFamily="heading"
                color="cream.50"
                fontWeight="semibold"
                fontSize={{ base: 'md', md: 'lg' }}
                lineHeight="short"
                truncate
              >
                {org.shortName}
              </Text>
              <Text
                fontSize="xs"
                letterSpacing="0.06em"
                textTransform="uppercase"
                color="gold.400"
                display={{ base: 'none', sm: 'block' }}
              >
                {org.location}
              </Text>
            </Box>
          </RouterLink>

          <Flex as="nav" aria-label="Primary" display={{ base: 'none', lg: 'flex' }} align="center" gap={1}>
            {links.map((l) => (
              <NavItem key={l.to} {...l} />
            ))}
          </Flex>

          <GoldButton
            asChild
            display={{ base: 'none', lg: 'inline-flex' }}
            h="10"
            minH="10"
            px={5}
            fontSize="sm"
          >
            <RouterLink to="/donate">Donate</RouterLink>
          </GoldButton>

          <IconButton
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            display={{ base: 'inline-flex', lg: 'none' }}
            variant="outline"
            size="md"
            borderColor="whiteAlpha.400"
            color="cream.50"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? '✕' : '☰'}
          </IconButton>
        </Flex>
      </PageContainer>

      {open ? (
        <Box
          display={{ base: 'block', lg: 'none' }}
          bg="brand.900"
          borderBottomWidth="1px"
          borderColor="gold.500/30"
          px={4}
          pb={4}
        >
          <Stack gap={1}>
            {links.map((l) => (
              <NavItem key={l.to} {...l} onClick={close} />
            ))}
            <GoldButton asChild w="full" mt={3} h="11" minH="11">
              <RouterLink to="/donate" onClick={close}>
                Donate
              </RouterLink>
            </GoldButton>
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}
