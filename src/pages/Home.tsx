import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FadeIn } from '../components/FadeIn'
import { GalleryGrid } from '../components/GalleryGrid'
import { Hero } from '../components/Hero'
import { ProjectCard } from '../components/ProjectCard'
import { GoldButton, OutlineDarkButton, OutlineLightButton } from '../components/ui/buttons'
import { PageContainer } from '../components/ui/Container'
import { RouterLink } from '../components/ui/RouterLink'
import { SectionLabel } from '../components/ui/SectionLabel'
import { impactStats, org } from '../data/contact'
import { galleryItems } from '../data/gallery'
import { projects } from '../data/projects'

export function Home() {
  return (
    <Box>
      <Hero />

      <Box as="section" aria-label="Impact highlights" bg="brand.900" color="cream.50" py={{ base: 8, md: 10 }}>
        <PageContainer>
          <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 6, md: 8 }} textAlign="center">
            {impactStats.map((s) => (
              <Box key={s.label}>
                <Text fontFamily="heading" fontSize={{ base: '2xl', md: '3xl' }} color="gold.400" mb={1}>
                  {s.value}
                </Text>
                <Text fontSize="sm" color="whiteAlpha.700" letterSpacing="0.04em">
                  {s.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </PageContainer>
      </Box>

      <Box
        as="section"
        py={{ base: 14, md: 20 }}
        bgGradient="to-b"
        gradientFrom="cream.50"
        gradientTo="cream.100"
      >
        <PageContainer>
          <FadeIn>
            <Stack maxW="40rem" gap={4}>
              <SectionLabel>Our mission</SectionLabel>
              <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }}>
                Care that restores dignity
              </Heading>
              <Text color="ink.700">
                {org.shortName} works where families need steady support — from accommodation near
                cancer treatment, to livelihood skills, plantation work, and everyday community care
                under AASRA.
              </Text>
              <Box>
                <OutlineDarkButton asChild>
                  <RouterLink to="/about">Our story</RouterLink>
                </OutlineDarkButton>
              </Box>
            </Stack>
          </FadeIn>
        </PageContainer>
      </Box>

      <Box as="section" py={{ base: 14, md: 20 }} bg="white">
        <PageContainer>
          <FadeIn>
            <Flex
              justify="space-between"
              align={{ base: 'stretch', sm: 'flex-end' }}
              direction={{ base: 'column', sm: 'row' }}
              gap={4}
              mb={8}
            >
              <Box>
                <SectionLabel>Programs</SectionLabel>
                <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }}>
                  Four flagship efforts
                </Heading>
              </Box>
              <OutlineDarkButton asChild alignSelf={{ base: 'flex-start', sm: 'auto' }}>
                <RouterLink to="/projects">All projects</RouterLink>
              </OutlineDarkButton>
            </Flex>
          </FadeIn>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 12 }}>
            {projects.map((p, i) => (
              <FadeIn key={p.id} delay={i * 80}>
                <ProjectCard project={p} compact />
              </FadeIn>
            ))}
          </SimpleGrid>
        </PageContainer>
      </Box>

      <Box as="section" py={{ base: 14, md: 20 }} bg="brand.900" color="cream.50">
        <PageContainer>
          <FadeIn>
            <SectionLabel color="gold.500">Trust</SectionLabel>
            <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} color="cream.50" mb={4}>
              Registered. Accountable. Local.
            </Heading>
            <Text color="whiteAlpha.850" maxW="38rem" mb={4}>
              We are {org.legalName} — a registered social and educational trust serving from{' '}
              {org.location}.
            </Text>
            <Text color="gold.400" pt={4} borderTopWidth="1px" borderColor="gold.500/30" mb={6}>
              Registration {org.registration}
            </Text>
            <OutlineLightButton asChild>
              <RouterLink to="/about">Registration & contact</RouterLink>
            </OutlineLightButton>
          </FadeIn>
        </PageContainer>
      </Box>

      <Box as="section" py={{ base: 14, md: 20 }} bg="cream.50" textAlign="center">
        <PageContainer>
          <FadeIn>
            <SectionLabel>Give</SectionLabel>
            <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }} mb={3}>
              Your gift funds real work
            </Heading>
            <Text color="ink.700" maxW="32rem" mx="auto" mb={6}>
              Support general operations or earmark a gift for cancer accommodation, jute skills,
              rubber livelihood, or AASRA.
            </Text>
            <GoldButton asChild>
              <RouterLink to="/donate">Donate now</RouterLink>
            </GoldButton>
          </FadeIn>
        </PageContainer>
      </Box>

      <Box as="section" py={{ base: 14, md: 20 }} bg="cream.100">
        <PageContainer>
          <FadeIn>
            <Flex
              justify="space-between"
              align={{ base: 'stretch', sm: 'flex-end' }}
              direction={{ base: 'column', sm: 'row' }}
              gap={4}
              mb={8}
            >
              <Box>
                <SectionLabel>In the field</SectionLabel>
                <Heading as="h2" fontSize={{ base: '2xl', md: '4xl' }}>
                  Moments from our work
                </Heading>
              </Box>
              <OutlineDarkButton asChild alignSelf={{ base: 'flex-start', sm: 'auto' }}>
                <RouterLink to="/gallery">Full gallery</RouterLink>
              </OutlineDarkButton>
            </Flex>
          </FadeIn>
          <FadeIn delay={100}>
            <GalleryGrid items={galleryItems} limit={8} />
          </FadeIn>
        </PageContainer>
      </Box>
    </Box>
  )
}
