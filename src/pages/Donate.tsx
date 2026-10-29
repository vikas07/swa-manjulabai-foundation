import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  List,
  NativeSelect,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FadeIn } from '../components/FadeIn'
import { GoldButton, OutlineDarkButton } from '../components/ui/buttons'
import { PageContainer } from '../components/ui/Container'
import { RouterLink } from '../components/ui/RouterLink'
import { SectionLabel } from '../components/ui/SectionLabel'
import { donatePurposes, type DonatePurpose } from '../data/projects'
import { checkout, paymentsConfig } from '../payments/PaymentService'
import type { PaymentProvider, PaymentResult } from '../payments/types'

const PRESETS = [500, 1000, 2500, 5000] as const

export function Donate() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const config = useMemo(() => paymentsConfig(), [])

  const purposeParam = params.get('purpose') ?? ''
  const initialPurpose = (donatePurposes.find((p) => p === purposeParam) ??
    'General Fund') as DonatePurpose

  const [amount, setAmount] = useState<number>(1000)
  const [custom, setCustom] = useState('')
  const [purpose, setPurpose] = useState<DonatePurpose>(initialPurpose)
  const [provider, setProvider] = useState<PaymentProvider>('razorpay')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const effectiveAmount = custom ? Number(custom) : amount

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill name, email, and phone.')
      return
    }
    if (!Number.isFinite(effectiveAmount) || effectiveAmount < 1) {
      setError('Enter a valid donation amount.')
      return
    }

    setBusy(true)
    try {
      const result: PaymentResult = await checkout({
        amountInr: effectiveAmount,
        donorName: name.trim(),
        donorEmail: email.trim(),
        donorPhone: phone.trim(),
        purpose,
        provider,
      })

      if (result.status === 'success') {
        const q = new URLSearchParams({
          orderId: result.orderId,
          amount: String(result.amountInr),
          purpose: result.purpose,
          name: result.donorName,
          provider: result.provider,
          mode: result.mode,
        })
        navigate(`/donate/success?${q.toString()}`)
        return
      }
      if (result.status === 'cancelled') {
        setError('Checkout was cancelled.')
      } else {
        setError(result.message)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <Box
      bgGradient="to-br"
      gradientFrom="cream.50"
      gradientTo="cream.100"
      pb={{ base: 14, md: 20 }}
    >
      <PageContainer>
        <Box pt={{ base: 12, md: 16 }} pb={6}>
          <FadeIn>
            <SectionLabel>Donate</SectionLabel>
            <Heading as="h1" fontSize={{ base: '3xl', md: '5xl' }} mb={3}>
              Give with clarity
            </Heading>
            <Text color="ink.700" fontSize={{ base: 'md', md: 'lg' }} maxW="38rem" mb={3}>
              Choose an amount, tell us where to apply your gift, and complete checkout via Razorpay
              or PayPal. Until live keys are configured, the site runs in demo mode with the same
              success path.
            </Text>
            <Text
              as="span"
              display="inline-block"
              px={3}
              py={1}
              bg="brand.700/15"
              color="brand.700"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing="0.04em"
              textTransform="uppercase"
            >
              Payments: {config.mode}
              {config.mode === 'demo' ? ' (no live charge)' : ''}
            </Text>
          </FadeIn>
        </Box>

        <SimpleGrid columns={{ base: 1, lg: 5 }} gap={{ base: 8, lg: 10 }} alignItems="start">
          <FadeIn gridColumn={{ lg: 'span 3' }}>
            <Box
              bg="white"
              p={{ base: 5, md: 8 }}
              borderTopWidth="3px"
              borderColor="gold.500"
              boxShadow="lg"
            >
              <form onSubmit={onSubmit}>
              <Stack gap={5}>
                <Box>
                  <SectionLabel mb={3}>Amount (INR)</SectionLabel>
                  <SimpleGrid columns={{ base: 2, sm: 4 }} gap={3}>
                    {PRESETS.map((n) => {
                      const active = !custom && amount === n
                      return (
                        <Button
                          key={n}
                          type="button"
                          variant="outline"
                          h="auto"
                          py={3}
                          px={2}
                          borderWidth="1.5px"
                          borderColor={active ? 'gold.500' : 'cream.200'}
                          bg={active ? 'gold.500/20' : 'cream.50'}
                          color="brand.900"
                          fontWeight="bold"
                          borderRadius="sm"
                          onClick={() => {
                            setAmount(n)
                            setCustom('')
                          }}
                        >
                          ₹{n.toLocaleString('en-IN')}
                        </Button>
                      )
                    })}
                  </SimpleGrid>
                </Box>

                <Field label="Custom amount">
                  <Input
                    type="number"
                    min={1}
                    placeholder="Enter amount"
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    bg="cream.50"
                    borderColor="cream.200"
                  />
                </Field>

                <Field label="Purpose">
                  <NativeSelect.Root bg="cream.50">
                    <NativeSelect.Field
                      value={purpose}
                      onChange={(e) => setPurpose(e.currentTarget.value as DonatePurpose)}
                    >
                      {donatePurposes.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </NativeSelect.Field>
                    <NativeSelect.Indicator />
                  </NativeSelect.Root>
                </Field>

                <Field label="Full name">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    required
                    bg="cream.50"
                    borderColor="cream.200"
                  />
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    bg="cream.50"
                    borderColor="cream.200"
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    required
                    bg="cream.50"
                    borderColor="cream.200"
                  />
                </Field>

                <Box>
                  <SectionLabel mb={3}>Payment method</SectionLabel>
                  <SimpleGrid columns={2} gap={3}>
                    {(['razorpay', 'paypal'] as const).map((p) => (
                      <Button
                        key={p}
                        type="button"
                        variant="outline"
                        h="auto"
                        py={3}
                        borderWidth="1.5px"
                        borderColor={provider === p ? 'brand.900' : 'cream.200'}
                        bg={provider === p ? 'brand.900/10' : 'cream.50'}
                        color={provider === p ? 'brand.900' : 'ink.700'}
                        fontWeight="bold"
                        borderRadius="sm"
                        textTransform="capitalize"
                        onClick={() => setProvider(p)}
                      >
                        {p}
                      </Button>
                    ))}
                  </SimpleGrid>
                </Box>

                <Box id="paypal-button-container" />

                {error ? (
                  <Text color="red.700" fontSize="sm">
                    {error}
                  </Text>
                ) : null}

                <GoldButton type="submit" disabled={busy} alignSelf="stretch">
                  {busy
                    ? 'Processing…'
                    : `Donate ₹${Number.isFinite(effectiveAmount) ? effectiveAmount.toLocaleString('en-IN') : '—'}`}
                </GoldButton>
              </Stack>
              </form>
            </Box>
          </FadeIn>

          <FadeIn delay={100} gridColumn={{ lg: 'span 2' }}>
            <Box pt={{ base: 0, lg: 2 }}>
              <Heading as="h2" fontSize="xl" mb={3}>
                Where gifts go
              </Heading>
              <List.Root pl={4} color="ink.700" gap={2}>
                <List.Item>General Fund — day-to-day outreach and AASRA care</List.Item>
                <List.Item>Cancer Accommodation — Kharghar stay & meals program</List.Item>
                <List.Item>Jute Skill Development — training batches for livelihoods</List.Item>
                <List.Item>Rubber Plantation — rural livelihood & production</List.Item>
              </List.Root>
              <Text mt={4}>
                Questions?{' '}
                <RouterLink to="/contact" color="brand.700" textDecoration="underline">
                  Contact us
                </RouterLink>{' '}
                before you give.
              </Text>
            </Box>
          </FadeIn>
        </SimpleGrid>
      </PageContainer>
    </Box>
  )
}

export function DonateSuccess() {
  const [params] = useSearchParams()
  const amount = params.get('amount')
  const purpose = params.get('purpose')
  const name = params.get('name')
  const orderId = params.get('orderId')
  const mode = params.get('mode')
  const provider = params.get('provider')

  return (
    <Box bg="cream.50" pb={{ base: 14, md: 20 }}>
      <PageContainer pt={{ base: 12, md: 16 }}>
        <Box bg="white" borderTopWidth="3px" borderColor="gold.500" p={{ base: 8, md: 12 }} textAlign="center">
          <SectionLabel>Thank you</SectionLabel>
          <Heading as="h1" fontSize={{ base: '2xl', md: '4xl' }} mb={3}>
            Donation recorded{mode === 'demo' ? ' (demo)' : ''}
          </Heading>
          <Text color="ink.700" maxW="28rem" mx="auto" mb={2}>
            {name ? `${name}, ` : ''}your gift
            {amount ? ` of ₹${Number(amount).toLocaleString('en-IN')}` : ''}
            {purpose ? ` toward ${purpose}` : ''} is appreciated.
          </Text>
          <Text color="ink.700" mb={6}>
            {provider ? `${provider} · ` : ''}
            {orderId ? `Ref ${orderId}` : null}
          </Text>
          <Flex gap={3} justify="center" flexWrap="wrap">
            <OutlineDarkButton asChild>
              <RouterLink to="/">Home</RouterLink>
            </OutlineDarkButton>
            <GoldButton asChild>
              <RouterLink to="/projects">See our work</RouterLink>
            </GoldButton>
          </Flex>
        </Box>
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
