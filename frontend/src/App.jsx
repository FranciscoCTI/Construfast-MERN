import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import { HomePage } from './pages/HomePage';
import { Contact } from './pages/ContactPage';
import { CreatePage } from './pages/CreatePage';
import { NavBar } from './components/NavBar';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("yellow.400", "gray.800")}>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Create' element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App
