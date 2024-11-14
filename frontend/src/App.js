import { AppBar, Box, Button, Switch, ToggleButton, Toolbar, Typography } from '@mui/material';
import Main from './page/main';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import React, {useEffect, useState} from 'react';
import './app.css';



const themeLight = createTheme({
  palette: {
    mode: 'light',
    color: 'white'
  }
});

const themeDark = createTheme({
  palette: {
    mode: 'dark',
  }
});

function App() {

  const [darkTheme, setDarkTheme] = useState(localStorage.getItem("darktheme") ==="true")
  const [printerRef, setPrinterRef] = useState()

  useEffect(()=>{
    localStorage.setItem("darktheme",darkTheme);
  },[darkTheme])

  return (
    <>
      <ThemeProvider theme={darkTheme?themeDark:themeLight}>

        <CssBaseline />

        <div style={{ textAlign: 'center' }} className="App">
          <AppBar position="static">
            <Toolbar variant='dense'>

              <Typography sx={{ flexGrow: 1 }} style={{ textAlign: 'left' }} variant="h6" color="inherit" component="div">
                Scorecard
              </Typography>
              <div>
                Dark Mode
                <Switch
                  checked={darkTheme}
                  onChange={(e)=>setDarkTheme(e.target.checked)}
                ></Switch>
              </div>
            </Toolbar>
          </AppBar>
          <Main setPrinterRef={setPrinterRef} />
        </div>
      </ThemeProvider>

      <div>
        {printerRef}
      </div>
    </>
  );
}

export default App;
