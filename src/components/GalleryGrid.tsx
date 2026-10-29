import { Button, Grid, Image, Text } from '@chakra-ui/react'
import { useState } from 'react'
import type { GalleryItem } from '../data/gallery'

type Props = {
  items: GalleryItem[]
  limit?: number
}

export function GalleryGrid({ items, limit }: Props) {
  const [active, setActive] = useState<GalleryItem | null>(null)
  const shown = limit ? items.slice(0, limit) : items

  return (
    <>
      <Grid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
        gap={{ base: 2, md: 3 }}
      >
        {shown.map((item) => (
          <Button
            key={item.src}
            variant="ghost"
            position="relative"
            overflow="hidden"
            bg="brand.900"
            aspectRatio={1}
            cursor="zoom-in"
            p={0}
            h="auto"
            minW={0}
            borderRadius={0}
            onClick={() => setActive(item)}
            aria-label={`View: ${item.alt}`}
            role="group"
            _hover={{ bg: 'brand.900' }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              w="100%"
              h="100%"
              objectFit="cover"
              loading="lazy"
              transition="transform 0.5s ease"
              _groupHover={{ transform: 'scale(1.05)' }}
            />
            <Text
              position="absolute"
              insetInline={0}
              bottom={0}
              pt={8}
              pb={2}
              px={3}
              bgGradient="to-t"
              gradientFrom="rgba(11,48,34,0.85)"
              gradientTo="transparent"
              color="cream.50"
              fontSize="xs"
              textAlign="left"
              opacity={0}
              transition="opacity 0.3s"
              _groupHover={{ opacity: 1 }}
            >
              {item.category}
            </Text>
          </Button>
        ))}
      </Grid>

      {active ? (
        <Button
          variant="ghost"
          position="fixed"
          inset={0}
          zIndex={200}
          bg="blackAlpha.900"
          display="flex"
          alignItems="center"
          justifyContent="center"
          p={6}
          h="100dvh"
          w="100vw"
          borderRadius={0}
          cursor="zoom-out"
          onClick={() => setActive(null)}
          aria-label="Close image"
          _hover={{ bg: 'blackAlpha.900' }}
        >
          <Image
            src={active.src}
            alt={active.alt}
            maxW="min(100%, 56rem)"
            maxH="90vh"
            objectFit="contain"
            boxShadow="xl"
          />
        </Button>
      ) : null}
    </>
  )
}
