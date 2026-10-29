import {
  Box,
  Heading,
  Input,
  Link,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { useState, type FormEvent, type ReactNode } from 'react'
import { FadeIn } from '../components/FadeIn'
import { GoldButton } from '../components/ui/buttons'
import { PageContainer } from '../components/ui/Container'
import { SectionLabel } from '../components/ui/SectionLabel'
import { org } from '../data/contact'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = String(fd.get('name') ?? '')
    const email = String(fd.get('email') ?? '')
    const phone = String(fd.get('phone') ?? '')
    const interest = String(fd.get('interest') ?? '')
    const message = String(fd.get('message') ?? '')

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterest: ${interest}\n\n${message}`,
    )
    const subject = encodeURIComponent(`Website enquiry — ${interest || 'General'}`)
    window.location.href = `mailto:${org.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <Box bgGradient="to-b" gradientFrom="cream.50" gradientTo="cream.100" pb={{ base: 14, md: 20 }}>
      <PageContainer>
        <Box pt={{ base: 12, md: 16 }} pb={8}>
          <FadeIn>
            <SectionLabel>Contact</SectionLabel>
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }}>
              We’d love to hear from you
            </Heading>
          </FadeIn>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 10, md: 12 }} alignItems="start">
          <FadeIn>
            <Stack gap={3} fontSize="md">
              <Text>
                Email{' '}
                <Link href={`mailto:${org.email}`} color="brand.700" fontWeight="semibold">
                  {org.email}
                </Link>
              </Text>
              {org.phones.map((p) => (
                <Text key={p}>
                  Phone{' '}
                  <Link href={`tel:+91${p}`} color="brand.700" fontWeight="semibold">
                    +91 {p}
                  </Link>
                </Text>
              ))}
              <Text>
                {org.location}
                <br />
                {org.domain}
              </Text>
              <Text>Registration {org.registration}</Text>
            </Stack>
          </FadeIn>

          <FadeIn delay={100}>
            <Box bg="white" p={{ base: 5, md: 7 }} borderTopWidth="3px" borderColor="gold.500">
              <form onSubmit={onSubmit}>
                <Stack gap={4}>
                  <Field label="Name">
                    <Input name="name" required autoComplete="name" bg="cream.50" borderColor="cream.200" />
                  </Field>
                  <Field label="Email">
                    <Input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      bg="cream.50"
                      borderColor="cream.200"
                    />
                  </Field>
                  <Field label="Phone">
                    <Input name="phone" type="tel" autoComplete="tel" bg="cream.50" borderColor="cream.200" />
                  </Field>
                  <Field label="I am interested in">
                    <NativeSelect.Root bg="cream.50" borderColor="cream.200">
                      <NativeSelect.Field name="interest" defaultValue="Volunteering">
                        <option value="Volunteering">Volunteering</option>
                        <option value="Donating">Donating</option>
                        <option value="Partnership">Partnership</option>
                        <option value="General enquiry">General enquiry</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field>
                  <Field label="Message">
                    <Textarea name="message" required minH="8rem" bg="cream.50" borderColor="cream.200" />
                  </Field>
                  <GoldButton type="submit" alignSelf="flex-start">
                    Send message
                  </GoldButton>
                  <Text fontSize="sm" color="ink.700">
                    {sent
                      ? `Opening your email app… If nothing opens, write to ${org.email}.`
                      : 'Form opens your email client. To use Formspree, set the form action to your endpoint.'}
                  </Text>
                </Stack>
              </form>
            </Box>
          </FadeIn>
        </SimpleGrid>
      </PageContainer>
    </Box>
  )
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Box>
      <Text as="label" display="block" fontSize="sm" fontWeight="semibold" color="brand.900" mb={1}>
        {label}
      </Text>
      {children}
    </Box>
  )
}
