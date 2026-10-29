import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { org } from '../data/contact'
import { heroImage } from '../data/gallery'
import { GoldButton, OutlineLightButton } from './ui/buttons'
import { PageContainer } from './ui/Container'
import { RouterLink } from './ui/RouterLink'

type Props = {
  image?: string
  headline?: string
  lead?: string
}

export function Hero({
  image = heroImage,
  headline = org.mission,
  lead = 'Registered social & educational trust building shelter, skills, and community care across Maharashtra.',
}: Props) {
  return (
    <Box
      as="section"
      aria-label="Welcome"
      position="relative"
      minH={{ base: 'calc(100dvh - 4.5rem)', md: 'calc(100dvh - 5rem)' }}
      display="flex"
      alignItems="flex-end"
      overflow="hidden"
      bg="brand.900"
      color="cream.50"
    >
      <Box position="absolute" inset={0} aria-hidden>
        <Image
          src={image}
          alt=""
          w="100%"
          h="100%"
          objectFit="cover"
          css={{
            animation: 'kenBurns 22s ease-out forwards',
            '@keyframes kenBurns': {
              from: { transform: 'scale(1)' },
              to: { transform: 'scale(1.08)' },
            },
          }}
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="to-b"
          gradientFrom="rgba(11,48,34,0.35)"
          gradientVia="rgba(11,48,34,0.55)"
          gradientTo="rgba(11,48,34,0.92)"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="to-r"
          gradientFrom="rgba(11,48,34,0.55)"
          gradientTo="transparent"
          display={{ base: 'none', md: 'block' }}
        />
      </Box>

      <PageContainer position="relative" zIndex={1} pb={{ base: 12, md: 16 }} pt={{ base: 16, md: 24 }}>
        <Stack gap={4} maxW={{ base: '100%', md: '40rem' }}>
          <Flex align="center" gap={{ base: 3, md: 4 }}>
            <Image
              src="/logo.png"
              alt=""
              boxSize={{ base: '16', sm: '20', md: '24' }}
              borderRadius="full"
              bg="white"
              objectFit="cover"
              boxShadow="0 0 0 3px rgba(201, 162, 39, 0.55), 0 12px 40px rgba(0,0,0,0.35)"
              flexShrink={0}
            />
            <Heading
              as="h1"
              fontSize={{ base: '2xl', sm: '3xl', md: '5xl' }}
              color="cream.50"
              fontWeight="650"
              lineHeight="1.05"
              textShadow="0 2px 24px rgba(0,0,0,0.35)"
            >
              {org.shortName}
            </Heading>
          </Flex>
          <Text
            fontFamily="heading"
            fontSize={{ base: 'lg', md: 'xl' }}
            color="gold.400"
            fontWeight="medium"
            maxW="22ch"
          >
            {headline}
          </Text>
          <Text fontSize={{ base: 'md', md: 'lg' }} color="whiteAlpha.900" maxW="36ch">
            {lead}
          </Text>
          <Flex gap={3} flexWrap="wrap" pt={2}>
            <GoldButton asChild>
              <RouterLink to="/donate">Donate</RouterLink>
            </GoldButton>
            <OutlineLightButton asChild>
              <RouterLink to="/projects">Our Work</RouterLink>
            </OutlineLightButton>
          </Flex>
        </Stack>
      </PageContainer>
    </Box>
  )
}
