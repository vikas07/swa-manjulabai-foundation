import { Box, Heading, Image, Link, SimpleGrid, Text, Wrap, WrapItem } from '@chakra-ui/react'
import type { Project } from '../data/projects'
import { GoldButton, OutlineDarkButton } from './ui/buttons'
import { RouterLink } from './ui/RouterLink'

type Props = {
  project: Project
  compact?: boolean
}

export function ProjectCard({ project, compact }: Props) {
  const body = (
    <Box pt={compact ? 4 : { base: 4, md: 0 }}>
      <Heading as="h3" fontSize={{ base: 'xl', md: '2xl' }} mb={2}>
        {project.title}
      </Heading>
      <Text color="ink.700" mb={4}>
        {compact ? project.summary : project.detail}
      </Text>
      {!compact ? (
        <Wrap gap={3} mb={5}>
          {project.highlights.map((h) => (
            <WrapItem key={h}>
              <Text fontSize="sm" fontWeight="semibold" color="brand.700">
                · {h}
              </Text>
            </WrapItem>
          ))}
        </Wrap>
      ) : null}
      <Wrap gap={3}>
        <WrapItem>
          <GoldButton asChild>
            <RouterLink to={`/donate?purpose=${encodeURIComponent(project.donatePurpose)}`}>
              Support this
            </RouterLink>
          </GoldButton>
        </WrapItem>
        <WrapItem>
          <OutlineDarkButton asChild>
            <a href={project.pdf} target="_blank" rel="noopener noreferrer">
              View DPR PDF
            </a>
          </OutlineDarkButton>
        </WrapItem>
        {compact ? (
          <WrapItem>
            <OutlineDarkButton asChild>
              <RouterLink to="/projects">Learn more</RouterLink>
            </OutlineDarkButton>
          </WrapItem>
        ) : null}
      </Wrap>
    </Box>
  )

  const media = (
    <Link
      href={project.pdf}
      target="_blank"
      rel="noopener noreferrer"
      display="block"
      position="relative"
      overflow="hidden"
      bg="cream.100"
      borderWidth="1px"
      borderColor="cream.200"
      aspectRatio={compact ? 4 / 3 : { base: 4 / 3, md: 3 / 4 }}
      title={`Open ${project.shortTitle} DPR`}
      _hover={{ textDecoration: 'none' }}
    >
      <Image
        src={project.image}
        alt={`${project.title} — DPR cover`}
        w="100%"
        h="100%"
        objectFit="contain"
        objectPosition="top"
        loading="lazy"
        transition="transform 0.6s ease"
        _groupHover={{ transform: 'scale(1.02)' }}
      />
      {project.budgetLabel ? (
        <Box
          position="absolute"
          left={3}
          bottom={3}
          px={2.5}
          py={1}
          bg="blackAlpha.800"
          color="gold.400"
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="0.06em"
          textTransform="uppercase"
        >
          {project.budgetLabel} DPR
        </Box>
      ) : null}
    </Link>
  )

  if (compact) {
    return (
      <Box as="article" role="group">
        {media}
        {body}
      </Box>
    )
  }

  return (
    <SimpleGrid
      as="article"
      columns={{ base: 1, md: 2 }}
      gap={{ base: 4, md: 8 }}
      alignItems="center"
      role="group"
    >
      {media}
      {body}
    </SimpleGrid>
  )
}
