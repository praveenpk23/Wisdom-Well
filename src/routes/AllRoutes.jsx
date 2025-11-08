import {Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginScreen from '../pages/LoginScreen'
import RegisterScreen from '../pages/RegisterScreen';
import AiChat from '../pages/AiChat';
import DetailedPage from '../pages/DetailedPage';
export  const AllRouters = ()=>{
    return(
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/content/:id" element={<DetailedPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/aichat" element={<AiChat />} />
        </Routes>
    )
}