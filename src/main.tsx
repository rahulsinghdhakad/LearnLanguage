import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@emotion/react'
import { createTheme, CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import store from "./redux/store.ts"


const theme=createTheme({
  palette:{
    primary:{
      main:"#4287f5"
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Provider store={store}>
        <App/>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)