import { Box, Flex, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { org } from '../data/contact'
import { PageContainer } from './ui/Container'
import { RouterLink } from './ui/RouterLink'

export function Footer() {
  return (
    <Box as="footer" bg="brand.900" color="whiteAlpha.800" pt={{ base: 10, md: 14 }} pb={8} mt="auto">
      <PageContainer>
        <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: 8, md: 10 }}>
          <Flex gap={4} align="flex-start">
            <Image
              src="/logo.png"
              alt=""
              boxSize="16"
              borderRadius="full"
              bg="white"
              objectFit="cover"
              flexShrink={0}
            />
            <Box>
              <Text fontFamily="heading" fontSize="xl" color="cream.50" mb={1}>
                {org.shortName}
              </Text>
              <Text fontSize="sm" color="whiteAlpha.700" mb={2} maxW="sm">
                {org.legalName}
              </Text>
              <Text fontSize="sm" color="gold.400">
                {org.registration} · {org.location}
              </Text>
            </Box>
          </Flex>

          <Stack gap={2}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="gold.500"
              mb={1}
            >
              Explore
            </Text>
            {(
              [
                ['/about', 'About'],
                ['/projects', 'Projects'],
                ['/gallery', 'Gallery'],
                ['/donate', 'Donate'],
                ['/contact', 'Contact'],
              ] as const
            ).map(([path, label]) => (
              <RouterLink
                key={path}
                to={path}
                fontSize="md"
                color="whiteAlpha.800"
                _hover={{ color: 'gold.400' }}
              >
                {label}
              </RouterLink>
            ))}
          </Stack>

          <Stack gap={2}>
            <Text
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="gold.500"
              mb={1}
            >
              Contact
            </Text>
            <Link href={`mailto:${org.email}`} color="whiteAlpha.800" _hover={{ color: 'gold.400' }}>
              {org.email}
            </Link>
            {org.phones.map((p) => (
              <Link key={p} href={`tel:+91${p}`} color="whiteAlpha.800" _hover={{ color: 'gold.400' }}>
                +91 {p}
              </Link>
            ))}
            <Text>{org.domain}</Text>
          </Stack>
        </SimpleGrid>

        <Flex
          mt={10}
          pt={5}
          borderTopWidth="1px"
          borderColor="gold.500/25"
          justify="space-between"
          gap={3}
          flexWrap="wrap"
          fontSize="sm"
          color="whiteAlpha.600"
        >
          <Text>© 2026 {org.shortName}</Text>
          <Text>Registered charitable organization · Mumbai, Maharashtra</Text>
        </Flex>
      </PageContainer>
    </Box>
  )
}
