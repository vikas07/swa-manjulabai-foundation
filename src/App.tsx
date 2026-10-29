import { Box, Flex } from '@chakra-ui/react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Provider } from './components/ui/provider'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Donate, DonateSuccess } from './pages/Donate'
import { Gallery } from './pages/Gallery'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'

export default function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Flex direction="column" minH="100dvh">
          <Header />
          <Box as="main" flex="1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/donate/success" element={<DonateSuccess />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
          <Footer />
        </Flex>
      </BrowserRouter>
    </Provider>
  )
}
