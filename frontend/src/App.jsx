import { Box, Button, useColorModeValue } from '@chakra-ui/react';
import { HomePage } from './pages/HomePage.jsx';
import { NavBar } from './components/NavBar';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <Box minH={"100vh"} bg={useColorModeValue("yellow.400", "gray.800")}>
      <NavBar />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
    </Box>
  )
}

export default App
