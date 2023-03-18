import './App.css';
import {Route,Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import { CssBaseline,ThemeProvider } from "@mui/material";
import {useMemo} from 'react';
import {createTheme} from '@mui/material/styles';
import { themeSettings } from './theme';
import { Toaster } from "react-hot-toast";
import Summary from './pages/Summary';
import Paragraph from './pages/Paragraph';
import ChatBot from './pages/ChatBot';
import JsConverter from './pages/JsConverter';
function App() {
  const theme=useMemo(()=>createTheme(themeSettings(),[]))
  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/summary' element={<Summary/>}/>
        <Route path='/paragraph' element={<Paragraph/>}/>
        <Route path='/chatbot' element={<ChatBot/>}/>
        <Route path='/js-converter' element={<JsConverter/>}/>
      </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
