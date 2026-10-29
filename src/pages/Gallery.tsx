import { Box, Heading, Text } from '@chakra-ui/react'
import { FadeIn } from '../components/FadeIn'
import { GalleryGrid } from '../components/GalleryGrid'
import { PageContainer } from '../components/ui/Container'
import { SectionLabel } from '../components/ui/SectionLabel'
import { galleryItems } from '../data/gallery'

export function Gallery() {
  return (
    <Box bg="cream.100" pb={{ base: 14, md: 20 }}>
      <PageContainer>
        <Box pt={{ base: 12, md: 16 }} pb={8}>
          <FadeIn>
            <SectionLabel>Gallery</SectionLabel>
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} mb={3}>
              Work on the ground
            </Heading>
            <Text color="ink.700" maxW="36rem">
              Outreach, skills training, animal care, tree planting, nutrition drives, and community
              gatherings — moments from Swa Manjulabai Foundation in action.
            </Text>
          </FadeIn>
        </Box>
        <FadeIn delay={80}>
          <GalleryGrid items={galleryItems} />
        </FadeIn>
      </PageContainer>
    </Box>
  )
}
