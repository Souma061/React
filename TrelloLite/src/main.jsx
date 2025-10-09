import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import '@mantine/core/styles.css';
import { MantineProvider,createTheme } from '@mantine/core';

const theme = createTheme({
  // Customize your theme here
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider defaultColorScheme="dark"> {/* Wrap your App component */}
      <App />
    </MantineProvider>
  </StrictMode>
);

