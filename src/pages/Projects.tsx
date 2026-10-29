import { Box, Heading, Stack, Text } from '@chakra-ui/react'
import { FadeIn } from '../components/FadeIn'
import { ProjectCard } from '../components/ProjectCard'
import { PageContainer } from '../components/ui/Container'
import { SectionLabel } from '../components/ui/SectionLabel'
import { projects } from '../data/projects'

export function Projects() {
  return (
    <Box bg="cream.50" pb={{ base: 14, md: 20 }}>
      <PageContainer>
        <Box pt={{ base: 12, md: 16 }} pb={6}>
          <FadeIn>
            <SectionLabel>Projects</SectionLabel>
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} mb={3}>
              Programs shaped by real need
            </Heading>
            <Text color="ink.700" fontSize={{ base: 'md', md: 'lg' }} maxW="40rem">
              Four flagship initiatives drawn from our detailed project reports — accommodation,
              skills, livelihood, and community care.
            </Text>
          </FadeIn>
        </Box>

        <Stack gap={{ base: 12, md: 16 }} pt={4}>
          {projects.map((p, i) => (
            <FadeIn key={p.id} delay={i * 60}>
              <ProjectCard project={p} />
            </FadeIn>
          ))}
        </Stack>
      </PageContainer>
    </Box>
  )
}
