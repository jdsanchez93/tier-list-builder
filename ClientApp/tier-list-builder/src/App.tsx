import React from 'react';
import './App.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveDrawer from './app/ResponsiveDrawer';
import { Route, Routes } from 'react-router-dom';
import { AllTierLists } from './features/tier-list/AllTierLists';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ResponsiveDrawer />}>
            <Route path="/all" element={<AllTierLists />}></Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
