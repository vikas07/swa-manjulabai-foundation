import { Box, Heading, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { FadeIn } from '../components/FadeIn'
import { GoldButton } from '../components/ui/buttons'
import { PageContainer } from '../components/ui/Container'
import { RouterLink } from '../components/ui/RouterLink'
import { SectionLabel } from '../components/ui/SectionLabel'
import { org } from '../data/contact'

export function About() {
  return (
    <Box
      bgGradient="to-br"
      gradientFrom="cream.50"
      gradientTo="cream.100"
      pb={{ base: 14, md: 20 }}
    >
      <PageContainer>
        <Box pt={{ base: 12, md: 16 }} pb={8}>
          <FadeIn>
            <SectionLabel>About</SectionLabel>
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} maxW="16ch" mb={4}>
              {org.shortName}
            </Heading>
            <Text fontSize={{ base: 'lg', md: 'xl' }} color="ink.700" maxW="40rem">
              A Mumbai–Maharashtra trust dedicated to social welfare, education, livelihood, and
              compassionate community care.
            </Text>
          </FadeIn>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 12 }} alignItems="start">
          <FadeIn>
            <Stack gap={4}>
              <Text>
                Our full legal name is <Text as="strong">{org.legalName}</Text>. We work with families
                facing illness, livelihood gaps, and everyday hardship — through flagship programs in
                cancer accommodation, jute skill development, rubber plantation livelihoods, and AASRA
                community support.
              </Text>
              <Text>
                The foundation’s emblem — hands cradling the earth, flanked by golden grain — reflects
                our promise: protect dignity, nurture growth, and serve with accountability.
              </Text>
              <Text>
                We welcome donors, volunteers, and partners who want transparent, ground-level impact
                in Maharashtra.
              </Text>
              <Box>
                <GoldButton asChild>
                  <RouterLink to="/donate">Support our work</RouterLink>
                </GoldButton>
              </Box>
            </Stack>
          </FadeIn>

          <FadeIn delay={120}>
            <Box bg="white" p={{ base: 5, md: 7 }} borderLeftWidth="3px" borderColor="gold.500">
              <Heading as="h2" fontSize="xl" mb={4}>
                Trust details
              </Heading>
              <Stack gap={4} fontSize="md">
                <Detail label="Legal name" value={org.legalName} />
                <Detail label="Public name" value={org.shortName} />
                <Detail label="Registration" value={org.registration} />
                <Detail label="Location" value={org.location} />
                <Box>
                  <Text fontSize="xs" fontWeight="bold" letterSpacing="0.1em" textTransform="uppercase" color="gold.600" mb={1}>
                    Email
                  </Text>
                  <Link href={`mailto:${org.email}`} color="brand.700" textDecoration="underline">
                    {org.email}
                  </Link>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold" letterSpacing="0.1em" textTransform="uppercase" color="gold.600" mb={1}>
                    Phone
                  </Text>
                  <Text>
                    {org.phones.map((p, i) => (
                      <span key={p}>
                        {i > 0 ? ' · ' : ''}
                        <Link href={`tel:+91${p}`} color="brand.700" textDecoration="underline">
                          +91 {p}
                        </Link>
                      </span>
                    ))}
                  </Text>
                </Box>
                <Detail label="Website" value={org.domain} />
              </Stack>
            </Box>
          </FadeIn>
        </SimpleGrid>
      </PageContainer>
    </Box>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Text fontSize="xs" fontWeight="bold" letterSpacing="0.1em" textTransform="uppercase" color="gold.600" mb={1}>
        {label}
      </Text>
      <Text>{value}</Text>
    </Box>
  )
}
